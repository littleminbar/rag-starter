import React, { useState } from 'react';
import { Search, Globe, User, Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenSpaceStory: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenAuth }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = ['EN', 'ES', 'DE', 'FR', 'JA', 'ZH'];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-[#1f232f]">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left side: TV Geometric Logo and Primary Navigation */}
        <div className="flex items-center space-x-7 shrink-0">
          {/* TradingView Logo Symbol */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="TradingView Home"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <svg
              className="w-9 h-7 text-white fill-current transition-transform group-hover:scale-105"
              viewBox="0 0 36 28"
            >
              <path d="M14 22H7V6h7v16zm15-16h-7v9h7V6zm-7 11h-7v5h7v-5z" />
            </svg>
          </button>

          {/* Main Search Bar (Ctrl+K) */}
          <div className="relative hidden md:flex items-center">
            <button
              onClick={onOpenSearch}
              className="flex items-center justify-between w-64 lg:w-72 h-10 px-3.5 bg-[#1e222d]/70 hover:bg-[#1e222d] border border-[#2a2e39] rounded-full text-sm text-[#787b86] hover:text-[#f0f3fa] transition-all duration-150 cursor-pointer"
              type="button"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-[#787b86]" />
                <span>Search (Ctrl+K)</span>
              </div>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[11px] font-mono font-medium text-[#787b86] bg-[#131722] rounded border border-[#363a45]">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-[15px] font-medium text-[#f0f3fa]">
            <button
              onClick={() => scrollToSection('supercharts')}
              className="hover:text-[#2962ff] transition-colors py-2 cursor-pointer"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('community')}
              className="hover:text-[#2962ff] transition-colors py-2 cursor-pointer"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection('markets')}
              className="hover:text-[#2962ff] transition-colors py-2 cursor-pointer"
            >
              Markets
            </button>
            <button
              onClick={() => scrollToSection('brokers')}
              className="hover:text-[#2962ff] transition-colors py-2 cursor-pointer"
            >
              Brokers
            </button>
            <button
              onClick={() => scrollToSection('supercharts')}
              className="text-[#787b86] hover:text-white transition-colors py-2 cursor-pointer"
            >
              More
            </button>
          </nav>
        </div>

        {/* Right controls: Locale, Profile, Vibrant CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Quick search button for mobile */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-full hover:bg-[#131722] text-[#787b86] hover:text-white transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language selector */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full hover:bg-[#131722] text-[#f0f3fa] text-sm font-semibold transition-colors cursor-pointer"
              title="Change Language"
              type="button"
            >
              <Globe className="w-4 h-4 text-[#787b86]" />
              <span className="text-xs font-bold tracking-wider">{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-[#787b86]" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#131722] border border-[#2a2e39] rounded-lg shadow-xl py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-[#1e222d] transition-colors flex items-center justify-between ${
                      currentLang === lang ? 'text-[#2962ff]' : 'text-neutral-300'
                    }`}
                  >
                    <span>{lang === 'EN' ? 'English' : lang === 'ES' ? 'Español' : lang === 'DE' ? 'Deutsch' : lang === 'FR' ? 'Français' : lang === 'JA' ? '日本語' : '中文'}</span>
                    <span className="text-[10px] text-[#787b86]">{lang}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile Icon */}
          <button
            onClick={() => onOpenAuth('login')}
            aria-label="User Account"
            className="p-2 rounded-full hover:bg-[#131722] text-[#787b86] hover:text-white transition-colors cursor-pointer"
            type="button"
          >
            <User className="w-5 h-5" />
          </button>

          {/* High-Impact Get Started Blue-Purple Gradient CTA */}
          <button
            onClick={() => onOpenAuth('signup')}
            className="relative group inline-flex items-center justify-center px-4 sm:px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#1952e8] via-[#2962ff] to-[#7928ca] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(41,98,255,0.4)] cursor-pointer"
          >
            <span>Get started</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#787b86] hover:text-white hover:bg-[#131722] transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#1f232f] bg-[#090a0d] px-4 py-4 space-y-3">
          <button
            onClick={() => scrollToSection('supercharts')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#131722] text-[#f0f3fa] font-medium"
          >
            Products
          </button>
          <button
            onClick={() => scrollToSection('community')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#131722] text-[#f0f3fa] font-medium"
          >
            Community Ideas
          </button>
          <button
            onClick={() => scrollToSection('markets')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#131722] text-[#f0f3fa] font-medium"
          >
            Markets & Movers
          </button>
          <button
            onClick={() => scrollToSection('brokers')}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#131722] text-[#f0f3fa] font-medium"
          >
            Brokers & Integrations
          </button>
          <div className="pt-2 border-t border-[#1f232f] flex items-center justify-between text-xs text-[#787b86]">
            <span>Language: {currentLang}</span>
            <button
              onClick={() => onOpenAuth('login')}
              className="text-[#2962ff] font-semibold"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
