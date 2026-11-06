import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type ReviewDecision = 'published' | 'rejected';

/** Manager decision. The database enforces that reviewer ≠ writer and only Admin/Developer can decide. */
export async function reviewReport(id: string, decision: ReviewDecision, note?: string): Promise<boolean> {
  const { error } = await supabase
    .from('research_reports')
    .update({ status: decision, review_note: note?.trim() || null } as any)
    .eq('id', id as any);
  if (error) {
    toast.error(error.message);
    return false;
  }
  toast.success(decision === 'published' ? 'Report approved and published' : 'Report returned to the writer');
  return true;
}
