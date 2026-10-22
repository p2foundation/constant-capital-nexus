
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { equitiesData } from './mock-data';
import { useMarketData } from '@/contexts/MarketDataContext';

const EquitiesChart: React.FC = () => {
  const { marketData } = useMarketData();
  
  // Process market data for charting or use mock data
  const chartData = React.useMemo(() => {
    const buildFrom = (source: typeof marketData.equities) => {
      const dateMap = new Map<string, any>();
      source.forEach(item => {
        if (!item.date || !item.ticker_symbol) return;
        const date = new Date(item.date);
        const dateKey = date.toISOString().split('T')[0];
        const dateStr = date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
        if (!dateMap.has(dateKey)) {
          dateMap.set(dateKey, { 
            name: dateStr, 
            sortDate: date.getTime(),
            symbols: new Map<string, number>()
          });
        }
        const entry = dateMap.get(dateKey);
        const symbol = item.ticker_symbol.toLowerCase();
        const normalized = symbol;
        const allowed = ['gcb', 'scb', 'egh', 'mtngh', 'total'];
        if (allowed.includes(normalized)) {
          entry.symbols.set(normalized, parseFloat((item.value as any).toString()));
        }
      });
      return Array.from(dateMap.values())
        .sort((a, b) => a.sortDate - b.sortDate)
        .map(({ sortDate, symbols, ...rest }) => {
          const data: any = { ...rest };
          symbols.forEach((value: number, sym: string) => {
            data[sym] = value;
          });
          return data;
        });
    };

    // If no market data at all, return normalized mock data
    if (marketData.equities.length === 0) {
      return equitiesData
        .map((d: any) => ({ ...d, egh: d.egh ?? d.eti }))
        .map(({ eti, ...rest }: any) => rest);
    }
    
    // Try last 60 days first
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const recentData = marketData.equities.filter(item => new Date(item.date) >= sixtyDaysAgo);
    console.log('Equities - Recent data count:', recentData.length);

    let result = buildFrom(recentData);

    // Fallback: most recent 60 unique dates if nothing in last 60 days
    if (result.length === 0) {
      const sortedAll = [...marketData.equities]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const seen = new Set<string>();
      const subset: typeof marketData.equities = [];
      for (const item of sortedAll) {
        const key = new Date(item.date).toISOString().split('T')[0];
        if (!seen.has(key)) seen.add(key);
        if (seen.size <= 60) subset.push(item);
        else break;
      }
      result = buildFrom(subset);
    }

    // Final fallback: normalized mock data
    if (result.length === 0) {
      return equitiesData
        .map((d: any) => ({ ...d, egh: d.egh ?? d.eti }))
        .map(({ eti, ...rest }: any) => rest);
    }

    console.log('Equities - Chart data:', result);
    return result;
  }, [marketData.equities]);
  
  // Calculate min and max for the Y axis domain - now includes 5 major companies
  const allValues = chartData.flatMap(item => ['gcb', 'scb', 'egh', 'mtngh', 'total'].map(key => item[key]).filter(Boolean));
  const minValue = allValues.length ? Math.min(...allValues) * 0.98 : 0;
  const maxValue = allValues.length ? Math.max(...allValues) * 1.02 : 30;
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" />
          <YAxis domain={[Math.floor(minValue), Math.ceil(maxValue)]} tickFormatter={(v) => Number(v).toFixed(0)} />
          <Tooltip 
            formatter={(value, name) => [`GHS ${value}`, name]}
            labelFormatter={(label) => `${label}`}
          />
          <Line type="monotone" dataKey="gcb" name="GCB Bank" stroke="#0A2342" strokeWidth={2} dot={false} connectNulls />
          <Line type="monotone" dataKey="scb" name="Standard Chartered" stroke="#126872" strokeWidth={2} dot={false} connectNulls />
          <Line type="monotone" dataKey="egh" name="Ecobank Ghana" stroke="#F2981D" strokeWidth={2} dot={false} connectNulls />
          <Line type="monotone" dataKey="mtngh" name="MTN Ghana" stroke="#FFCC02" strokeWidth={2} dot={false} connectNulls />
          <Line type="monotone" dataKey="total" name="TotalEnergies Ghana" stroke="#DC2626" strokeWidth={2} dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquitiesChart;
