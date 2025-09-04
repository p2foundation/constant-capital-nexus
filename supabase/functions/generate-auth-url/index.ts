import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface GenerateUrlRequest {
  userId: string;
  email: string;
  type: 'signup' | 'recovery' | 'email_change';
  redirectTo: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, email, type, redirectTo }: GenerateUrlRequest = await req.json();
    
    // Create admin client using service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Use production URL instead of localhost for redirectTo
    const SITE_URL = Deno.env.get('SITE_URL') || 'https://constantcap.com.gh';
    const productionRedirectTo = redirectTo.replace(/https?:\/\/localhost(:\d+)?/g, SITE_URL);
    
    // Generate the confirmation URL using admin API
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: type === 'signup' ? 'signup' : type === 'recovery' ? 'recovery' : 'email_change',
      email: email,
      options: {
        redirectTo: productionRedirectTo
      }
    });

    if (error) {
      console.error('Error generating auth link:', error);
      throw new Error(`Failed to generate ${type} link: ${error.message}`);
    }

    console.log('Successfully generated auth URL for:', email, 'type:', type);

    return new Response(JSON.stringify({
      confirmationUrl: data.properties?.action_link,
      email: email,
      type: type
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in generate-auth-url function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to generate authentication URL'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);