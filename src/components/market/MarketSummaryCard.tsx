import React from 'react';
import { Button } from "@/components/ui/button";
import { ChartLine, TrendingUp, TrendingDown, Loader2, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from 'react-router-dom';
import { MarketSummarySection } from '@/services/api/marketSummary';

interface MarketSummaryCardProps {
  isLoading: boolean;
  marketSummaryData: MarketSummarySection[];
}

const MarketSummaryCard = ({ isLoading, marketSummaryData }: MarketSummaryCardProps) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-cc-gold/25 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-6 -bottom-6 h-36 w-36 rounded-full bg-cc-blue/25 blur-2xl" aria-hidden="true" />

      <div className="relative rounded-2xl border border-gray-200/80 dark:border-cc-gold/20 bg-white/90 dark:bg-card backdrop-blur-sm shadow-2xl shadow-cc-navy/10 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cc-navy dark:text-white" />
            <p className="mt-4 text-sm text-gray-600 dark:text-muted-foreground">Loading market data…</p>
          </div>
        ) : (
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            {/* Header with inline navigation — keeps arrows off the CTA */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 bg-cc-navy dark:bg-card text-white">
              <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cc-gold opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cc-gold" />
                </span>
                <ChartLine className="h-5 w-5" />
                Market Summary
              </h3>
              <div className="flex gap-2">
                <CarouselPrevious className="relative left-0 top-0 h-8 w-8 translate-y-0 border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
                <CarouselNext className="relative right-0 top-0 h-8 w-8 translate-y-0 border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
              </div>
            </div>

            <CarouselContent className="ml-0">
              {marketSummaryData.map((section, index) => (
                <CarouselItem key={index} className="pl-0">
                  <div className="p-5 sm:p-6 dark:bg-card">
                    {section.title.trim().toLowerCase() !== 'market summary' && (
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-cc-blue dark:text-cc-gold">
                        {section.title}
                      </p>
                    )}

                    <div className="space-y-1">
                      {section.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm text-gray-600 dark:text-muted-foreground">{item.label}</div>
                            <div className="font-semibold tabular-nums text-cc-navy dark:text-white">{item.value}</div>
                          </div>
                          <div
                            className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold tabular-nums ${
                              item.isPositive
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                            }`}
                          >
                            {item.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {item.change}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="border-t border-gray-100 px-5 py-4 dark:border-white/10 dark:bg-card">
              <Button
                asChild
                className="group w-full bg-cc-navy text-white hover:bg-cc-blue dark:bg-cc-gold dark:text-cc-navy dark:hover:bg-cc-gold/90"
              >
                <Link to="/full-market-report" className="flex items-center justify-center">
                  View Full Market Report
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default MarketSummaryCard;
