
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBar, LineChart, TrendingUp, Database } from "lucide-react";
import GSEIndexTab from './tabs/GSEIndexTab';
import EquitiesTab from './tabs/EquitiesTab';
import FixedIncomeTab from './tabs/FixedIncomeTab';
import EurobondsTab from './tabs/EurobondsTab';
import FXTab from './tabs/FXTab';

const MarketDataTabs: React.FC = () => {
  return (
    <Tabs defaultValue="gse" className="w-full">
      <TabsList className="mb-6 flex flex-wrap">
        <TabsTrigger value="gse" className="flex items-center gap-2">
          <ChartBar className="h-4 w-4" />
          <span>GSE Index</span>
        </TabsTrigger>
        <TabsTrigger value="equities" className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          <span>Equities</span>
        </TabsTrigger>
        <TabsTrigger value="fixed-income" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>Fixed Income</span>
        </TabsTrigger>
        <TabsTrigger value="eurobonds" className="flex items-center gap-2">
          <LineChart className="h-4 w-4" />
          <span>Eurobonds</span>
        </TabsTrigger>
        <TabsTrigger value="fx" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          <span>FX Rates</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="gse" className="space-y-4">
        <GSEIndexTab />
      </TabsContent>
      
      <TabsContent value="equities" className="space-y-4">
        <EquitiesTab />
      </TabsContent>
      
      <TabsContent value="fixed-income" className="space-y-4">
        <FixedIncomeTab />
      </TabsContent>
      
      <TabsContent value="eurobonds" className="space-y-4">
        <EurobondsTab />
      </TabsContent>
      
      <TabsContent value="fx" className="space-y-4">
        <FXTab />
      </TabsContent>
    </Tabs>
  );
};

export default MarketDataTabs;
