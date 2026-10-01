import React, { useState } from 'react';
import { COMMUNITY_IDEAS } from '../data/mockData';
import { CommunityIdea } from '../types';

interface CommunityIdeasProps {
  onSelectIdea: (idea: CommunityIdea) => void;
  onSeeAllIdeas: () => void;
}

export const CommunityIdeas: React.FC<CommunityIdeasProps> = ({
  onSelectIdea,
  onSeeAllIdeas,
}) => {
  const [activeTab, setActiveTab] = useState<'editors' | 'popular' | 'forex' | 'crypto'>('editors');

  const filteredIdeas = COMMUNITY_IDEAS.filter((idea) => {
    if (activeTab === 'editors') return idea.isEditorPick;
    if (activeTab === 'popular') return true;
    if (activeTab === 'forex') return idea.category === 'forex';
    if (activeTab === 'crypto') return idea.category === 'crypto';
    return true;
  });

  return (
    <section className="max-w-[1600px] mx-auto px-4 lg:px-8 mb-20 sm:mb-24" id="community">
      {/* Section Header with Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#2a2e39] pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Community ideas</h2>
          <p className="text-[#787b86] text-sm mt-1">
            Trading analysis and educational setups shared by top market minds
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm font-semibold overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('editors')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'editors'
                ? 'bg-white text-black font-bold'
                : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
            }`}
          >
            Editors&apos; picks
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'popular'
                ? 'bg-white text-black font-bold'
                : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setActiveTab('forex')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'forex'
                ? 'bg-white text-black font-bold'
                : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
            }`}
          >
            Forex
          </button>
          <button
            onClick={() => setActiveTab('crypto')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'crypto'
                ? 'bg-white text-black font-bold'
                : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
            }`}
          >
            Crypto
          </button>
        </div>
      </div>

      {/* Trade Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredIdeas.slice(0, 4).map((idea) => {
          const isShort = idea.direction === 'Short';
          return (
            <article
              key={idea.id}
              onClick={() => onSelectIdea(idea)}
              className="bg-[#131722] border border-[#2a2e39] hover:border-[#2962ff]/60 rounded-xl overflow-hidden transition-all duration-200 flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="p-5">
                {/* Asset & Position Badge */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold font-mono px-2 py-0.5 rounded bg-zinc-800 text-white">
                    {idea.symbol}
                  </span>
                  <span
                    className={`font-semibold uppercase tracking-wider text-[11px] ${
                      isShort ? 'text-[#f23645]' : 'text-[#089981]'
                    }`}
                  >
                    {idea.direction}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#2962ff] transition-colors mb-2 line-clamp-2">
                  {idea.title}
                </h3>

                <p className="text-[#787b86] text-xs leading-relaxed line-clamp-3 mb-4">
                  {idea.description}
                </p>

                {/* Idea mini chart preview */}
                <div className="h-28 rounded bg-[#1b1f2b] p-3 flex items-center justify-center border border-[#1f232f] mb-2 overflow-hidden">
                  <svg
                    className={`w-full h-full opacity-85 transition-transform duration-300 group-hover:scale-105 ${
                      isShort ? 'text-[#f23645]' : 'text-[#089981]'
                    }`}
                    viewBox="0 0 100 40"
                    fill="none"
                  >
                    {isShort ? (
                      <path
                        d="M 2 8 Q 35 15, 55 24 T 98 36"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    ) : (
                      <path
                        d="M 2 34 Q 35 28, 60 16 T 98 6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                </div>
              </div>

              {/* Author Info */}
              <div className="p-4 bg-[#0e111a] border-t border-[#2a2e39] flex items-center justify-between text-xs text-[#787b86]">
                <span className="font-medium text-white flex items-center gap-1.5">
                  <span
                    className={`w-5 h-5 rounded-full ${idea.authorColor} inline-flex items-center justify-center text-[10px] text-white font-bold`}
                  >
                    {idea.authorInitial}
                  </span>
                  by {idea.author}
                </span>
                <span>{idea.isEditorPick ? "Editors' pick" : 'Top trader'}</span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onSeeAllIdeas}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#131722] hover:bg-[#1e222d] border border-[#2a2e39] text-sm font-semibold text-white transition-colors cursor-pointer"
        >
          <span>See all editors&apos; picks ideas</span>
          <span>→</span>
        </button>
      </div>
    </section>
  );
};
