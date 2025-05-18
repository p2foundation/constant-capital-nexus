
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabDefinition } from './TabDefinitions';

interface TabHeaderProps {
  tabs: TabDefinition[];
}

const TabHeader: React.FC<TabHeaderProps> = ({ tabs }) => {
  return (
    <TabsList className="mb-6 flex flex-wrap">
      {tabs.map((tab) => (
        <TabsTrigger 
          key={tab.id} 
          value={tab.id} 
          className="flex items-center gap-2"
        >
          {tab.icon}
          <span>{tab.label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabHeader;
