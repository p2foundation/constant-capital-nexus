
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { researchReportsAPI } from '@/services/api/researchReports';
import { useAuth } from '@/contexts/AuthContext';
import { canAccessPremiumContent } from '@/utils/premiumAccess';

interface ReportFile {
  id: string;
  file_name: string;
  file_path: string;
  file_size?: number;
}

interface ResearchDetailFilesProps {
  pdfUrl?: string;
  files: ReportFile[];
  isPremium?: boolean;
}

const ResearchDetailFiles = ({ pdfUrl, files = [], isPremium = false }: ResearchDetailFilesProps) => {
  const { profile, user } = useAuth();
  const hasAccess = canAccessPremiumContent(profile);

  if (!pdfUrl && (!files || files.length === 0)) {
    return null;
  }

  // If content is premium and user doesn't have access, show restricted message
  if (isPremium && !hasAccess) {
    return (
      <div className="flex flex-col gap-2">
        <div className="p-4 border border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="h-4 w-4 text-orange-600" />
            <span className="font-medium text-orange-800 dark:text-orange-200">Premium Content</span>
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
            This research report is available for premium subscribers and registered analysts.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            {!user ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Login to Access</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/contact">Contact Us for Access</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {pdfUrl && (
        <Button variant="outline" size="sm" className="flex gap-2" asChild>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </Button>
      )}

      {files && files.length > 0 && files.map((file) => (
        <Button 
          key={file.id}
          variant="outline" 
          size="sm" 
          className="flex gap-2" 
          asChild
        >
          <a href={researchReportsAPI.getFileDownloadUrl(file.file_path)} 
             target="_blank" 
             rel="noopener noreferrer" 
             download={file.file_name}>
            <Download className="h-4 w-4" />
            Download {file.file_name}
          </a>
        </Button>
      ))}
    </div>
  );
};

export default ResearchDetailFiles;
