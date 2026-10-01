import React from 'react';

interface FooterProps {
  onOpenSpaceMission: () => void;
  onLinkClick: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSpaceMission, onLinkClick }) => {
  return (
    <footer className="bg-black border-t border-[#2a2e39] pt-16 pb-12 text-sm text-[#787b86]">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        {/* Top Brand Statement & Socials */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-[#1f232f] gap-6">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-6 text-white fill-current" viewBox="0 0 36 28">
              <path d="M14 22H7V6h7v16zm15-16h-7v9h7V6zm-7 11h-7v5h7v-5z" />
            </svg>
            <span className="text-white font-bold tracking-tight">Made by humans</span>
          </div>

          {/* Social Channels Icons (X, YouTube, Telegram, Reddit) */}
          <div className="flex items-center space-x-5 text-[#787b86]">
            <a
              aria-label="X / Twitter"
              className="hover:text-white transition-colors"
              href="https://x.com/tradingview"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              aria-label="YouTube"
              className="hover:text-white transition-colors"
              href="https://youtube.com/@TradingView"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              aria-label="Telegram"
              className="hover:text-white transition-colors"
              href="https://t.me/tradingview"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
              </svg>
            </a>
            <a
              aria-label="Reddit"
              className="hover:text-white transition-colors"
              href="https://reddit.com/r/TradingView"
              target="_blank"
              rel="noreferrer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer Columns Extracted from Document */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-12">
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Products</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onLinkClick('Supercharts')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Supercharts
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Stock Screener')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Stock Screener
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('ETF Screener')} className="hover:text-white transition-colors cursor-pointer text-left">
                  ETF Screener
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Crypto Coins')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Crypto Coins
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Heatmaps')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Heatmaps
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Pine Script®')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Pine Script®
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onLinkClick('Social Network')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Social Network
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Trading Ideas')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Trading Ideas
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Indicators & Strategies')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Indicators & Strategies
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Wall of Love')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Wall of Love
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('House Rules')} className="hover:text-white transition-colors cursor-pointer text-left">
                  House Rules
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Markets</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onLinkClick('US Stocks')} className="hover:text-white transition-colors cursor-pointer text-left">
                  US Stocks
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Cryptocurrencies')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Cryptocurrencies
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Currencies & Forex')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Currencies & Forex
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Futures & Commodities')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Futures & Commodities
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Economic Calendar')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Economic Calendar
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onLinkClick('About Us')} className="hover:text-white transition-colors cursor-pointer text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={onOpenSpaceMission} className="hover:text-white text-[#2962ff] font-medium transition-colors cursor-pointer text-left flex items-center gap-1">
                  <span>Space Mission</span>
                  <span className="text-[10px] bg-blue-500/20 px-1 rounded">Polaris</span>
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Careers')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Company Blog')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Company Blog
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('TradingView Store')} className="hover:text-white transition-colors cursor-pointer text-left">
                  TradingView Store
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">For Business</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onLinkClick('Free Widgets')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Free Widgets
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Charting Libraries')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Charting Libraries
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Lightweight Charts™')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Lightweight Charts™
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Broker Integration')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Broker Integration
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Advertising Info')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Advertising Info
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Policies</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onLinkClick('Terms of Use')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Terms of Use
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Privacy Policy')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Financial Disclaimer')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Financial Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Cookies Policy')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Cookies Policy
                </button>
              </li>
              <li>
                <button onClick={() => onLinkClick('Security Tips')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Security Tips
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal and Data Provider Footnotes */}
        <div className="pt-8 border-t border-[#1f232f] text-[11px] leading-relaxed text-[#787b86] flex flex-col md:flex-row justify-between gap-4">
          <div>
            Select market data provided by ICE Data Services. Reference data provided by FactSet. Copyright © 2026 FactSet Research Systems Inc. CUSIP Database provided by FactSet. SEC filings provided by Quartr.
          </div>
          <div className="shrink-0 text-[#787b86]">
            © 2026 TradingView, Inc.
          </div>
        </div>
      </div>
    </footer>
  );
};
