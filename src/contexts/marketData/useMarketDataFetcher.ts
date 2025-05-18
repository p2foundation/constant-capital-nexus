
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MarketDataByType } from './types';

// Hook for fetching market data
export const useMarketDataFetcher = () => {
  const [marketData, setMarketData] = useState<MarketDataByType>({
    gse: [],
    equities: [],
    fixedIncome: [],
    eurobonds: [],
    fx: []
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch market data from database
  const fetchMarketData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
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
      const newData = {
        gse: gseData || [],
        equities: equitiesData || [],
        fixedIncome: fixedIncomeData || [],
        eurobonds: eurobondsData || [],
        fx: fxData || []
      };
      
      setMarketData(newData);
    } catch (error) {
      console.error('Error fetching market data:', error);
      setError(error instanceof Error ? error : new Error('Failed to load market data'));
      toast.error('Failed to load market data');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    marketData,
    isLoading,
    error,
    fetchMarketData
  };
};
