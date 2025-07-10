
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, inquiry, category, assignedTo, source, timestamp } = await req.json();

    console.log('New lead submission:', { name, email, category, source });

    // Save lead to database
    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone: phone || null,
        inquiry,
        category,
        source: source || 'Ako Chatbot',
        assigned_to: assignedTo || 'sefakor.addo@constantcap.com.gh',
        status: 'new'
      })
      .select()
      .single();

    if (leadError) {
      console.error('Database error:', leadError);
      throw new Error('Failed to save lead to database');
    }

    // Send notification email to Sefakor
    const notificationEmailResult = await resend.emails.send({
      from: "Constant Capital <noreply@constantcapital.com>",
      to: [assignedTo || 'sefakor.addo@constantcap.com.gh'],
      subject: `🔥 New Lead from ${name} - ${category}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #F2981D;">
              <h1 style="color: #1B365D; margin: 0; font-size: 24px; font-weight: bold;">
                🏛️ Constant Capital
              </h1>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">
                Investment & Advisory Services
              </p>
            </div>
            
            <!-- Alert Banner -->
            <div style="background: linear-gradient(135deg, #F2981D, #e8890b); color: white; padding: 15px; border-radius: 6px; margin-bottom: 25px; text-align: center;">
              <h2 style="margin: 0; font-size: 18px;">🚨 New Lead Alert</h2>
              <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">
                Ako Chatbot captured a new inquiry
              </p>
            </div>

            <!-- Lead Details -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #1B365D; margin: 0 0 15px 0; font-size: 16px;">👤 Contact Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <a href="mailto:${email}" style="color: #F2981D; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0; color: #333;">${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Category:</td>
                  <td style="padding: 8px 0;">
                    <span style="background-color: #1B365D; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                      ${category}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Source:</td>
                  <td style="padding: 8px 0; color: #333;">${source}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Time:</td>
                  <td style="padding: 8px 0; color: #333;">${new Date(timestamp).toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <!-- Inquiry Content -->
            <div style="background-color: #fff; border: 1px solid #e0e0e0; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #1B365D; margin: 0 0 15px 0; font-size: 16px;">💬 Inquiry Details</h3>
              <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #F2981D; border-radius: 0 4px 4px 0;">
                <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${inquiry}</p>
              </div>
            </div>

            <!-- Action Items -->
            <div style="background: linear-gradient(135deg, #1B365D, #2a4a7a); color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="margin: 0 0 15px 0; font-size: 16px;">⚡ Next Steps</h3>
              <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                <li>Review the inquiry and assess the client's needs</li>
                <li>Respond within 2-4 business hours for optimal conversion</li>
                <li>Follow up with a personalized consultation offer</li>
                <li>Update lead status in the system after contact</li>
              </ul>
            </div>

            <!-- Quick Actions -->
            <div style="text-align: center; margin-bottom: 20px;">
              <a href="mailto:${email}" style="background-color: #F2981D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px; display: inline-block;">
                📧 Reply to Lead
              </a>
              <a href="tel:${phone || ''}" style="background-color: #1B365D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                📞 Call Lead
              </a>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
              <p style="margin: 0;">
                This lead was automatically captured by Ako, your AI assistant.<br>
                <strong>Constant Capital</strong> - Building Wealth, Creating Value
              </p>
            </div>
          </div>
        </div>
      `
    });

    // Send confirmation email to the lead
    const confirmationEmailResult = await resend.emails.send({
      from: "Constant Capital <noreply@constantcapital.com>",
      to: [email],
      subject: "Thank you for your inquiry - Constant Capital",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #F2981D;">
              <h1 style="color: #1B365D; margin: 0; font-size: 24px; font-weight: bold;">
                🏛️ Constant Capital
              </h1>
              <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">
                Investment & Advisory Services
              </p>
            </div>
            
            <!-- Welcome Message -->
            <div style="text-align: center; margin-bottom: 25px;">
              <h2 style="color: #1B365D; margin: 0 0 10px 0; font-size: 20px;">Thank You, ${name}!</h2>
              <p style="color: #666; margin: 0; font-size: 16px;">
                We've received your inquiry and appreciate your interest in our services.
              </p>
            </div>

            <!-- What Happens Next -->
            <div style="background: linear-gradient(135deg, #F2981D, #e8890b); color: white; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
              <h3 style="margin: 0 0 15px 0; font-size: 16px;">🚀 What Happens Next?</h3>
              <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
                <li><strong>Immediate:</strong> Your inquiry has been assigned to our investment team</li>
                <li><strong>Within 2-4 hours:</strong> Sefakor will personally review your request</li>
                <li><strong>Within 24 hours:</strong> You'll receive a detailed response and consultation offer</li>
              </ul>
            </div>

            <!-- Contact Information -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="color: #1B365D; margin: 0 0 15px 0; font-size: 16px;">📞 Need Immediate Assistance?</h3>
              <p style="margin: 0 0 10px 0; color: #333;">
                <strong>Email:</strong> 
                <a href="mailto:info@constantcapital.com" style="color: #F2981D; text-decoration: none;">info@constantcapital.com</a>
              </p>
              <p style="margin: 0; color: #333;">
                <strong>Phone:</strong> +233 20 000 0000
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
              <p style="margin: 0 0 10px 0;">
                <strong>Constant Capital</strong> - Building Wealth, Creating Value
              </p>
              <p style="margin: 0;">
                This is an automated confirmation. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      `
    });

    console.log('Emails sent:', { 
      notification: notificationEmailResult.data?.id || 'failed',
      confirmation: confirmationEmailResult.data?.id || 'failed'
    });

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Lead submitted successfully',
      leadId: leadData.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in submit-lead function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
