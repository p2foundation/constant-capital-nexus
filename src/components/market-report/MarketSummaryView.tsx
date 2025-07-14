
import React from 'react';
import SummaryCard from './SummaryCard';
import { MarketDataByType, LatestMarketData } from '@/contexts/marketData/types';
import { 
  getLatestFixedIncome,
  getLatestFX,
  getLatestEurobonds,
  getLatestGSE,
  getLatestEquities
} from './utils/marketSummaryUtils';

interface MarketSummaryViewProps {
  marketData: MarketDataByType;
  latestData: LatestMarketData;
}

const MarketSummaryView: React.FC<MarketSummaryViewProps> = ({ marketData }) => {
  // Use extracted utility functions to get data
  const fixedIncomeData = getLatestFixedIncome(marketData);
  const fxData = getLatestFX(marketData);
  const eurobondsData = getLatestEurobonds(marketData);
  const equitiesData = getLatestEquities(marketData);
  const latestGSE = getLatestGSE(marketData);
  
  return (
    <div className="space-y-8">
      {/* Top Row - GSE Overview */}
      <div className="grid grid-cols-1 gap-8">
        <SummaryCard 
          title="Ghana Stock Exchange" 
          items={[{
            name: "GSE Composite Index",
            value: latestGSE?.value || 0,
            change: latestGSE?.change_percent || 0,
            isPositive: (latestGSE?.change_percent || 0) >= 0
          }]} 
        />
      </div>

      {/* Second Row - Individual Equities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:grid-cols-2">
        <SummaryCard 
          title="Top Equities Performance" 
          items={equitiesData.map(item => {
            const companyNames: { [key: string]: string } = {
              'GCB': 'GCB Bank Limited',
              'SCB': 'Standard Chartered Bank',
              'ETI': 'Ecobank Transnational Inc',
              'MTNGH': 'MTN Ghana',
              'TOTAL': 'TotalEnergies Ghana'
            };
            return {
              name: companyNames[item.name] || item.name,
              value: item.value,
              change: item.change,
              isPositive: item.isPositive,
              prefix: 'GHS '
            };
          })} 
        />
        
        {/* Fixed Income Summary */}
        <SummaryCard 
          title="Fixed Income Yields" 
          items={fixedIncomeData.map(item => ({
            name: item.name === '91-day' ? '91-Day T-Bill' : 
                  item.name === '182-day' ? '182-Day T-Bill' : '364-Day Note',
            value: item.value,
            change: item.change,
            isPositive: item.isPositive,
            suffix: '%'
          }))} 
        />
      </div>

      {/* Third Row - FX and Eurobonds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:grid-cols-2">
        {/* FX Summary */}
        <SummaryCard 
          title="Foreign Exchange Rates" 
          items={fxData.map(item => ({
            name: `${item.name}/GHS`,
            value: item.value,
            change: item.change,
            isPositive: item.isPositive,
            prefix: 'GHS '
          }))} 
        />
        
        {/* Eurobonds Summary */}
        <SummaryCard 
          title="SSA Eurobonds" 
          items={eurobondsData.map(item => ({
            name: item.name,
            value: item.value,
            change: item.change,
            isPositive: item.isPositive,
            suffix: '%'
          }))} 
        />
      </div>
    </div>
  );
};

export default MarketSummaryView;
