import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ResearchDetailHeader from '@/components/research/ResearchDetailHeader';
import ResearchDetailContent from '@/components/research/ResearchDetailContent';
import ResearchDetailFiles from '@/components/research/ResearchDetailFiles';
import ResearchDetailRelated from '@/components/research/ResearchDetailRelated';

// Default research images for reports without images
const defaultResearchImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", 
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
];

// Generate consistent image for a specific report based on ID
const getDefaultImage = (id: string = '') => {
  // Use the string's characters to generate a consistent number
  const charSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = charSum % defaultResearchImages.length;
  return `${defaultResearchImages[index]}?auto=format&fit=crop&w=800&q=80`;
};

interface ReportFile {
  id: string;
  file_name: string;
  file_path: string;
  file_size?: number;
}

interface ResearchDetailProps {
  id?: string;
  title: string;
  type: string;
  date: string;
  preview: string;
  content?: string;
  author?: string;
  pdfUrl?: string;
  imageUrl?: string;
  isPremium?: boolean;
  files?: ReportFile[];
}

const ResearchDetail = ({ 
  id = '',
  title, 
  type, 
  date, 
  preview,
  content,
  author,
  pdfUrl,
  imageUrl,
  isPremium = false,
  files = []
}: ResearchDetailProps) => {
  // Use either the provided image or a default one based on the report ID
  const displayImage = imageUrl || getDefaultImage(id);

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <ResearchDetailHeader
              title={title}
              type={type}
              date={date}
              author={author}
              isPremium={isPremium}
            />
            
            <ResearchDetailFiles 
              pdfUrl={pdfUrl} 
              files={files}
              isPremium={isPremium}
            />
          </div>
          
          <div className="my-4">
            <img 
              src={displayImage} 
              alt={title} 
              className="w-full max-h-80 object-cover rounded-md"
            />
          </div>
          
          <ResearchDetailContent
            preview={preview}
            content={content}
          />
          
          <ResearchDetailRelated />
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchDetail;
