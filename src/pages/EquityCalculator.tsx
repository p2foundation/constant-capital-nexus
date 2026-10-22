import React, { useEffect, useMemo, useState } from 'react';
import { Calculator, Search, TrendingDown, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useAnalytics } from '@/hooks/useAnalytics';
import { DIVIDEND_WHT, GseQuote, ghs, loadGseQuotes } from '@/lib/gseStocks';

const num = (s: string) => { const n = parseFloat(s); return isFinite(n) ? n : 0; };

const Field = ({ id, label, hint, ...p }: { id: string; label: string; hint?: string } & React.ComponentProps<typeof Input>) => (
  <div className="space-y-1.5">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type="number" inputMode="decimal" min="0" {...p} />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

const EquityCalculator = () => {
  useAnalytics();
  const [quotes, setQuotes] = useState<GseQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [symbol, setSymbol] = useState('MTNGH');
  const [amount, setAmount] = useState('10000');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [months, setMonths] = useState('12');
  const [dps, setDps] = useState('0');
  const [fee, setFee] = useState('0');
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('calculator');
  const pick = (q: GseQuote) => {
    setSymbol(q.symbol);
    setTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success(`${q.symbol} selected`, { description: `${q.name} at ${ghs(q.price)} loaded into the calculator.` });
  };

  useEffect(() => {
    loadGseQuotes().then(setQuotes).catch(console.error).finally(() => setLoading(false));
  }, []);

  const stock = quotes.find((q) => q.symbol === symbol);

  useEffect(() => {
    if (!stock) return;
    setBuyPrice(stock.price.toFixed(2));
    setSellPrice(stock.price.toFixed(2));
    setDps(String(stock.dps ?? 0));
  }, [stock?.symbol, stock?.price]); // eslint-disable-line react-hooks/exhaustive-deps

  const r = useMemo(() => {
    const buy = num(buyPrice), sell = num(sellPrice), f = num(fee) / 100, years = Math.max(num(months), 1) / 12;
    const shares = buy > 0 ? Math.floor(num(amount) / (buy * (1 + f))) : 0;
    const cost = shares * buy * (1 + f);
    const proceeds = shares * sell * (1 - f);
    const capital = proceeds - cost;
    const divGross = num(dps) * shares * years;
    const divNet = divGross * (1 - DIVIDEND_WHT);
    const total = capital + divNet;
    const pct = cost > 0 ? (total / cost) * 100 : 0;
    const annual = cost > 0 && cost + total > 0 ? (Math.pow((cost + total) / cost, 1 / years) - 1) * 100 : 0;
    const yieldPct = buy > 0 ? (num(dps) / buy) * 100 : 0;
    return { shares, cost, proceeds, capital, divGross, divNet, total, pct, annual, yieldPct, leftover: num(amount) - cost };
  }, [amount, buyPrice, sellPrice, months, dps, fee]);

  const filtered = quotes.filter((q) =>
    `${q.symbol} ${q.name} ${q.sector}`.toLowerCase().includes(query.toLowerCase()));
  const asOf = quotes[0]?.date ? new Date(quotes.reduce((m, q) => (q.date > m ? q.date : m), quotes[0].date)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="container mx-auto mt-16 flex-1 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Calculators</p>
          <h1 className="font-heading mb-3 text-3xl font-bold text-foreground md:text-4xl">Equity investment calculator</h1>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            Pick any Ghana Stock Exchange share, enter how much you want to invest, and see your shares, dividends after tax and total return.
            {asOf && <> Prices as of <span className="font-medium text-foreground">{asOf}</span>.</>}
          </p>

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mb-6 grid w-full grid-cols-2 sm:w-auto sm:inline-grid">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="stocks">All GSE shares ({quotes.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              <div className="grid gap-6 lg:grid-cols-5">
                <div className="space-y-5 rounded-2xl border border-border bg-card p-6 lg:col-span-3">
                  <div className="space-y-1.5">
                    <Label>Share</Label>
                    <Select value={symbol} onValueChange={(v) => { const q = quotes.find((x) => x.symbol === v); if (q) pick(q); }} disabled={loading}>
                      <SelectTrigger><SelectValue placeholder={loading ? 'Loading shares…' : 'Select a share'} /></SelectTrigger>
                      <SelectContent className="max-h-80">
                        {quotes.map((q) => (
                          <SelectItem key={q.symbol} value={q.symbol}>
                            {q.symbol} · {q.name} · {ghs(q.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {stock && (
                    <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/50 p-4 text-sm sm:grid-cols-4">
                      <div><p className="text-muted-foreground">Price</p><p className="font-semibold text-foreground">{ghs(stock.price)}</p></div>
                      <div><p className="text-muted-foreground">Day change</p>
                        <p className={`flex items-center gap-1 font-semibold ${stock.changePercent < 0 ? 'text-destructive' : 'text-accent'}`}>
                          {stock.changePercent < 0 ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}{stock.changePercent.toFixed(2)}%
                        </p></div>
                      <div><p className="text-muted-foreground">Sector</p><p className="font-semibold text-foreground">{stock.sector}</p></div>
                      <div><p className="text-muted-foreground">Last dividend</p>
                        <p className="font-semibold text-foreground">{stock.dps ? ghs(stock.dps) : 'Not on record'}</p></div>
                      {stock.dpsLabel && <p className="col-span-full text-xs text-muted-foreground">Dividend: {stock.dpsLabel}</p>}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="amount" label="Amount to invest (GH₵)" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <Field id="months" label="Holding period (months)" value={months} onChange={(e) => setMonths(e.target.value)} />
                    <Field id="buy" label="Buying price (GH₵)" step="0.01" value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} hint="Defaults to the latest price" />
                    <Field id="sell" label="Expected selling price (GH₵)" step="0.01" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} hint="Your target price when you sell" />
                    <Field id="dps" label="Dividend per share per year (GH₵)" step="0.001" value={dps} onChange={(e) => setDps(e.target.value)} hint={`Yield at buying price: ${r.yieldPct.toFixed(2)}%`} />
                    <Field id="fee" label="Transaction costs (% per trade)" step="0.01" value={fee} onChange={(e) => setFee(e.target.value)} hint="Brokerage and levies — ask us for current rates" />
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-2">
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h2 className="font-heading mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Calculator className="h-5 w-5 text-accent" /> Your results
                    </h2>
                    <dl className="space-y-3 text-sm">
                      {[
                        ['Shares you can buy', r.shares.toLocaleString()],
                        ['Total cost incl. fees', ghs(r.cost)],
                        ['Cash left over', ghs(r.leftover)],
                        ['Capital gain / loss', ghs(r.capital), r.capital < 0],
                        ['Dividends (gross)', ghs(r.divGross)],
                        [`Dividends after ${DIVIDEND_WHT * 100}% tax`, ghs(r.divNet)],
                        ['Total return', `${ghs(r.total)} (${r.pct.toFixed(2)}%)`, r.total < 0],
                        ['Annualised return', `${r.annual.toFixed(2)}%`, r.annual < 0],
                      ].map(([k, v, neg]) => (
                        <div key={k as string} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                          <dt className="text-muted-foreground">{k}</dt>
                          <dd className={`text-right font-medium ${neg ? 'text-destructive' : 'text-foreground'}`}>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="rounded-2xl bg-accent p-6 text-accent-foreground">
                    <p className="text-sm font-medium opacity-90">Value when you sell (incl. dividends)</p>
                    <p className="font-heading text-3xl font-bold">{ghs(r.proceeds + r.divNet)}</p>
                    <p className="mt-1 text-xs opacity-90">{r.shares.toLocaleString()} shares × {ghs(num(sellPrice))} after {months || 0} months</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Dividends assume the same payout each year. Ghana deducts {DIVIDEND_WHT * 100}% withholding tax on dividends as a final tax. Past dividends do not guarantee future payouts. For illustration only, not investment advice.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stocks">
              <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
                <div className="relative mb-4 max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Search by name, symbol or sector" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="hidden md:table-cell">Sector</TableHead>
                        <TableHead className="text-right">Price (GH₵)</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                        <TableHead className="text-right">Dividend</TableHead>
                        <TableHead className="text-right">Yield</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((q) => (
                        <TableRow key={q.symbol} className={`cursor-pointer ${q.symbol === symbol ? 'bg-accent/10' : ''}`} onClick={() => pick(q)} title="Use in calculator">
                          <TableCell className="font-semibold">{q.symbol}</TableCell>
                          <TableCell>{q.name}</TableCell>
                          <TableCell className="hidden text-muted-foreground md:table-cell">{q.sector}</TableCell>
                          <TableCell className="text-right">{q.price.toFixed(2)}</TableCell>
                          <TableCell className={`text-right ${q.changePercent < 0 ? 'text-destructive' : q.changePercent > 0 ? 'text-accent' : ''}`}>{q.changePercent.toFixed(2)}%</TableCell>
                          <TableCell className="text-right">{q.dps ? q.dps.toFixed(3) : '—'}</TableCell>
                          <TableCell className="text-right">{q.dps ? `${((q.dps / q.price) * 100).toFixed(2)}%` : '—'}</TableCell>
                        </TableRow>
                      ))}
                      {!loading && filtered.length === 0 && (
                        <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground">No shares found</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Prices from the Ghana Stock Exchange daily feed. Tap a row to use it in the calculator. "—" means no dividend on our records for the last financial year.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EquityCalculator;
