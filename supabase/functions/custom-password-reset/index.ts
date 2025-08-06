
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

// Get the correct domain from environment or use the verified domain
const SITE_URL = Deno.env.get('SITE_URL') || 'https://market.constantcap.com.gh';

interface PasswordResetRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: PasswordResetRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Processing password reset request for:", email);
    console.log("Using redirect URL:", `${SITE_URL}/auth/reset-password`);

    // Generate a password reset link using Supabase Admin API
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: `${SITE_URL}/auth/reset-password`
      }
    });

    if (error) {
      console.error("Error generating reset link:", error);
      
      // For security, don't reveal if user exists or not
      if (error.message.includes('User not found') || error.message.includes('Invalid email')) {
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "If the email exists, a reset link has been sent." 
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to generate reset link" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Generated reset link successfully");

    // Extract the URL and send custom email
    const resetUrl = data.properties?.action_link;
    
    if (resetUrl) {
      // Try to get user profile data for personalization (optional)
      let userData = null;
      try {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('id, first_name, last_name')
          .eq('id', data.user.id)
          .single();
        
        userData = profileData;
      } catch (profileError) {
        console.log("Could not fetch user profile, proceeding without personalization");
      }

      // Send custom branded email instead of Supabase default
      const emailResponse = await supabase.functions.invoke('send-custom-auth-email', {
        body: {
          email,
          confirmationUrl: resetUrl,
          type: 'recovery',
          firstName: userData?.first_name || '',
          lastName: userData?.last_name || ''
        }
      });

      if (emailResponse.error) {
        console.error("Error sending custom recovery email:", emailResponse.error);
        return new Response(
          JSON.stringify({ error: "Failed to send reset email" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      console.log("Custom password reset email sent successfully");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Password reset email sent successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in custom-password-reset function:", error);
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
