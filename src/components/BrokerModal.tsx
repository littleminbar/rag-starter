import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Broker } from '../types';

interface BrokerModalProps {
  broker: Broker | null;
  onClose: () => void;
}

export const BrokerModal: React.FC<BrokerModalProps> = ({ broker, onClose }) => {
  const [accountType, setAccountType] = useState<'demo' | 'live'>('demo');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  if (!broker) return null;

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2a2e39] bg-[#0e111a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg text-white">{broker.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded font-semibold ${broker.badgeColor}`}>
              {broker.badge}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#1e222d] text-[#787b86] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {isConnected ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {broker.name} {accountType === 'demo' ? 'Demo' : 'Live'} Connected!
              </h3>
              <p className="text-xs text-[#787b86] max-w-sm mx-auto">
                Your account is now linked directly into Supercharts. Orders placed in the terminal will route straight to your broker.
              </p>
              <div className="p-4 rounded-xl bg-[#0e111a] border border-[#2a2e39] text-xs font-mono text-left max-w-xs mx-auto space-y-1.5">
                <div className="flex justify-between text-[#787b86]">
                  <span>Account Number:</span>
                  <span className="text-white">TV-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-[#787b86]">
                  <span>Status:</span>
                  <span className="text-emerald-400 font-bold">Active &amp; Streaming</span>
                </div>
                <div className="flex justify-between text-[#787b86]">
                  <span>Leverage:</span>
                  <span className="text-white">{broker.leverage}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#2962ff] hover:bg-blue-600 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Start Trading on Supercharts
              </button>
            </div>
          ) : (
            <>
              {/* Account type picker */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#0e111a] rounded-xl border border-[#2a2e39]">
                <button
                  onClick={() => setAccountType('demo')}
                  className={`py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    accountType === 'demo'
                      ? 'bg-[#2962ff] text-white shadow'
                      : 'text-[#787b86] hover:text-white'
                  }`}
                >
                  Practice / Demo ($100,000)
                </button>
                <button
                  onClick={() => setAccountType('live')}
                  className={`py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    accountType === 'live'
                      ? 'bg-[#2962ff] text-white shadow'
                      : 'text-[#787b86] hover:text-white'
                  }`}
                >
                  Live Broker Account
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0e111a] border border-[#1f232f] text-xs">
                  <ShieldCheck className="w-5 h-5 text-[#2962ff] shrink-0" />
                  <div>
                    <span className="text-white font-semibold block">Regulated &amp; Verified Broker</span>
                    <span className="text-[#787b86]">Official API connector with end-to-end encrypted order execution.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0e111a] border border-[#1f232f] text-xs">
                  <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-white font-semibold block">Ultra Low Latency</span>
                    <span className="text-[#787b86]">Direct fiber cross-connect with sub-millisecond execution.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1e222d]/50 border border-[#2a2e39] text-xs space-y-2">
                <div className="flex justify-between text-[#787b86]">
                  <span>Minimum Deposit:</span>
                  <span className="text-white font-semibold">{broker.minDeposit}</span>
                </div>
                <div className="flex justify-between text-[#787b86]">
                  <span>Leverage / Margin:</span>
                  <span className="text-white font-semibold">{broker.leverage}</span>
                </div>
                <div className="flex justify-between text-[#787b86]">
                  <span>User Rating:</span>
                  <span className="text-amber-400 font-bold">★ {broker.rating} ({broker.ratingText})</span>
                </div>
              </div>

              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full py-3 rounded-xl bg-[#2962ff] hover:bg-blue-600 active:scale-98 text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isConnecting ? (
                  <span>Connecting to {broker.name}...</span>
                ) : (
                  <>
                    <span>Connect {accountType === 'demo' ? 'Free Demo' : 'Live'} Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
