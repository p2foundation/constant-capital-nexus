import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Paperclip, Loader2 } from 'lucide-react';
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

const open = async (path: string) => window.open(await getSignedUrl(path), '_blank');

// Props kept for compatibility with the parent page; data is fetched here.
const AccountOpeningsSection: React.FC<{ accountOpenings?: unknown[] }> = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

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
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : rows.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No applications yet.</p>
        ) : rows.map((r) => {
          const fd = r.form_data || {};
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
              <div className="flex flex-wrap gap-2">
                {pdfs.map((p) => (
                  <Button key={p.path} size="sm" variant="outline" onClick={() => open(p.path)}>
                    <FileText className="h-4 w-4 mr-1" />{p.type} PDF
                  </Button>
                ))}
                {Object.entries(docs).flatMap(([field, paths]) => paths.map((path, i) => (
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
