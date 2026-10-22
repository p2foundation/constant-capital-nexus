import { useState, useCallback, useMemo, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { FormData } from '@/components/account-opening/types';
import { completion } from '@/components/account-opening/requirements';
import { debounce } from 'lodash';
import { stripFiles, sanitizeLoaded, uploadPendingFiles, uploadPdf, StoredPdf, StoredDocuments } from '@/lib/accountDocuments';

export interface SubmitResult { applicationId: string; pdfs: StoredPdf[]; emailed: boolean }

export const useAccountOpeningPersistence = () => {
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const idRef = useRef<string | null>(null);
  const progressRef = useRef<FormData['_progress']>({});
  const uploadedRef = useRef<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const setId = (id: string) => { idRef.current = id; setApplicationId(id); };

  const loadApplication = useCallback(async (): Promise<FormData | null> => {
    if (!user) { setIsLoading(false); return null; }
    try {
      const { data, error } = await supabase
        .from('account_opening_applications')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'draft')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) { console.error('Error loading application:', error); return null; }
      if (data) {
        setId(data.id);
        const fd = sanitizeLoaded(data.form_data as unknown as FormData);
        progressRef.current = fd._progress || {};
        uploadedRef.current = fd._uploaded || {};
        return fd;
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  /** Saves answers, uploads newly picked files and records progress. */
  const persist = useCallback(async (formData: FormData, currentStep = 0, extra: Record<string, unknown> = {}): Promise<string> => {
    if (!user) throw new Error('Not signed in');
    const now = new Date().toISOString();
    let id = idRef.current;
    if (!id) {
      progressRef.current = { startedAt: now, events: [{ at: now, event: 'Application started' }] };
      const { data, error } = await supabase
        .from('account_opening_applications')
        .insert({ user_id: user.id, form_data: { _progress: progressRef.current } as any, status: 'draft', application_type: 'individual' })
        .select('id').single();
      if (error) throw error;
      setId(data.id);
      id = data.id;
    }
    uploadedRef.current = await uploadPendingFiles(user.id, id!, { ...formData, _uploaded: uploadedRef.current });
    const withUploads = { ...formData, _uploaded: uploadedRef.current };
    const { percent, missing } = completion(withUploads);
    const prev = progressRef.current || {};
    const events = [...(prev.events || [])];
    if ((prev.currentStep ?? -1) < currentStep) events.push({ at: now, event: `Reached step ${currentStep + 1}` });
    progressRef.current = {
      ...prev, startedAt: prev.startedAt || now, lastActivityAt: now,
      currentStep: Math.max(prev.currentStep ?? 0, currentStep), percent, missing: missing.map((m) => m.label), events: events.slice(-50),
    };
    const { error } = await supabase
      .from('account_opening_applications')
      .update({ form_data: { ...stripFiles(withUploads), _progress: progressRef.current, ...extra } as any })
      .eq('id', id!);
    if (error) throw error;
    return id!;
  }, [user]);

  const saveApplication = useCallback(async (formData: FormData, step?: number) => {
    if (!user) return;
    setIsSaving(true);
    try {
      await persist(formData, step);
    } catch (error) {
      console.error('Error saving application:', error);
      toast({ title: 'Save Error', description: 'Failed to save your progress. Please try again.', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  }, [user, persist, toast]);

  const debouncedSave = useMemo(() => debounce((fd: FormData, step?: number) => { saveApplication(fd, step); }, 2000), [saveApplication]);

  const submitApplication = useCallback(async (
    formData: FormData,
    renderPdfs: () => Promise<{ type: 'CSD' | 'KYC'; blob: Blob }[]>,
  ): Promise<SubmitResult | null> => {
    if (!user) return null;
    debouncedSave.cancel();
    try {
      const appId = await persist(formData, 7);
      const documents: StoredDocuments = Object.fromEntries(Object.entries(uploadedRef.current).map(([k, v]) => [k, [v]]));
      const rendered = await renderPdfs();
      const pdfs: StoredPdf[] = [];
      for (const r of rendered) pdfs.push({ type: r.type, path: await uploadPdf(user.id, appId, r.type, r.blob) });

      const now = new Date().toISOString();
      const progress = { ...progressRef.current, percent: 100, missing: [], events: [...(progressRef.current?.events || []), { at: now, event: 'Submitted' }] };
      const { error } = await supabase
        .from('account_opening_applications')
        .update({
          form_data: { ...stripFiles(formData), _uploaded: uploadedRef.current, _progress: progress, documents, pdfs, submitted_at: now } as any,
          status: 'submitted',
        })
        .eq('id', appId);
      if (error) throw error;

      // Notify the trading desk with PDFs + documents attached
      const { data: mail, error: mailErr } = await supabase.functions.invoke('send-account-application', { body: { applicationId: appId } });
      const emailed = !mailErr && !(mail as any)?.error;
      if (!emailed) console.error('Notification email failed', mailErr || mail);

      toast({ title: 'Application Submitted', description: 'Your application and signed forms have been sent to our trading team.' });
      return { applicationId: appId, pdfs, emailed };
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({ title: 'Submission Failed', description: error?.message || 'Please try again.', variant: 'destructive' });
      return null;
    }
  }, [user, persist, debouncedSave, toast]);

  return {
    loadApplication,
    saveApplication: debouncedSave,
    submitApplication,
    isLoading,
    isSaving,
    hasExistingApplication: !!applicationId,
    startedAt: progressRef.current?.startedAt,
  };
};
