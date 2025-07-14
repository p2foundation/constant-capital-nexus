export interface MarketDataRecord {
  data_type: string;
  date: string;
  ticker_symbol?: string;
  value: number;
  change_percent?: number;
  additional_data?: any;
}

export interface EquityData {
  symbol: string;
  price: number;
  change: number;
  sector: string;
}

export interface BondData {
  symbol: string;
  yield: number;
  change: number;
  maturity: string;
}

export interface FXRate {
  symbol: string;
  rate: number;
  change: number;
}

export interface TreasuryBill {
  symbol: string;
  rate: number;
  change: number;
}