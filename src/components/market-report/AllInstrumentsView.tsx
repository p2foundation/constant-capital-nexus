import React, { useMemo, useState } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CATEGORY_LABELS, InstrumentCategory, InstrumentRow, formatChange, formatValue } from './utils/instruments';
import { format } from 'date-fns';

const PAGE_SIZE = 15;
type SortKey = 'symbol' | 'value' | 'change';

const AllInstrumentsView: React.FC<{ rows: InstrumentRow[] }> = ({ rows }) => {
  const [category, setCategory] = useState<InstrumentCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'symbol', dir: 1 });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows
      .filter((r) => category === 'all' || r.category === category)
      .filter((r) => !q || `${r.symbol} ${r.name} ${r.detail}`.toLowerCase().includes(q))
      .sort((a, b) => {
        const av = sort.key === 'symbol' ? a.symbol : sort.key === 'value' ? a.value : a.change ?? -Infinity;
        const bv = sort.key === 'symbol' ? b.symbol : sort.key === 'value' ? b.value : b.change ?? -Infinity;
        return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir;
      });
  }, [rows, category, query, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const counts = (c: InstrumentCategory) => rows.filter((r) => r.category === c).length;

  const toggleSort = (key: SortKey) =>
    setSort((s) => ({ key, dir: s.key === key ? ((s.dir * -1) as 1 | -1) : key === 'symbol' ? 1 : -1 }));

  const SortHead = ({ k, label, right }: { k: SortKey; label: string; right?: boolean }) => (
    <th className={`px-4 py-3 font-medium ${right ? 'text-right' : 'text-left'}`}>
      <button onClick={() => toggleSort(k)} className="inline-flex items-center gap-1 hover:text-foreground">
        {label}<ArrowUpDown className="h-3 w-3" />
      </button>
    </th>
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(['all', ...Object.keys(CATEGORY_LABELS)] as const).map((c) => (
          <Button
            key={c}
            size="sm"
            variant={category === c ? 'default' : 'outline'}
            onClick={() => { setCategory(c as InstrumentCategory | 'all'); setPage(1); }}
          >
            {c === 'all' ? `All (${rows.length})` : `${CATEGORY_LABELS[c as InstrumentCategory]} (${counts(c as InstrumentCategory)})`}
          </Button>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search symbol, name or sector"
          className="pl-9"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                <SortHead k="symbol" label="Symbol" />
                <th className="px-4 py-3 text-left font-medium">Instrument</th>
                <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Market</th>
                <SortHead k="value" label="Value" right />
                <SortHead k="change" label="Change" right />
                <th className="hidden px-4 py-3 text-right font-medium sm:table-cell">As at</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No instruments match your filters.</td></tr>
              ) : visible.map((r) => (
                <tr key={`${r.category}-${r.symbol}`} className="border-t border-border">
                  <td className="px-4 py-3 font-semibold text-foreground">{r.symbol}</td>
                  <td className="px-4 py-3">
                    <div className="text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.detail}</div>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{CATEGORY_LABELS[r.category]}</td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums text-foreground">{formatValue(r)}</td>
                  <td className={`px-4 py-3 text-right tabular-nums ${r.change == null || r.change === 0 ? 'text-muted-foreground' : r.change > 0 ? 'text-green-600' : 'text-destructive'}`}>
                    {formatChange(r.change)}
                  </td>
                  <td className="hidden px-4 py-3 text-right text-muted-foreground sm:table-cell">
                    {isNaN(new Date(r.date).getTime()) ? r.date : format(new Date(r.date), 'dd MMM yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
          <span>
            {filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" disabled={current <= 1} onClick={() => setPage(current - 1)} aria-label="Previous page">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>Page {current} of {pages}</span>
            <Button size="sm" variant="outline" disabled={current >= pages} onClick={() => setPage(current + 1)} aria-label="Next page">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AllInstrumentsView;
