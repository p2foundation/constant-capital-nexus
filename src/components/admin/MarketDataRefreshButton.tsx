import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface MarketDataRefreshButtonProps {
  onRefresh?: () => void;
}

export default function MarketDataRefreshButton({ onRefresh }: MarketDataRefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      
      // Get current data source setting
      const { data: sourceData } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'market_data_source')
        .single();
      
      const dataSource = sourceData?.value as string || 'manual';
      
      if (dataSource === 'manual') {
        toast.info('Manual mode - refreshing cached data only');
        onRefresh?.();
        return;
      }

      console.log(`Refreshing data from ${dataSource}...`);
      
      const { data, error } = await supabase.functions.invoke('fetch-market-data', {
        body: { dataSource }
      });

      if (error) throw error;

      if (data?.success) {
        toast.success(`Data refreshed successfully from ${dataSource === 'financial_modeling_prep' ? 'Financial Modeling Prep' : 'Yahoo Finance'}`);
        onRefresh?.();
      } else {
        throw new Error(data?.error || 'Refresh failed');
      }
      
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast.error(`Failed to refresh data: ${error.message}`);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="flex items-center gap-2"
    >
      {isRefreshing ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <RefreshCw className="h-4 w-4" />
      )}
      Refresh Data
    </Button>
  );
}