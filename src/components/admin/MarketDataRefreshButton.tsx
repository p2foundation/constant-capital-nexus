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
      const { data: sourceData, error: sourceError } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'market_data_source')
        .maybeSingle();
      if (sourceError) throw sourceError;
      
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
        await supabase.from('settings').upsert({ key: 'market_data_last_fetch', value: new Date().toISOString() });
        toast.success(`Live Ghana sources synchronized: ${data.recordCount || 0} records received`);
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