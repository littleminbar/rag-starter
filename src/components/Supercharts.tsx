import React, { useState, useEffect, useMemo } from 'react';
import { INDICES_DATA } from '../data/mockData';
import { IndexQuote } from '../types';

interface SuperchartsProps {
  activeSymbolCode?: string;
  onOpenFullChart: (index: IndexQuote) => void;
  onExploreFeatures: () => void;
}

export const Supercharts: React.FC<SuperchartsProps> = ({
  activeSymbolCode,
  onOpenFullChart,
  onExploreFeatures,
}) => {
  const [selectedIndexId, setSelectedIndexId] = useState<string>('ndx');
  const [timeframe, setTimeframe] = useState<string>('1M');
  const [showEma20, setShowEma20] = useState<boolean>(true);
  const [showEma50, setShowEma50] = useState<boolean>(true);
  const [showRsi, setShowRsi] = useState<boolean>(true);
  const [isLog, setIsLog] = useState<boolean>(false);
  const [isAuto, setIsAuto] = useState<boolean>(true);
  const [utcTime, setUtcTime] = useState<string>('14:28:01 UTC');

  // Interactive crosshair coordinates
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  // Sync when activeSymbolCode changes from ticker or search
  useEffect(() => {
    if (activeSymbolCode) {
      const match = INDICES_DATA.find(
        (i) => i.code.toLowerCase() === activeSymbolCode.toLowerCase()
      );
      if (match) {
        setSelectedIndexId(match.id);
      }
    }
  }, [activeSymbolCode]);

  // Live ticking UTC clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${h}:${m}:${s} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentIndex = useMemo(() => {
    return INDICES_DATA.find((i) => i.id === selectedIndexId) || INDICES_DATA[0];
  }, [selectedIndexId]);

  // Generate responsive candle coordinates based on selected symbol and timeframe
  const candles = useMemo(() => {
    const isBull = currentIndex.isPositive;
    const basePrice = currentIndex.price;

    // Pattern variations per timeframe
    const count = 13;
    const items = [];
    let current = basePrice * (isBull ? 0.97 : 1.03);

    for (let i = 0; i < count; i++) {
      const isUp = i === count - 1 ? isBull : (i % 3 !== 0 && (isBull || i % 2 === 0));
      const delta = (basePrice * 0.008) * (Math.random() * 0.8 + 0.4);
      const open = current;
      const close = isUp ? open + delta : open - delta;
      const high = Math.max(open, close) + delta * (Math.random() * 0.5 + 0.2);
      const low = Math.min(open, close) - delta * (Math.random() * 0.5 + 0.2);
      current = close;

      items.push({
        index: i,
        open,
        close,
        high,
        low,
        isUp,
        volumeHeight: Math.floor(Math.random() * 35) + 12,
      });
    }

    // Force last candle to hit the current price
    items[count - 1].close = basePrice;
    items[count - 1].isUp = isBull;

    return items;
  }, [currentIndex, timeframe]);

  // Map prices to SVG Y-coordinates (viewBox 0 0 850 280)
  const minPrice = useMemo(() => Math.min(...candles.map((c) => c.low)) * 0.998, [candles]);
  const maxPrice = useMemo(() => Math.max(...candles.map((c) => c.high)) * 1.002, [candles]);

  const getY = (val: number) => {
    const ratio = (val - minPrice) / (maxPrice - minPrice || 1);
    return 240 - ratio * 200; // between 40 and 240
  };

  const currentPriceY = getY(currentIndex.price);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 850;
    const y = ((e.clientY - rect.top) / rect.height) * 280;
    setMousePos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  const hoverPrice = useMemo(() => {
    if (!mousePos.active) return currentIndex.price;
    const ratio = (240 - mousePos.y) / 200;
    return minPrice + ratio * (maxPrice - minPrice);
  }, [mousePos, minPrice, maxPrice, currentIndex.price]);

  return (
    <section className="max-w-[1600px] mx-auto px-4 lg:px-8 mb-20 sm:mb-24" id="supercharts">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between mb-6 pb-4 border-b border-[#2a2e39]">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#2962ff]">Supercharged</span>
          <h2 className="text-3xl font-extrabold text-white mt-1">Supercharts</h2>
        </div>
        <button
          onClick={onExploreFeatures}
          className="text-sm font-semibold text-[#2962ff] hover:underline mt-2 sm:mt-0 flex items-center gap-1 cursor-pointer"
        >
          <span>Explore all features</span>
          <span className="text-[#787b86] text-xs">· For every level of analysis →</span>
        </button>
      </div>

      {/* Live Terminal Container */}
      <div className="bg-[#131722] border border-[#2a2e39] rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Sidebar: Watchlist / Symbol Tabs */}
        <div className="lg:col-span-4 xl:col-span-3 border-b lg:border-b-0 lg:border-r border-[#2a2e39] flex flex-col justify-between bg-[#0e111a]">
          <div>
            {/* Watchlist Header */}
            <div className="p-4 border-b border-[#2a2e39] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#787b86]">Major Indices</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#2a2e39] text-[#f0f3fa] font-mono">Quotes</span>
            </div>

            {/* List of indices */}
            <ul className="divide-y divide-[#2a2e39]/50 text-sm">
              {INDICES_DATA.map((item) => {
                const isSelected = item.id === currentIndex.id;
                return (
                  <li
                    key={item.id}
                    onClick={() => setSelectedIndexId(item.id)}
                    className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#1e222d]/90 border-l-4 border-[#2962ff]'
                        : 'hover:bg-[#1e222d]/50'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{item.symbol}</span>
                        <span className="text-[10px] px-1 bg-neutral-800 text-[#787b86] rounded font-mono">
                          {item.code}
                        </span>
                      </div>
                      <div className="text-xs text-[#787b86] font-mono mt-0.5">
                        {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          item.isPositive
                            ? 'bg-[#089981]/20 text-[#089981]'
                            : 'bg-[#f23645]/20 text-[#f23645]'
                        }`}
                      >
                        {item.isPositive ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bottom Watchlist Link */}
          <div className="p-3 bg-black/40 border-t border-[#2a2e39]">
            <button
              onClick={() => onOpenFullChart(currentIndex)}
              className="w-full text-xs font-medium text-[#787b86] hover:text-white flex items-center justify-between cursor-pointer"
            >
              <span>See all major indices</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Right Side: Interactive Candlestick / Indicator Chart Area */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col bg-[#131722]">
          {/* Chart Top Toolbar */}
          <div className="px-5 py-3 border-b border-[#2a2e39] flex flex-wrap items-center justify-between gap-3 text-xs bg-[#10131d]">
            <div className="flex items-center space-x-3 font-mono">
              <span className="font-bold text-white text-base">
                {currentIndex.code} · {timeframe} · {currentIndex.market}
              </span>
              <span
                className={`font-semibold text-sm ${
                  currentIndex.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                }`}
              >
                {currentIndex.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span
                className={
                  currentIndex.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                }
              >
                {currentIndex.isPositive ? '+' : ''}
                {(currentIndex.price * (currentIndex.changePercent / 100)).toFixed(2)} (
                {currentIndex.isPositive ? '+' : ''}
                {currentIndex.changePercent.toFixed(2)}%)
              </span>
            </div>

            {/* Timeframe Pills */}
            <div className="flex items-center space-x-1 font-semibold text-[#787b86]">
              {['1D', '5D', '1M', '3M', '1Y', 'ALL'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                    timeframe === tf
                      ? 'bg-[#2962ff] text-white'
                      : 'hover:bg-[#2a2e39] text-[#787b86] hover:text-[#f0f3fa]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Indicator Toolbar Badges */}
          <div className="px-5 py-2 border-b border-[#1f232f] flex flex-wrap items-center gap-3 text-[11px] text-[#787b86] font-mono">
            <button
              onClick={() => setShowEma20(!showEma20)}
              className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer ${
                showEma20 ? 'bg-blue-500/15 text-blue-300' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400"></span> EMA 20 (close):{' '}
              {currentIndex.ema20.toLocaleString()}
            </button>
            <button
              onClick={() => setShowEma50(!showEma50)}
              className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer ${
                showEma50 ? 'bg-amber-500/15 text-amber-300' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span> EMA 50 (close):{' '}
              {currentIndex.ema50.toLocaleString()}
            </button>
            <button
              onClick={() => setShowRsi(!showRsi)}
              className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded cursor-pointer ${
                showRsi ? 'bg-purple-500/15 text-purple-300' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400"></span> RSI 14:{' '}
              {currentIndex.rsi.toFixed(1)}
            </button>
          </div>

          {/* Candlestick Vector Canvas */}
          <div className="relative flex-1 min-h-[360px] p-4 sm:p-6 flex items-center justify-center overflow-hidden">
            {/* Grid Lines Background */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border-b border-r border-[#2a2e39]"></div>
              ))}
            </div>

            {/* Stylized Financial Chart SVG (Price Action + EMA + Candlesticks) */}
            <svg
              className="w-full h-72 candlestick-glow cursor-crosshair relative z-10"
              fill="none"
              viewBox="0 0 850 280"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Smooth Moving Average Line: EMA 20 */}
              {showEma20 && (
                <path
                  d="M 20 230 C 140 210, 220 180, 340 190 C 460 200, 560 110, 680 90 C 740 80, 790 60, 830 50"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                />
              )}

              {/* EMA 50 Dashed line */}
              {showEma50 && (
                <path
                  d="M 20 245 C 140 235, 260 210, 390 205 C 520 200, 630 140, 750 110 C 790 100, 810 95, 830 85"
                  fill="none"
                  stroke="#f59e0b"
                  strokeDasharray="4 4"
                  strokeWidth="2"
                />
              )}

              {/* Candles Series */}
              {candles.map((candle) => {
                const xCenter = 60 + candle.index * 60;
                const highY = getY(candle.high);
                const lowY = getY(candle.low);
                const openY = getY(candle.open);
                const closeY = getY(candle.close);
                const rectY = Math.min(openY, closeY);
                const rectHeight = Math.max(4, Math.abs(openY - closeY));
                const color = candle.isUp ? '#089981' : '#f23645';

                return (
                  <g key={candle.index}>
                    {/* Wick */}
                    <line
                      x1={xCenter}
                      x2={xCenter}
                      y1={highY}
                      y2={lowY}
                      stroke={color}
                      strokeWidth="1.5"
                    />
                    {/* Candle Body */}
                    <rect
                      x={xCenter - 4}
                      y={rectY}
                      width="8"
                      height={rectHeight}
                      fill={color}
                      rx="1"
                    />
                  </g>
                );
              })}

              {/* Live Price Target Line (Dotted across horizontal axis) */}
              <line
                x1="20"
                x2="830"
                y1={currentPriceY}
                y2={currentPriceY}
                stroke={currentIndex.isPositive ? '#089981' : '#f23645'}
                strokeDasharray="3 3"
                strokeWidth="1"
              />

              {/* Live Price Badge */}
              <rect
                x="775"
                y={Math.max(10, currentPriceY - 10)}
                width="65"
                height="20"
                rx="3"
                fill={currentIndex.isPositive ? '#089981' : '#f23645'}
              />
              <text
                x="807"
                y={Math.max(10, currentPriceY - 10) + 14}
                textAnchor="middle"
                fill="#ffffff"
                fontFamily="monospace"
                fontSize="10"
                fontWeight="bold"
              >
                {currentIndex.price > 1000
                  ? currentIndex.price.toFixed(1)
                  : currentIndex.price.toFixed(2)}
              </text>

              {/* Interactive Crosshairs when user hovers */}
              {mousePos.active && (
                <g>
                  {/* Vertical line */}
                  <line
                    x1={mousePos.x}
                    x2={mousePos.x}
                    y1="10"
                    y2="260"
                    stroke="#787b86"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  {/* Horizontal line */}
                  <line
                    x1="20"
                    x2="830"
                    y1={mousePos.y}
                    y2={mousePos.y}
                    stroke="#787b86"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  {/* Hover price tag on right axis */}
                  <rect
                    x="775"
                    y={Math.max(10, mousePos.y - 10)}
                    width="65"
                    height="20"
                    rx="3"
                    fill="#1f232f"
                    stroke="#2a2e39"
                  />
                  <text
                    x="807"
                    y={Math.max(10, mousePos.y - 10) + 14}
                    textAnchor="middle"
                    fill="#f0f3fa"
                    fontFamily="monospace"
                    fontSize="10"
                  >
                    {hoverPrice.toFixed(1)}
                  </text>
                </g>
              )}
            </svg>

            {/* Bottom Volume Histogram Overlay */}
            <div className="absolute bottom-2 left-6 right-6 h-12 flex items-end justify-between opacity-30 pointer-events-none">
              {candles.map((candle, idx) => (
                <div
                  key={idx}
                  style={{ height: `${candle.volumeHeight}px` }}
                  className={`w-2.5 rounded-t transition-all ${
                    candle.isUp ? 'bg-[#089981]' : 'bg-[#f23645]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Footer Bar */}
          <div className="px-5 py-3 border-t border-[#2a2e39] bg-[#0a0c12] flex items-center justify-between text-xs text-[#787b86]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLog(!isLog)}
                className={`transition-colors cursor-pointer ${
                  isLog ? 'text-[#2962ff] font-bold' : 'hover:text-white'
                }`}
              >
                Log
              </button>
              <button
                onClick={() => setIsAuto(!isAuto)}
                className={`transition-colors cursor-pointer ${
                  isAuto ? 'text-[#2962ff] font-bold' : 'hover:text-white'
                }`}
              >
                Auto
              </button>
              <span className="font-mono text-neutral-400">{utcTime}</span>
            </div>

            <button
              onClick={() => onOpenFullChart(currentIndex)}
              className="font-bold text-[#2962ff] hover:text-blue-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Open in Full Superchart</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
