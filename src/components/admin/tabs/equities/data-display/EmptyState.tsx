
import React from 'react';

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="p-8 text-center text-gray-500 dark:text-muted-foreground">
      {message}
    </div>
  );
};

export default EmptyState;
