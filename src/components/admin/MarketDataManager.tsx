
import React from 'react';
import MarketDataTabs from './MarketDataTabs';
import MarketDataRefreshButton from './MarketDataRefreshButton';
import { useMarketData } from '@/contexts/MarketDataContext';
import MarketDataSourceSettings from './MarketDataSourceSettings';
import { AdminSection, AdminStat } from './AdminSection';

const MarketDataManager = () => {
  const { refreshMarketData } = useMarketData();

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <AdminStat label="Coverage" value="5 markets" detail="GSE, equities, fixed income, eurobonds and FX" />
        <AdminStat label="Corrections" value="Protected" detail="Manual records take priority over live updates" />
        <AdminStat label="Save method" value="Upsert" detail="Existing history remains intact" />
      </div>
      <MarketDataSourceSettings compact onDataSourceChange={() => refreshMarketData()} />
      <AdminSection
        title="Market records"
        description="Choose a market, add a dated correction, then save it to the shared data store."
        action={<MarketDataRefreshButton onRefresh={refreshMarketData} />}
      >
        <MarketDataTabs />
      </AdminSection>
    </div>
  );
};

export default MarketDataManager;
