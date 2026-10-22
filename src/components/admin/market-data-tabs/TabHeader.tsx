
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabDefinition } from './TabDefinitions';

interface TabHeaderProps {
  tabs: TabDefinition[];
}

const TabHeader: React.FC<TabHeaderProps> = ({ tabs }) => {
  return (
    <div className="mb-6 overflow-x-auto border-b">
    <TabsList className="h-auto w-max min-w-full justify-start rounded-none bg-transparent p-0">
      {tabs.map((tab) => (
        <TabsTrigger 
          key={tab.id} 
          value={tab.id} 
          className="flex h-11 items-center gap-2 rounded-none border-b-2 border-transparent bg-transparent px-4 shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          {tab.icon}
          <span>{tab.label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
    </div>
  );
};

export default TabHeader;
