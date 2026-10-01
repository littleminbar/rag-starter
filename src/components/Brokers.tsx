import React from 'react';
import { BROKERS } from '../data/mockData';
import { Broker } from '../types';

interface BrokersProps {
  onOpenBroker: (broker: Broker) => void;
}

export const Brokers: React.FC<BrokersProps> = ({ onOpenBroker }) => {
  return (
    <section className="max-w-[1600px] mx-auto px-4 lg:px-8 mb-20 sm:mb-24" id="brokers">
      <div className="bg-gradient-to-b from-[#131722] to-black border border-[#2a2e39] rounded-2xl p-6 sm:p-8 lg:p-12">
        <div className="max-w-3xl mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#2962ff]">
            Direct Integration
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Trading and brokers</h2>
          <p className="text-[#787b86] text-sm sm:text-base mt-2">
            Trade directly on Supercharts through our supported, fully-verified, and user-reviewed brokers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BROKERS.map((broker) => (
            <div
              key={broker.id}
              className="p-5 bg-black/60 border border-[#2a2e39] rounded-xl hover:border-[#2962ff]/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-white text-base">{broker.name}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${broker.badgeColor}`}>
                    {broker.badge}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#787b86] mb-4">
                  <span className="text-amber-400 font-bold">★ {broker.rating}</span>
                  <span>{broker.ratingText}</span>
                </div>

                <p className="text-xs text-[#787b86] leading-relaxed mb-4 line-clamp-2">
                  {broker.description}
                </p>
              </div>

              <button
                onClick={() => onOpenBroker(broker)}
                className="block w-full py-2 bg-[#2a2e39] hover:bg-[#363a45] text-center rounded text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Open account
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
