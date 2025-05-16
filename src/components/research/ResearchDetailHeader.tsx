
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface ResearchDetailHeaderProps {
  title: string;
  type: string;
  date: string;
  author?: string;
  isPremium?: boolean;
}

const ResearchDetailHeader = ({ 
  title, 
  type, 
  date, 
  author,
  isPremium = false 
}: ResearchDetailHeaderProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <Badge variant="outline" className="text-xs font-normal capitalize">
          {type}
        </Badge>
        <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
        {author && <span className="text-xs text-gray-500 dark:text-gray-400">• {author}</span>}
        {isPremium && (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
            Premium
          </span>
        )}
      </div>
    </div>
  );
};

export default ResearchDetailHeader;
