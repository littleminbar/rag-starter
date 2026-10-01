export interface TickerItem {
  id: string;
  name: string;
  code: string;
  price: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
  prefix?: string;
  suffix?: string;
}

export interface IndexQuote {
  id: string;
  symbol: string;
  name: string;
  code: string;
  price: number;
  changePercent: number;
  isPositive: boolean;
  market: string;
  ema20: number;
  ema50: number;
  rsi: number;
  candles: Candle[];
}

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface CommunityIdea {
  id: string;
  symbol: string;
  category: 'forex' | 'crypto' | 'stocks' | 'commodities';
  direction: 'Long' | 'Short';
  title: string;
  description: string;
  author: string;
  authorInitial: string;
  authorColor: string;
  isEditorPick: boolean;
  trend: 'up' | 'down';
  likes: number;
  comments: number;
  published: string;
}

export interface MarketMover {
  symbol: string;
  name: string;
  price: number | string;
  changePercent: number;
  volumeOrRank: string;
  isPositive: boolean;
}

export interface Broker {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  rating: number;
  ratingText: string;
  description: string;
  minDeposit: string;
  leverage: string;
}
