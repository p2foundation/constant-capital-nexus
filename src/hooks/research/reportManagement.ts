
import { supabase } from '@/integrations/supabase/client';
import { ResearchReport } from '@/types/supabase';
import { toast } from 'sonner';
import { ReportCreateResult, ReportUpdateResult } from './types';

// Create a new report
export async function createReport(
  reportData: Partial<ResearchReport>,
  files?: File[],
  coverImage?: File
): Promise<ReportCreateResult> {
  try {
    // Insert the report data
    const { data, error } = await supabase
      .from('research_reports')
      .insert({
        title: reportData.title!,
        type: reportData.type!,
        date: reportData.date || new Date().toISOString(),
        preview: reportData.preview!,
        content: reportData.content,
        author: reportData.author,
        is_premium: reportData.is_premium || false
      } as any)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    const reportId = (data as any).id;
    
    // Upload files if provided
    if (files && files.length > 0) {
      await Promise.all(
        files.map(async (file) => {
          // Upload file to storage
          const { data: fileData, error: uploadError } = await supabase.storage
            .from('research_reports')
            .upload(`${reportId}/${file.name}`, file);
          
          if (uploadError) {
            throw uploadError;
          }
          
          // Save file reference in the database
          const { error: fileRefError } = await supabase
            .from('report_files')
            .insert({
              report_id: reportId,
              file_path: fileData.path,
              file_name: file.name,
              file_size: file.size
            } as any);
          
          if (fileRefError) {
            throw fileRefError;
          }
        })
      );
    }
    
    // Upload cover image if provided
    if (coverImage) {
      const { data: imageData, error: uploadError } = await supabase.storage
        .from('report_images')
        .upload(`${reportId}/${coverImage.name}`, coverImage);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Save image reference in the database
      const { error: imageRefError } = await supabase
        .from('report_images')
        .insert({
          report_id: reportId,
          image_path: imageData.path,
          image_name: coverImage.name,
          is_featured: true
        } as any);
      
      if (imageRefError) {
        throw imageRefError;
      }
    }
    
    toast.success('Research report created successfully');
    
    return { success: true, reportId };
  } catch (err: any) {
    console.error('Error creating research report:', err);
    toast.error('Failed to create research report');
    return { success: false, error: err.message };
  }
}

// Update an existing report
export async function updateReport(
  id: string,
  reportData: Partial<ResearchReport>,
  files?: File[],
  coverImage?: File
): Promise<ReportUpdateResult> {
  try {
    // Update the report data
    const { error } = await supabase
      .from('research_reports')
      .update({
        title: reportData.title,
        type: reportData.type,
        date: reportData.date,
        preview: reportData.preview,
        content: reportData.content,
        author: reportData.author,
        is_premium: reportData.is_premium
      } as any)
      .eq('id', id as any);
    
    if (error) {
      throw error;
    }
    
    // Handle files and images as needed for updates
    // Would need similar logic to createReport but for updates
    
    toast.success('Research report updated successfully');
    
    return { success: true };
  } catch (err: any) {
    console.error('Error updating research report:', err);
    toast.error('Failed to update research report');
    return { success: false, error: err.message };
  }
}

// Delete a report
export async function deleteReport(id: string): Promise<boolean> {
  try {
    // Delete the report
    const { error } = await supabase
      .from('research_reports')
      .delete()
      .eq('id', id as any);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (err: any) {
    console.error('Error deleting report:', err);
    toast.error('Failed to delete report');
    return false;
  }
}
