
import { supabase } from '@/integrations/supabase/client';
import { ResearchReport } from '@/types/supabase';
import { toast } from 'sonner';
import { ReportCreateResult, ReportUpdateResult } from './types';
import { safeStorageName } from '@/lib/pdfText';

async function uploadAttachments(reportId: string, files: File[]) {
  for (const file of files) {
    const { data, error } = await supabase.storage
      .from('research_reports')
      .upload(`${reportId}/${safeStorageName(file.name)}`, file, { contentType: file.type || undefined });
    if (error) throw new Error(`Could not upload "${file.name}": ${error.message}`);
    const { error: refErr } = await supabase.from('report_files').insert({
      report_id: reportId,
      file_path: data.path,
      file_name: file.name,
      file_size: file.size,
    } as any);
    if (refErr) throw new Error(`Could not record "${file.name}": ${refErr.message}`);
  }
}

async function uploadCover(reportId: string, image: File, replace: boolean) {
  const { data, error } = await supabase.storage
    .from('report_images')
    .upload(`${reportId}/${safeStorageName(image.name)}`, image, { contentType: image.type || undefined });
  if (error) throw new Error(`Could not upload cover image: ${error.message}`);
  if (replace) {
    await supabase.from('report_images').update({ is_featured: false } as any).eq('report_id', reportId as any);
  }
  const { error: refErr } = await supabase.from('report_images').insert({
    report_id: reportId,
    image_path: data.path,
    image_name: image.name,
    is_featured: true,
  } as any);
  if (refErr) throw new Error(`Could not record cover image: ${refErr.message}`);
}

// Create a new report
export async function createReport(
  reportData: Partial<ResearchReport>,
  files?: File[],
  coverImage?: File
): Promise<ReportCreateResult> {
  const { data, error } = await supabase
    .from('research_reports')
    .insert({
      title: reportData.title!,
      type: reportData.type!,
      date: reportData.date || new Date().toISOString(),
      preview: reportData.preview!,
      content: reportData.content,
      author: reportData.author,
      is_premium: reportData.is_premium || false,
      status: (reportData as any).status || 'pending_review'
    } as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating research report:', error);
    toast.error(`Report not saved: ${error.message}`);
    return { success: false, error: error.message };
  }
  const reportId = (data as any).id as string;

  try {
    if (files?.length) await uploadAttachments(reportId, files);
    if (coverImage) await uploadCover(reportId, coverImage, false);
    toast.success('Research report saved');
    return { success: true, reportId };
  } catch (err: any) {
    console.error('Attachment upload failed:', err);
    // The report text is saved; tell the analyst exactly what to retry.
    toast.warning(`Report saved, but ${err.message}. Open it with Edit and attach the file again.`, { duration: 10000 });
    return { success: true, reportId, error: err.message };
  }
}

// Update an existing report (also adds newly attached files / replaces cover)
export async function updateReport(
  id: string,
  reportData: Partial<ResearchReport>,
  files?: File[],
  coverImage?: File
): Promise<ReportUpdateResult> {
  try {
    const { error } = await supabase
      .from('research_reports')
      .update({
        title: reportData.title,
        type: reportData.type,
        date: reportData.date,
        preview: reportData.preview,
        content: reportData.content,
        author: reportData.author,
        is_premium: reportData.is_premium,
        ...((reportData as any).status ? { status: (reportData as any).status } : {})
      } as any)
      .eq('id', id as any);
    if (error) throw error;

    if (files?.length) await uploadAttachments(id, files);
    if (coverImage) await uploadCover(id, coverImage, true);

    toast.success('Research report updated');
    return { success: true };
  } catch (err: any) {
    console.error('Error updating research report:', err);
    toast.error(`Update failed: ${err.message}`);
    return { success: false, error: err.message };
  }
}

// Delete a report
export async function deleteReport(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('research_reports')
      .delete()
      .eq('id', id as any);
    if (error) throw error;
    return true;
  } catch (err: any) {
    console.error('Error deleting report:', err);
    toast.error(`Failed to delete report: ${err.message}`);
    return false;
  }
}
