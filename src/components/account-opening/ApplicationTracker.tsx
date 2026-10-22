import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock3, ExternalLink, FileText, Loader2, Paperclip, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SubmittedDocuments from './SubmittedDocuments';
import { getSignedUrl, type StoredDocuments, type StoredPdf } from '@/lib/accountDocuments';

interface ProgressEvent { at: string; event: string }
interface ProgressData {
  startedAt?: string;
  lastActivityAt?: string;
  percent?: number;
  missing?: string[];
  events?: ProgressEvent[];
}
interface ApplicationData {
  _progress?: ProgressData;
  _uploaded?: Record<string, string>;
  documents?: StoredDocuments;
  pdfs?: StoredPdf[];
  submitted_at?: string;
  notified_at?: string;
}
interface ApplicationRow {
  id: string;
  application_type: string;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  form_data: ApplicationData;
}

const STATUS_COPY = {
  draft: { label: 'In progress', text: 'Complete the remaining requirements, then submit your application.' },
  submitted: { label: 'Submitted', text: 'Your application has been received by our trading team.' },
  under_review: { label: 'Under review', text: 'Our back-office team is reviewing your KYC and CSD documents.' },
  approved: { label: 'Approved', text: 'Your onboarding checks are complete. You can now access our trading platforms.' },
  rejected: { label: 'Requires attention', text: 'Please contact our trading team for help with the next step.' },
} as const;

const FILE_LABELS: Record<string, string> = {
  passportPhoto: 'Passport photo',
  ghanaCardFront: 'Ghana Card front',
  ghanaCardBack: 'Ghana Card back',
  passportDocument: 'Passport bio-data page',
  applicantSignature: 'Signature',
};

const readableDate = (value?: string) => value
  ? new Intl.DateTimeFormat('en-GH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
  : 'Not available';

const ApplicationTracker = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('account_opening_applications')
      .select('id,application_type,created_at,updated_at,status,form_data')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });
    if (error) console.error('Could not load account applications', error);
    setRows((data || []) as unknown as ApplicationRow[]);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const openDocument = async (path: string) => {
    const url = await getSignedUrl(path);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return <div className="flex min-h-32 items-center justify-center text-muted-foreground"><Loader2 className="mr-2 h-5 w-5 animate-spin" />Loading your onboarding status…</div>;
  }

  if (rows.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No account application yet</CardTitle>
          <CardDescription>Start your CSD and KYC application. Your answers and uploads save automatically.</CardDescription>
        </CardHeader>
        <CardContent><Button asChild><Link to="/account-opening">Start application <ArrowRight /></Link></Button></CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground">KYC &amp; CSD progress</h2>
          <p className="mt-1 text-sm text-muted-foreground">Track review status and securely access submitted documents.</p>
        </div>
        <Button variant="outline" size="icon" onClick={load} aria-label="Refresh application status"><RefreshCw /></Button>
      </div>

      {rows.map((row) => {
        const data = row.form_data || {};
        const progress = data._progress || {};
        const copy = STATUS_COPY[row.status];
        const percentage = row.status === 'draft' ? progress.percent ?? 0 : 100;
        const pdfs = data.pdfs || [];
        const documents = data.documents || Object.fromEntries(
          Object.entries(data._uploaded || {}).map(([key, path]) => [key, [path]]),
        );
        const milestones = [
          { label: 'Started', at: progress.startedAt || row.created_at, done: true },
          { label: 'Submitted', at: data.submitted_at, done: row.status !== 'draft' },
          { label: 'Under review', at: row.status === 'under_review' ? row.updated_at : undefined, done: ['under_review', 'approved', 'rejected'].includes(row.status) },
          { label: 'Completed', at: row.status === 'approved' ? row.updated_at : undefined, done: row.status === 'approved' },
        ];

        return (
          <Card key={row.id} className="overflow-hidden">
            <CardHeader className="border-b border-border">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-xl">Investment account application</CardTitle>
                  <CardDescription className="mt-1">Reference {row.id.slice(0, 8).toUpperCase()}</CardDescription>
                </div>
                <Badge variant={row.status === 'approved' ? 'default' : 'secondary'}>{copy.label}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm"><span>{copy.text}</span><strong>{percentage}%</strong></div>
                <Progress value={percentage} className="h-2" />
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                {milestones.map((milestone) => (
                  <div key={milestone.label} className="border-l-2 border-border pl-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      {milestone.done ? <CheckCircle2 className="text-accent" /> : <Clock3 className="text-muted-foreground" />}
                      {milestone.label}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{milestone.done ? readableDate(milestone.at) : 'Pending'}</p>
                  </div>
                ))}
              </div>

              {row.status === 'draft' && (
                <div className="rounded-md border border-border bg-muted/40 p-4">
                  <p className="font-medium text-foreground">Still needed</p>
                  <p className="mt-1 text-sm text-muted-foreground">{progress.missing?.length ? progress.missing.join(', ') : 'Continue the form to complete your application.'}</p>
                  <Button asChild className="mt-4"><Link to="/account-opening">Continue application <ArrowRight /></Link></Button>
                </div>
              )}

              {pdfs.length > 0 && (
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground"><FileText />Submitted forms</h3>
                  <SubmittedDocuments pdfs={pdfs} showPreview={false} />
                </div>
              )}

              {Object.keys(documents).length > 0 && (
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground"><Paperclip />Uploaded documents</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(documents).flatMap(([field, paths]) => paths.map((path, index) => (
                      <Button key={path} variant="outline" size="sm" onClick={() => openDocument(path)}>
                        {FILE_LABELS[field] || field}{paths.length > 1 ? ` ${index + 1}` : ''} <ExternalLink />
                      </Button>
                    )))}
                  </div>
                </div>
              )}

              {row.status === 'approved' && (
                <div className="grid gap-4 border-t border-border pt-6 md:grid-cols-2">
                  <div>
                    <p className="font-semibold text-foreground">Secondary market trading</p>
                    <p className="mt-1 text-sm text-muted-foreground">Access the Constrade web app for secondary-market opportunities.</p>
                    <Button asChild variant="outline" className="mt-3"><a href="https://trading.constantcap.com.gh" target="_blank" rel="noreferrer">Open secondary market <ExternalLink /></a></Button>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Primary dealership</p>
                    <p className="mt-1 text-sm text-muted-foreground">Individuals and institutions can participate through our primary-dealership portal.</p>
                    <Button asChild variant="outline" className="mt-3"><a href="https://auction.constantcap.com.gh" target="_blank" rel="noreferrer">Open primary portal <ExternalLink /></a></Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ApplicationTracker;