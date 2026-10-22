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
  compact?: boolean;
}

export default function MarketDataSourceSettings({ onDataSourceChange, compact = false }: MarketDataSourceSettingsProps) {
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
      const { data: sourceData, error: sourceError } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'market_data_source')
        .maybeSingle();
      if (sourceError) throw sourceError;

      if (sourceData?.value) {
        setCurrentSource(sourceData.value as string);
      }

      // Get auto sync setting
      const { data: autoSyncData, error: autoSyncError } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'market_data_auto_sync')
        .maybeSingle();
      if (autoSyncError) throw autoSyncError;

      if (autoSyncData?.value) {
        setAutoSync(autoSyncData.value as boolean);
      }

      // Get last fetch time
      const { data: lastFetchData, error: lastFetchError } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'market_data_last_fetch')
        .maybeSingle();
      if (lastFetchError) throw lastFetchError;

      if (lastFetchData?.value) {
        setLastFetchTime(lastFetchData.value as string);
      }

    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Could not load market source settings');
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

  const getSourceDisplayName = (source: string) =>
    source === 'manual' ? 'Manual Entry' : 'Live Ghana sources';

  const getSourceDescription = (source: string) =>
    source === 'manual'
      ? 'Manual data entry by admin users with full control over all market data'
      : 'Real published figures: GSE share prices and GSE-CI (Ghana Stock Exchange), T-bill rates (Bank of Ghana), cedi rates (ExchangeRate-API). Eurobond yields have no free live source and must be entered manually.';

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
    <Card className={compact ? 'shadow-sm' : undefined}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          {compact ? 'Data source control' : 'Market Data Source Settings'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Current Status */}
        <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="text-sm font-medium">Current Source:</span>
          </div>
          <Badge variant={currentSource === 'manual' ? 'secondary' : 'default'}>
            {getSourceDisplayName(currentSource)}
          </Badge>
          {autoSync && currentSource !== 'manual' && (
            <Badge variant="outline" className="text-primary">
              Auto-sync ON
            </Badge>
          )}
        </div>

        {/* Source Selection */}
        <div className={compact ? 'grid gap-4 lg:grid-cols-[minmax(240px,0.8fr)_1.2fr]' : 'space-y-3'}>
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
              <SelectItem value="gse_official">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Live Ghana sources (GSE, Bank of Ghana)
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          </div>
          <p className="text-sm text-muted-foreground">
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
              <p className="text-sm text-muted-foreground">
                Last fetch: {new Date(lastFetchTime).toLocaleString()}
              </p>
            )}
          </div>
        )}

        {/* Manual Mode Info */}
        {currentSource === 'manual' && (
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Manual Mode:</strong> All market data will be managed through the admin interface. 
              Use the Market Data tab to add, edit, or delete data points manually.
            </p>
          </div>
        )}

        {/* API Mode Info */}
        {currentSource !== 'manual' && (
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Hybrid Mode:</strong> With auto-sync on, prices are fetched from {getSourceDisplayName(currentSource)} every
              hour, 9am–5pm on weekdays. Anything you enter or upload in the Market Data tab is treated as a manual
              correction and is never overwritten by the automatic feed.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}