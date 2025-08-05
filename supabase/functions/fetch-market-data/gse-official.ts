import { MarketDataRecord } from './types.ts';

interface GSEApiResponse {
  data: {
    companies: Array<{
      symbol: string;
      name: string;
      price: number;
      change: number;
      percentage_change: number;
      volume: number;
      sector: string;
    }>;
    index: {
      value: number;
      change: number;
      percentage_change: number;
    };
  };
  success: boolean;
}

export async function fetchFromGSEOfficial(): Promise<MarketDataRecord[]> {
  const today = new Date().toISOString().split('T')[0];
  const records: MarketDataRecord[] = [];

  try {
    const gseApiKey = Deno.env.get('GSE_API_KEY');
    
    if (!gseApiKey) {
      console.log('GSE: No API key found, generating simulated data');
      return generateSimulatedGSEData(today);
    }

    // Try to fetch from official GSE API (using Kwayisi's GSE-API as example)
    const gseApiUrl = 'https://gse-api.kwayisi.org/v1/stocks/all';
    
    console.log('GSE: Fetching real data from GSE API');
    
    const response = await fetch(gseApiUrl, {
      headers: {
        'Authorization': `Bearer ${gseApiKey}`,
        'Accept': 'application/json',
        'User-Agent': 'ConstantCap-MarketData/1.0'
      }
    });

    if (!response.ok) {
      console.log(`GSE API error: ${response.status} ${response.statusText}`);
      return generateSimulatedGSEData(today);
    }

    const gseData: GSEApiResponse = await response.json();
    
    if (!gseData.success || !gseData.data) {
      console.log('GSE: Invalid API response, using simulated data');
      return generateSimulatedGSEData(today);
    }

    // Process GSE Index
    if (gseData.data.index) {
      records.push({
        data_type: 'gse',
        date: today,
        value: gseData.data.index.value,
        change_percent: gseData.data.index.percentage_change,
        additional_data: { 
          source: 'gse_official',
          absolute_change: gseData.data.index.change,
          last_updated: new Date().toISOString()
        }
      });
    }

    // Process individual stocks
    if (gseData.data.companies && Array.isArray(gseData.data.companies)) {
      gseData.data.companies.forEach(company => {
        records.push({
          data_type: 'equity',
          date: today,
          ticker_symbol: company.symbol,
          value: company.price,
          change_percent: company.percentage_change,
          additional_data: {
            source: 'gse_official',
            company_name: company.name,
            sector: company.sector,
            volume: company.volume,
            absolute_change: company.change,
            exchange: 'GSE',
            last_updated: new Date().toISOString()
          }
        });
      });
    }

    console.log(`GSE: Fetched ${records.length} records from official API`);
    return records;

  } catch (error) {
    console.error('Error fetching from GSE API:', error);
    console.log('GSE: Falling back to simulated data');
    return generateSimulatedGSEData(today);
  }
}

function generateSimulatedGSEData(today: string): MarketDataRecord[] {
  console.log('GSE: Generating simulated Ghana Stock Exchange data');
  const records: MarketDataRecord[] = [];
  
  // GSE Composite Index
  const gseIndexValue = 4200 + Math.random() * 400; // Base around 4200-4600
  const gseChange = (Math.random() - 0.5) * 4; // ±2% change
  
  records.push({
    data_type: 'gse',
    date: today,
    value: parseFloat(gseIndexValue.toFixed(2)),
    change_percent: parseFloat(gseChange.toFixed(2)),
    additional_data: { 
      source: 'gse_simulated',
      market_status: 'simulated',
      last_updated: new Date().toISOString()
    }
  });

  // Major GSE Listed Stocks
  const marketTrend = (Math.random() - 0.5) * 2;
  
  const gseStocks = [
    // Banking
    { symbol: 'GCB', name: 'Ghana Commercial Bank', price: 8.5, volatility: 0.8, sector: 'Banking' },
    { symbol: 'SCB', name: 'Standard Chartered Bank Ghana', price: 25.0, volatility: 1.5, sector: 'Banking' },
    { symbol: 'CAL', name: 'CAL Bank', price: 1.8, volatility: 0.25, sector: 'Banking' },
    { symbol: 'EGH', name: 'Ecobank Ghana', price: 15.2, volatility: 1.2, sector: 'Banking' },
    { symbol: 'ACCESS', name: 'Access Bank Ghana', price: 3.2, volatility: 0.3, sector: 'Banking' },
    
    // Telecommunications
    { symbol: 'MTNGH', name: 'MTN Ghana', price: 2.8, volatility: 0.35, sector: 'Telecommunications' },
    
    // Oil & Gas
    { symbol: 'TOTAL', name: 'Total Petroleum Ghana', price: 3.4, volatility: 0.4, sector: 'Oil & Gas' },
    { symbol: 'GOIL', name: 'Ghana Oil Company', price: 1.9, volatility: 0.15, sector: 'Oil & Gas' },
    { symbol: 'TLW', name: 'Tullow Oil Ghana', price: 45.0, volatility: 4.0, sector: 'Oil & Gas' },
    
    // Mining
    { symbol: 'AGA', name: 'AngloGold Ashanti', price: 280.0, volatility: 15.0, sector: 'Mining' },
    { symbol: 'ASG', name: 'Asanko Gold Ghana', price: 12.5, volatility: 1.2, sector: 'Mining' },
    
    // Consumer Goods
    { symbol: 'UNIL', name: 'Unilever Ghana', price: 18.5, volatility: 1.5, sector: 'Consumer Goods' },
    { symbol: 'FML', name: 'Fan Milk Ghana', price: 85.0, volatility: 6.0, sector: 'Consumer Goods' },
    
    // Beverages
    { symbol: 'GGBL', name: 'Ghana Breweries', price: 4.2, volatility: 0.4, sector: 'Beverages' },
    
    // Manufacturing
    { symbol: 'ALW', name: 'Aluworks Ghana', price: 0.8, volatility: 0.08, sector: 'Manufacturing' },
    { symbol: 'BOPP', name: 'BOPP Ghana', price: 6.8, volatility: 0.6, sector: 'Manufacturing' },
  ];

  gseStocks.forEach(stock => {
    const sectorCorrelation = 0.6;
    const correlatedMove = marketTrend * sectorCorrelation + (Math.random() - 0.5) * 3 * (1 - sectorCorrelation);
    const price = stock.price + (Math.random() - 0.5) * stock.volatility;
    const change = correlatedMove + (Math.random() - 0.5) * 2;
    
    records.push({
      data_type: 'equity',
      date: today,
      ticker_symbol: stock.symbol,
      value: Math.max(0.01, parseFloat(price.toFixed(2))),
      change_percent: Math.max(-15, Math.min(15, parseFloat(change.toFixed(2)))),
      additional_data: {
        source: 'gse_simulated',
        company_name: stock.name,
        sector: stock.sector,
        exchange: 'GSE',
        market_trend: marketTrend.toFixed(2),
        volume: Math.floor(Math.random() * 100000) + 1000,
        last_updated: new Date().toISOString()
      }
    });
  });

  return records;
}