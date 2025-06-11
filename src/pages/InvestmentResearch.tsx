
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/investment-research/HeroSection';
import OverviewSection from '@/components/investment-research/OverviewSection';
import ResearchCategoriesSection from '@/components/investment-research/ResearchCategoriesSection';
import ResearchApproachSection from '@/components/investment-research/ResearchApproachSection';
import CTASection from '@/components/investment-research/CTASection';

const InvestmentResearch = () => {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <div className="container mx-auto px-4 py-12">
          <OverviewSection />
          <ResearchCategoriesSection />
          <ResearchApproachSection />
          <CTASection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InvestmentResearch;
