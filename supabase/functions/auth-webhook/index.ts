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

interface AuthEventPayload {
  event: string;
  session: any;
  user: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log("Auth webhook received payload:", JSON.stringify(payload, null, 2));
    
    // Handle auth events (password recovery, email confirmation, etc.)
    if (payload.event) {
      console.log("Processing auth event:", payload.event);
      
      if (payload.event === "password_recovery" && payload.user) {
        const user = payload.user;
        const email = user.email;
        const firstName = user.user_metadata?.first_name || user.raw_user_meta_data?.first_name;
        const lastName = user.user_metadata?.last_name || user.raw_user_meta_data?.last_name;
        
        // Create recovery URL with proper tokens
        const siteUrl = Deno.env.get("SITE_URL") || "https://constantcap.com.gh";
        
        // For password recovery, we need to create a URL that includes the recovery tokens
        // The tokens should be available in the auth event
        let confirmationUrl;
        if (payload.session?.access_token) {
          confirmationUrl = `${siteUrl}/auth/reset-password#access_token=${payload.session.access_token}&refresh_token=${payload.session.refresh_token}&expires_in=${payload.session.expires_in}&token_type=bearer&type=recovery`;
        } else {
          // Fallback URL structure
          confirmationUrl = `${siteUrl}/auth/reset-password`;
        }
        
        console.log("Sending password recovery email to:", email);
        console.log("Recovery URL:", confirmationUrl);
        
        // Send custom password recovery email
        const emailResponse = await supabase.functions.invoke('send-custom-auth-email', {
          body: {
            email,
            confirmationUrl,
            type: 'recovery',
            firstName,
            lastName
          }
        });
        
        if (emailResponse.error) {
          console.error("Error sending custom recovery email:", emailResponse.error);
        } else {
          console.log("Custom password recovery email sent successfully");
        }
      }
      
      // Handle email change confirmation
      if (payload.event === "email_change" && payload.user) {
        const user = payload.user;
        const email = user.new_email || user.email;
        const firstName = user.user_metadata?.first_name || user.raw_user_meta_data?.first_name;
        const lastName = user.user_metadata?.last_name || user.raw_user_meta_data?.last_name;
        
        // Create email change confirmation URL
        const siteUrl = Deno.env.get("SITE_URL") || "https://constantcap.com.gh";
        const confirmationUrl = `${siteUrl}/auth/confirm`;
        
        console.log("Sending email change confirmation to:", email);
        
        // Send custom email change confirmation
        const emailResponse = await supabase.functions.invoke('send-custom-auth-email', {
          body: {
            email,
            confirmationUrl,
            type: 'email_change',
            firstName,
            lastName
          }
        });
        
        if (emailResponse.error) {
          console.error("Error sending custom email change email:", emailResponse.error);
        } else {
          console.log("Custom email change confirmation sent successfully");
        }
      }
    }
    
    // Handle database webhook events (user signup)
    if (payload.type === "INSERT" && payload.table === "users") {
      const user = payload.record;
      
      // Extract user details
      const email = user.email;
      const firstName = user.raw_user_meta_data?.first_name;
      const lastName = user.raw_user_meta_data?.last_name;
      
      // Generate confirmation URL
      const siteUrl = Deno.env.get("SITE_URL") || "https://constantcap.com.gh";
      const confirmationUrl = `${supabaseUrl}/auth/v1/verify?token=${user.confirmation_token}&type=signup&redirect_to=${siteUrl}`;
      
      console.log("Sending signup confirmation email to:", email);
      
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