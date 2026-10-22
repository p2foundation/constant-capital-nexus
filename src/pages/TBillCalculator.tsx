import React, { useEffect, useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAnalytics } from '@/hooks/useAnalytics';
import { ghs, loadLatestTBillRates } from '@/lib/gseStocks';

const TENORS = [91, 182, 364] as const;
const num = (s: string) => { const n = parseFloat(s); return isFinite(n) ? n : 0; };

const TBillCalculator = () => {
  useAnalytics();
  const [mode, setMode] = useState<'invest' | 'face'>('invest');
  const [amount, setAmount] = useState('10000');
  const [term, setTerm] = useState<number>(91);
  const [rate, setRate] = useState('');
  const [live, setLive] = useState<Record<string, number>>({});
  const [liveDate, setLiveDate] = useState<string>();

  useEffect(() => {
    loadLatestTBillRates().then(({ rates, date }) => {
      setLive(rates); setLiveDate(date);
      if (rates['91-day']) setRate(String(rates['91-day']));
    });
  }, []);

  const pickTerm = (t: number) => {
    setTerm(t);
    const lr = live[`${t}-day`];
    if (lr) setRate(String(lr));
  };

  const r = useMemo(() => {
    const y = num(rate) / 100, factor = 1 + (y * term) / 364;
    const principal = mode === 'invest' ? num(amount) : num(amount) / factor;
    const maturity = principal * factor;
    const interest = maturity - principal;
    const discount = factor > 0 ? (y / factor) * 100 : 0;
    const rollovers = 364 / term;
    const yearValue = principal * Math.pow(factor, rollovers);
    const effective = principal > 0 ? (yearValue / principal - 1) * 100 : 0;
    const maturityDate = new Date(Date.now() + term * 864e5);
    return { principal, maturity, interest, discount, yearValue, effective, maturityDate };
  }, [mode, amount, term, rate]);

  const liveLabel = liveDate ? new Date(liveDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="container mx-auto mt-16 flex-1 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">Calculators</p>
          <h1 className="font-heading mb-3 text-3xl font-bold text-foreground md:text-4xl">Treasury bill calculator</h1>
          <p className="mb-8 max-w-2xl text-muted-foreground">
            See what you pay, what you earn and what you receive at maturity on Government of Ghana treasury bills.
            {liveLabel && <> Rates are from the Bank of Ghana auction of <span className="font-medium text-foreground">{liveLabel}</span>.</>}
          </p>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="space-y-5 rounded-2xl border border-border bg-card p-6 lg:col-span-3">
              <div className="space-y-1.5">
                <Label>I want to</Label>
                <div className="grid grid-cols-2 gap-2">
                  {([['invest', 'Invest an amount'], ['face', 'Receive an amount']] as const).map(([v, l]) => (
                    <button key={v} type="button" onClick={() => setMode(v)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${mode === v ? 'border-accent bg-accent text-accent-foreground' : 'border-border text-foreground hover:border-accent/50'}`}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Tenor</Label>
                <div className="grid grid-cols-3 gap-2">
                  {TENORS.map((t) => (
                    <button key={t} type="button" onClick={() => pickTerm(t)}
                      className={`rounded-lg border px-3 py-3 text-left transition ${term === t ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/50'}`}>
                      <span className="block text-sm font-semibold text-foreground">{t} days</span>
                      <span className="block text-xs text-muted-foreground">{live[`${t}-day`] ? `${live[`${t}-day`].toFixed(2)}% p.a.` : '—'}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="amount">{mode === 'invest' ? 'Amount to invest (GH₵)' : 'Amount to receive at maturity (GH₵)'}</Label>
                  <Input id="amount" type="number" inputMode="decimal" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rate">Interest rate (% per year)</Label>
                  <Input id="rate" type="number" inputMode="decimal" min="0" step="0.0001" value={rate} onChange={(e) => setRate(e.target.value)} />
                  <p className="text-xs text-muted-foreground">Pre-filled with the latest auction rate — you can change it</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <Calculator className="h-5 w-5 text-accent" /> Your results
                </h2>
                <dl className="space-y-3 text-sm">
                  {[
                    ['You pay today', ghs(r.principal)],
                    ['Interest earned', ghs(r.interest)],
                    ['Discount rate', `${r.discount.toFixed(4)}%`],
                    ['Maturity date', r.maturityDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })],
                    ...(term < 364 ? [['If rolled over for a year', `${ghs(r.yearValue)} (${r.effective.toFixed(2)}%)`]] : []),
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-border pb-2 last:border-0">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="text-right font-medium text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-2xl bg-accent p-6 text-accent-foreground">
                <p className="text-sm font-medium opacity-90">Maturity value (you receive)</p>
                <p className="font-heading text-3xl font-bold">{ghs(r.maturity)}</p>
                <p className="mt-1 text-xs opacity-90">After {term} days</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Uses the Bank of Ghana method: maturity value = amount × (1 + rate × days ÷ 364). The rollover figure assumes the same rate at every rollover. For illustration only.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TBillCalculator;
