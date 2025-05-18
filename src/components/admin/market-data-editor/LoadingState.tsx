
import React from 'react';

interface LoadingStateProps {
  title: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex flex-col items-center space-y-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground">Loading {title.toLowerCase()} data...</p>
      </div>
    </div>
  );
};

export default LoadingState;
