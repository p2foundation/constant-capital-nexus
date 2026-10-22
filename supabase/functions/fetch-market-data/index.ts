import { createClient } from 'npm:@supabase/supabase-js@2';
import { MarketDataRecord } from './types.ts';
import { fetchGhanaLive } from './ghana-live.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

const MIN_SCHEDULED_GAP_MS = 30 * 60 * 1000;
const VALID = ['financial_modeling_prep', 'yahoo_finance', 'gse_official'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    // Is the caller signed-in research staff? (manual "Fetch now")
    let isStaff = false;
    const auth = req.headers.get('Authorization') ?? '';
    if (auth.startsWith('Bearer ')) {
      const userClient = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, {
        global: { headers: { Authorization: auth } },
      });
      const { data } = await userClient.rpc('can_edit_content');
      isStaff = data === true;
    }

    const { data: rows } = await admin.from('settings').select('key,value')
      .in('key', ['market_data_source', 'market_data_auto_sync', 'market_data_last_fetch']);
    const s = Object.fromEntries((rows ?? []).map((r) => [r.key, r.value]));
    const source = String(s.market_data_source ?? 'manual');

    if (!isStaff) {
      // Scheduled / anonymous calls: only when auto-sync is on, and at most every 30 minutes
      if (s.market_data_auto_sync !== true) return json(200, { success: true, skipped: 'auto-sync off' });
      const last = s.market_data_last_fetch ? Date.parse(String(s.market_data_last_fetch)) : 0;
      if (Date.now() - last < MIN_SCHEDULED_GAP_MS) return json(200, { success: true, skipped: 'recently fetched' });
    }

    if (!VALID.includes(source)) return json(200, { success: true, message: 'Manual mode - no external data fetched' });

    // Every automatic source now uses real published Ghana data (no simulated values)
    const { records: marketData, errors } = await fetchGhanaLive();

    if (marketData.length > 0) {
      // Tagged 'auto': the database keeps any admin-entered (manual) row unchanged
      const tagged = marketData.map((r) => ({ ...r, source: 'auto' }));
      const { error } = await admin.from('market_data').upsert(tagged, {
        onConflict: 'data_type,ticker_symbol,date',
        ignoreDuplicates: false,
      });
      if (error) throw error;
    }

    await admin.from('settings').upsert({ key: 'market_data_last_fetch', value: new Date().toISOString() });

    return json(200, {
      message: `Fetched ${marketData.length} live records. Manual corrections were kept.`,
      errors,
      recordCount: marketData.length,
      success: true,
    });
  } catch (error) {
    console.error('fetch-market-data error:', error);
    return json(500, { error: (error as Error).message, success: false });
  }
});
