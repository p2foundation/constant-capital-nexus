
import { MarketDataByType } from '@/contexts/marketData/types';
import { getLatestDataPoints, getMostRecentDataPoint } from '../utils';

/**
 * Get latest fixed income data points sorted by date
 */
export const getLatestFixedIncome = (marketData: MarketDataByType) => {
  const instruments = ['91-day', '182-day', '364-day'];
  return getLatestDataPoints(marketData.fixedIncome, instruments);
};

/**
 * Get latest FX data points sorted by date
 */
export const getLatestFX = (marketData: MarketDataByType) => {
  const currencies = ['USD', 'EUR', 'GBP'];
  return getLatestDataPoints(marketData.fx, currencies);
};

/**
 * Get latest Eurobonds data points sorted by date
 */
export const getLatestEurobonds = (marketData: MarketDataByType) => {
  const bonds = ['Ghana-2029', 'Nigeria-2032', 'Kenya-2031', 'Ghana-2030'];
  return getLatestDataPoints(marketData.eurobonds, bonds);
};

/**
 * Get latest GSE index value
 */
export const getLatestGSE = (marketData: MarketDataByType) => {
  return getMostRecentDataPoint(marketData.gse);
};

/**
 * Get latest equities data points for major companies
 */
export const getLatestEquities = (marketData: MarketDataByType) => {
  const companies = ['GCB', 'SCB', 'ETI', 'MTNGH', 'TOTAL'];
  return getLatestDataPoints(marketData.equities, companies);
};
