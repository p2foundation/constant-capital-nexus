import React from 'react';
import { useMarketData } from '@/contexts/MarketDataContext';
import { marketSummaryAPI } from '@/services/api/marketSummary';
import HeroContent from './hero/HeroContent';
import MarketSummaryCard from './market/MarketSummaryCard';

const Hero = () => {
  const { latestData, isLoading } = useMarketData();

  const marketSummaryData = isLoading ? [] : marketSummaryAPI.processMarketDataToSummary({
    gse: latestData.gse,
    fx: latestData.fx,
    fixedIncome: latestData.fixedIncome,
    eurobonds: latestData.eurobonds,
    equities: latestData.equities
  });

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-20 sm:px-12 lg:px-16 lg:pt-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <HeroContent />
          </div>
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-2 shadow-2xl">
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
              <MarketSummaryCard isLoading={isLoading} marketSummaryData={marketSummaryData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
