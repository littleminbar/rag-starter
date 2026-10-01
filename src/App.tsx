/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { TickerMarquee } from './components/TickerMarquee';
import { Hero } from './components/Hero';
import { Supercharts } from './components/Supercharts';
import { CommunityIdeas } from './components/CommunityIdeas';
import { MarketMovers } from './components/MarketMovers';
import { Brokers } from './components/Brokers';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SpaceStoryModal } from './components/SpaceStoryModal';
import { FullChartModal } from './components/FullChartModal';
import { IdeaModal } from './components/IdeaModal';
import { BrokerModal } from './components/BrokerModal';
import { AuthModal } from './components/AuthModal';
import { IndexQuote, CommunityIdea, Broker } from './types';
import { INDICES_DATA, COMMUNITY_IDEAS, BROKERS } from './data/mockData';

export default function App() {
  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSpaceStoryOpen, setIsSpaceStoryOpen] = useState(false);
  const [isFullChartOpen, setIsFullChartOpen] = useState(false);
  const [selectedChartIndex, setSelectedChartIndex] = useState<IndexQuote>(INDICES_DATA[0]);
  const [selectedIdea, setSelectedIdea] = useState<CommunityIdea | null>(null);
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'signup',
  });

  // Active symbol code passed to Supercharts
  const [activeSymbolCode, setActiveSymbolCode] = useState<string>('NDX');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSelectSymbol = (symbol: string) => {
    setActiveSymbolCode(symbol);
    const match = INDICES_DATA.find((i) => i.code.toLowerCase() === symbol.toLowerCase());
    if (match) {
      setSelectedChartIndex(match);
    }
    showNotification(`Loaded ${symbol} into Supercharts`);
    const el = document.getElementById('supercharts');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenFullChart = (index: IndexQuote) => {
    setSelectedChartIndex(index);
    setIsFullChartOpen(true);
  };

  const handleOpenBroker = (broker: Broker) => {
    setSelectedBroker(broker);
  };

  const handleFooterLinkClick = (sectionName: string) => {
    showNotification(`Navigating to ${sectionName}...`);
    const superchartsEl = document.getElementById('supercharts');
    if (superchartsEl) {
      superchartsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#f0f3fa] font-sans antialiased selection:bg-[#2962ff] selection:text-white flex flex-col">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-[#131722] border border-[#2962ff] text-white text-xs font-semibold rounded-xl shadow-2xl animate-in slide-in-from-bottom duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2962ff] animate-ping" />
          <span>{notification}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode: mode || 'signup' })}
        onOpenSpaceStory={() => setIsSpaceStoryOpen(true)}
      />

      {/* Realtime Ticker Marquee */}
      <TickerMarquee onSelectTicker={handleSelectSymbol} />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onGetStarted={() => setAuthModal({ isOpen: true, mode: 'signup' })}
          onOpenSpaceStory={() => setIsSpaceStoryOpen(true)}
        />

        {/* Supercharts Live Preview */}
        <Supercharts
          activeSymbolCode={activeSymbolCode}
          onOpenFullChart={handleOpenFullChart}
          onExploreFeatures={() => {
            showNotification('Loading advanced technical analysis features...');
            handleOpenFullChart(selectedChartIndex);
          }}
        />

        {/* Community Ideas */}
        <CommunityIdeas
          onSelectIdea={(idea) => setSelectedIdea(idea)}
          onSeeAllIdeas={() => {
            setSelectedIdea(COMMUNITY_IDEAS[0]);
          }}
        />

        {/* Market Movers: Highest Volume US Stocks & Top Crypto Gainers */}
        <MarketMovers
          onSelectMover={handleSelectSymbol}
          onViewAllStocks={() => {
            showNotification('Showing all active US stocks');
            setIsSearchOpen(true);
          }}
          onViewAllCrypto={() => {
            showNotification('Showing all crypto gainers');
            setIsSearchOpen(true);
          }}
        />

        {/* Direct Broker Integration */}
        <Brokers onOpenBroker={handleOpenBroker} />
      </main>

      {/* Footer */}
      <Footer
        onOpenSpaceMission={() => setIsSpaceStoryOpen(true)}
        onLinkClick={handleFooterLinkClick}
      />

      {/* Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSymbol={handleSelectSymbol}
      />

      <SpaceStoryModal
        isOpen={isSpaceStoryOpen}
        onClose={() => setIsSpaceStoryOpen(false)}
      />

      <FullChartModal
        isOpen={isFullChartOpen}
        onClose={() => setIsFullChartOpen(false)}
        initialIndex={selectedChartIndex}
      />

      <IdeaModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
        onOpenInChart={(sym) => {
          setSelectedIdea(null);
          handleSelectSymbol(sym);
        }}
      />

      <BrokerModal
        broker={selectedBroker}
        onClose={() => setSelectedBroker(null)}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'signup' })}
        onSuccess={(email) => {
          showNotification(`Logged in as ${email}`);
        }}
      />
    </div>
  );
}
