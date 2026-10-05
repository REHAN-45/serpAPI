export interface ProductInput {
  product: string;
  city: string;
  sellingPrice: number;
  costPrice?: number;
  language?: 'en' | 'hi';
  forceRefresh?: boolean;
}

export interface CompetitorItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  merchant: string;
  link?: string;
  rating?: number;
  reviewsCount?: number;
  deliveryInfo?: string;
  unitExtracted?: string;
  badge?: string;
}

export interface LocalBusiness {
  id: string;
  name: string;
  type: 'Wholesaler' | 'Distributor' | 'Mandi' | 'Trader' | 'Retail Supplier';
  address: string;
  area?: string;
  distanceEstimate?: string;
  rating?: number;
  reviewsCount?: number;
  phone?: string;
  verifiedSourcingLead: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  snippet: string;
  date: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral' | 'Supply Shock' | 'Policy/GST';
  link?: string;
}

export interface FinanceSignal {
  signalName: string;
  currentMetric: string;
  changeText: string;
  category: 'Commodity' | 'Currency' | 'Inflation' | 'Tariff/GST';
  impact: 'Bullish' | 'Bearish' | 'Neutral';
  explanation: string;
}

export interface MarketStatistics {
  minPrice: number;
  maxPrice: number;
  medianPrice: number;
  meanPrice: number;
  p25: number;
  p75: number;
  priceGapVsMedian: number; // percentage, e.g. +10.8 or -4.5
  priceGapVsMin: number;
  sellerMarginPercent?: number; // e.g. 24.5%
  marketMarginPercent?: number;
  competitorsFoundCount: number;
}

export interface LocalSourcingSignal {
  level: 'High' | 'Medium' | 'Low';
  title: string;
  summary: string;
  verifiedCount: number;
  topSourcingHub?: string;
}

export interface ExternalRiskSignal {
  level: 'High' | 'Medium' | 'Low';
  title: string;
  summary: string;
  keyDrivers: string[];
}

export interface Recommendation {
  action: 'Review Price' | 'Hold & Defend Margin' | 'Opportunity to Increase' | 'Source Cheaper Locally' | 'Urgent Restock Action';
  actionType: 'warning' | 'positive' | 'neutral' | 'urgent';
  headline: string;
  detailedAdvice: string;
  hindiSummary: string;
  confidence: 'High' | 'Medium' | 'Low';
  confidenceReason: string;
  suggestedPriceRange: {
    min: number;
    target: number;
    max: number;
  };
}

export interface BudgetStats {
  searchesUsed: number;
  isCached: boolean;
  cacheExpiresInMinutes: number;
  engineBreakdown: {
    shopping: number;
    local: number;
    news: number;
    finance: number;
  };
  totalSessionSearches: number;
  remainingSearchBudget: number;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  query: ProductInput;
  normalized: {
    product: string;
    city: string;
    unit: string;
    brand: string;
    category: string;
  };
  stats: MarketStatistics;
  localSourcing: LocalSourcingSignal;
  externalRisk: ExternalRiskSignal;
  recommendation: Recommendation;
  evidence: {
    shopping: CompetitorItem[];
    local: LocalBusiness[];
    news: NewsItem[];
    finance: FinanceSignal;
  };
  budget: BudgetStats;
}
