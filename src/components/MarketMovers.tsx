import React, { useState } from 'react';
import { HIGHEST_VOLUME_STOCKS, TOP_CRYPTO_GAINERS } from '../data/mockData';
import { MarketMover } from '../types';

interface MarketMoversProps {
  onSelectMover: (symbol: string) => void;
  onViewAllStocks: () => void;
  onViewAllCrypto: () => void;
}

export const MarketMovers: React.FC<MarketMoversProps> = ({
  onSelectMover,
  onViewAllStocks,
  onViewAllCrypto,
}) => {
  const [stockCategory, setStockCategory] = useState<'volume' | 'gainers' | 'losers'>('volume');
  const [cryptoCategory, setCryptoCategory] = useState<'gainers' | 'volume' | 'marketCap'>('gainers');

  const stocksToDisplay = HIGHEST_VOLUME_STOCKS.slice(0, 4);
  const cryptoToDisplay = TOP_CRYPTO_GAINERS.slice(0, 4);

  return (
    <section className="max-w-[1600px] mx-auto px-4 lg:px-8 mb-20 sm:mb-24" id="markets">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Highest Volume US Stocks */}
        <div className="bg-[#131722] border border-[#2a2e39] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-white">Highest volume US stocks</h3>
              <button
                onClick={onViewAllStocks}
                className="text-xs text-[#2962ff] hover:underline font-semibold cursor-pointer"
              >
                See all most active →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs text-[#787b86] uppercase font-mono border-b border-[#2a2e39]">
                    <th className="pb-3 font-normal">Symbol</th>
                    <th className="pb-3 text-right font-normal">Price</th>
                    <th className="pb-3 text-right font-normal">Change</th>
                    <th className="pb-3 text-right font-normal">Vol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f232f] font-mono">
                  {stocksToDisplay.map((stock) => (
                    <tr
                      key={stock.symbol}
                      onClick={() => onSelectMover(stock.symbol)}
                      className="hover:bg-[#1e222d]/60 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 font-sans">
                        <div className="font-bold text-white group-hover:text-[#2962ff] transition-colors">
                          {stock.symbol}
                        </div>
                        <div className="text-xs text-[#787b86] font-sans">{stock.name}</div>
                      </td>
                      <td className="py-3 text-right text-white font-semibold">
                        {typeof stock.price === 'number' ? stock.price.toFixed(2) : stock.price}
                      </td>
                      <td
                        className={`py-3 text-right font-semibold ${
                          stock.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {stock.isPositive ? '+' : ''}
                        {stock.changePercent.toFixed(2)}%
                      </td>
                      <td className="py-3 text-right text-[#787b86] text-xs">
                        {stock.volumeOrRank}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Crypto Gainers & Movers */}
        <div className="bg-[#131722] border border-[#2a2e39] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-white">Top Crypto Gainers</h3>
              <button
                onClick={onViewAllCrypto}
                className="text-xs text-[#2962ff] hover:underline font-semibold cursor-pointer"
              >
                See all crypto →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs text-[#787b86] uppercase font-mono border-b border-[#2a2e39]">
                    <th className="pb-3 font-normal">Symbol</th>
                    <th className="pb-3 text-right font-normal">Price (USD)</th>
                    <th className="pb-3 text-right font-normal">24h Gain</th>
                    <th className="pb-3 text-right font-normal">Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f232f] font-mono">
                  {cryptoToDisplay.map((crypto) => (
                    <tr
                      key={crypto.symbol}
                      onClick={() => onSelectMover(crypto.symbol)}
                      className="hover:bg-[#1e222d]/60 cursor-pointer transition-colors group"
                    >
                      <td className="py-3 font-sans">
                        <div className="font-bold text-white group-hover:text-[#2962ff] transition-colors">
                          {crypto.symbol}
                        </div>
                        <div className="text-xs text-[#787b86] font-sans">{crypto.name}</div>
                      </td>
                      <td className="py-3 text-right text-white font-semibold">
                        {typeof crypto.price === 'number' ? crypto.price.toFixed(3) : crypto.price}
                      </td>
                      <td
                        className={`py-3 text-right font-semibold ${
                          crypto.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                        }`}
                      >
                        {crypto.isPositive ? '+' : ''}
                        {crypto.changePercent.toFixed(2)}%
                      </td>
                      <td className="py-3 text-right text-[#787b86] text-xs">
                        {crypto.volumeOrRank}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
