
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { MarketDataContextType } from './types';
import { getLatestData } from './utils';
import { useMarketDataFetcher } from './useMarketDataFetcher';

const MarketDataContext = createContext<MarketDataContextType | undefined>(undefined);

export const MarketDataProvider = ({ children }: { children: ReactNode }) => {
  const { marketData, isLoading, error, fetchMarketData } = useMarketDataFetcher();
  
  // Format latest data for easy access
  const latestData = getLatestData(marketData);

  // Initial data fetch
  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <MarketDataContext.Provider value={{ 
      marketData, 
      latestData, 
      isLoading,
      error,
      refreshMarketData: fetchMarketData 
    }}>
      {children}
    </MarketDataContext.Provider>
  );
};

export const useMarketData = () => {
  const context = useContext(MarketDataContext);
  if (context === undefined) {
    throw new Error('useMarketData must be used within a MarketDataProvider');
  }
  return context;
};
