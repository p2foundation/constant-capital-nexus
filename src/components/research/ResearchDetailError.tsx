
import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResearchDetailErrorProps {
  error: string | null;
}

const ResearchDetailError = ({ error }: ResearchDetailErrorProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="pt-20 flex-grow container mx-auto px-4 py-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Research Report Not Found</h1>
        <p className="mb-6">{error || "The research report you're looking for could not be found."}</p>
        <Button onClick={() => navigate('/research')}>
          Back to Research Portal
        </Button>
      </div>
    </div>
  );
};

export default ResearchDetailError;
