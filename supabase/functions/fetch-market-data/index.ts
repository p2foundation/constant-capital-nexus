import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { MarketDataRecord } from './types.ts';
import { fetchFromFinancialModelingPrep } from './financial-modeling-prep.ts';
import { fetchFromYahooFinance } from './yahoo-finance.ts';
import { fetchFromGSEOfficial } from './gse-official.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { dataSource = 'manual' } = await req.json().catch(() => ({ dataSource: 'manual' }));
    
    console.log(`Fetching market data using source: ${dataSource}`);
    
    if (dataSource === 'manual') {
      return new Response(JSON.stringify({ 
        message: 'Manual mode - no external data fetched',
        success: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let marketData: MarketDataRecord[] = [];

    if (dataSource === 'financial_modeling_prep') {
      marketData = await fetchFromFinancialModelingPrep();
    } else if (dataSource === 'yahoo_finance') {
      marketData = await fetchFromYahooFinance();
    } else if (dataSource === 'gse_official') {
      marketData = await fetchFromGSEOfficial();
    }

    if (marketData.length > 0) {
      // Store fetched data in the database
      const { error } = await supabaseClient
        .from('market_data')
        .upsert(marketData, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log(`Successfully stored ${marketData.length} market data records`);
    }

    return new Response(JSON.stringify({ 
      message: `Successfully fetched and stored ${marketData.length} records from ${dataSource}`,
      recordCount: marketData.length,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-market-data function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});