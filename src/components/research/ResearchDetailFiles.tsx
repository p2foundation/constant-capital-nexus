
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { researchReportsAPI } from '@/services/api/researchReports';

interface ReportFile {
  id: string;
  file_name: string;
  file_path: string;
  file_size?: number;
}

interface ResearchDetailFilesProps {
  pdfUrl?: string;
  files: ReportFile[];
}

const ResearchDetailFiles = ({ pdfUrl, files = [] }: ResearchDetailFilesProps) => {
  if (!pdfUrl && (!files || files.length === 0)) {
    return null;
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
