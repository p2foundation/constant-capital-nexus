
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Get the correct domain from environment or use the verified domain  
const SITE_URL = Deno.env.get('SITE_URL') || 'https://constantcap.com.gh';

interface AuthEmailRequest {
  email: string;
  confirmationUrl: string;
  type: 'signup' | 'recovery' | 'email_change';
  firstName?: string;
  lastName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, confirmationUrl, type, firstName, lastName }: AuthEmailRequest = await req.json();

    const getEmailContent = (type: string, firstName?: string) => {
      const name = firstName ? ` ${firstName}` : '';
      
      switch (type) {
        case 'signup':
          return {
            subject: 'Welcome to Constant Capital Ghana - Confirm Your Account',
            heading: `Welcome to Constant Capital Ghana${name}!`,
            message: 'Thank you for joining Ghana\'s premier investment research and advisory firm. To complete your registration and access our exclusive market insights, please confirm your email address by clicking the button below.',
            buttonText: 'Confirm Your Email',
            footerMessage: 'Once confirmed, you\'ll have access to our comprehensive market research, investment advisory services, and real-time financial data. This link will expire in 24 hours for security reasons.'
          };
        case 'recovery':
          return {
            subject: 'Reset Your Constant Capital Password',
            heading: 'Password Reset Request',
            message: 'We received a request to reset your password for your Constant Capital account. Click the button below to create a new password.',
            buttonText: 'Reset Password',
            footerMessage: 'If you didn\'t request this password reset, please ignore this email. Your password will remain unchanged. This link will expire in 1 hour for security reasons.'
          };
        case 'email_change':
          return {
            subject: 'Confirm Your New Email - Constant Capital',
            heading: 'Email Change Confirmation',
            message: 'Please confirm your new email address to complete the update to your Constant Capital account.',
            buttonText: 'Confirm New Email',
            footerMessage: 'This change will update your login credentials and where you receive important account notifications.'
          };
        default:
          return {
            subject: 'Constant Capital - Account Verification',
            heading: 'Account Verification Required',
            message: 'Please verify your account to continue using Constant Capital services.',
            buttonText: 'Verify Account',
            footerMessage: 'Thank you for choosing Constant Capital for your investment needs.'
          };
      }
    };

    const content = getEmailContent(type, firstName);

    // Use the confirmation URL as-is since it should already have the correct domain
    // from the generate-auth-url function
    const finalConfirmationUrl = confirmationUrl;

    console.log('=== EMAIL DEBUG INFO ===');
    console.log('Email type:', type);
    console.log('Recipient:', email);
    console.log('Original URL:', confirmationUrl);
    console.log('Final URL:', finalConfirmationUrl);
    console.log('Site URL from env:', SITE_URL);
    console.log('========================');

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${content.subject}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8fafc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%); padding: 40px 30px; text-align: center;">
                <div style="color: white; font-size: 28px; font-weight: bold; margin-bottom: 8px;">
                    Constant<span style="color: #ffd700;">Capital</span>
                </div>
                <div style="color: #e2e8f0; font-size: 14px;">
                    Premier Investment Research & Advisory
                </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
                <h1 style="color: #1e3a5f; font-size: 24px; font-weight: 600; margin-bottom: 20px; text-align: center;">
                    ${content.heading}
                </h1>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    ${content.message}
                </p>
                
                <!-- CTA Button -->
                <div style="text-align: center; margin: 40px 0;">
                    <a href="${finalConfirmationUrl}" 
                       style="display: inline-block; background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3);">
                        ${content.buttonText}
                    </a>
                </div>
                
                <div style="background-color: #f7fafc; border-left: 4px solid #ffd700; padding: 20px; margin: 30px 0; border-radius: 4px;">
                    <p style="color: #4a5568; font-size: 14px; margin: 0; line-height: 1.5;">
                        <strong>Note:</strong> ${content.footerMessage}
                    </p>
                </div>
                
                <!-- Alternative Link -->
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                    <p style="color: #718096; font-size: 14px; line-height: 1.5;">
                        If the button above doesn't work, copy and paste this link into your browser:
                    </p>
                    <p style="word-break: break-all; color: #2c5282; font-size: 14px; background-color: #f7fafc; padding: 12px; border-radius: 4px; border: 1px solid #e2e8f0;">
                        ${finalConfirmationUrl}
                    </p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1e3a5f; color: #e2e8f0; padding: 30px; text-align: center;">
                <div style="margin-bottom: 15px;">
                    <strong style="color: white;">Constant Capital (Ghana) Limited</strong>
                </div>
                <div style="font-size: 14px; line-height: 1.5; margin-bottom: 15px;">
                    Ghana's Premier Investment Research & Advisory Firm<br>
                    Providing Expert Market Analysis and Strategic Investment Solutions
                </div>
                <div style="font-size: 12px; color: #a0aec0;">
                    This email was sent to ${email}. If you didn't request this email, you can safely ignore it.
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    // Use your verified domain - ensure this matches your verified domain in Resend
    const fromAddress = "Constant Capital <noreply@market.constantcap.com.gh>";

    try {
      const emailResponse = await resend.emails.send({
        from: fromAddress,
        to: [email],
        subject: content.subject,
        html: htmlContent,
      });

      console.log("Custom auth email sent successfully:", emailResponse);

      return new Response(JSON.stringify(emailResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (emailError: any) {
      console.error("Resend API error:", emailError);
      
      // Provide specific error messages based on the error type
      let errorMessage = "Failed to send email. Please try again.";
      
      if (emailError.message?.includes("domain is not verified")) {
        errorMessage = "Email domain not verified. Please verify market.constantcap.com.gh in Resend dashboard.";
      } else if (emailError.message?.includes("API key")) {
        errorMessage = "Invalid API key. Please check your Resend configuration.";
      }
      
      return new Response(
        JSON.stringify({ 
          error: errorMessage,
          details: emailError.message 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
  } catch (error: any) {
    console.error("Error in send-custom-auth-email function:", error);
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
