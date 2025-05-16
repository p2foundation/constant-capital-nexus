import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { toast } from "sonner";
import { useResearchReports } from '@/hooks/useResearchReports';
import { useAuth } from '@/contexts/AuthContext';
import { ResearchReport } from '@/types/supabase';

// Import refactored components
import ResearchReportHeader from './research/ResearchReportHeader';
import ResearchReportContainer from './research/ResearchReportContainer';
import ResearchReportForm from './research/ResearchReportForm';

const REPORTS_PER_PAGE = 10; // Number of reports to display per page

const ResearchReportManager = () => {
  // State for the form and sheet
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<ResearchReport | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState<string>("all");
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Auth context for user information
  const { profile } = useAuth();
  
  // Get reports with premium content
  const { 
    reports, 
    isLoading, 
    error, 
    createReport, 
    deleteReport, 
    fetchReports, 
    totalCount 
  } = useResearchReports({
    fetchPremiumContent: true,
    limit: REPORTS_PER_PAGE,
    page: currentPage,
    searchQuery: searchQuery,
    reportType: filterType !== "all" ? filterType : undefined
  });

  // Calculate total pages when reports or total count changes
  useEffect(() => {
    if (totalCount) {
      setTotalPages(Math.ceil(totalCount / REPORTS_PER_PAGE));
    }
  }, [totalCount]);

  // Handle search form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchReports();
  };

  // Effect to fetch reports when filter type changes
  useEffect(() => {
    fetchReports();
  }, [filterType, currentPage]);

  const handleSubmit = async (
    reportData: {
      title: string;
      type: string;
      date: string;
      preview: string;
      content: string;
      author: string;
      isPremium: boolean;
    },
    files: File[],
    coverImage: File | null
  ) => {
    try {
      if (!reportData.title || !reportData.type || !reportData.preview) {
        toast.error("Please fill all required fields");
        return;
      }
      
      // Create new report
      const result = await createReport(
        {
          title: reportData.title,
          type: reportData.type, 
          date: reportData.date,
          preview: reportData.preview,
          content: reportData.content,
          author: reportData.author,
          is_premium: reportData.isPremium
        },
        files,
        coverImage || undefined
      );
      
      if (result.success) {
        // Reset form
        setIsSheetOpen(false);
        
        // If we're not on page 1, go back to page 1 to see the new report
        if (currentPage !== 1) {
          setCurrentPage(1);
        } else {
          // Otherwise, just refresh the current page
          fetchReports();
        }
      }
    } catch (error) {
      console.error("Error saving report:", error);
      toast.error("Failed to save report");
    }
  };

  const handleDeleteReport = async (id: string) => {
    try {
      const success = await deleteReport(id);
      if (success) {
        toast.success("Report deleted successfully");
        // If we're on a page with only one report and it's not page 1, go back a page
        if (reports.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          // Otherwise, just refresh the current page
          fetchReports();
        }
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      toast.error("Failed to delete report");
    }
  };

  const handleEditReport = (report: ResearchReport) => {
    setEditingReport(report);
    setIsSheetOpen(true);
  };

  const handleCancelForm = () => {
    setEditingReport(null);
    setIsSheetOpen(false);
  };

  const handleRetry = () => {
    fetchReports();
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <>
      <Card>
        <ResearchReportHeader 
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          setEditingReport={setEditingReport}
          editingReport={editingReport}
        >
          {isSheetOpen && (
            <ResearchReportForm
              isOpen={isSheetOpen}
              editingReport={editingReport}
              profile={profile}
              onSubmit={handleSubmit}
              onCancel={handleCancelForm}
            />
          )}
        </ResearchReportHeader>
        
        <CardContent>
          <ResearchReportContainer
            reports={reports}
            isLoading={isLoading}
            error={error}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterType={filterType}
            setFilterType={setFilterType}
            isFiltering={isFiltering}
            setIsFiltering={setIsFiltering}
            handleSearchSubmit={handleSearchSubmit}
            handleEditReport={handleEditReport}
            handleDeleteReport={handleDeleteReport}
            handleRetry={handleRetry}
            formatDate={formatDate}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ResearchReportManager;
