
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

interface MarketDataContextType {
  marketData: MarketDataByType;
  latestData: {
    gse?: MarketDataPoint;
    equities?: Record<string, MarketDataPoint>;
    fixedIncome?: Record<string, MarketDataPoint>;
    eurobonds?: Record<string, MarketDataPoint>;
    fx?: Record<string, MarketDataPoint>;
  };
  isLoading: boolean;
  refreshMarketData: () => Promise<void>;
}

const MarketDataContext = createContext<MarketDataContextType | undefined>(undefined);

export const MarketDataProvider = ({ children }: { children: ReactNode }) => {
  const [marketData, setMarketData] = useState<MarketDataByType>({
    gse: [],
    equities: [],
    fixedIncome: [],
    eurobonds: [],
    fx: []
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Format latest data for easy access
  const latestData = {
    gse: marketData.gse[marketData.gse.length - 1],
    equities: marketData.equities.reduce((acc, item) => {
      if (item.ticker_symbol) {
        acc[item.ticker_symbol] = item;
      }
      return acc;
    }, {} as Record<string, MarketDataPoint>),
    fixedIncome: marketData.fixedIncome.reduce((acc, item) => {
      if (item.ticker_symbol) {
        acc[item.ticker_symbol] = item;
      }
      return acc;
    }, {} as Record<string, MarketDataPoint>),
    eurobonds: marketData.eurobonds.reduce((acc, item) => {
      if (item.ticker_symbol) {
        acc[item.ticker_symbol] = item;
      }
      return acc;
    }, {} as Record<string, MarketDataPoint>),
    fx: marketData.fx.reduce((acc, item) => {
      if (item.ticker_symbol) {
        acc[item.ticker_symbol] = item;
      }
      return acc;
    }, {} as Record<string, MarketDataPoint>),
  };

  // Fetch market data from database
  const fetchMarketData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch GSE index data
      const { data: gseData, error: gseError } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'gse')
        .order('date', { ascending: true });
      
      if (gseError) throw gseError;
      
      // Fetch equities data
      const { data: equitiesData, error: equitiesError } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'equity')
        .order('date', { ascending: true });
      
      if (equitiesError) throw equitiesError;
      
      // Fetch fixed income data
      const { data: fixedIncomeData, error: fixedIncomeError } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'fixed_income')
        .order('date', { ascending: true });
      
      if (fixedIncomeError) throw fixedIncomeError;
      
      // Fetch eurobonds data
      const { data: eurobondsData, error: eurobondsError } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'eurobond')
        .order('date', { ascending: true });
      
      if (eurobondsError) throw eurobondsError;
      
      // Fetch FX data
      const { data: fxData, error: fxError } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'fx')
        .order('date', { ascending: true });
      
      if (fxError) throw fxError;
      
      // Update state with fetched data
      setMarketData({
        gse: gseData || [],
        equities: equitiesData || [],
        fixedIncome: fixedIncomeData || [],
        eurobonds: eurobondsData || [],
        fx: fxData || []
      });
    } catch (error) {
      console.error('Error fetching market data:', error);
      toast.error('Failed to load market data');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <MarketDataContext.Provider value={{ 
      marketData, 
      latestData, 
      isLoading, 
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
