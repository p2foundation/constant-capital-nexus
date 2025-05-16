
import { supabase } from '@/integrations/supabase/client';
import { ResearchReport } from '@/types/supabase';
import { toast } from 'sonner';
import { ReportResult } from './types';

// Fetch a list of reports with filters
export async function fetchReportsList(
  offset: number,
  limit: number,
  reportType?: string,
  fetchPremiumContent = false,
  searchQuery = '',
) {
  try {
    // First, count the total number of reports (for pagination)
    let countQuery = supabase
      .from('research_reports')
      .select('id', { count: 'exact' });
    
    // Apply filters
    if (reportType) {
      countQuery = countQuery.eq('type', reportType);
    }
    
    // If not fetching premium content or user doesn't have access
    if (!fetchPremiumContent) {
      countQuery = countQuery.eq('is_premium', false);
    }
    
    // Add search filter if provided
    if (searchQuery) {
      countQuery = countQuery.or(`title.ilike.%${searchQuery}%,preview.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`);
    }
    
    const { count, error: countError } = await countQuery;
    
    if (countError) {
      throw countError;
    }
    
    // Now fetch the actual data for the current page
    let query = supabase
      .from('research_reports')
      .select('*')
      .order('date', { ascending: false })
      .range(offset, offset + limit - 1);
    
    // Filter by type if provided
    if (reportType) {
      query = query.eq('type', reportType);
    }
    
    // If not fetching premium content
    if (!fetchPremiumContent) {
      query = query.eq('is_premium', false);
    }
    
    // Add search filter if provided
    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,preview.ilike.%${searchQuery}%,author.ilike.%${searchQuery}%`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return { 
      reports: data as ResearchReport[], 
      totalCount: count || 0 
    };
  } catch (err: any) {
    console.error('Error fetching research reports:', err);
    toast.error('Failed to load research reports');
    throw err;
  }
}

// Get a single report by ID
export async function getReportById(id: string): Promise<ReportResult> {
  try {
    // Fetch the report
    const { data: reportData, error: reportError } = await supabase
      .from('research_reports')
      .select('*')
      .eq('id', id)
      .single();
    
    if (reportError) {
      throw reportError;
    }
    
    // Fetch associated files
    const { data: filesData, error: filesError } = await supabase
      .from('report_files')
      .select('*')
      .eq('report_id', id);
    
    if (filesError) {
      throw filesError;
    }
    
    // Fetch associated images
    const { data: imagesData, error: imagesError } = await supabase
      .from('report_images')
      .select('*')
      .eq('report_id', id);
    
    if (imagesError) {
      throw imagesError;
    }
    
    return {
      report: reportData as ResearchReport,
      files: filesData || [],
      images: imagesData || []
    };
  } catch (err: any) {
    console.error('Error fetching report details:', err);
    toast.error('Failed to load report details');
    return { report: null, files: [], images: [] };
  }
}
