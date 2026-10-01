import React, { useState } from 'react';
import { X, ThumbsUp, MessageSquare, Share2, Bookmark, CheckCircle2 } from 'lucide-react';
import { CommunityIdea } from '../types';

interface IdeaModalProps {
  idea: CommunityIdea | null;
  onClose: () => void;
  onOpenInChart: (symbol: string) => void;
}

export const IdeaModal: React.FC<IdeaModalProps> = ({ idea, onClose, onOpenInChart }) => {
  const [likes, setLikes] = useState<number>(idea?.likes || 0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [commentsList, setCommentsList] = useState<Array<{ id: number; author: string; text: string; time: string }>>([
    { id: 1, author: 'AlphaTrader', text: 'Great analysis! Watched this break on the 4H timeframe.', time: '1 hour ago' },
    { id: 2, author: 'QuantumYield', text: 'Target 1 hit, moving stop loss to breakeven.', time: '45 mins ago' },
  ]);

  if (!idea) return null;

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentsList((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: 'You',
        text: commentText.trim(),
        time: 'Just now',
      },
    ]);
    setCommentText('');
  };

  const isShort = idea.direction === 'Short';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2a2e39] bg-[#0e111a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold px-2.5 py-1 rounded bg-[#1f232f] text-white">
              {idea.symbol}
            </span>
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                isShort ? 'bg-[#f23645]/20 text-[#f23645]' : 'bg-[#089981]/20 text-[#089981]'
              }`}
            >
              {idea.direction} Position
            </span>
            {idea.isEditorPick && (
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Editors&apos; Pick
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#1e222d] text-[#787b86] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Author bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full ${idea.authorColor} flex items-center justify-center text-white font-bold text-sm shadow`}
              >
                {idea.authorInitial}
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>{idea.author}</span>
                  <span className="text-xs text-[#787b86] font-normal">· {idea.published}</span>
                </div>
                <div className="text-xs text-[#787b86]">Top Ranked Market Contributor</div>
              </div>
            </div>

            <button
              onClick={() => onOpenInChart(idea.symbol)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#2962ff] hover:bg-blue-600 text-white transition-colors cursor-pointer"
            >
              Open in Chart ↗
            </button>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
              {idea.title}
            </h2>
            <p className="text-sm text-[#d1d4dc] leading-relaxed">
              {idea.description}
            </p>
          </div>

          {/* Chart Graphic Preview */}
          <div className="h-56 sm:h-64 rounded-xl bg-[#0e111a] border border-[#2a2e39] p-4 flex flex-col justify-between overflow-hidden relative">
            <div className="flex justify-between items-center text-xs font-mono text-[#787b86]">
              <span>SETUP TIMEFRAME: 4-HOUR / DAILY</span>
              <span className="text-white font-bold">{idea.symbol}</span>
            </div>

            <svg className="w-full h-40" viewBox="0 0 600 160" fill="none">
              {/* Target lines */}
              <line x1="0" x2="600" y1="40" y2="40" stroke="#089981" strokeDasharray="4 4" strokeWidth="1" />
              <text x="520" y="35" fill="#089981" fontSize="10" fontFamily="monospace">Take Profit</text>

              <line x1="0" x2="600" y1="120" y2="120" stroke="#f23645" strokeDasharray="4 4" strokeWidth="1" />
              <text x="520" y="135" fill="#f23645" fontSize="10" fontFamily="monospace">Stop Loss</text>

              {isShort ? (
                <path
                  d="M 20 50 Q 180 60, 320 95 T 580 135"
                  stroke="#f23645"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M 20 130 Q 180 120, 320 75 T 580 35"
                  stroke="#089981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              )}
            </svg>

            <div className="flex justify-between items-center text-xs text-[#787b86]">
              <span>Risk/Reward: 1:3.2</span>
              <span>Confidence: High Probability</span>
            </div>
          </div>

          {/* Engagement bar */}
          <div className="flex items-center gap-4 py-2 border-y border-[#1f232f] text-xs text-[#787b86]">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                hasLiked
                  ? 'bg-[#2962ff]/20 text-[#2962ff] font-bold'
                  : 'hover:bg-[#1e222d] text-[#787b86] hover:text-white'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{likes} Boosts</span>
            </button>

            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>{commentsList.length} Comments</span>
            </div>
          </div>

          {/* Comments section */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm">Discussion</h4>

            {/* Comment list */}
            <div className="space-y-3">
              {commentsList.map((comm) => (
                <div key={comm.id} className="p-3 rounded-lg bg-[#0e111a] border border-[#1f232f] text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">{comm.author}</span>
                    <span className="text-[#787b86]">{comm.time}</span>
                  </div>
                  <p className="text-[#d1d4dc]">{comm.text}</p>
                </div>
              ))}
            </div>

            {/* Post comment input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your perspective or ask a question..."
                className="flex-1 bg-[#0e111a] border border-[#2a2e39] rounded-lg px-3 py-2 text-xs text-white placeholder-[#787b86] outline-none focus:border-[#2962ff]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2962ff] hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
