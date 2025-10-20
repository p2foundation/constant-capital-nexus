
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import GSEChart from './market-data/GSEChart';
import FixedIncomeChart from './market-data/FixedIncomeChart';
import FXChart from './market-data/FXChart';
import EquitiesChart from './market-data/EquitiesChart';
import EurobondsChart from './market-data/EurobondsChart';
import { useMarketData } from '@/contexts/MarketDataContext';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const MarketData = () => {
  const { isLoading, error, latestData, refreshMarketData, marketData } = useMarketData();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Get the most recent data date
  const getLastUpdated = () => {
    const dates = [
      ...marketData.gse.map(item => new Date(item.date)),
      ...marketData.equities.map(item => new Date(item.date)),
      ...marketData.fixedIncome.map(item => new Date(item.date)),
      ...marketData.eurobonds.map(item => new Date(item.date)),
      ...marketData.fx.map(item => new Date(item.date))
    ].filter(date => !isNaN(date.getTime()));
    
    if (dates.length === 0) return null;
    
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    return maxDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const lastUpdated = getLastUpdated();
  const isDataStale = lastUpdated && new Date(lastUpdated).getTime() < Date.now() - 7 * 24 * 60 * 60 * 1000;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshMarketData();
      toast.success('Market data updated successfully');
    } catch (err) {
      toast.error('Failed to refresh market data');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Log any errors or data for debugging
  React.useEffect(() => {
    if (error) {
      console.error("Market data error:", error);
    }
    
    console.log("MarketData component - latest data:", latestData);
    console.log("MarketData component - Eurobonds:", latestData?.eurobonds);
    console.log("MarketData component - FX rates:", latestData?.fx);
  }, [error, latestData]);

  return (
    <div className="bg-white dark:bg-cc-navy/90 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-cc-navy dark:text-white mb-4">Market Data</h2>
          <p className="max-w-2xl text-gray-600 dark:text-gray-300">
            Track Ghanaian and West African market performance with our comprehensive data visualizations
          </p>
        </div>
        
        <Card className="border-gray-100 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-left dark:text-white">Market Performance</CardTitle>
                <CardDescription className="text-left dark:text-gray-300">
                  Track key market indicators across different asset classes
                  {lastUpdated && (
                    <span className={`block mt-1 text-sm ${isDataStale ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      Last updated: {lastUpdated}
                      {isDataStale && ' (Data may be outdated)'}
                    </span>
                  )}
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-cc-navy dark:text-white" />
                <p className="mt-4 text-gray-600 dark:text-gray-300">Loading market data...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-red-500">Error loading market data</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{error.message}</p>
              </div>
            ) : (
              <Tabs defaultValue="gse" className="w-full">
                <TabsList className="mb-6 flex flex-wrap">
                  <TabsTrigger value="gse">GSE Composite Index</TabsTrigger>
                  <TabsTrigger value="equities">Equities</TabsTrigger>
                  <TabsTrigger value="fixed-income">Fixed Income Yields</TabsTrigger>
                  <TabsTrigger value="eurobonds">SSA Eurobonds</TabsTrigger>
                  <TabsTrigger value="fx">Foreign Exchange</TabsTrigger>
                </TabsList>
                
                <TabsContent value="gse" className="mt-0">
                  <GSEChart />
                </TabsContent>
                
                <TabsContent value="equities" className="mt-0">
                  <EquitiesChart />
                </TabsContent>
                
                <TabsContent value="fixed-income" className="mt-0">
                  <FixedIncomeChart />
                </TabsContent>
                
                <TabsContent value="eurobonds" className="mt-0">
                  <EurobondsChart />
                </TabsContent>
                
                <TabsContent value="fx" className="mt-0">
                  <FXChart />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketData;
