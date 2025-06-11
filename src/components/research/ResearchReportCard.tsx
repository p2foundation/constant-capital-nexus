
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ResearchReportCardProps {
  id: string;
  title: string;
  type: string;
  date: string;
  preview: string;
  isPremium?: boolean;
}

const ResearchReportCard: React.FC<ResearchReportCardProps> = ({ 
  id,
  title, 
  type, 
  date, 
  preview,
  isPremium = false
}) => {
  return (
    <Card className="mb-4 border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row justify-between items-start pb-2">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs font-normal capitalize">
              {type}
            </Badge>
            <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
            {isPremium && (
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                Premium
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{preview}</p>
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
