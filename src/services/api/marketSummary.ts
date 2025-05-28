// Market Summary API service
import { apiRequest } from './utils';

// Type definitions for market summary data
export interface MarketSummaryItem {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
}

export interface MarketSummarySection {
  title: string;
  items: MarketSummaryItem[];
}

// API methods for market summary
export const marketSummaryAPI = {
  getSummary: () => apiRequest("/market-summary"),
  
  updateSummary: (data: any) => apiRequest("/market-summary", "POST", data),
  
  // Process raw market data into a formatted market summary with isPositive flags
  processMarketDataToSummary: (marketData: any) => {
    // Helper to format change percentage
    const formatChangePercent = (percent: number | null | undefined) => {
      if (percent === null || percent === undefined) return '0.00%';
      return (percent >= 0 ? '+' : '') + percent.toFixed(2) + '%';
    };
    
    // Debug the incoming market data
    console.log("Processing market data for summary:", marketData);
    console.log("Eurobonds data:", marketData.eurobonds);
    console.log("FX data:", marketData.fx);
    
    const summary: MarketSummarySection[] = [
      {
        title: 'Market Summary',
        items: [
          { 
            label: 'GSE Composite Index',
            value: marketData.gse?.value?.toFixed(2) || '0.00',
            change: formatChangePercent(marketData.gse?.change_percent),
            isPositive: (marketData.gse?.change_percent ?? 0) >= 0
          },
          { 
            label: 'USD/GHS', 
            value: marketData.fx?.USD?.value?.toFixed(2) || '0.00',
            change: formatChangePercent(marketData.fx?.USD?.change_percent),
            isPositive: (marketData.fx?.USD?.change_percent ?? 0) >= 0
          },
          { 
            label: '91-Day T-Bill', 
            value: (marketData.fixedIncome?.['91-day']?.value?.toFixed(2) || '0.00') + '%',
            change: formatChangePercent(marketData.fixedIncome?.['91-day']?.change_percent),
            isPositive: (marketData.fixedIncome?.['91-day']?.change_percent ?? 0) >= 0
          },
          { 
            label: 'Ghana Eurobond 2029', 
            value: (marketData.eurobonds?.['Ghana-2029']?.value?.toFixed(2) || '0.00') + '%',
            change: formatChangePercent(marketData.eurobonds?.['Ghana-2029']?.change_percent),
            isPositive: (marketData.eurobonds?.['Ghana-2029']?.change_percent ?? 0) >= 0
          },
        ]
      },
      {
        title: 'Fixed Income',
        items: [
          { 
            label: '91-Day T-Bill', 
            value: (marketData.fixedIncome?.['91-day']?.value?.toFixed(2) || '0.00') + '%',
            change: formatChangePercent(marketData.fixedIncome?.['91-day']?.change_percent),
            isPositive: (marketData.fixedIncome?.['91-day']?.change_percent ?? 0) >= 0
          },
          { 
            label: '182-Day T-Bill', 
            value: (marketData.fixedIncome?.['182-day']?.value?.toFixed(2) || '0.00') + '%',
            change: formatChangePercent(marketData.fixedIncome?.['182-day']?.change_percent),
            isPositive: (marketData.fixedIncome?.['182-day']?.change_percent ?? 0) >= 0
          },
          { 
            label: '364-Day T-Bill', 
            value: (marketData.fixedIncome?.['364-day']?.value?.toFixed(2) || '0.00') + '%',
            change: formatChangePercent(marketData.fixedIncome?.['364-day']?.change_percent),
            isPositive: (marketData.fixedIncome?.['364-day']?.change_percent ?? 0) >= 0
          }
        ]
      },
      {
        title: 'Equities',
        items: [
          { 
            label: 'MTNGH', 
            value: `GHS ${marketData.equities?.MTNGH?.value?.toFixed(2) || '0.00'}`,
            change: formatChangePercent(marketData.equities?.MTNGH?.change_percent),
            isPositive: (marketData.equities?.MTNGH?.change_percent ?? 0) >= 0
          },
          { 
            label: 'GOIL', 
            value: `GHS ${marketData.equities?.GOIL?.value?.toFixed(2) || '0.00'}`,
            change: formatChangePercent(marketData.equities?.GOIL?.change_percent),
            isPositive: (marketData.equities?.GOIL?.change_percent ?? 0) >= 0
          },
          { 
            label: 'GCB', 
            value: `GHS ${marketData.equities?.GCB?.value?.toFixed(2) || '0.00'}`,
            change: formatChangePercent(marketData.equities?.GCB?.change_percent),
            isPositive: (marketData.equities?.GCB?.change_percent ?? 0) >= 0
          },
          { 
            label: 'SCB', 
            value: `GHS ${marketData.equities?.SCB?.value?.toFixed(2) || '0.00'}`,
            change: formatChangePercent(marketData.equities?.SCB?.change_percent),
            isPositive: (marketData.equities?.SCB?.change_percent ?? 0) >= 0
          },
        ]
      },
      {
        title: 'Eurobonds',
        items: [
          { 
            label: 'Ghana 2029', 
            value: (marketData.eurobonds?.['Ghana-2029']?.value?.toFixed(2) || '0.00') + '%',
            change: formatChangePercent(marketData.eurobonds?.['Ghana-2029']?.change_percent),
            isPositive: (marketData.eurobonds?.['Ghana-2029']?.change_percent ?? 0) >= 0
          },
          { 
            label: 'Ghana 2030', 
            value: (marketData.eurobonds?.['Ghana-2030']?.value?.toFixed(2) || '0.00') + '%',
            change: formatChangePercent(marketData.eurobonds?.['Ghana-2030']?.change_percent),
            isPositive: (marketData.eurobonds?.['Ghana-2030']?.change_percent ?? 0) >= 0
          },
          { 
            label: 'Nigeria 2032', 
            value: (marketData.eurobonds?.['Nigeria-2032']?.value?.toFixed(2) || '0.00') + '%',
            change: formatChangePercent(marketData.eurobonds?.['Nigeria-2032']?.change_percent),
            isPositive: (marketData.eurobonds?.['Nigeria-2032']?.change_percent ?? 0) >= 0
          },
          { 
            label: 'Kenya 2031', 
            value: (marketData.eurobonds?.['Kenya-2031']?.value?.toFixed(2) || '0.00') + '%',
            change: formatChangePercent(marketData.eurobonds?.['Kenya-2031']?.change_percent),
            isPositive: (marketData.eurobonds?.['Kenya-2031']?.change_percent ?? 0) >= 0
          },
        ]
      },
      {
        title: 'FX Rates',
        items: [
          { 
            label: 'USD/GHS', 
            value: marketData.fx?.USD?.value?.toFixed(2) || '0.00',
            change: formatChangePercent(marketData.fx?.USD?.change_percent),
            isPositive: (marketData.fx?.USD?.change_percent ?? 0) >= 0
          },
          { 
            label: 'EUR/GHS', 
            value: marketData.fx?.EUR?.value?.toFixed(2) || '0.00',
            change: formatChangePercent(marketData.fx?.EUR?.change_percent),
            isPositive: (marketData.fx?.EUR?.change_percent ?? 0) >= 0
          },
          { 
            label: 'GBP/GHS', 
            value: marketData.fx?.GBP?.value?.toFixed(2) || '0.00',
            change: formatChangePercent(marketData.fx?.GBP?.change_percent),
            isPositive: (marketData.fx?.GBP?.change_percent ?? 0) >= 0
          },
        ]
      }
    ];
    
    return summary;
  }
};
