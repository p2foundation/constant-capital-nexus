import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioManagementTab from './tabs/PortfolioManagementTab';
import FinancialPlanningTab from './tabs/FinancialPlanningTab';
import InvestmentResearchTab from './tabs/InvestmentResearchTab';

const ServiceTabs = () => {
  return (
    <div className="my-16">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Our services</p>
      <h2 className="font-heading mb-4 text-3xl font-bold text-foreground">Our Advisory Services</h2>
      <div className="mb-10 h-1.5 w-20 bg-accent" />

      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="mb-8 grid h-auto w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="portfolio" className="py-3 text-base">Portfolio Management</TabsTrigger>
          <TabsTrigger value="planning" className="py-3 text-base">Financial Planning</TabsTrigger>
          <TabsTrigger value="research" className="py-3 text-base">Investment Research</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          <PortfolioManagementTab />
        </TabsContent>

        <TabsContent value="planning" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          <FinancialPlanningTab />
        </TabsContent>

        <TabsContent value="research" className="rounded-2xl border border-border bg-card p-6 lg:p-8">
          <InvestmentResearchTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceTabs;
