
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useMarketData } from '@/contexts/MarketDataContext';
import ErrorState from '@/components/market-report/ErrorState';
import LoadingState from '@/components/market-report/LoadingState';
import MarketSummaryView from '@/components/market-report/MarketSummaryView';
import ChartsView from '@/components/market-report/ChartsView';
import ReportHeader from '@/components/market-report/ReportHeader';
import { getReportDate } from '@/components/market-report/utils';

const FullMarketReport: React.FC = () => {
  const { marketData, latestData, isLoading, error } = useMarketData();
  const [selectedView, setSelectedView] = useState<'charts' | 'summary'>('charts');

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }
  
  const reportDate = getReportDate(marketData);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-navy/95">
      <Helmet>
        <title>Full Market Report | Capital Coast Research</title>
        <meta name="description" content="Comprehensive market data and analysis of Ghanaian and West African markets" />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 pb-12">
        <ReportHeader 
          reportDate={reportDate}
          selectedView={selectedView}
          onChangeView={setSelectedView}
        />

        <div className="mt-8">
          {selectedView === 'charts' ? (
            <ChartsView />
          ) : (
            <MarketSummaryView marketData={marketData} latestData={latestData} />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FullMarketReport;
