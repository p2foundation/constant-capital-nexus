
// Define types for our market data
export interface MarketDataPoint {
  id: string;
  date: string;
  data_type: string;
  value: number;
  change_percent?: number | null;
  ticker_symbol?: string | null;
  additional_data?: any;
}

export type MarketDataByType = {
  gse: MarketDataPoint[];
  equities: MarketDataPoint[];
  fixedIncome: MarketDataPoint[];
  eurobonds: MarketDataPoint[];
  fx: MarketDataPoint[];
};

export interface LatestMarketData {
  gse?: MarketDataPoint;
  equities?: Record<string, MarketDataPoint>;
  fixedIncome?: Record<string, MarketDataPoint>;
  eurobonds?: Record<string, MarketDataPoint>;
  fx?: Record<string, MarketDataPoint>;
}

export interface MarketDataContextType {
  marketData: MarketDataByType;
  latestData: LatestMarketData;
  isLoading: boolean;
  error?: Error | null;
  refreshMarketData: () => Promise<void>;
}
