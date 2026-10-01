import React, { useState, useEffect } from 'react';
import { INITIAL_TICKERS } from '../data/mockData';
import { TickerItem } from '../types';

interface TickerMarqueeProps {
  onSelectTicker: (code: string) => void;
}

export const TickerMarquee: React.FC<TickerMarqueeProps> = ({ onSelectTicker }) => {
  const [tickers, setTickers] = useState<TickerItem[]>(INITIAL_TICKERS);
  const [flashingId, setFlashingId] = useState<string | null>(null);

  // Realistic micro-tick simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const item = prev[randomIndex];
        // Don't modify US10Y with huge jumps
        const variance = item.code === 'US10Y' ? 0.002 : item.price * (Math.random() * 0.002 - 0.001);
        const newPrice = Math.max(0.1, Number((item.price + variance).toFixed(item.code === 'US10Y' ? 3 : 2)));
        const priceDiff = newPrice - item.price;
        const newChange = Number((item.change + priceDiff).toFixed(2));
        const newChangePercent = Number((item.changePercent + (priceDiff / item.price) * 100).toFixed(2));

        const updated = [...prev];
        updated[randomIndex] = {
          ...item,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          isPositive: newChangePercent >= 0,
        };

        setFlashingId(item.id);
        setTimeout(() => setFlashingId(null), 800);

        return updated;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (ticker: TickerItem) => {
    if (ticker.code === 'US10Y') return `${ticker.price.toFixed(3)}%`;
    if (ticker.price >= 1000) {
      return ticker.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return ticker.price.toFixed(2);
  };

  return (
    <section className="bg-[#0d1017] border-b border-[#1f232f] text-xs overflow-x-auto whitespace-nowrap scrollbar-none py-2 px-4 select-none">
      <div className="max-w-[1720px] mx-auto flex items-center space-x-7">
        {tickers.map((ticker, index) => (
          <React.Fragment key={ticker.id}>
            <button
              onClick={() => onSelectTicker(ticker.code)}
              className={`flex items-center space-x-2 font-mono transition-all duration-300 px-2 py-0.5 rounded hover:bg-[#1a1f2c] cursor-pointer ${
                flashingId === ticker.id
                  ? ticker.isPositive
                    ? 'bg-[#089981]/25 ring-1 ring-[#089981]'
                    : 'bg-[#f23645]/25 ring-1 ring-[#f23645]'
                  : ''
              }`}
            >
              <span className="font-bold text-[#f0f3fa] hover:text-[#2962ff]">{ticker.name}</span>
              <span className="text-[#787b86]">{formatPrice(ticker)}</span>
              <span
                className={`font-medium flex items-center ${
                  ticker.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                <svg
                  className={`w-3 h-3 mr-0.5 inline transform ${ticker.isPositive ? '' : 'rotate-180'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    clipRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    fillRule="evenodd"
                  />
                </svg>
                {ticker.isPositive ? '+' : ''}
                {ticker.changePercent.toFixed(2)}%
              </span>
            </button>
            {index < tickers.length - 1 && <span className="text-[#2a2e39]">•</span>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
