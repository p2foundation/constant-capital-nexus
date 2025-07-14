import { MarketDataRecord } from './types.ts';

export async function fetchFromYahooFinance(): Promise<MarketDataRecord[]> {
  const today = new Date().toISOString().split('T')[0];
  const records: MarketDataRecord[] = [];

  try {
    // Create simulated Ghana market data based on global market proxies
    console.log('Yahoo Finance: Creating simulated market data for Ghana');
    
    // Add GSE Index
    addGSEIndex(records, today);
    
    // Add FX rates
    addFXRates(records, today);
    
    // Add T-Bills
    addTreasuryBills(records, today);
    
    // Add Equities
    addEquityData(records, today);
    
    // Add Eurobonds
    addEurobonds(records, today);

    console.log(`Yahoo Finance: Fetched ${records.length} records`);
    return records;

  } catch (error) {
    console.error('Error fetching from Yahoo Finance:', error);
    throw error;
  }
}

function addGSEIndex(records: MarketDataRecord[], today: string) {
  // GSE Index (simulated based on emerging market trends)
  records.push({
    data_type: 'gse',
    date: today,
    value: 4200 + Math.random() * 200, // Simulated GSE value
    change_percent: (Math.random() - 0.5) * 4, // Random change ±2%
    additional_data: { symbol: 'GSE-CI', source: 'yahoo_simulated' }
  });
}

function addFXRates(records: MarketDataRecord[], today: string) {
  // FX Rates (simulated Ghana Cedi rates)
  const fxRates = [
    { symbol: 'USD', rate: 11.5 + Math.random() * 1.0, change: (Math.random() - 0.5) * 2 },
    { symbol: 'EUR', rate: 12.8 + Math.random() * 1.0, change: (Math.random() - 0.5) * 2 },
    { symbol: 'GBP', rate: 14.5 + Math.random() * 1.0, change: (Math.random() - 0.5) * 2 }
  ];
  
  fxRates.forEach(rate => {
    records.push({
      data_type: 'fx',
      date: today,
      ticker_symbol: rate.symbol,
      value: rate.rate,
      change_percent: rate.change,
      additional_data: { source: 'yahoo_simulated' }
    });
  });
}

function addTreasuryBills(records: MarketDataRecord[], today: string) {
  // Ghana T-Bills (simulated rates)
  const bills = [
    { symbol: '91-day', rate: 24.0 + Math.random() * 2.0, change: (Math.random() - 0.5) * 1.0 },
    { symbol: '182-day', rate: 25.0 + Math.random() * 2.0, change: (Math.random() - 0.5) * 1.0 },
    { symbol: '364-day', rate: 26.0 + Math.random() * 2.0, change: (Math.random() - 0.5) * 1.0 }
  ];
  
  bills.forEach(bill => {
    records.push({
      data_type: 'fixed_income',
      date: today,
      ticker_symbol: bill.symbol,
      value: bill.rate,
      change_percent: bill.change,
      additional_data: { source: 'yahoo_simulated' }
    });
  });
}

