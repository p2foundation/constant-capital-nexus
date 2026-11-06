
import React, { useState } from 'react';
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus, BarChart3, Maximize2, Minimize2 } from "lucide-react";
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
  const [fullPage, setFullPage] = useState(false);
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
          <SheetContent
            className={`overflow-y-auto transition-[width,max-width] duration-300 ${fullPage ? "w-full sm:max-w-none" : "w-[90%] sm:max-w-2xl"}`}
          >
            <SheetHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pr-8">
              <SheetTitle>
                {editingReport ? "Edit Research Report" : "Add New Research Report"}
              </SheetTitle>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setFullPage((v) => !v)}
                aria-label={fullPage ? "Exit full page" : "Open full page"}
              >
                {fullPage ? <Minimize2 className="h-4 w-4 mr-1" /> : <Maximize2 className="h-4 w-4 mr-1" />}
                {fullPage ? "Exit full page" : "Full page"}
              </Button>
            </SheetHeader>
            <div className={fullPage ? "mx-auto max-w-5xl" : undefined}>{children}</div>
          </SheetContent>
        </Sheet>
      </div>
    </CardHeader>
  );
};

export default ResearchReportHeader;
