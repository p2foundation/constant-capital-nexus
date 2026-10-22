import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ApplicationData {
  jobId: string
  jobTitle: string
  applicationEmail: string
  subjectLine: string
  fullName: string
  email: string
  phone: string
  currentRole?: string
  yearsExperience?: string
  noticePeriod?: string
  expectedSalary?: string
  linkedIn?: string
  portfolio?: string
  heardFrom?: string
  coverLetter: string
}

const escape = (s: string = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const data: ApplicationData = await req.json()

    // Basic validation
    if (!data.fullName?.trim() || !data.email?.trim() || !data.phone?.trim() || !data.coverLetter?.trim() || !data.jobId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
      })
    }
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
      })
    }
    if (data.coverLetter.length > 10000) {
      return new Response(JSON.stringify({ error: 'Cover letter too long' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400,
      })
    }

    // Persist to database
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    const { error: dbError } = await supabase.from('career_applications').insert({
      job_id: data.jobId,
      job_title: data.jobTitle,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      current_position: data.currentRole || null,
      years_experience: data.yearsExperience || null,
      notice_period: data.noticePeriod || null,
      expected_salary: data.expectedSalary || null,
      linkedin_url: data.linkedIn || null,
      portfolio_url: data.portfolio || null,
      heard_from: data.heardFrom || null,
      cover_letter: data.coverLetter,
      status: 'new',
    })

    if (dbError) {
      console.error('DB insert error:', dbError)
      return new Response(JSON.stringify({ error: 'Failed to save application' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500,
      })
    }

    // Send notification email
    if (RESEND_API_KEY) {
      const recipient = data.applicationEmail || 'info@constantcap.com.gh'

      const html = `
        <!DOCTYPE html>
        <html><body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;">
          <div style="max-width:640px;margin:0 auto;background:#fff;">
            <div style="background:linear-gradient(135deg,#1e3a5f 0%,#2c5282 100%);padding:36px 30px;text-align:center;">
              <div style="color:#fff;font-size:26px;font-weight:bold;">Constant<span style="color:#ffd700;">Capital</span></div>
              <div style="color:#e2e8f0;font-size:13px;margin-top:6px;">New Career Application</div>
            </div>
            <div style="padding:32px 30px;">
              <h1 style="color:#1e3a5f;font-size:22px;margin:0 0 8px 0;">${escape(data.jobTitle)}</h1>
              <p style="color:#64748b;font-size:13px;margin:0 0 24px 0;">Application reference: ${escape(data.jobId)}</p>

              <div style="background:#f7fafc;border:1px solid #e2e8f0;border-radius:8px;padding:24px;margin-bottom:20px;">
                <table style="width:100%;border-collapse:collapse;font-size:14px;color:#4a5568;">
                  <tr><td style="padding:6px 0;width:160px;color:#1e3a5f;font-weight:600;">Full Name</td><td>${escape(data.fullName)}</td></tr>
                  <tr><td style="padding:6px 0;color:#1e3a5f;font-weight:600;">Email</td><td><a href="mailto:${escape(data.email)}" style="color:#2c5282;">${escape(data.email)}</a></td></tr>
                  <tr><td style="padding:6px 0;color:#1e3a5f;font-weight:600;">Phone</td><td>${escape(data.phone)}</td></tr>
                  ${data.currentRole ? `<tr><td style="padding:6px 0;color:#1e3a5f;font-weight:600;">Current Role</td><td>${escape(data.currentRole)}</td></tr>` : ''}
                  ${data.yearsExperience ? `<tr><td style="padding:6px 0;color:#1e3a5f;font-weight:600;">Experience</td><td>${escape(data.yearsExperience)} years</td></tr>` : ''}
                  ${data.noticePeriod ? `<tr><td style="padding:6px 0;color:#1e3a5f;font-weight:600;">Notice Period</td><td>${escape(data.noticePeriod)}</td></tr>` : ''}
                  ${data.expectedSalary ? `<tr><td style="padding:6px 0;color:#1e3a5f;font-weight:600;">Expected Salary</td><td>${escape(data.expectedSalary)} GHS</td></tr>` : ''}
                  ${data.linkedIn ? `<tr><td style="padding:6px 0;color:#1e3a5f;font-weight:600;">LinkedIn</td><td><a href="${escape(data.linkedIn)}" style="color:#2c5282;">${escape(data.linkedIn)}</a></td></tr>` : ''}
                  ${data.portfolio ? `<tr><td style="padding:6px 0;color:#1e3a5f;font-weight:600;">Portfolio</td><td><a href="${escape(data.portfolio)}" style="color:#2c5282;">${escape(data.portfolio)}</a></td></tr>` : ''}
                  ${data.heardFrom ? `<tr><td style="padding:6px 0;color:#1e3a5f;font-weight:600;">Heard via</td><td>${escape(data.heardFrom)}</td></tr>` : ''}
                </table>
              </div>

              <h3 style="color:#1e3a5f;font-size:15px;margin:24px 0 8px 0;">Cover Letter</h3>
              <div style="background:#fff;border:1px solid #e2e8f0;border-radius:6px;padding:18px;color:#4a5568;line-height:1.6;font-size:14px;white-space:pre-wrap;">${escape(data.coverLetter)}</div>

              <div style="background:#fffbea;border-left:4px solid #ffd700;padding:14px 18px;margin:24px 0;border-radius:4px;font-size:13px;color:#744210;">
                <strong>Note:</strong> The applicant has been advised to email their CV directly to ${escape(recipient)}. Please reply to the candidate at <a href="mailto:${escape(data.email)}">${escape(data.email)}</a> if you'd like to request the CV or proceed with the next step.
              </div>

              <div style="text-align:center;margin:28px 0;">
                <a href="mailto:${escape(data.email)}?subject=${encodeURIComponent('Re: ' + (data.subjectLine || data.jobTitle))}" style="display:inline-block;background:linear-gradient(135deg,#1e3a5f 0%,#2c5282 100%);color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:15px;">Reply to Candidate</a>
              </div>
            </div>
            <div style="background:#1e3a5f;color:#e2e8f0;padding:24px;text-align:center;font-size:12px;">
              <strong style="color:#fff;">Constant Capital (Ghana) Limited</strong><br/>
              Ghana's Premier Investment & Capital Markets Partner
            </div>
          </div>
        </body></html>
      `

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Constant Capital Careers <noreply@market.constantcap.com.gh>',
          to: [recipient],
          cc: ['info@constantcap.com.gh'],
          subject: `New Application: ${data.jobTitle} — ${data.fullName}`,
          html,
          reply_to: data.email,
        }),
      })

      if (!emailRes.ok) {
        console.error('Email send failed:', await emailRes.text())
      }

      // Confirmation email to applicant
      const confirmHtml = `
        <!DOCTYPE html>
        <html><body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;">
          <div style="max-width:600px;margin:0 auto;background:#fff;">
            <div style="background:linear-gradient(135deg,#1e3a5f 0%,#2c5282 100%);padding:36px 30px;text-align:center;">
              <div style="color:#fff;font-size:26px;font-weight:bold;">Constant<span style="color:#ffd700;">Capital</span></div>
            </div>
            <div style="padding:36px 30px;color:#4a5568;line-height:1.6;">
              <h1 style="color:#1e3a5f;font-size:22px;margin:0 0 16px 0;">Thank you for applying, ${escape(data.fullName.split(' ')[0])}!</h1>
              <p>We've received your application for the <strong>${escape(data.jobTitle)}</strong> role at Constant Capital (Ghana) Limited.</p>
              <p>Our recruitment team will carefully review your submission. If your profile matches what we're looking for, we'll reach out within <strong>2–3 weeks</strong> to schedule a conversation.</p>
              <div style="background:#fffbea;border-left:4px solid #ffd700;padding:14px 18px;margin:24px 0;border-radius:4px;font-size:13px;color:#744210;">
                <strong>Important:</strong> If you haven't already, please email your CV/resume and any supporting documents to <a href="mailto:${escape(recipient)}" style="color:#744210;">${escape(recipient)}</a> with subject line: <em>${escape(data.subjectLine || data.jobTitle)}</em>
              </div>
              <p>In the meantime, feel free to explore our work at <a href="https://constantcap.com.gh" style="color:#2c5282;">constantcap.com.gh</a>.</p>
              <p style="margin-top:28px;">Warm regards,<br/><strong>The Constant Capital Recruitment Team</strong></p>
            </div>
            <div style="background:#1e3a5f;color:#e2e8f0;padding:20px;text-align:center;font-size:12px;">
              Constant Capital (Ghana) Limited · Ghana's Premier Investment & Capital Markets Partner
            </div>
          </div>
        </body></html>
      `

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Constant Capital Careers <noreply@market.constantcap.com.gh>',
          to: [data.email],
          subject: `Application Received: ${data.jobTitle} — Constant Capital`,
          html: confirmHtml,
        }),
      }).catch(e => console.error('Confirm email error:', e))
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200,
    })
  } catch (err: any) {
    console.error('Error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500,
    })
  }
})
