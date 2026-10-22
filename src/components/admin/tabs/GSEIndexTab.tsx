
import React from 'react';
import MarketDataEditor from '../MarketDataEditor';
import { marketDataAPI } from '@/services/api';
import { useMarketData } from '@/contexts/MarketDataContext';

const GSEIndexTab: React.FC = () => {
  const { marketData, refreshMarketData } = useMarketData();
  
  // Format GSE data for the editor
  const formattedData = marketData.gse.map(item => ({
      name: new Date(item.date).toLocaleDateString('en-GB'),
      value: item.value,
      change_percent: item.change_percent || 0,
      is_positive: (item.change_percent || 0) >= 0
    }));

  return (
    <MarketDataEditor
      title="GSE Index"
      initialData={formattedData}
      dataFields={[
        { name: 'name', label: 'Date/Period', type: 'text' },
        { name: 'value', label: 'Index Value', type: 'number' },
        { name: 'change_percent', label: 'Change %', type: 'number' },
        { name: 'is_positive', label: 'Change Direction', type: 'hidden' }
      ]}
      fetchFn={async () => {
        return marketDataAPI.getGSEData().then(data => 
          data ? data.map((item: any) => ({
            name: item.name,
            value: item.value,
            change_percent: item.change_percent || 0,
            is_positive: (item.change_percent || 0) >= 0
          })) : []
        );
      }}
      updateFn={async (data) => {
        await marketDataAPI.updateGSEData(data);
        await refreshMarketData();
        return data;
      }}
      showDatePicker={true}
      showChangeColors={true}
    />
  );
};

export default GSEIndexTab;
