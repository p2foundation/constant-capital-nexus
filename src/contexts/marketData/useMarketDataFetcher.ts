
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
      
      // Check if we should auto-fetch from external APIs
      const { data: sourceData } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'market_data_source')
        .single();
      
      const dataSource = sourceData?.value as string || 'manual';
      
      // If not manual mode, try to fetch fresh data from external API
      if (dataSource !== 'manual') {
        try {
          console.log(`Auto-fetching data from ${dataSource}...`);
          await supabase.functions.invoke('fetch-market-data', {
            body: { dataSource }
          });
        } catch (apiError) {
          console.warn('Auto-fetch failed, using cached data:', apiError);
          // Continue with database fetch even if API fails
        }
      }
      
      // Fetch GSE index data - using 'as any' to bypass TypeScript errors
      const { data: gseData, error: gseError } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'gse' as any)
        .order('date', { ascending: true });
      
      if (gseError) throw gseError;
      
      // Fetch equities data
      const { data: equitiesData, error: equitiesError } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'equity' as any)
        .order('date', { ascending: true });
      
      if (equitiesError) throw equitiesError;
      
      // Fetch fixed income data
      const { data: fixedIncomeData, error: fixedIncomeError } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'fixed_income' as any)
        .order('date', { ascending: true });
      
      if (fixedIncomeError) throw fixedIncomeError;
      
      // Fetch eurobonds data
      const { data: eurobondsData, error: eurobondsError } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'eurobond' as any)
        .order('date', { ascending: true });
      
      if (eurobondsError) throw eurobondsError;
      
      // Fetch FX data
      const { data: fxData, error: fxError } = await supabase
        .from('market_data')
        .select('*')
        .eq('data_type', 'fx' as any)
        .order('date', { ascending: true });
      
      if (fxError) throw fxError;
      
      // Update state with fetched data - using type assertion to convert Supabase results to MarketDataPoint[]
      setMarketData({
        gse: (gseData || []) as any,
        equities: (equitiesData || []) as any,
        fixedIncome: (fixedIncomeData || []) as any,
        eurobonds: (eurobondsData || []) as any,
        fx: (fxData || []) as any
      });
      
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
