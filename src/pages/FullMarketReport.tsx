
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
        <style type="text/css" media="print">{`
          @media print {
            body { background: white !important; }
            .bg-gray-50, .dark\\:bg-cc-navy\\/95 { background: white !important; }
            .text-white { color: black !important; }
            .dark\\:text-white { color: black !important; }
            .print\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
            .space-y-8 > * + * { margin-top: 2rem !important; }
            nav, footer { display: none !important; }
            .container { max-width: none !important; padding: 1rem !important; }
            h1 { font-size: 2rem !important; margin-bottom: 1rem !important; }
            .shadow-lg { box-shadow: none !important; border: 1px solid #ddd !important; }
            .rounded-lg { border-radius: 0.5rem !important; }
            .bg-white { background: white !important; }
            .border { border-color: #ddd !important; }
            page-break-inside: avoid;
            .recharts-wrapper { page-break-inside: avoid !important; }
          }
        `}</style>
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
