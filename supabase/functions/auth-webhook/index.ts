
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WebhookPayload {
  type: string;
  table: string;
  record: any;
  schema: string;
  old_record: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: WebhookPayload = await req.json();
    
    // Handle user signup events
    if (payload.type === "INSERT" && payload.table === "users") {
      const user = payload.record;
      
      // Extract user details
      const email = user.email;
      const firstName = user.raw_user_meta_data?.first_name;
      const lastName = user.raw_user_meta_data?.last_name;
      
      // Generate confirmation URL (this would typically come from Supabase auth)
      const confirmationUrl = `${supabaseUrl}/auth/v1/verify?token=${user.confirmation_token}&type=signup&redirect_to=${Deno.env.get("SITE_URL") || "https://constantcapital.com"}`;
      
      // Send custom email
      const emailResponse = await supabase.functions.invoke('send-custom-auth-email', {
        body: {
          email,
          confirmationUrl,
          type: 'signup',
          firstName,
          lastName
        }
      });
      
      if (emailResponse.error) {
        console.error("Error sending custom auth email:", emailResponse.error);
      } else {
        console.log("Custom signup email sent successfully");
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in auth webhook:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
