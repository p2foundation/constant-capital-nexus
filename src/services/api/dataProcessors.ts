
// Data processing utilities

// Process market data for database storage
export const processMarketDataForDB = (data: any[], dataType: string, selectedItems?: string[]) => {
  // For debugging
  console.log(`Processing ${dataType} data for DB:`, data);
  
  const processedData: any[] = [];
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  if (dataType === 'gse') {
    // Process GSE data - simple format with single entry per date
    data.forEach(item => {
      processedData.push({
        data_type: dataType,
        date: item.date || today,
        value: Number(item.value) || 0,
        change_percent: Number(item.change_percent) || 0
      });
    });
  } else if (dataType === 'equity') {
    // Process equities data - multiple ticker symbols
    const symbols = selectedItems || ['MTNGH', 'GOIL', 'GCB', 'SCB', 'EGL', 'FML'];
    
    data.forEach(item => {
      symbols.forEach(symbol => {
        // Check if item has data for this symbol
        if (item[symbol.toLowerCase()] !== undefined) {
          processedData.push({
            data_type: dataType,
            ticker_symbol: symbol,
            date: item.date || today,
            value: Number(item[symbol.toLowerCase()]) || 0,
            change_percent: Number(item[`${symbol.toLowerCase()}_change`]) || 0
          });
        }
      });
    });
  } else if (dataType === 'fixed_income') {
    // Process fixed income data - multiple terms/tenors
    const fixedIncomeTerms = [
      { key: '91-day', field: '91-day' }, 
      { key: '182-day', field: '182-day' },
      { key: '364-day', field: '364-day' },
      { key: '1-year', field: '1-year' },
      { key: '2-year', field: '2-year' },
      { key: '3-year', field: '3-year' },
      { key: '5-year', field: '5-year' },
      { key: '7-year', field: '7-year' },
      { key: '10-year', field: '10-year' }
    ];
    
    data.forEach(item => {
      fixedIncomeTerms.forEach(term => {
        // Use field mapping to access the data for this term
        if (item[term.field] !== undefined) {
          processedData.push({
            data_type: dataType,
            ticker_symbol: term.key, // Use the standard term name as ticker
            date: item.date || today,
            value: Number(item[term.field]) || 0,
            change_percent: Number(item[`${term.field}_change`]) || 0
          });
        }
      });
    });
  } else if (dataType === 'eurobond') {
    // Process eurobond data
    const eurobondTypes = [
      { key: 'Ghana-2029', field: 'Ghana-2029' },
      { key: 'Nigeria-2032', field: 'Nigeria-2032' },
      { key: 'Kenya-2031', field: 'Kenya-2031' },
      { key: 'Ghana-2030', field: 'Ghana-2030' }
    ];
    
    data.forEach(item => {
      eurobondTypes.forEach(bond => {
        if (item[bond.field] !== undefined) {
          processedData.push({
            data_type: dataType,
            ticker_symbol: bond.key,
            date: item.date || today,
            value: Number(item[bond.field]) || 0,
            change_percent: Number(item[`${bond.field}_change`]) || 0
          });
        }
      });
    });
  } else if (dataType === 'fx') {
    // Process fx data
    const fxTypes = [
      { key: 'USD', field: 'USD' },
      { key: 'EUR', field: 'EUR' },
      { key: 'GBP', field: 'GBP' }
    ];
    
    data.forEach(item => {
      fxTypes.forEach(currency => {
        if (item[currency.field] !== undefined) {
          processedData.push({
            data_type: dataType,
            ticker_symbol: currency.key,
            date: item.date || today,
            value: Number(item[currency.field]) || 0,
            change_percent: Number(item[`${currency.field}_change`]) || 0
          });
        }
      });
    });
  }
  
  console.log(`Processed ${processedData.length} ${dataType} records for DB:`, processedData);
  return processedData;
};
