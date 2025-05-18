
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioManagementTab from './tabs/PortfolioManagementTab';
import FinancialPlanningTab from './tabs/FinancialPlanningTab';
import InvestmentResearchTab from './tabs/InvestmentResearchTab';

const ServiceTabs = () => {
  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold mb-8 text-cc-navy text-center dark:text-white">Our Advisory Services</h2>
      
      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 w-full mb-8">
          <TabsTrigger value="portfolio" className="text-lg py-3">Portfolio Management</TabsTrigger>
          <TabsTrigger value="planning" className="text-lg py-3">Financial Planning</TabsTrigger>
          <TabsTrigger value="research" className="text-lg py-3">Investment Research</TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          <PortfolioManagementTab />
        </TabsContent>
        
        <TabsContent value="planning" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          <FinancialPlanningTab />
        </TabsContent>
        
        <TabsContent value="research" className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          <InvestmentResearchTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceTabs;
