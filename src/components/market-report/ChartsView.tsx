
import React from 'react';
import MarketChart from './MarketChart';
import GSEChart from '@/components/market-data/GSEChart';
import FixedIncomeChart from '@/components/market-data/FixedIncomeChart';
import EquitiesChart from '@/components/market-data/EquitiesChart';
import EurobondsChart from '@/components/market-data/EurobondsChart';
import FXChart from '@/components/market-data/FXChart';

const ChartsView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-8">
      <MarketChart 
        title="Ghana Stock Exchange (GSE) Index"
        description="Daily GSE Composite Index performance" 
        chart={<GSEChart />} 
      />
      
      <MarketChart 
        title="Fixed Income Yields"
        description="Treasury bill and note yields over time" 
        chart={<FixedIncomeChart />} 
      />
      
      <MarketChart 
        title="Banking Equities"
        description="Stock performance of major banking institutions" 
        chart={<EquitiesChart />} 
      />
      
      <MarketChart 
        title="SSA Eurobonds"
        description="Yields on sovereign bonds in USD" 
        chart={<EurobondsChart />} 
      />
      
      <MarketChart 
        title="Foreign Exchange Rates"
        description="Exchange rates against the Ghana Cedi (GHS)" 
        chart={<FXChart />} 
      />
    </div>
  );
};

export default ChartsView;
