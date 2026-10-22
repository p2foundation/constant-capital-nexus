import React, { useMemo, useState } from 'react';
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { InstrumentRow, formatChange, formatValue } from './utils/instruments';

const fmtDate = (d?: string) => (d && !isNaN(new Date(d).getTime()) ? format(new Date(d), 'dd MMM yyyy') : '—');
const changeClass = (c: number | null) =>
  c == null || c === 0 ? 'text-muted-foreground' : c > 0 ? 'text-green-600' : 'text-destructive';

const Panel: React.FC<{ title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }> = ({ title, subtitle, children, action }) => (
  <Card className="overflow-hidden print:break-inside-avoid">
    <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
      <div>
        <h3 className="font-heading text-base font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </Card>
);

const RowList: React.FC<{ rows: InstrumentRow[]; empty?: string }> = ({ rows, empty = 'No data published yet.' }) =>
  rows.length === 0 ? (
    <p className="px-5 py-6 text-sm text-muted-foreground">{empty}</p>
  ) : (
    <ul className="divide-y divide-border">
      {rows.map((r) => (
        <li key={r.symbol} className="flex items-center justify-between gap-3 px-5 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.symbol} · {fmtDate(r.date)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold tabular-nums text-foreground">{formatValue(r)}</p>
            <p className={`text-xs tabular-nums ${changeClass(r.change)}`}>{formatChange(r.change)}</p>
          </div>
        </li>
      ))}
    </ul>
  );

const KPI: React.FC<{ label: string; row?: InstrumentRow }> = ({ label, row }) => (
  <Card className="p-4">
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className="mt-2 text-2xl font-bold tabular-nums text-foreground">{row ? formatValue(row) : '—'}</p>
    <p className={`mt-1 inline-flex items-center gap-1 text-sm tabular-nums ${changeClass(row?.change ?? null)}`}>
      {row?.change != null && row.change !== 0 && (row.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />)}
      {formatChange(row?.change ?? null)}
      <span className="ml-1 text-xs text-muted-foreground">{fmtDate(row?.date)}</span>
    </p>
  </Card>
);

const PAGE = 10;

const MarketSummaryView: React.FC<{ rows: InstrumentRow[] }> = ({ rows }) => {
  const [page, setPage] = useState(1);
  const by = (c: InstrumentRow['category']) => rows.filter((r) => r.category === c);
  const equities = useMemo(() => by('equities').sort((a, b) => a.symbol.localeCompare(b.symbol)), [rows]);
  const fixed = by('fixedIncome');
  const fx = by('fx');
  const euro = by('eurobonds');
  const gse = by('gse').find((r) => r.symbol === 'GSE-CI') ?? by('gse')[0];

  const movers = equities.filter((r) => r.change != null && r.change !== 0);
  const gainers = [...movers].filter((r) => r.change! > 0).sort((a, b) => b.change! - a.change!).slice(0, 5);
  const losers = [...movers].filter((r) => r.change! < 0).sort((a, b) => a.change! - b.change!).slice(0, 5);
  const adv = equities.filter((r) => (r.change ?? 0) > 0).length;
  const dec = equities.filter((r) => (r.change ?? 0) < 0).length;

  const pages = Math.max(1, Math.ceil(equities.length / PAGE));
  const cur = Math.min(page, pages);

  return (
    <div className="space-y-6">
      {/* Headline indicators */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI label="GSE Composite Index" row={gse} />
        <KPI label="91-Day T-Bill" row={fixed.find((r) => r.symbol === '91-day')} />
        <KPI label="364-Day T-Bill" row={fixed.find((r) => r.symbol === '364-day')} />
        <KPI label="USD/GHS" row={fx.find((r) => r.symbol === 'USD')} />
      </div>

      {/* Market breadth */}
      <Card className="flex flex-wrap items-center gap-x-8 gap-y-2 px-5 py-4 text-sm">
        <span className="font-medium text-foreground">Equity market breadth</span>
        <span className="text-green-600">{adv} advancers</span>
        <span className="text-destructive">{dec} decliners</span>
        <span className="text-muted-foreground">{equities.length - adv - dec} unchanged</span>
        <span className="text-muted-foreground">{equities.length} listed shares tracked</span>
      </Card>

      {/* Movers */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Top gainers" subtitle="Largest daily price increases">
          <RowList rows={gainers} empty="No gainers in the latest session." />
        </Panel>
        <Panel title="Top decliners" subtitle="Largest daily price falls">
          <RowList rows={losers} empty="No decliners in the latest session." />
        </Panel>
      </div>

      {/* All equities, paginated */}
      <Panel
        title="All GSE equities"
        subtitle="Latest closing prices"
        action={
          <div className="flex items-center gap-2 text-xs text-muted-foreground print:hidden">
            <Button size="sm" variant="outline" disabled={cur <= 1} onClick={() => setPage(cur - 1)} aria-label="Previous page"><ChevronLeft className="h-4 w-4" /></Button>
            <span>{cur} / {pages}</span>
            <Button size="sm" variant="outline" disabled={cur >= pages} onClick={() => setPage(cur + 1)} aria-label="Next page"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                <th className="px-5 py-2.5 text-left font-medium">Symbol</th>
                <th className="px-5 py-2.5 text-left font-medium">Company</th>
                <th className="hidden px-5 py-2.5 text-left font-medium md:table-cell">Sector</th>
                <th className="px-5 py-2.5 text-right font-medium">Price</th>
                <th className="px-5 py-2.5 text-right font-medium">Change</th>
              </tr>
            </thead>
            <tbody>
              {equities.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-6 text-center text-muted-foreground">No equity prices published yet.</td></tr>
              ) : equities.slice((cur - 1) * PAGE, cur * PAGE).map((r) => (
                <tr key={r.symbol} className="border-t border-border">
                  <td className="px-5 py-2.5 font-semibold text-foreground">{r.symbol}</td>
                  <td className="px-5 py-2.5 text-foreground">{r.name}</td>
                  <td className="hidden px-5 py-2.5 text-muted-foreground md:table-cell">{r.detail}</td>
                  <td className="px-5 py-2.5 text-right tabular-nums text-foreground">{formatValue(r)}</td>
                  <td className={`px-5 py-2.5 text-right tabular-nums ${changeClass(r.change)}`}>{formatChange(r.change)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Rates */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="Treasury yields" subtitle="Bank of Ghana auction results"><RowList rows={fixed} /></Panel>
        <Panel title="Foreign exchange" subtitle="Rates against the Ghana Cedi"><RowList rows={fx} /></Panel>
        <Panel title="SSA Eurobonds" subtitle="USD yields · analyst-entered"><RowList rows={euro} /></Panel>
      </div>
    </div>
  );
};

export default MarketSummaryView;