function addEquityData(records: MarketDataRecord[], today: string) {
  // Enhanced Ghana Equities with comprehensive GSE coverage and sector-based correlation
  const marketTrend = (Math.random() - 0.5) * 2; // Overall market sentiment
  
  const equities = [
    // Banking Sector (correlated movements)
    { symbol: 'GCB', basePrice: 8.5, volatility: 0.8, sector: 'Banking', correlation: 0.7 },
    { symbol: 'SCB', basePrice: 25.0, volatility: 1.5, sector: 'Banking', correlation: 0.7 },
    { symbol: 'CAL', basePrice: 1.8, volatility: 0.25, sector: 'Banking', correlation: 0.7 },
    { symbol: 'EGH', basePrice: 15.2, volatility: 1.2, sector: 'Banking', correlation: 0.7 },
    { symbol: 'ACCESS', basePrice: 3.2, volatility: 0.3, sector: 'Banking', correlation: 0.7 },
    { symbol: 'RBGH', basePrice: 2.5, volatility: 0.2, sector: 'Banking', correlation: 0.7 },
    { symbol: 'SOGEGH', basePrice: 1.1, volatility: 0.15, sector: 'Banking', correlation: 0.7 },
    { symbol: 'TBL', basePrice: 0.9, volatility: 0.1, sector: 'Banking', correlation: 0.7 },
    
    // Telecommunications
    { symbol: 'MTNGH', basePrice: 2.8, volatility: 0.35, sector: 'Telecom', correlation: 0.3 },
    
    // Oil & Gas (commodity-correlated)
    { symbol: 'TOTAL', basePrice: 3.4, volatility: 0.4, sector: 'Oil & Gas', correlation: 0.8 },
    { symbol: 'GOIL', basePrice: 1.9, volatility: 0.15, sector: 'Oil & Gas', correlation: 0.8 },
    { symbol: 'TLW', basePrice: 45.0, volatility: 4.0, sector: 'Oil & Gas', correlation: 0.8 },
    
    // Mining (commodity-sensitive)
    { symbol: 'AGA', basePrice: 280.0, volatility: 15.0, sector: 'Mining', correlation: 0.4 },
    { symbol: 'ASG', basePrice: 12.5, volatility: 1.2, sector: 'Mining', correlation: 0.6 },
    { symbol: 'ALLGH', basePrice: 0.45, volatility: 0.08, sector: 'Mining', correlation: 0.6 },
    
    // Consumer Goods (defensive)
    { symbol: 'UNIL', basePrice: 18.5, volatility: 1.5, sector: 'Consumer Goods', correlation: 0.2 },
    { symbol: 'FML', basePrice: 85.0, volatility: 6.0, sector: 'Consumer Goods', correlation: 0.2 },
    { symbol: 'CPC', basePrice: 0.65, volatility: 0.05, sector: 'Consumer Goods', correlation: 0.2 },
    
    // Beverages
    { symbol: 'GGBL', basePrice: 4.2, volatility: 0.4, sector: 'Beverages', correlation: 0.3 },
    
    // Manufacturing
    { symbol: 'ALW', basePrice: 0.8, volatility: 0.08, sector: 'Manufacturing', correlation: 0.5 },
    { symbol: 'BOPP', basePrice: 6.8, volatility: 0.6, sector: 'Manufacturing', correlation: 0.5 },
    
    // Insurance
    { symbol: 'SIC', basePrice: 1.2, volatility: 0.12, sector: 'Insurance', correlation: 0.4 },
    
    // Other Sectors
    { symbol: 'EGL', basePrice: 0.35, volatility: 0.04, sector: 'Conglomerate', correlation: 0.6 },
    { symbol: 'PBC', basePrice: 2.1, volatility: 0.2, sector: 'Agriculture', correlation: 0.3 },
    { symbol: 'SWL', basePrice: 0.25, volatility: 0.03, sector: 'Manufacturing', correlation: 0.5 }
  ].map(stock => {
    // Apply sector correlation and market sentiment
    const sectorMove = (Math.random() - 0.5) * 3; // Sector-specific movement
    const correlatedMove = marketTrend * stock.correlation + sectorMove * (1 - stock.correlation);
    const price = stock.basePrice + (Math.random() - 0.5) * stock.volatility;
    const change = correlatedMove + (Math.random() - 0.5) * 2;
    
    return {
      symbol: stock.symbol,
      price: Math.max(0.01, price), // Ensure positive prices
      change: Math.max(-15, Math.min(15, change)), // Cap at ±15%
      sector: stock.sector
    };
  });

  equities.forEach(equity => {
    records.push({
      data_type: 'equity',
      date: today,
      ticker_symbol: equity.symbol,
      value: parseFloat(equity.price.toFixed(2)),
      change_percent: parseFloat(equity.change.toFixed(2)),
      additional_data: { 
        source: 'yahoo_finance_simulated', 
        exchange: 'GSE',
        sector: equity.sector,
        market_trend: marketTrend.toFixed(2),
        last_updated: new Date().toISOString()
      }
    });
  });
}

function addEurobonds(records: MarketDataRecord[], today: string) {
  // Enhanced Ghana Eurobonds with more comprehensive coverage
  const eurobonds = [
    { symbol: 'Ghana-2026', yield: 6.8 + Math.random() * 0.8, change: (Math.random() - 0.5) * 1.5, maturity: '2026' },
    { symbol: 'Ghana-2027', yield: 7.1 + Math.random() * 0.9, change: (Math.random() - 0.5) * 1.8, maturity: '2027' },
    { symbol: 'Ghana-2029', yield: 7.5 + Math.random() * 1.0, change: (Math.random() - 0.5) * 2.0, maturity: '2029' },
    { symbol: 'Ghana-2030', yield: 7.6 + Math.random() * 1.0, change: (Math.random() - 0.5) * 2.0, maturity: '2030' },
    { symbol: 'Ghana-2032', yield: 8.1 + Math.random() * 1.2, change: (Math.random() - 0.5) * 2.2, maturity: '2032' }
  ];

  eurobonds.forEach(bond => {
    records.push({
      data_type: 'eurobond',
      date: today,
      ticker_symbol: bond.symbol,
      value: parseFloat(bond.yield.toFixed(2)),
      change_percent: parseFloat(bond.change.toFixed(2)),
      additional_data: { 
        source: 'yahoo_finance_simulated',
        maturity: bond.maturity,
        currency: 'USD',
        last_updated: new Date().toISOString()
      }
    });
  });
}
