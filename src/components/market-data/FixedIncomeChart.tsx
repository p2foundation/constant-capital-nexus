
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMarketData } from '@/contexts/MarketDataContext';

const FixedIncomeChart: React.FC = () => {
  const { marketData } = useMarketData();

  const { chartData, latestYieldCurve, hasHistory, latestDate } = React.useMemo(() => {
    const allValidData = marketData.fixedIncome.filter(item =>
      item.date && item.ticker_symbol && Number.isFinite(Number(item.value))
    );
    const verifiedData = allValidData.filter(item => item.source === 'auto');
    const validData = verifiedData.length > 0 ? verifiedData : allValidData;
    const dates = [...new Set(validData.map(item => item.date))]
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const recentDates = dates.slice(-12);
    const tenorFor = (ticker: string | null | undefined) => {
      const normalized = ticker?.toLowerCase().replace(/[^0-9]/g, '') ?? '';
      if (normalized.startsWith('91')) return '91';
      if (normalized.startsWith('182')) return '182';
      if (normalized.startsWith('364')) return '364';
      return null;
    };
    const historical = recentDates.map(date => {
      const dateItems = validData.filter(item => item.date === date);
      return {
        name: new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        yield91: dateItems.find(item => tenorFor(item.ticker_symbol) === '91')?.value,
        yield182: dateItems.find(item => tenorFor(item.ticker_symbol) === '182')?.value,
        yield364: dateItems.find(item => tenorFor(item.ticker_symbol) === '364')?.value,
      };
    });
    const newestDate = recentDates[recentDates.length - 1];
    const newestItems = newestDate ? validData.filter(item => item.date === newestDate) : [];
    const curve = [
      { name: '91 days', yield: newestItems.find(item => tenorFor(item.ticker_symbol) === '91')?.value },
      { name: '182 days', yield: newestItems.find(item => tenorFor(item.ticker_symbol) === '182')?.value },
      { name: '364 days', yield: newestItems.find(item => tenorFor(item.ticker_symbol) === '364')?.value },
    ].filter(point => point.yield !== undefined);

    return {
      chartData: historical,
      latestYieldCurve: curve,
      hasHistory: historical.length > 1,
      latestDate: newestDate,
    };
  }, [marketData.fixedIncome]);

  const displayedData = hasHistory ? chartData : latestYieldCurve;
  const valueKeys = hasHistory ? ['yield91', 'yield182', 'yield364'] : ['yield'];
  const allValues = displayedData.flatMap(item =>
    valueKeys.map(key => Number(item[key as keyof typeof item])).filter(Number.isFinite)
  );
  const minYield = allValues.length ? Math.min(...allValues) : 0;
  const maxYield = allValues.length ? Math.max(...allValues) : 10;
  const padding = Math.max((maxYield - minYield) * 0.2, 0.5);
  const domain: [number, number] = [
    Math.max(0, Math.floor((minYield - padding) * 10) / 10),
    Math.ceil((maxYield + padding) * 10) / 10,
  ];

  if (displayedData.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
        Fixed-income yields are not available yet.
      </div>
    );
  }
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={displayedData}
          margin={{ top: 18, right: 24, left: 10, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <YAxis
            domain={domain}
            width={58}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickFormatter={(value) => `${Number(value).toFixed(1)}%`}
          />
          <Tooltip 
            formatter={(value, name) => [`${Number(value).toFixed(3)}%`, name]}
            labelFormatter={(label) => hasHistory ? label : `${label} · ${latestDate ? new Date(`${latestDate}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}`}
            contentStyle={{ background: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--card-foreground))' }}
          />
          {hasHistory && <Legend />}
          {hasHistory && <Line type="monotone" dataKey="yield91" name="91-Day T-Bill" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} connectNulls />}
          {hasHistory && <Line type="monotone" dataKey="yield182" name="182-Day T-Bill" stroke="hsl(var(--secondary))" strokeWidth={3} dot={{ r: 4 }} connectNulls />}
          {hasHistory && <Line type="monotone" dataKey="yield364" name="364-Day Note" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ r: 4 }} connectNulls />}
          {!hasHistory && <Line type="monotone" dataKey="yield" name="Latest auction yield" stroke="hsl(var(--accent))" strokeWidth={4} dot={{ r: 6, fill: 'hsl(var(--accent))' }} activeDot={{ r: 8 }} />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FixedIncomeChart;
