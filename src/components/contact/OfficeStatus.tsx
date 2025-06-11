
import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { getOfficeStatus } from '@/utils/holidays';

const OfficeStatus = () => {
  const status = getOfficeStatus();
  
  const getStatusColor = () => {
    if (status.isOpen) return 'text-green-600 dark:text-green-400';
    if (status.type === 'holiday') return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  const getStatusIcon = () => {
    if (status.type === 'holiday') return <Calendar className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };
  
  return (
    <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
      {getStatusIcon()}
      <span className="text-sm font-medium">{status.reason}</span>
    </div>
  );
};

export default OfficeStatus;
