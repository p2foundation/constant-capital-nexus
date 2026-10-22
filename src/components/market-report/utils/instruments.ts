import { MarketDataByType, MarketDataPoint } from '@/contexts/marketData/types';
import { GSE_COMPANIES } from '@/lib/gseStocks';

export type InstrumentCategory = 'gse' | 'equities' | 'fixedIncome' | 'eurobonds' | 'fx';

export const CATEGORY_LABELS: Record<InstrumentCategory, string> = {
  gse: 'GSE Indices',
  equities: 'Equities',
  fixedIncome: 'Fixed Income',
  eurobonds: 'Eurobonds',
  fx: 'Foreign Exchange',
};

export interface InstrumentRow {
  category: InstrumentCategory;
  symbol: string;
  name: string;
  detail: string;
  value: number;
  change: number | null;
  date: string;
  unit: 'GHS' | '%' | 'pts';
}

const TENOR_NAMES: Record<string, string> = {
  '91-day': '91-Day Treasury Bill',
  '182-day': '182-Day Treasury Bill',
  '364-day': '364-Day Treasury Bill',
};

const describe = (category: InstrumentCategory, symbol: string) => {
  switch (category) {
    case 'gse':
      return { name: symbol === 'GSE-CI' ? 'GSE Composite Index' : symbol, detail: 'Index', unit: 'pts' as const };
    case 'equities': {
      const c = GSE_COMPANIES[symbol];
      return { name: c?.name ?? symbol, detail: c?.sector ?? 'Equity', unit: 'GHS' as const };
    }
    case 'fixedIncome':
      return { name: TENOR_NAMES[symbol] ?? symbol, detail: 'Government of Ghana', unit: '%' as const };
    case 'eurobonds':
      return { name: symbol.replace('-', ' '), detail: 'Sovereign USD bond', unit: '%' as const };
    case 'fx':
      return { name: `${symbol}/GHS`, detail: 'Exchange rate', unit: 'GHS' as const };
  }
};

/** Latest observation for every distinct instrument, across all categories. */
export const buildInstrumentRows = (marketData: MarketDataByType): InstrumentRow[] => {
  const rows: InstrumentRow[] = [];
  (Object.keys(CATEGORY_LABELS) as InstrumentCategory[]).forEach((category) => {
    const latest = new Map<string, MarketDataPoint>();
    (marketData[category] ?? []).forEach((p) => {
      const sym = p.ticker_symbol || (category === 'gse' ? 'GSE-CI' : '');
      if (!sym) return;
      const prev = latest.get(sym);
      if (!prev || new Date(p.date) > new Date(prev.date)) latest.set(sym, p);
    });
    latest.forEach((p, sym) => {
      const d = describe(category, sym);
      rows.push({
        category,
        symbol: sym,
        name: d.name,
        detail: d.detail,
        value: Number(p.value),
        change: p.change_percent == null ? null : Number(p.change_percent),
        date: p.date,
        unit: d.unit,
      });
    });
  });
  return rows.sort((a, b) => a.category.localeCompare(b.category) || a.symbol.localeCompare(b.symbol, undefined, { numeric: true }));
};

export const formatValue = (r: Pick<InstrumentRow, 'value' | 'unit'>) =>
  r.unit === '%'
    ? `${r.value.toFixed(2)}%`
    : r.unit === 'GHS'
      ? `GHS ${r.value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`
      : r.value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatChange = (c: number | null) =>
  c == null ? '—' : `${c >= 0 ? '+' : ''}${c.toFixed(2)}%`;
