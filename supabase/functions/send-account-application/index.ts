import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!
const TO = 'trading@constantcap.com.gh'
const BUCKET = 'account-documents'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
const esc = (s: unknown = '') => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const fmt = (d?: string) => (d ? new Date(d).toLocaleString('en-GB', { timeZone: 'Africa/Accra' }) : '—')

const LABELS: Record<string, string> = {
  passportPhoto: 'Passport-photo', ghanaCardFront: 'GhanaCard-front', ghanaCardBack: 'GhanaCard-back',
  passportDocument: 'Passport', applicantSignature: 'Signature', idDocument1: 'ID-1', idDocument2: 'ID-2', witnessSignature: 'Witness-signature',
}

function toBase64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf); let s = ''
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  return btoa(s)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const auth = req.headers.get('Authorization')
    if (!auth?.startsWith('Bearer ')) return json({ error: 'Unauthorized' }, 401)
    const userClient = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: auth } } })
    const { data: { user } } = await userClient.auth.getUser(auth.slice(7))
    if (!user) return json({ error: 'Unauthorized' }, 401)

    const body = await req.json().catch(() => ({}))
    const appId = typeof body.applicationId === 'string' && /^[0-9a-f-]{36}$/i.test(body.applicationId) ? body.applicationId : null
    if (!appId) return json({ error: 'applicationId required' }, 400)

    const admin = createClient(SUPABASE_URL, SERVICE_KEY)
    const { data: app, error } = await admin.from('account_opening_applications').select('*').eq('id', appId).single()
    if (error || !app) return json({ error: 'Not found' }, 404)
    if (app.user_id !== user.id) return json({ error: 'Forbidden' }, 403)
    if (app.status === 'draft') return json({ error: 'Application not submitted' }, 400)
    const f = app.form_data || {}
    if (f.notified_at) return json({ ok: true, alreadySent: true })
    if (!RESEND_API_KEY) return json({ error: 'Email not configured' }, 500)

    const name = [f.title, f.firstName, f.otherNames, f.surname].filter(Boolean).join(' ')
    const files: { path: string; name: string }[] = []
    for (const p of f.pdfs || []) files.push({ path: p.path, name: `${p.type}-form-${f.surname || 'applicant'}.pdf` })
    for (const [field, paths] of Object.entries((f.documents || {}) as Record<string, string[]>))
      for (const p of paths) files.push({ path: p, name: `${LABELS[field] || field}${p.slice(p.lastIndexOf('.'))}` })

    const attachments = []
    for (const file of files) {
      const { data } = await admin.storage.from(BUCKET).download(file.path)
      if (data) attachments.push({ filename: file.name, content: toBase64(await data.arrayBuffer()) })
    }

    const prog = f._progress || {}
    const events: { at: string; event: string }[] = prog.events || []
    const startedMs = prog.startedAt ? new Date(prog.startedAt).getTime() : new Date(app.created_at).getTime()
    const hours = ((new Date(f.submitted_at || app.updated_at).getTime() - startedMs) / 36e5).toFixed(1)
    const row = (k: string, v: unknown) => `<tr><td style="padding:5px 0;width:190px;font-weight:600;color:#0B1A2E">${k}</td><td>${esc(v) || '—'}</td></tr>`

    const html = `<div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#333">
      <div style="background:#0B1A2E;color:#fff;padding:24px"><div style="font-size:22px;font-weight:bold">Constant <span style="color:#F28C28">Capital</span></div>
      <div style="font-size:13px;margin-top:4px">New CSD / KYC account application — ready for CSD setup</div></div>
      <div style="padding:24px">
        <h2 style="margin:0 0 12px;color:#0B1A2E">${esc(name)}</h2>
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          ${row('Status', String(app.status).replace('_', ' ').toUpperCase())}
          ${row('Reference', app.id)}
          ${row('Email', f.emailAddress)}${row('Mobile', f.mobileNumber1)}
          ${row('Residential status', f.residentialStatus)}${row('Ghana Card no.', f.idNumber1)}
          ${f.idNumber2 ? row('Passport no.', f.idNumber2) : ''}
          ${row('Investment type', f.investmentType)}
        </table>
        <h3 style="color:#0B1A2E;margin:22px 0 8px">Timeline</h3>
        <table style="width:100%;font-size:13px;border-collapse:collapse">
          ${row('Started', fmt(prog.startedAt || app.created_at))}
          ${row('Submitted', fmt(f.submitted_at))}
          ${row('Time to complete', `${hours} hours`)}
          ${events.map((e) => row(fmt(e.at), e.event)).join('')}
        </table>
        <h3 style="color:#0B1A2E;margin:22px 0 8px">Attached (${attachments.length})</h3>
        <ul style="font-size:13px">${files.map((x) => `<li>${esc(x.name)}</li>`).join('')}</ul>
        <p style="font-size:12px;color:#666">Download the attached CSD and KYC PDFs and documents to create the account on the CSD platform. The same files are in Admin → User Management.</p>
      </div></div>`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Constant Capital Accounts <noreply@market.constantcap.com.gh>',
        to: [TO], reply_to: f.emailAddress || undefined,
        subject: `New account application — ${name} (${String(app.status).toUpperCase()})`,
        html, attachments,
      }),
    })
    if (!res.ok) { console.error('Resend error', await res.text()); return json({ error: 'Email failed' }, 502) }

    const now = new Date().toISOString()
    await admin.from('account_opening_applications').update({
      form_data: { ...f, notified_at: now, _progress: { ...prog, events: [...events, { at: now, event: `Emailed to ${TO}` }] } },
    }).eq('id', appId)
    return json({ ok: true })
  } catch (e) {
    console.error(e)
    return json({ error: 'Server error' }, 500)
  }
})
