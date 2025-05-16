
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MarketDataTabs from './MarketDataTabs';

const MarketDataManager = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Data Management</CardTitle>
      </CardHeader>
      <CardContent>
        <MarketDataTabs />
      </CardContent>
    </Card>
  );
};

export default MarketDataManager;
