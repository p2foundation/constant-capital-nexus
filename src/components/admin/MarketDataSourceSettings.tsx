import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Settings, Database, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface MarketDataSourceSettingsProps {
  onDataSourceChange?: (source: string) => void;
}

export default function MarketDataSourceSettings({ onDataSourceChange }: MarketDataSourceSettingsProps) {
  const [currentSource, setCurrentSource] = useState<string>('manual');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<string | null>(null);
  const [autoSync, setAutoSync] = useState(false);

  // Load current settings on component mount
  useEffect(() => {
    loadCurrentSettings();
  }, []);

  const loadCurrentSettings = async () => {
    try {
      setIsLoading(true);
      
      // Get market data source setting
      const { data: sourceData } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'market_data_source')
        .single();

      if (sourceData?.value) {
        setCurrentSource(sourceData.value as string);
      }

      // Get auto sync setting
      const { data: autoSyncData } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'market_data_auto_sync')
        .single();

      if (autoSyncData?.value) {
        setAutoSync(autoSyncData.value as boolean);
      }

      // Get last fetch time
      const { data: lastFetchData } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'market_data_last_fetch')
        .single();

      if (lastFetchData?.value) {
        setLastFetchTime(lastFetchData.value as string);
      }

    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSourceChange = async (newSource: string) => {
    try {
      setIsLoading(true);
      
      // Update setting in database
      const { error } = await supabase
        .from('settings')
        .upsert({
          key: 'market_data_source',
          value: newSource
        });

      if (error) throw error;

      setCurrentSource(newSource);
      onDataSourceChange?.(newSource);
      toast.success(`Market data source updated to ${getSourceDisplayName(newSource)}`);
      
    } catch (error) {
      console.error('Error updating source:', error);
      toast.error('Failed to update market data source');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualFetch = async () => {
    if (currentSource === 'manual') {
      toast.info('Manual mode selected - no external data to fetch');
      return;
    }

    try {
      setIsFetching(true);
      
      console.log(`Fetching data from ${currentSource}...`);
      
      const { data, error } = await supabase.functions.invoke('fetch-market-data', {
        body: { dataSource: currentSource }
      });

      if (error) throw error;

      if (data?.success) {
        // Update last fetch time
        await supabase
          .from('settings')
          .upsert({
            key: 'market_data_last_fetch',
            value: new Date().toISOString()
          });

        setLastFetchTime(new Date().toISOString());
        toast.success(`Successfully fetched ${data.recordCount || 0} records from ${getSourceDisplayName(currentSource)}`);
        
        // Trigger data refresh in parent components
        onDataSourceChange?.(currentSource);
      } else {
        throw new Error(data?.error || 'Unknown error occurred');
      }
      
    } catch (error) {
      console.error('Error fetching market data:', error);
      toast.error(`Failed to fetch data: ${error.message}`);
    } finally {
      setIsFetching(false);
    }
  };

  const toggleAutoSync = async () => {
    try {
      const newAutoSync = !autoSync;
      
      const { error } = await supabase
        .from('settings')
        .upsert({
          key: 'market_data_auto_sync',
          value: newAutoSync
        });

      if (error) throw error;

      setAutoSync(newAutoSync);
      toast.success(`Auto-sync ${newAutoSync ? 'enabled' : 'disabled'}`);
      
    } catch (error) {
      console.error('Error updating auto-sync:', error);
      toast.error('Failed to update auto-sync setting');
    }
  };

  const getSourceDisplayName = (source: string) => {
    switch (source) {
      case 'financial_modeling_prep':
        return 'Financial Modeling Prep';
      case 'yahoo_finance':
        return 'Yahoo Finance';
      case 'gse_official':
        return 'GSE Official API';
      case 'manual':
        return 'Manual Entry';
      default:
        return source;
    }
  };

  const getSourceDescription = (source: string) => {
    switch (source) {
      case 'financial_modeling_prep':
        return 'Professional financial data with real-time updates and comprehensive market coverage';
      case 'yahoo_finance':
        return 'Free financial data service with good coverage of major markets and currencies';
      case 'gse_official':
        return 'Official Ghana Stock Exchange data with real-time quotes and comprehensive market coverage';
      case 'manual':
        return 'Manual data entry by admin users with full control over all market data';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading settings...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Market Data Source Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Current Status */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="text-sm font-medium">Current Source:</span>
          </div>
          <Badge variant={currentSource === 'manual' ? 'secondary' : 'default'}>
            {getSourceDisplayName(currentSource)}
          </Badge>
          {autoSync && currentSource !== 'manual' && (
            <Badge variant="outline" className="text-green-600">
              Auto-sync ON
            </Badge>
          )}
        </div>

        {/* Source Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Data Source</label>
          <Select value={currentSource} onValueChange={handleSourceChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select data source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Manual Entry
                </div>
              </SelectItem>
              <SelectItem value="financial_modeling_prep">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Financial Modeling Prep
                </div>
              </SelectItem>
              <SelectItem value="yahoo_finance">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Yahoo Finance
                </div>
              </SelectItem>
              <SelectItem value="gse_official">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  GSE Official API
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getSourceDescription(currentSource)}
          </p>
        </div>

        {/* Actions */}
        {currentSource !== 'manual' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleManualFetch}
                disabled={isFetching}
                className="flex items-center gap-2"
              >
                {isFetching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Fetch Data Now
              </Button>
              
              <Button 
                variant="outline" 
                onClick={toggleAutoSync}
                className="flex items-center gap-2"
              >
                {autoSync ? 'Disable' : 'Enable'} Auto-sync
              </Button>
            </div>

            {lastFetchTime && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last fetch: {new Date(lastFetchTime).toLocaleString()}
              </p>
            )}
          </div>
        )}

        {/* Manual Mode Info */}
        {currentSource === 'manual' && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Manual Mode:</strong> All market data will be managed through the admin interface. 
              Use the Market Data tab to add, edit, or delete data points manually.
            </p>
          </div>
        )}

        {/* API Mode Info */}
        {currentSource !== 'manual' && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>API Mode:</strong> Data is automatically fetched from {getSourceDisplayName(currentSource)}. 
              You can still override individual data points manually through the Market Data tab.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}