
import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ 
  message = "Failed to load reports", 
  onRetry = () => window.location.reload()
}: ErrorStateProps) => {
  return (
    <div className="flex h-64 flex-col items-center justify-center text-center space-y-4">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <p className="text-destructive font-medium">{message}</p>
      <Button 
        variant="outline" 
        onClick={onRetry}
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorState;
