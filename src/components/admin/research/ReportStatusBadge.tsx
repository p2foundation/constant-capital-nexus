
import React from 'react';

interface ReportStatusBadgeProps {
  isPremium: boolean;
  hasDownload?: boolean;
}

const ReportStatusBadge: React.FC<ReportStatusBadgeProps> = ({ isPremium, hasDownload }) => {
  if (isPremium) {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
        Premium
      </span>
    );
  }
  
  if (hasDownload) {
    return (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
        Free Download
      </span>
    );
  }
  
  return (
    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
      Free
    </span>
  );
};

export default ReportStatusBadge;
