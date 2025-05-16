
// Research Reports API service
import { apiRequest } from './utils';

// Types for report creation and update
export interface CreateReportData {
  title: string;
  type: string;
  date: string;
  preview: string;
  content?: string;
  author?: string;
  is_premium?: boolean;
  image_url?: string;
}

export interface ReportQueryParams {
  limit?: number;
  page?: number;
  type?: string;
  premium_only?: boolean;
  search?: string;
  // Use a more specific index signature that ensures all values can be converted to strings
  [key: string]: string | number | boolean | undefined;
}

// API methods for research reports
export const researchReportsAPI = {
  // Get a paginated list of reports with optional filtering
  getReports: (params?: ReportQueryParams) => {
    // Convert all query parameters to strings
    const stringParams: Record<string, string> = {};
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          stringParams[key] = String(value);
        }
      });
    }
    return apiRequest("/research/reports", "GET", null, stringParams);
  },
  
  // Get a single report by ID
  getReport: (id: string) => 
    apiRequest(`/research/reports/${id}`),
  
  // Create a new report
  createReport: (data: CreateReportData) => 
    apiRequest("/research/reports", "POST", data),
  
  // Update an existing report
  updateReport: (id: string, data: Partial<CreateReportData>) => 
    apiRequest(`/research/reports/${id}`, "PUT", data),
  
  // Delete a report
  deleteReport: (id: string) => 
    apiRequest(`/research/reports/${id}`, "DELETE"),
  
  // Get report files
  getReportFiles: (reportId: string) => 
    apiRequest(`/research/reports/${reportId}/files`),
  
  // Upload a file to a report
  uploadReportFile: (reportId: string, formData: FormData) => 
    apiRequest(`/research/reports/${reportId}/files`, "POST", formData, {
      contentType: 'multipart/form-data'
    }),
  
  // Delete a report file
  deleteReportFile: (reportId: string, fileId: string) => 
    apiRequest(`/research/reports/${reportId}/files/${fileId}`, "DELETE"),
  
  // Get report statistics
  getReportStats: () => 
    apiRequest("/research/reports/stats"),
    
  // Get the download URL for a report file
  getFileDownloadUrl: (filePath: string) => 
    `https://estbtjkwlgefncxmxzta.supabase.co/storage/v1/object/public/research_reports/${filePath}`
};
