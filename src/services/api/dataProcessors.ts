
// Functions to process market data for API requests
export const processMarketDataForDB = (data: any[], type: string) => {
  // This function converts the UI format to DB format
  switch(type) {
    case 'gse':
      return data.map(item => ({
        date: new Date(item.name).toISOString().split('T')[0],
        data_type: 'gse',
        value: parseFloat(item.value),
        change_percent: parseFloat(item.change_percent || '0'), 
      }));
    
    case 'equities':
      const equitiesData = [];
      for (const item of data) {
        const date = new Date(item.name).toISOString().split('T')[0];
        if (item.ggb) equitiesData.push({
          date,
          data_type: 'equity',
          ticker_symbol: 'GCB',
          value: parseFloat(item.ggb),
        });
        if (item.scc) equitiesData.push({
          date,
          data_type: 'equity',
          ticker_symbol: 'SCB',
          value: parseFloat(item.scc),
        });
        if (item.eti) equitiesData.push({
          date,
          data_type: 'equity',
          ticker_symbol: 'ETI',
          value: parseFloat(item.eti),
        });
      }
      return equitiesData;
      
    case 'fixed_income':
      const fiData = [];
      for (const item of data) {
        const date = new Date(item.name).toISOString().split('T')[0];
        if (item.yield91) fiData.push({
          date,
          data_type: 'fixed_income',
          ticker_symbol: '91-day',
          value: parseFloat(item.yield91),
        });
        if (item.yield182) fiData.push({
          date,
          data_type: 'fixed_income',
          ticker_symbol: '182-day',
          value: parseFloat(item.yield182),
        });
        if (item.yield1yr) fiData.push({
          date,
          data_type: 'fixed_income',
          ticker_symbol: '1-year',
          value: parseFloat(item.yield1yr),
        });
      }
      return fiData;
      
    case 'eurobonds':
      const euroData = [];
      for (const item of data) {
        const date = new Date(item.name).toISOString().split('T')[0];
        if (item.ghana29) euroData.push({
          date,
          data_type: 'eurobond',
          ticker_symbol: 'Ghana-2029',
          value: parseFloat(item.ghana29),
        });
        if (item.nigeria32) euroData.push({
          date,
          data_type: 'eurobond',
          ticker_symbol: 'Nigeria-2032',
          value: parseFloat(item.nigeria32),
        });
        if (item.kenya31) euroData.push({
          date,
          data_type: 'eurobond',
          ticker_symbol: 'Kenya-2031',
          value: parseFloat(item.kenya31),
        });
      }
      return euroData;
      
    case 'fx':
      const fxData = [];
      for (const item of data) {
        const date = new Date(item.name).toISOString().split('T')[0];
        if (item.usd) fxData.push({
          date,
          data_type: 'fx',
          ticker_symbol: 'USD',
          value: parseFloat(item.usd),
        });
        if (item.eur) fxData.push({
          date,
          data_type: 'fx',
          ticker_symbol: 'EUR',
          value: parseFloat(item.eur),
        });
        if (item.gbp) fxData.push({
          date,
          data_type: 'fx',
          ticker_symbol: 'GBP',
          value: parseFloat(item.gbp),
        });
      }
      return fxData;
      
    default:
      return data;
  }
};
