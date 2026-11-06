import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Paperclip, Loader2, Search, CheckCircle2, XCircle, Images } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getRequirements } from '@/components/account-opening/requirements';
import { supabase } from '@/integrations/supabase/client';
import { getSignedUrl, StoredPdf, StoredDocuments } from '@/lib/accountDocuments';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Row {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
  form_data: any;
}

const LABELS: Record<string, string> = {
  passportPhoto: 'Passport photo',
  ghanaCardFront: 'Ghana Card front',
  ghanaCardBack: 'Ghana Card back',
  passportDocument: 'Passport',
  idDocument1: 'ID document 1',
  idDocument2: 'ID document 2',
  applicantSignature: 'Applicant signature',
  witnessSignature: 'Witness signature',
};

const Thumb: React.FC<{ path: string; label: string }> = ({ path, label }) => {
  const [url, setUrl] = useState<string>();
  const isPdf = /\.pdf$/i.test(path);
  useEffect(() => { if (!isPdf) getSignedUrl(path).then(setUrl).catch(() => undefined); }, [path, isPdf]);
  return (
    <button type="button" onClick={() => open(path)} className="group text-left w-28" title={`Open ${label}`}>
      <div className="h-20 w-28 rounded border border-border bg-muted overflow-hidden flex items-center justify-center">
        {url ? <img src={url} alt={label} className="h-full w-full object-cover group-hover:scale-105 transition-transform" /> : <FileText className="h-6 w-6 text-muted-foreground" />}
      </div>
      <p className="text-xs mt-1 truncate">{label}</p>
    </button>
  );
};

const open = async (path: string) => window.open(await getSignedUrl(path), '_blank');

// Props kept for compatibility with the parent page; data is fetched here.
const AccountOpeningsSection: React.FC<{ accountOpenings?: unknown[] }> = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('account_opening_applications')
      .select('id,status,created_at,updated_at,form_data')
      .order('updated_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        setRows((data as Row[]) || []);
        setLoading(false);
      });
  }, []);

  const count = (s: string) => rows.filter((r) => r.status === s).length;

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('account_opening_applications')
      .update({ status: status as any })
      .eq('id', id);
    if (error) {
      console.error('Could not update application status', error);
      return;
    }
    setRows((current) => current.map((row) => row.id === id ? { ...row, status } : row));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Account Opening Applications</CardTitle>
        <CardDescription>
          In progress {count('draft')} · Submitted {count('submitted')} · Under review {count('under_review')} · Approved {count('approved')} · Rejected {count('rejected')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by client name, email or Ghana Card number" className="pl-9" />
        </div>
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : rows.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No applications yet.</p>
        ) : rows.filter((r) => {
          const fd = r.form_data || {};
          const q = query.trim().toLowerCase();
          return !q || [fd.firstName, fd.surname, fd.otherNames, fd.emailAddress, fd.idNumber1].filter(Boolean).join(' ').toLowerCase().includes(q);
        }).map((r) => {
          const fd = r.form_data || {};
          const docReqs = getRequirements(fd).filter((q) => ['ghanaCardFront','ghanaCardBack','passportPhoto','passportDocument','applicantSignature'].includes(q.key));
          const pdfs: StoredPdf[] = fd.pdfs || [];
          const docs: StoredDocuments = fd.documents || Object.fromEntries(Object.entries(fd._uploaded || {}).filter(([, v]) => v).map(([k, v]) => [k, [v as string]]));
          const prog = fd._progress || {};
          return (
            <div key={r.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{[fd.title, fd.firstName, fd.surname].filter(Boolean).join(' ') || 'Unnamed applicant'}</p>
                  <p className="text-xs text-muted-foreground">
                    {fd.emailAddress} · {new Date(fd.submitted_at || r.updated_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{r.status === 'draft' ? `in progress · ${prog.percent ?? 0}%` : r.status.replace('_', ' ')}</Badge>
                  <Select value={r.status} onValueChange={(value) => updateStatus(r.id, value)}>
                    <SelectTrigger className="w-40" aria-label="Application status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">In progress</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="under_review">Under review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Requires attention</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Started {prog.startedAt ? new Date(prog.startedAt).toLocaleString() : new Date(r.created_at).toLocaleString()}
                {prog.lastActivityAt && ` · last active ${new Date(prog.lastActivityAt).toLocaleString()}`}
                {fd.notified_at && ` · emailed to trading ${new Date(fd.notified_at).toLocaleString()}`}
              </p>
              {r.status === 'draft' && prog.missing?.length > 0 && (
                <p className="text-xs text-muted-foreground">Still missing: {prog.missing.join(', ')}</p>
              )}
              <div className="flex flex-wrap gap-2 text-xs">
                {docReqs.map((d) => (
                  <span key={d.key} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 border ${d.done ? 'border-primary/40 text-foreground' : 'border-destructive/40 text-destructive'}`}>
                    {d.done ? <CheckCircle2 className="h-3 w-3 text-primary" /> : <XCircle className="h-3 w-3" />}{d.label}
                  </span>
                ))}
              </div>
              {Object.keys(docs).length > 0 && (
                <Button size="sm" variant="secondary" onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
                  <Images className="h-4 w-4 mr-1" />{expanded === r.id ? 'Hide documents' : `View KYC documents (${Object.values(docs).flat().length})`}
                </Button>
              )}
              {expanded === r.id && (
                <div className="flex flex-wrap gap-3 p-3 rounded-lg bg-muted/40">
                  {Object.entries(docs).flatMap(([field, paths]) => paths.filter(Boolean).map((path, i) => (
                    <Thumb key={path} path={path} label={`${LABELS[field] || field}${paths.length > 1 ? ` ${i + 1}` : ''}`} />
                  )))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {pdfs.map((p) => (
                  <Button key={p.path} size="sm" variant="outline" onClick={() => open(p.path)}>
                    <FileText className="h-4 w-4 mr-1" />{p.type} PDF
                  </Button>
                ))}
                {Object.entries(docs).flatMap(([field, paths]) => paths.filter(Boolean).map((path, i) => (
                  <Button key={path} size="sm" variant="ghost" onClick={() => open(path)}>
                    <Paperclip className="h-4 w-4 mr-1" />{LABELS[field] || field}{paths.length > 1 ? ` ${i + 1}` : ''}
                  </Button>
                )))}
                {pdfs.length === 0 && r.status !== 'draft' && <span className="text-xs text-muted-foreground">No PDFs (submitted before document saving was added)</span>}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default AccountOpeningsSection;
