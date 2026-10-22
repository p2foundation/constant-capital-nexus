
import React from 'react';
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface SaveButtonProps {
  title: string;
  isSaving: boolean;
  onSave: () => void;
  disabled?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ title, isSaving, onSave, disabled = false }) => {
  return (
    <div className="pt-4 flex justify-end">
      <Button 
        onClick={onSave} 
        disabled={isSaving || disabled}
        className="flex items-center gap-2"
      >
        {isSaving ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            Save {title} Data
          </>
        )}
      </Button>
    </div>
  );
};

export default SaveButton;
