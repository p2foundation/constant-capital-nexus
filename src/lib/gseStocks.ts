import { supabase } from '@/integrations/supabase/client';

export const GSE_COMPANIES: Record<string, { name: string; sector: string }> = {
  AADS: { name: 'AngloGold Ashanti Depository Shares', sector: 'Mining' },
  ACCESS: { name: 'Access Bank Ghana', sector: 'Banking' },
  ADB: { name: 'Agricultural Development Bank', sector: 'Banking' },
  AGA: { name: 'AngloGold Ashanti', sector: 'Mining' },
  ALLGH: { name: 'Atlantic Lithium', sector: 'Mining' },
  ALW: { name: 'Aluworks', sector: 'Manufacturing' },
  ASG: { name: 'Asante Gold Corporation', sector: 'Mining' },
  BOPP: { name: 'Benso Oil Palm Plantation', sector: 'Agriculture' },
  CAL: { name: 'CalBank', sector: 'Banking' },
  CLYD: { name: 'Clydestone (Ghana)', sector: 'Technology' },
  CMLT: { name: 'Camelot Ghana', sector: 'Manufacturing' },
  CPC: { name: 'Cocoa Processing Company', sector: 'Manufacturing' },
  DASPHARMA: { name: 'Dannex Ayrton Starwin', sector: 'Pharmaceuticals' },
  DIGICUT: { name: 'Digicut Production & Advertising', sector: 'Media' },
  EGH: { name: 'Ecobank Ghana', sector: 'Banking' },
  EGL: { name: 'Enterprise Group', sector: 'Insurance' },
  ETI: { name: 'Ecobank Transnational Inc.', sector: 'Banking' },
  FAB: { name: 'First Atlantic Bank', sector: 'Banking' },
  FML: { name: 'Fan Milk', sector: 'Food & Beverage' },
  GCB: { name: 'GCB Bank', sector: 'Banking' },
  GGBL: { name: 'Guinness Ghana Breweries', sector: 'Food & Beverage' },
  GLD: { name: 'NewGold ETF', sector: 'ETF' },
  GOIL: { name: 'GOIL', sector: 'Oil & Gas' },
  HORDS: { name: 'Hords', sector: 'Distribution' },
  IIL: { name: 'Intravenous Infusions', sector: 'Pharmaceuticals' },
  KASA: { name: 'Kasapreko Company', sector: 'Food & Beverage' },
  MAC: { name: 'Mega African Capital', sector: 'Financial Services' },
  MMH: { name: 'Meridian-Marshalls Holding', sector: 'Financial Services' },
  MTNGH: { name: 'MTN Ghana', sector: 'Telecommunications' },
  PBC: { name: 'Produce Buying Company', sector: 'Agriculture' },
  RBGH: { name: 'Republic Bank Ghana', sector: 'Banking' },
  SAMBA: { name: 'Samba Foods', sector: 'Food & Beverage' },
  SCB: { name: 'Standard Chartered Bank Ghana', sector: 'Banking' },
  SCBPREF: { name: 'Standard Chartered Bank Ghana (Preference)', sector: 'Banking' },
  SIC: { name: 'SIC Insurance', sector: 'Insurance' },
  SOGEGH: { name: 'Societe Generale Ghana', sector: 'Banking' },
  TLW: { name: 'Tullow Oil', sector: 'Oil & Gas' },
  TOTAL: { name: 'TotalEnergies Marketing Ghana', sector: 'Oil & Gas' },
  UNIL: { name: 'Unilever Ghana', sector: 'Consumer Goods' },
};

// Verified dividends (gross, GHS per share). Add new declarations here as they are announced.
export const GSE_DIVIDENDS: Record<string, { dps: number; label: string }> = {
  SCB: { dps: 2.6, label: 'FY2025 final, paid 30 May 2026' },
  GCB: { dps: 1.2, label: 'FY2025 final, paid 6 Jun 2026' },
  MTNGH: { dps: 0.272, label: 'FY2025 final, paid 23 May 2026' },
  GOIL: { dps: 0.075, label: 'FY2025 final, paid 25 Jun 2026' },
};

export const DIVIDEND_WHT = 0.08; // Ghana withholding tax on dividends (final tax)

export interface GseQuote {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  changePercent: number;
  date: string;
  dps?: number;
  dpsLabel?: string;
}

export async function loadGseQuotes(): Promise<GseQuote[]> {
  const since = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from('market_data')
    .select('ticker_symbol,value,change_percent,date')
    .eq('data_type', 'equity')
    .gte('date', since)
    .order('date', { ascending: false })
    .limit(1000);
  if (error) throw error;
  const latest = new Map<string, GseQuote>();
  (data ?? []).forEach((r) => {
    const s = r.ticker_symbol as string;
    if (!s || latest.has(s)) return;
    const info = GSE_COMPANIES[s] ?? { name: s, sector: 'Other' };
    const div = GSE_DIVIDENDS[s];
    latest.set(s, {
      symbol: s, name: info.name, sector: info.sector,
      price: Number(r.value), changePercent: Number(r.change_percent ?? 0), date: r.date as string,
      dps: div?.dps, dpsLabel: div?.label,
    });
  });
  return [...latest.values()].sort((a, b) => a.symbol.localeCompare(b.symbol));
}

export async function loadLatestTBillRates(): Promise<{ rates: Record<string, number>; date?: string }> {
  const { data } = await supabase
    .from('market_data')
    .select('ticker_symbol,value,date')
    .eq('data_type', 'fixed_income')
    .in('ticker_symbol', ['91-day', '182-day', '364-day'])
    .order('date', { ascending: false })
    .limit(30);
  const rates: Record<string, number> = {};
  let date: string | undefined;
  (data ?? []).forEach((r) => {
    const k = r.ticker_symbol as string;
    if (!(k in rates)) { rates[k] = Number(r.value); date = date ?? (r.date as string); }
  });
  return { rates, date };
}

export const ghs = (n: number) =>
  `GH₵ ${(isFinite(n) ? n : 0).toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
