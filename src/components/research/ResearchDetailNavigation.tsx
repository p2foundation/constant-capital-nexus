
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResearchDetailNavigation = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/research')}
        className="flex items-center gap-2 text-cc-navy dark:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Research Portal
      </Button>
    </div>
  );
};

export default ResearchDetailNavigation;
