import React, { useState } from 'react';
import { X, Mail, CheckCircle2, Lock, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signup',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      onSuccess(email);
      onClose();
    }, 1000);
  };

  const handleGuestDemo = () => {
    onSuccess('demo_trader@tradingview.com');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#131722] border border-[#2a2e39] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2a2e39] bg-[#0e111a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-7 h-5 text-white fill-current" viewBox="0 0 36 28">
              <path d="M14 22H7V6h7v16zm15-16h-7v9h7V6zm-7 11h-7v5h7v-5z" />
            </svg>
            <span className="font-extrabold text-white text-base">
              {mode === 'signup' ? 'Get started for free' : 'Welcome back'}
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
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#089981] mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-white">Welcome to TradingView</h3>
              <p className="text-xs text-[#787b86]">Connecting to your market terminal...</p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="text-xs text-[#787b86]">
                  {mode === 'signup'
                    ? 'Join 100 million traders and investors taking the future into their own hands.'
                    : 'Log in to sync your watchlists, custom indicators, and alerts.'}
                </p>
              </div>

              {/* Social Logins */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleGuestDemo}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleGuestDemo}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1e222d] hover:bg-[#2a2e39] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>🚀 Instant Guest Demo (No signup needed)</span>
                </button>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#2a2e39]"></div>
                <span className="flex-shrink mx-3 text-[11px] text-[#787b86]">or with email</span>
                <div className="flex-grow border-t border-[#2a2e39]"></div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] text-[#787b86] block mb-1">Email address</label>
                  <div className="flex items-center bg-[#0e111a] border border-[#2a2e39] rounded-lg px-3 py-2 text-xs">
                    <Mail className="w-4 h-4 text-[#787b86] mr-2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="trader@markets.com"
                      className="bg-transparent flex-1 text-white outline-none placeholder-[#787b86]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#787b86] block mb-1">Password</label>
                  <div className="flex items-center bg-[#0e111a] border border-[#2a2e39] rounded-lg px-3 py-2 text-xs">
                    <Lock className="w-4 h-4 text-[#787b86] mr-2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="bg-transparent flex-1 text-white outline-none placeholder-[#787b86]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#2962ff] hover:bg-blue-600 text-white font-bold text-xs transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{mode === 'signup' ? 'Create Free Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center text-xs text-[#787b86] pt-1">
                {mode === 'signup' ? (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-[#2962ff] hover:underline font-semibold cursor-pointer"
                    >
                      Sign In
                    </button>
                  </span>
                ) : (
                  <span>
                    New to TradingView?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-[#2962ff] hover:underline font-semibold cursor-pointer"
                    >
                      Create Account
                    </button>
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
