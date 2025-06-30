
import React from 'react';
import { useMarketData } from '@/contexts/MarketDataContext';
import { marketSummaryAPI } from '@/services/api/marketSummary';
import HeroContent from './hero/HeroContent';
import MarketSummaryCard from './market/MarketSummaryCard';

const Hero = () => {
  const { marketData, latestData, isLoading } = useMarketData();
  
  // Create market summary data from our context
  const marketSummaryData = isLoading ? [] : marketSummaryAPI.processMarketDataToSummary({
    gse: latestData.gse,
    fx: latestData.fx,
    fixedIncome: latestData.fixedIncome,
    eurobonds: latestData.eurobonds,
    equities: latestData.equities
  });

  // Log the data for debugging
  React.useEffect(() => {
    if (!isLoading) {
      console.log("Hero - Latest market data:", latestData);
      console.log("Hero - Processed market summary:", marketSummaryData);
    }
  }, [latestData, isLoading, marketSummaryData]);

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div className="relative z-10 w-full pt-24 pb-20 sm:pt-32 sm:pb-24 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <HeroContent />
            <MarketSummaryCard 
              isLoading={isLoading} 
              marketSummaryData={marketSummaryData}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
