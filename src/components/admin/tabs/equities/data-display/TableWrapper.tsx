
import React, { ReactNode } from 'react';

interface TableWrapperProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

const TableWrapper: React.FC<TableWrapperProps> = ({ 
  title, 
  children,
  action
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border rounded-md shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {action}
      </div>
      
      {children}
    </div>
  );
};

export default TableWrapper;
