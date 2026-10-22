
import React from 'react';
import { Tabs } from "@/components/ui/tabs";
import TabHeader from './market-data-tabs/TabHeader';
import TabContent from './market-data-tabs/TabContent';
import { marketDataTabs } from './market-data-tabs/TabDefinitions';
import { useSearchParams } from 'react-router-dom';

const MarketDataTabs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedMarket = searchParams.get('market') || 'gse';
  const activeMarket = marketDataTabs.some(tab => tab.id === requestedMarket) ? requestedMarket : 'gse';

  return (
    <Tabs
      value={activeMarket}
      onValueChange={(market) => {
        const next = new URLSearchParams(searchParams);
        next.set('market', market);
        setSearchParams(next);
      }}
      className="w-full"
    >
      <TabHeader tabs={marketDataTabs} />
      
      {marketDataTabs.map((tab) => (
        <TabContent key={tab.id} id={tab.id} />
      ))}
    </Tabs>
  );
};

export default MarketDataTabs;
