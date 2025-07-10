
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { firstName, lastName, email, phone, subject, message }: ContactFormData = await req.json()

    // Send email notification to info@constantcap.com.gh
    if (RESEND_API_KEY) {
      const emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
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
                        New Contact Form Submission
                    </h1>
                    
                    <div style="background-color: #f7fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 30px; margin-bottom: 30px;">
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #1e3a5f; display: block; margin-bottom: 5px;">From:</strong>
                            <span style="color: #4a5568;">${firstName} ${lastName}</span>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #1e3a5f; display: block; margin-bottom: 5px;">Email:</strong>
                            <span style="color: #4a5568;">${email}</span>
                        </div>
                        
                        ${phone ? `
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #1e3a5f; display: block; margin-bottom: 5px;">Phone:</strong>
                            <span style="color: #4a5568;">${phone}</span>
                        </div>
                        ` : ''}
                        
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #1e3a5f; display: block; margin-bottom: 5px;">Subject:</strong>
                            <span style="color: #4a5568;">${subject}</span>
                        </div>
                        
                        <div>
                            <strong style="color: #1e3a5f; display: block; margin-bottom: 10px;">Message:</strong>
                            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 15px; color: #4a5568; line-height: 1.6;">
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                    </div>
                    
                    <div style="background-color: #f7fafc; border-left: 4px solid #ffd700; padding: 20px; margin: 30px 0; border-radius: 4px;">
                        <p style="color: #4a5568; font-size: 14px; margin: 0; line-height: 1.5;">
                            <strong>Note:</strong> This message was sent from the Constant Capital website contact form. Please respond to the customer's email address directly.
                        </p>
                    </div>
                    
                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 40px 0;">
                        <a href="mailto:${email}" 
                           style="display: inline-block; background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3);">
                            Reply to Customer
                        </a>
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
                        Contact received from: ${email} | Reply directly to respond to the customer
                    </div>
                </div>
            </div>
        </body>
        </html>
      `

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Constant Capital <noreply@market.constantcap.com.gh>',
          to: ['info@constantcap.com.gh'],
          subject: `New Contact Form Submission: ${subject}`,
          html: emailHtml,
          reply_to: email,
        }),
      })

      if (!emailResponse.ok) {
        console.error('Failed to send email:', await emailResponse.text())
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
