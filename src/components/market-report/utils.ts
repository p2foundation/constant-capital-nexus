
import { format } from 'date-fns';
import { MarketDataByType, MarketDataPoint } from '@/contexts/marketData/types';

export const getReportDate = (marketData: any): string => {
  const today = new Date();
  
  const dates = [
    ...marketData.gse.map((item: any) => new Date(item.date)),
    ...marketData.fixedIncome.map((item: any) => new Date(item.date)),
    ...marketData.eurobonds.map((item: any) => new Date(item.date)),
    ...marketData.fx.map((item: any) => new Date(item.date))
  ];
  
  return dates.length > 0 
    ? format(new Date(Math.max(...dates.map(d => d.getTime()))), 'PPP') 
    : format(today, 'PPP');
};

/**
 * Generic function to get latest data points for a specific market data type
 */
export const getLatestDataPoints = <T extends MarketDataPoint>(
  dataPoints: T[], 
  tickerSymbols: string[]
): {
  name: string;
  value: number;
  change: number;
  isPositive: boolean;
}[] => {
  return tickerSymbols.map(symbol => {
    const dataPoint = dataPoints
      .filter((item) => item.ticker_symbol === symbol)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
    return {
      name: symbol,
      value: dataPoint?.value || 0,
      change: dataPoint?.change_percent || 0,
      isPositive: (dataPoint?.change_percent || 0) >= 0
    };
  });
};

/**
 * Format a number as a percentage with + sign for positive values
 */
export const formatPercentage = (value: number): string => {
  return (value >= 0 ? '+' : '') + value.toFixed(2) + '%';
};

/**
 * Get the most recent data point from a collection
 */
export const getMostRecentDataPoint = <T extends MarketDataPoint>(dataPoints: T[]): T | undefined => {
  if (dataPoints.length === 0) return undefined;
  
  return dataPoints.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
};
