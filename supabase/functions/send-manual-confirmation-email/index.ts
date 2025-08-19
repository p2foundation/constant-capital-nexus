import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Get the correct domain from environment or use the verified domain
const SITE_URL = Deno.env.get('SITE_URL') || 'https://market.constantcap.com.gh';

interface ManualConfirmationRequest {
  userEmail: string;
  userName: string;
  adminName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key for admin operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get auth user from the request
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization header required" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Verify the user is authenticated
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(
        JSON.stringify({ error: "Invalid authentication token" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { userEmail, userName, adminName }: ManualConfirmationRequest = await req.json();

    if (!userEmail || !userName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: userEmail and userName" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending manual confirmation email to:", userEmail);

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: "Constant Capital <noreply@market.constantcap.com.gh>",
      to: [userEmail],
      subject: "Your Account Has Been Manually Confirmed - Constant Capital",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Manually Confirmed</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Account Confirmed</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your account has been manually verified</p>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #1e3a8a; margin-top: 0;">Welcome to Constant Capital, ${userName}!</h2>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Great news! Your account has been manually confirmed by our administrative team${adminName ? ` (${adminName})` : ''}. 
              You now have full access to all features of the Constant Capital platform.
            </p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">What's Next?</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Access premium research reports and market data</li>
                <li>Use our financial calculators and analytical tools</li>
                <li>Participate in our client portal and services</li>
                <li>Stay updated with real-time market insights</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${SITE_URL}/login" 
                 style="background: #1e3a8a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                Access Your Account
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              If you have any questions or need assistance, please don't hesitate to contact our support team.
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <div style="text-align: center;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Constant Capital (Ghana) Limited</strong><br>
                Leading Investment Services in Ghana
              </p>
              <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">
                You received this email because your account was manually confirmed by our team.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Manual confirmation email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Manual confirmation email sent successfully",
        emailId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-manual-confirmation-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send manual confirmation email" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);