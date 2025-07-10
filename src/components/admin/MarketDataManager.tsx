
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MarketDataTabs from './MarketDataTabs';
import MarketDataRefreshButton from './MarketDataRefreshButton';
import { useMarketData } from '@/contexts/MarketDataContext';

const MarketDataManager = () => {
  const { refreshMarketData } = useMarketData();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Market Data Management</CardTitle>
        <MarketDataRefreshButton onRefresh={refreshMarketData} />
      </CardHeader>
      <CardContent>
        <MarketDataTabs />
      </CardContent>
    </Card>
  );
};

export default MarketDataManager;
