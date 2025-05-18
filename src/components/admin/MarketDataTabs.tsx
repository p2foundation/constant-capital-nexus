
import React from 'react';
import { Tabs } from "@/components/ui/tabs";
import TabHeader from './market-data-tabs/TabHeader';
import TabContent from './market-data-tabs/TabContent';
import { marketDataTabs } from './market-data-tabs/TabDefinitions';

const MarketDataTabs: React.FC = () => {
  return (
    <Tabs defaultValue="gse" className="w-full">
      <TabHeader tabs={marketDataTabs} />
      
      {marketDataTabs.map((tab) => (
        <TabContent key={tab.id} id={tab.id} />
      ))}
    </Tabs>
  );
};

export default MarketDataTabs;
