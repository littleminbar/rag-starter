import React, { useState } from 'react';
import {
  X,
  Maximize2,
  TrendingUp,
  Sliders,
  Camera,
  Share2,
  Activity,
  Layers,
  Edit3,
  PenTool,
  Hash,
  Trash2,
  Check,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { IndexQuote } from '../types';
import { INDICES_DATA } from '../data/mockData';

interface FullChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: IndexQuote;
}

export const FullChartModal: React.FC<FullChartModalProps> = ({
  isOpen,
  onClose,
  initialIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState<IndexQuote>(
    initialIndex || INDICES_DATA[0]
  );
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState<'candles' | 'line' | 'heikin'>('candles');
  const [activeTool, setActiveTool] = useState<string>('crosshair');
  const [drawnLines, setDrawnLines] = useState<Array<{ id: number; y: number }>>([]);
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [paperBalance, setPaperBalance] = useState<number>(100000);
  const [orderMessage, setOrderMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (activeTool === 'trendline') {
      const rect = e.currentTarget.getBoundingClientRect();
      const y = ((e.clientY - rect.top) / rect.height) * 350;
      setDrawnLines((prev) => [...prev, { id: Date.now(), y }]);
    }
  };

  const handleExecuteOrder = () => {
    const cost = currentIndex.price * orderQuantity;
    if (orderSide === 'buy') {
      if (paperBalance >= cost) {
        setPaperBalance((prev) => prev - cost);
        setOrderMessage(`Successfully bought ${orderQuantity}x ${currentIndex.code} at $${currentIndex.price.toFixed(2)}`);
      } else {
        setOrderMessage('Insufficient demo funds');
      }
    } else {
      setPaperBalance((prev) => prev + cost);
      setOrderMessage(`Successfully sold ${orderQuantity}x ${currentIndex.code} at $${currentIndex.price.toFixed(2)}`);
    }

    setTimeout(() => setOrderMessage(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200 p-2 sm:p-4">
      <div className="w-full h-full max-w-[1720px] max-h-[96vh] bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Workstation Header Bar */}
        <div className="h-14 bg-[#0e111a] border-b border-[#2a2e39] px-4 flex items-center justify-between gap-4 select-none shrink-0">
          {/* Symbol & Market Switcher */}
          <div className="flex items-center space-x-3 overflow-x-auto">
            <div className="flex items-center gap-1.5 font-mono font-bold text-white text-base">
              <span className="text-[#2962ff]">●</span>
              <span>{currentIndex.symbol}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-[#1f232f] text-[#787b86]">
                {currentIndex.market}
              </span>
            </div>

            {/* Quick Symbol Switcher */}
            <div className="hidden sm:flex items-center space-x-1 pl-2 border-l border-[#2a2e39]">
              {INDICES_DATA.map((idx) => (
                <button
                  key={idx.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`text-xs px-2 py-1 rounded font-mono font-medium transition-colors cursor-pointer ${
                    currentIndex.id === idx.id
                      ? 'bg-[#2962ff] text-white'
                      : 'text-[#787b86] hover:text-white hover:bg-[#1e222d]'
                  }`}
                >
                  {idx.code}
                </button>
              ))}
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center space-x-1 pl-2 border-l border-[#2a2e39] text-xs">
              {['1m', '5m', '15m', '1h', '1D', '1W'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-1 rounded font-semibold cursor-pointer ${
                    timeframe === tf ? 'bg-[#1e222d] text-[#2962ff]' : 'text-[#787b86] hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Chart type */}
            <div className="hidden md:flex items-center space-x-1 pl-2 border-l border-[#2a2e39] text-xs">
              <button
                onClick={() => setChartType('candles')}
                className={`px-2 py-1 rounded cursor-pointer ${
                  chartType === 'candles' ? 'bg-[#1e222d] text-white font-bold' : 'text-[#787b86] hover:text-white'
                }`}
              >
                Candles
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-2 py-1 rounded cursor-pointer ${
                  chartType === 'line' ? 'bg-[#1e222d] text-white font-bold' : 'text-[#787b86] hover:text-white'
                }`}
              >
                Line
              </button>
            </div>
          </div>

          {/* Right actions: Snapshot, Demo Balance, Close */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded bg-[#090a0d] border border-[#1f232f] font-mono text-neutral-300">
              <span className="text-[#787b86]">Demo Balance:</span>
              <span className="font-bold text-[#089981]">
                ${paperBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <button
              onClick={() => {
                alert('Supercharts screenshot captured to clipboard!');
              }}
              className="p-2 rounded hover:bg-[#1e222d] text-[#787b86] hover:text-white transition-colors cursor-pointer"
              title="Take a snapshot"
            >
              <Camera className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-[#1e222d] text-[#787b86] hover:text-white transition-colors cursor-pointer"
              title="Close Full Superchart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Workstation Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Drawing Tools Sidebar */}
          <div className="w-12 bg-[#0e111a] border-r border-[#2a2e39] flex flex-col items-center py-3 space-y-2 select-none shrink-0">
            <button
              onClick={() => setActiveTool('crosshair')}
              className={`p-2 rounded cursor-pointer transition-colors ${
                activeTool === 'crosshair'
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#787b86] hover:bg-[#1e222d] hover:text-white'
              }`}
              title="Crosshair tool"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('trendline')}
              className={`p-2 rounded cursor-pointer transition-colors ${
                activeTool === 'trendline'
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#787b86] hover:bg-[#1e222d] hover:text-white'
              }`}
              title="Trendline (Click chart to place)"
            >
              <PenTool className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('indicators')}
              className={`p-2 rounded cursor-pointer transition-colors ${
                activeTool === 'indicators'
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#787b86] hover:bg-[#1e222d] hover:text-white'
              }`}
              title="Indicators"
            >
              <Activity className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('fibonacci')}
              className={`p-2 rounded cursor-pointer transition-colors ${
                activeTool === 'fibonacci'
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#787b86] hover:bg-[#1e222d] hover:text-white'
              }`}
              title="Fibonacci Retracement"
            >
              <Layers className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTool('text')}
              className={`p-2 rounded cursor-pointer transition-colors ${
                activeTool === 'text'
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#787b86] hover:bg-[#1e222d] hover:text-white'
              }`}
              title="Text Annotation"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <div className="w-6 border-b border-[#2a2e39] my-2"></div>

            {drawnLines.length > 0 && (
              <button
                onClick={() => setDrawnLines([])}
                className="p-2 rounded text-[#f23645] hover:bg-[#f23645]/20 transition-colors cursor-pointer"
                title="Clear all drawn drawings"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Central Chart Viewport */}
          <div className="flex-1 flex flex-col bg-[#131722] relative overflow-hidden">
            {/* Live Indicator Legend Bar */}
            <div className="p-3 border-b border-[#1f232f] flex items-center justify-between text-xs font-mono bg-[#10131d]">
              <div className="flex items-center space-x-4">
                <span className="font-bold text-white">
                  {currentIndex.code} · {currentIndex.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className={currentIndex.isPositive ? 'text-[#089981]' : 'text-[#f23645]'}>
                  {currentIndex.isPositive ? '+' : ''}{currentIndex.changePercent}%
                </span>
                <span className="text-[#787b86] hidden sm:inline">EMA 20: {currentIndex.ema20.toLocaleString()}</span>
                <span className="text-[#787b86] hidden sm:inline">EMA 50: {currentIndex.ema50.toLocaleString()}</span>
                <span className="text-[#787b86] hidden md:inline">RSI 14: {currentIndex.rsi}</span>
              </div>

              {activeTool === 'trendline' && (
                <div className="text-[11px] px-2 py-0.5 rounded bg-blue-500/20 text-[#2962ff] animate-pulse">
                  Trendline mode active: Click anywhere on chart to draw
                </div>
              )}
            </div>

            {/* Notification alert banner */}
            {orderMessage && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-[#090a0d] border border-[#089981] text-[#089981] text-xs font-medium rounded-full shadow-2xl flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>{orderMessage}</span>
              </div>
            )}

            {/* Large Full SVG Candlestick Canvas */}
            <div className="flex-1 relative p-4 flex items-center justify-center">
              <svg
                className="w-full h-full cursor-crosshair"
                viewBox="0 0 1100 420"
                fill="none"
                onClick={handleChartClick}
              >
                {/* Background horizontal gridlines */}
                {[70, 140, 210, 280, 350].map((y) => (
                  <line
                    key={y}
                    x1="20"
                    x2="1050"
                    y1={y}
                    y2={y}
                    stroke="#1f232f"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Drawn lines by user */}
                {drawnLines.map((line) => (
                  <line
                    key={line.id}
                    x1="20"
                    x2="1050"
                    y1={line.y}
                    y2={line.y}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                  />
                ))}

                {/* EMA 20 Line curve */}
                <path
                  d="M 40 330 C 200 300, 380 250, 560 260 C 720 270, 850 170, 1020 120"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                />

                {/* EMA 50 Line */}
                <path
                  d="M 40 350 C 220 330, 420 290, 600 280 C 780 270, 920 210, 1020 170"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />

                {/* 16 Candle bars */}
                {Array.from({ length: 16 }).map((_, i) => {
                  const x = 60 + i * 62;
                  const isUp = i % 3 !== 0;
                  const candleY = 320 - i * 12 + (i % 2 === 0 ? 15 : -15);
                  const candleHeight = Math.max(12, Math.floor(Math.sin(i) * 20 + 25));
                  const wickHeight = candleHeight + 20;
                  const color = isUp ? '#089981' : '#f23645';

                  return (
                    <g key={i}>
                      <line
                        x1={x}
                        x2={x}
                        y1={candleY - 10}
                        y2={candleY + wickHeight}
                        stroke={color}
                        strokeWidth="1.5"
                      />
                      <rect
                        x={x - 6}
                        y={candleY}
                        width="12"
                        height={candleHeight}
                        fill={color}
                        rx="1.5"
                      />
                    </g>
                  );
                })}

                {/* Live price line */}
                <line
                  x1="20"
                  x2="1050"
                  y1="120"
                  y2="120"
                  stroke="#089981"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                />
                <rect x="1000" y="108" width="80" height="24" rx="4" fill="#089981" />
                <text
                  x="1040"
                  y="124"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontFamily="monospace"
                  fontSize="11"
                  fontWeight="bold"
                >
                  {currentIndex.price.toFixed(1)}
                </text>
              </svg>
            </div>
          </div>

          {/* Right Order Execution Panel */}
          <div className="w-72 sm:w-80 bg-[#0e111a] border-l border-[#2a2e39] p-5 flex flex-col justify-between shrink-0 select-none">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-white text-sm">Order Panel</span>
                <span className="text-[11px] text-[#787b86] font-mono">Paper Trading</span>
              </div>

              {/* Buy / Sell Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setOrderSide('buy')}
                  className={`py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    orderSide === 'buy'
                      ? 'bg-[#089981] text-white shadow-lg shadow-[#089981]/30'
                      : 'bg-[#1e222d] text-[#787b86] hover:text-white'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" /> Buy / Long
                </button>
                <button
                  onClick={() => setOrderSide('sell')}
                  className={`py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    orderSide === 'sell'
                      ? 'bg-[#f23645] text-white shadow-lg shadow-[#f23645]/30'
                      : 'bg-[#1e222d] text-[#787b86] hover:text-white'
                  }`}
                >
                  <ArrowDownRight className="w-4 h-4" /> Sell / Short
                </button>
              </div>

              {/* Quantity Input */}
              <div className="space-y-3 text-xs mb-6">
                <div>
                  <label className="text-[#787b86] block mb-1">Quantity (Units)</label>
                  <div className="flex items-center bg-[#131722] border border-[#2a2e39] rounded-lg overflow-hidden">
                    <input
                      type="number"
                      min="1"
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-transparent px-3 py-2 text-white font-mono outline-none"
                    />
                    <div className="flex flex-col border-l border-[#2a2e39]">
                      <button
                        onClick={() => setOrderQuantity((prev) => prev + 1)}
                        className="px-2.5 py-0.5 text-[#787b86] hover:text-white hover:bg-[#1e222d]"
                      >
                        +
                      </button>
                      <button
                        onClick={() => setOrderQuantity((prev) => Math.max(1, prev - 1))}
                        className="px-2.5 py-0.5 text-[#787b86] hover:text-white hover:bg-[#1e222d]"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#131722] border border-[#1f232f] space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between text-[#787b86]">
                    <span>Execution Price</span>
                    <span className="text-white">${currentIndex.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#787b86]">
                    <span>Order Value</span>
                    <span className="text-white font-bold">
                      ${(currentIndex.price * orderQuantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#787b86]">
                    <span>Estimated Fee</span>
                    <span className="text-white">$0.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Execution Button */}
            <div>
              <button
                onClick={handleExecuteOrder}
                className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all transform active:scale-95 shadow-xl cursor-pointer ${
                  orderSide === 'buy'
                    ? 'bg-[#089981] hover:bg-emerald-600'
                    : 'bg-[#f23645] hover:bg-red-600'
                }`}
              >
                Place {orderSide.toUpperCase()} Order ({orderQuantity}x)
              </button>
              <div className="mt-2 text-center text-[10px] text-[#787b86]">
                Simulated broker execution with real-time liquidity
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
