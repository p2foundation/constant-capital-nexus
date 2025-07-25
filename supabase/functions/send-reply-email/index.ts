import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verify user is authenticated and has admin privileges
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Invalid authentication');
    }

    // Check if user has admin privileges
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['Admin', 'Developer'].includes(profile.role)) {
      throw new Error('Insufficient privileges');
    }

    const { to, toName, subject, content, originalMessage } = await req.json();

    if (!to || !subject || !content) {
      throw new Error('Missing required fields');
    }

    // Get Resend API key
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('Resend API key not configured');
    }

    // Prepare email content with professional styling
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background-color: #1e40af; color: white; padding: 20px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; }
        .content { padding: 30px; line-height: 1.6; color: #333; }
        .message { background-color: #f8fafc; border-left: 4px solid #1e40af; padding: 15px; margin: 20px 0; }
        .original-message { background-color: #f1f5f9; border: 1px solid #e2e8f0; padding: 15px; margin-top: 30px; border-radius: 5px; }
        .footer { background-color: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px; }
        .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Constant<span style="color: #f97316;">Capital</span></div>
            <div style="font-size: 14px; margin-top: 5px;">Investment Advisory Services</div>
        </div>
        
        <div class="content">
            <h2 style="color: #1e40af; margin-bottom: 20px;">Re: ${originalMessage?.subject || subject}</h2>
            
            <p>Dear ${toName},</p>
            
            <div class="message">
                ${content.replace(/\n/g, '<br>')}
            </div>
            
            ${originalMessage ? `
            <div class="original-message">
                <strong>Your Original Message:</strong><br>
                <strong>Subject:</strong> ${originalMessage.subject}<br>
                <strong>Date:</strong> ${new Date(originalMessage.date).toLocaleDateString()}<br>
                <br>
                ${originalMessage.content.replace(/\n/g, '<br>')}
            </div>
            ` : ''}
            
            <div class="signature">
                <p>Best regards,<br>
                <strong>Constant Capital Ghana Team</strong><br>
                Investment Advisory Services</p>
                
                <p style="margin-top: 20px; font-size: 14px; color: #64748b;">
                    <strong>Contact Information:</strong><br>
                    Email: info@constantcap.com.gh<br>
                    Website: www.constantcap.com.gh
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent in response to your inquiry to Constant Capital Ghana.</p>
            <p>© ${new Date().getFullYear()} Constant Capital Ghana. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Constant Capital Ghana <noreply@resend.dev>',
        to: [to],
        subject: subject,
        html: emailHtml,
        reply_to: 'noreply@resend.dev'
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Resend API error:', errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailResult = await emailResponse.json();
    console.log('Email sent successfully:', emailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Reply sent successfully',
        emailId: emailResult.id 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error sending reply email:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send reply email'
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});