
import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message = "Loading reports..." }: LoadingStateProps) => {
  return (
    <div className="flex flex-col h-64 items-center justify-center space-y-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

export default LoadingState;
