
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

// Default research images
const defaultResearchImages = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
];

// Generate consistent image for a specific report based on ID
const getDefaultImage = (id: string) => {
  // Use the string's characters to generate a consistent number
  const charSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = charSum % defaultResearchImages.length;
  return `${defaultResearchImages[index]}?auto=format&fit=crop&w=800&q=80`;
};

interface ResearchReportCardProps {
  id: string;
  title: string;
  type: string;
  date: string;
  preview: string;
  imageUrl?: string;
}

const ResearchReportCard: React.FC<ResearchReportCardProps> = ({
  id,
  title,
  type,
  date,
  preview,
  imageUrl
}) => {
  // Use either the provided image or a default one based on the report ID
  const displayImage = imageUrl || getDefaultImage(id);

  return (
    <Card className="mb-6 border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="pt-6">
        {displayImage && (
          <div className="mb-4 h-48 overflow-hidden rounded-md">
            <img 
              src={displayImage} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-row justify-between items-start pb-2">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs font-normal capitalize">
                {type}
              </Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 mt-4">{preview}</p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Login required for full access</div>
          <Link to={`/research/${id}`}>
            <Button variant="ghost" size="sm" className="text-cc-blue hover:text-cc-navy dark:text-cc-gold dark:hover:text-cc-gold/80">
              <Book className="h-4 w-4 mr-1" /> View Report
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchReportCard;
