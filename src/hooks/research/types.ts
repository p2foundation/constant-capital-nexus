
import { ResearchReport, ReportFile, ReportImage } from '@/types/supabase';

export interface UseResearchReportsProps {
  fetchPremiumContent?: boolean;
  limit?: number;
  page?: number;
  reportType?: string;
  searchQuery?: string;
}

export interface ReportResult {
  report: ResearchReport | null;
  files: ReportFile[];
  images: ReportImage[];
}

export interface ReportCreateResult {
  success: boolean;
  reportId?: string;
  error?: string;
}

export interface ReportUpdateResult {
  success: boolean;
  error?: string;
}

export interface UseResearchReportsReturn {
  reports: ResearchReport[];
  isLoading: boolean;
  error: string | null;
  fetchReports: () => Promise<void>;
  getReportById: (id: string) => Promise<ReportResult>;
  createReport: (
    reportData: Partial<ResearchReport>,
    files?: File[],
    coverImage?: File
  ) => Promise<ReportCreateResult>;
  updateReport: (
    id: string,
    reportData: Partial<ResearchReport>,
    files?: File[],
    coverImage?: File
  ) => Promise<ReportUpdateResult>;
  deleteReport: (id: string) => Promise<boolean>;
  totalCount: number;
}
