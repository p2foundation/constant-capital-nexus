import { MarketDataRecord } from './types.ts';

// Real public sources only. If a source fails, it is skipped — never replaced with made-up numbers.
const UA = { 'User-Agent': 'Mozilla/5.0 (ConstantCapital MarketData)' };
const MONTHS: Record<string, string> = { JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06', JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12' };

async function getText(url: string): Promise<string> {
  const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return await res.text();
}
const num = (s: string) => parseFloat(s.replace(/,/g, ''));
const strip = (h: string) => h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');

// Ghana Stock Exchange share prices (same feed as the site's scrolling ticker)
async function equities(): Promise<MarketDataRecord[]> {
  const h = await getText('https://www.gsestockfeed.com/');
  const d = h.match(/id='ticker_date'>(\d{2})-([A-Z]{3})-(\d{2})</);
  if (!d) throw new Error('GSE feed: no date');
  const date = `20${d[3]}-${MONTHS[d[2]]}-${d[1]}`;
  const re = /<li id="([^"]+)"><p class='top'><b>[^<]+<\/b>&nbsp;([\d.,]+),&nbsp;(-?[\d.]+)[^<]*(?:<i[^>]*><\/i>&nbsp;)?<\/p><p class='bottom'>(\d+)/g;
  const out: MarketDataRecord[] = [];
  for (const m of h.matchAll(re)) {
    const price = num(m[2]); const change = num(m[3]); const prev = price - change;
    out.push({
      data_type: 'equity', date, ticker_symbol: m[1], value: price,
      change_percent: prev > 0 ? +((change / prev) * 100).toFixed(2) : 0,
      additional_data: { source: 'gse_stock_feed', absolute_change: change, volume: Number(m[4]), exchange: 'GSE' },
    });
  }
  return out;
}

// GSE Composite Index from the exchange's home page
async function gseIndex(): Promise<MarketDataRecord[]> {
  const t = strip(await getText('https://gse.com.gh/'));
  const prev = t.match(/PREVIOUS \((\d{2})\/(\d{2})\/(\d{4})\) ([\d,]+\.\d+) ([\d,]+\.\d+)/);
  const cur = t.match(/CURRENT \((\d{2})\/(\d{2})\/(\d{4})\) ([\d,]+\.\d+) ([\d,]+\.\d+)/);
  if (!cur) throw new Error('GSE-CI not found');
  const value = num(cur[4]); const p = prev ? num(prev[4]) : 0;
  return [{
    data_type: 'gse', date: `${cur[3]}-${cur[2]}-${cur[1]}`, ticker_symbol: 'GSE-CI', value,
    change_percent: p ? +(((value - p) / p) * 100).toFixed(2) : 0,
    additional_data: { source: 'gse.com.gh', gse_fsi: num(cur[5]) },
  }];
}

// Cedi exchange rates (GHS per 1 unit of foreign currency)
async function fx(): Promise<MarketDataRecord[]> {
  const j = JSON.parse(await getText('https://open.er-api.com/v6/latest/USD'));
  if (j.result !== 'success') throw new Error('FX feed failed');
  const ghs = j.rates.GHS;
  const date = new Date(j.time_last_update_unix * 1000).toISOString().slice(0, 10);
  return ['USD', 'EUR', 'GBP'].map((c) => ({
    data_type: 'fx', date, ticker_symbol: c, value: +(ghs / j.rates[c]).toFixed(4),
    additional_data: { source: 'exchangerate-api.com' },
  }));
}

// Treasury bill rates from the Bank of Ghana (latest auction)
async function tbills(): Promise<MarketDataRecord[]> {
  const t = strip(await getText('https://www.bog.gov.gh/treasury-and-the-markets/treasury-bill-rates/'));
  const re = /(\d{1,2}) ([A-Z][a-z]{2}) (\d{4}) \d{4} (91|182|364) DAY BILL ([\d.]+) ([\d.]+)/g;
  const seen = new Set<string>(); const out: MarketDataRecord[] = [];
  for (const m of t.matchAll(re)) {
    const tenor = `${m[4]}-day`;
    if (seen.has(tenor)) continue; // first row = latest auction
    seen.add(tenor);
    out.push({
      data_type: 'fixed_income', date: `${m[3]}-${MONTHS[m[2].toUpperCase()]}-${m[1].padStart(2, '0')}`,
      ticker_symbol: tenor, value: num(m[6]),
      additional_data: { source: 'bog.gov.gh', discount_rate: num(m[5]), type: 'treasury_bill' },
    });
    if (seen.size === 3) break;
  }
  return out;
}

export async function fetchGhanaLive(): Promise<{ records: MarketDataRecord[]; errors: string[] }> {
  const jobs = { equities, gseIndex, fx, tbills };
  const records: MarketDataRecord[] = []; const errors: string[] = [];
  await Promise.all(Object.entries(jobs).map(async ([name, fn]) => {
    try { const r = await fn(); records.push(...r); console.log(`${name}: ${r.length} records`); }
    catch (e) { errors.push(`${name}: ${(e as Error).message}`); console.error(name, e); }
  }));
  return { records, errors };
}
