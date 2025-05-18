
import React from 'react';
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SaveChangesButtonProps {
  onClick: () => void;
  isSaving: boolean;
  disabled?: boolean;
}

const SaveChangesButton: React.FC<SaveChangesButtonProps> = ({ 
  onClick, 
  isSaving,
  disabled = false
}) => {
  return (
    <Button 
      onClick={onClick}
      disabled={disabled || isSaving}
      className="flex items-center gap-1"
    >
      {isSaving ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          Saving...
        </>
      ) : (
        <>
          <Save size={16} />
          Save Changes
        </>
      )}
    </Button>
  );
};

export default SaveChangesButton;
