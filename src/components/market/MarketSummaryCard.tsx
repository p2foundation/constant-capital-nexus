
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChartLine, TrendingUp, TrendingDown, Loader2, ExternalLink } from 'lucide-react';
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
      <div className="absolute -left-4 -top-4 w-24 h-24 bg-cc-gold opacity-20 rounded-full blur-2xl"></div>
      <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-cc-blue opacity-20 rounded-full blur-2xl"></div>
      
      <div className="bg-white dark:bg-cc-navy/60 shadow-xl rounded-xl overflow-hidden border border-gray-100 dark:border-cc-gold/20">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-cc-navy dark:text-white" />
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading market data...</p>
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {marketSummaryData.map((section, index) => (
                <CarouselItem key={index}>
                  <div>
                    <div className="p-6 bg-cc-navy dark:bg-cc-navy/80 text-white">
                      <h3 className="text-xl font-bold flex items-center">
                        <ChartLine className="h-5 w-5 mr-2" />
                        {section.title}
                      </h3>
                    </div>
                    <div className="p-6 dark:bg-cc-navy/40">
                      <div className="space-y-4">
                        {section.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                            <div>
                              <div className="text-gray-600 dark:text-gray-400 text-sm">{item.label}</div>
                              <div className="font-medium dark:text-white">{item.value}</div>
                            </div>
                            <div className={`${item.isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                              {item.isPositive ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {item.change}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" asChild className="w-full mt-6 text-cc-blue border-cc-blue dark:text-cc-gold dark:border-cc-gold hover:bg-cc-light-blue dark:hover:bg-cc-navy/70">
                        <Link to="/full-market-report" className="flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Full Market Report
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4">
              <CarouselPrevious className="relative translate-y-0 left-0 mr-2 dark:bg-cc-navy/70 dark:text-white dark:border-cc-gold/30 dark:hover:bg-cc-gold/20" />
              <CarouselNext className="relative translate-y-0 right-0 dark:bg-cc-navy/70 dark:text-white dark:border-cc-gold/30 dark:hover:bg-cc-gold/20" />
            </div>
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default MarketSummaryCard;
