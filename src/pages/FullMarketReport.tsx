import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useMarketData } from '@/contexts/MarketDataContext';
import ErrorState from '@/components/market-report/ErrorState';
import LoadingState from '@/components/market-report/LoadingState';
import MarketSummaryView from '@/components/market-report/MarketSummaryView';
import AllInstrumentsView from '@/components/market-report/AllInstrumentsView';
import ChartsView from '@/components/market-report/ChartsView';
import ReportHeader, { ReportView } from '@/components/market-report/ReportHeader';
import { getReportDate } from '@/components/market-report/utils';
import { buildInstrumentRows } from '@/components/market-report/utils/instruments';
import { exportMarketReportCsv, exportMarketReportPdf } from '@/components/market-report/utils/exportReport';
import { useAnalytics } from '@/hooks/useAnalytics';
import { toast } from 'sonner';

const FullMarketReport: React.FC = () => {
  useAnalytics();
  const { marketData, isLoading, error } = useMarketData();
  const [selectedView, setSelectedView] = useState<ReportView>('summary');
  const rows = useMemo(() => buildInstrumentRows(marketData), [marketData]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  const reportDate = getReportDate(marketData);

  const onPdf = () => {
    try { exportMarketReportPdf(rows, reportDate); toast.success('Market report downloaded'); }
    catch { toast.error('Could not create the PDF. Please try again.'); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Full Market Report | Constant Capital Research</title>
        <meta name="description" content="Latest GSE equities, treasury yields, FX rates and Eurobond yields in one structured market report." />
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 pb-12 md:px-6">
        <ReportHeader
          reportDate={reportDate}
          selectedView={selectedView}
          onChangeView={setSelectedView}
          onExportPdf={onPdf}
          onExportCsv={() => exportMarketReportCsv(rows)}
          instrumentCount={rows.length}
        />
        <div className="mt-8">
          {selectedView === 'charts' ? <ChartsView />
            : selectedView === 'instruments' ? <AllInstrumentsView rows={rows} />
            : <MarketSummaryView rows={rows} />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FullMarketReport;
