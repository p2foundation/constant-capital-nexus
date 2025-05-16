
import { useState, useEffect } from 'react';
import { ResearchReport } from '@/types/supabase';
import { UseResearchReportsProps, UseResearchReportsReturn } from './types';
import { fetchReportsList, getReportById } from './reportFetching';
import { createReport, updateReport, deleteReport } from './reportManagement';
import { useAuth } from '@/contexts/AuthContext';

export function useResearchReports({
  fetchPremiumContent = false,
  limit = 10,
  page = 1,
  reportType,
  searchQuery = ''
}: UseResearchReportsProps = {}): UseResearchReportsReturn {
  const [reports, setReports] = useState<ResearchReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { profile } = useAuth();

  // Calculate offset based on current page and limit
  const offset = (page - 1) * limit;

  // Fetch reports on component mount and when dependencies change
  useEffect(() => {
    fetchReports();
  }, [fetchPremiumContent, limit, page, reportType, profile, searchQuery]);
  
  const fetchReports = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use our utility function to fetch reports
      const { reports: fetchedReports, totalCount: count } = await fetchReportsList(
        offset,
        limit,
        reportType,
        // Only fetch premium if user has permission
        fetchPremiumContent && !!profile,
        searchQuery
      );
      
      setReports(fetchedReports);
      setTotalCount(count);
    } catch (err: any) {
      console.error('Error fetching research reports:', err);
      setError(err.message || 'Failed to fetch research reports');
    } finally {
      setIsLoading(false);
    }
  };

  // Wrapper around the imported functions
  const handleDeleteReport = async (id: string): Promise<boolean> => {
    const success = await deleteReport(id);
    if (success) {
      // Remove the deleted report from the state
      setReports(prev => prev.filter(report => report.id !== id));
    }
    return success;
  };

  return {
    reports,
    isLoading,
    error,
    fetchReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport: handleDeleteReport,
    totalCount
  };
}
