
import { MarketDataByType, MarketDataPoint, LatestMarketData } from './types';

// Helper function to get latest data points grouped by ticker symbol
export const getLatestData = (data: MarketDataByType): LatestMarketData => {
  // Get the latest GSE data point
  const latestGSE = data.gse.length > 0 
    ? [...data.gse].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : undefined;
  
  // Group latest equity data by ticker symbol
  const latestEquities: Record<string, MarketDataPoint> = {};
  const equitiesBySymbol = groupDataBySymbol(data.equities);
  
  // For each symbol, get the latest data point
  equitiesBySymbol.forEach((items, symbol) => {
    const sorted = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (sorted.length > 0) {
      latestEquities[symbol] = sorted[0];
    }
  });
  
  // Do the same for fixed income, eurobonds and FX
  const latestFixedIncome: Record<string, MarketDataPoint> = {};
  const fixedIncomeBySymbol = groupDataBySymbol(data.fixedIncome);
  
  fixedIncomeBySymbol.forEach((items, symbol) => {
    const sorted = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (sorted.length > 0) {
      latestFixedIncome[symbol] = sorted[0];
    }
  });
  
  const latestEurobonds: Record<string, MarketDataPoint> = {};
  const eurobondsBySymbol = groupDataBySymbol(data.eurobonds);
  
  eurobondsBySymbol.forEach((items, symbol) => {
    const sorted = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (sorted.length > 0) {
      latestEurobonds[symbol] = sorted[0];
    }
  });
  
  const latestFX: Record<string, MarketDataPoint> = {};
  const fxBySymbol = groupDataBySymbol(data.fx);
  
  fxBySymbol.forEach((items, symbol) => {
    const sorted = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (sorted.length > 0) {
      latestFX[symbol] = sorted[0];
    }
  });
  
  // Log the latest data to help with debugging
  console.log("Latest market data processed:", {
    gse: latestGSE,
    equities: latestEquities,
    fixedIncome: latestFixedIncome,
    eurobonds: latestEurobonds,
    fx: latestFX
  });
  
  return {
    gse: latestGSE,
    equities: latestEquities,
    fixedIncome: latestFixedIncome,
    eurobonds: latestEurobonds,
    fx: latestFX
  };
};

// Helper function to group data by ticker symbol
const groupDataBySymbol = (dataItems: MarketDataPoint[]): Map<string, MarketDataPoint[]> => {
  const dataBySymbol = new Map<string, MarketDataPoint[]>();
  
  dataItems.forEach(item => {
    if (!item.ticker_symbol) return;
    
    if (!dataBySymbol.has(item.ticker_symbol)) {
      dataBySymbol.set(item.ticker_symbol, []);
    }
    dataBySymbol.get(item.ticker_symbol)?.push(item);
  });
  
  return dataBySymbol;
};
