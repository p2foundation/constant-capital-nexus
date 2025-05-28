
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
      
      // Additional debug info for troubleshooting
      console.log("Hero - Eurobonds data:", latestData.eurobonds);
      console.log("Hero - FX data:", latestData.fx);
    }
  }, [latestData, isLoading, marketSummaryData]);

  return (
    <div className="relative overflow-hidden">
      {/* Background with a pattern */}
      <div className="absolute inset-0 bg-pattern opacity-40 dark:opacity-20"></div>
      
      <div className="relative pt-24 pb-20 sm:pt-32 sm:pb-24 lg:pb-32 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HeroContent />
          <MarketSummaryCard 
            isLoading={isLoading} 
            marketSummaryData={marketSummaryData}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
