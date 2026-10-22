ALTER TABLE public.market_data ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'manual';

CREATE OR REPLACE FUNCTION public.protect_manual_market_data()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  -- Admin corrections always win: automatic feeds never overwrite a manual row
  IF OLD.source = 'manual' AND NEW.source = 'auto' THEN
    RETURN OLD;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.protect_manual_market_data() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS protect_manual_market_data ON public.market_data;
CREATE TRIGGER protect_manual_market_data BEFORE UPDATE ON public.market_data
FOR EACH ROW EXECUTE FUNCTION public.protect_manual_market_data();

CREATE EXTENSION IF NOT EXISTS pg_net;
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.unschedule('market-data-auto-sync') WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'market-data-auto-sync');
SELECT cron.schedule('market-data-auto-sync', '0 9-17 * * 1-5', $$
  SELECT net.http_post(
    url := 'https://estbtjkwlgefncxmxzta.supabase.co/functions/v1/fetch-market-data',
    headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdGJ0amt3bGdlZm5jeG14enRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0Mzk0MjMsImV4cCI6MjA2MjAxNTQyM30.SIGglOueV8PQEVRcCGffVZUPPAT4AhMjMXRGqZZyluI","Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdGJ0amt3bGdlZm5jeG14enRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0Mzk0MjMsImV4cCI6MjA2MjAxNTQyM30.SIGglOueV8PQEVRcCGffVZUPPAT4AhMjMXRGqZZyluI"}'::jsonb,
    body := '{"scheduled":true}'::jsonb
  );
$$);