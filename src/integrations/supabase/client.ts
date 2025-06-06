
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://estbtjkwlgefncxmxzta.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzdGJ0amt3bGdlZm5jeG14enRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0Mzk0MjMsImV4cCI6MjA2MjAxNTQyM30.SIGglOueV8PQEVRcCGffVZUPPAT4AhMjMXRGqZZyluI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage,
    // Session detection in URL
    detectSessionInUrl: true,
    flowType: 'pkce',
    // Removed sessionExpirySeconds as it's not a valid property
  }
});
