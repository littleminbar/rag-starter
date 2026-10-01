import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { ALL_SEARCH_ITEMS } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'Stock', 'Crypto', 'Forex', 'Index', 'Futures'];

  const filtered = ALL_SEARCH_ITEMS.filter((item) => {
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.exchange.toLowerCase().includes(query.toLowerCase());

    const matchesFilter = filterType === 'All' || item.type === filterType;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#2a2e39] flex items-center gap-3 bg-[#0e111a]">
          <Search className="w-5 h-5 text-[#787b86]" />
          <input
            type="text"
            placeholder="Search symbol, currency, index, or company..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-white placeholder-[#787b86] outline-none text-base font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#787b86] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-[#1e222d] text-[#787b86] hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Filter categories */}
        <div className="px-4 py-2 border-b border-[#1f232f] flex gap-2 overflow-x-auto text-xs bg-[#10131d]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                filterType === cat
                  ? 'bg-[#2962ff] text-white font-semibold'
                  : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto divide-y divide-[#1f232f] flex-1 p-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#787b86] text-sm">
              No symbols found matching &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.symbol}
                onClick={() => {
                  onSelectSymbol(item.symbol);
                  onClose();
                }}
                className="p-3 rounded-lg hover:bg-[#1e222d] cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#1f232f] flex items-center justify-center text-xs font-bold text-[#2962ff] group-hover:bg-[#2962ff] group-hover:text-white transition-colors">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white group-hover:text-[#2962ff] transition-colors">
                        {item.symbol}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-[#787b86] font-mono">
                        {item.exchange}
                      </span>
                    </div>
                    <div className="text-xs text-[#787b86]">{item.name}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs px-2 py-0.5 rounded bg-[#1f232f] text-neutral-300 font-medium">
                    {item.type}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer info */}
        <div className="p-3 bg-[#0a0c12] border-t border-[#2a2e39] text-xs text-[#787b86] flex justify-between items-center">
          <span>Tip: Select any symbol to inspect in Supercharts</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    </div>
  );
};
