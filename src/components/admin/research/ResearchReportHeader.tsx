
import React from 'react';
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus, BarChart3 } from "lucide-react";
import { Link } from 'react-router-dom';
import { ResearchReport } from '@/types/supabase';

interface ResearchReportHeaderProps {
  isSheetOpen: boolean;
  setIsSheetOpen: (isOpen: boolean) => void;
  setEditingReport: (report: ResearchReport | null) => void;
  editingReport: ResearchReport | null;
  children?: React.ReactNode;
}

const ResearchReportHeader: React.FC<ResearchReportHeaderProps> = ({
  isSheetOpen,
  setIsSheetOpen,
  setEditingReport,
  editingReport,
  children,
}) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Research Reports</CardTitle>
        <CardDescription>
          Manage market insights and research publications
        </CardDescription>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link to="/full-market-report" target="_blank" rel="noopener noreferrer">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Market Report
          </Link>
        </Button>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button 
              onClick={() => {
                setEditingReport(null);
                setIsSheetOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Report
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[90%] sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                {editingReport ? "Edit Research Report" : "Add New Research Report"}
              </SheetTitle>
            </SheetHeader>
            {children}
          </SheetContent>
        </Sheet>
      </div>
    </CardHeader>
  );
};

export default ResearchReportHeader;
