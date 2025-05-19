
import React from 'react';
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const handleClickWithErrorHandling = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    
    try {
      console.log("Save changes button clicked - triggering onClick handler");
      onClick();
    } catch (error) {
      console.error("Error in save changes button click handler:", error);
      toast.error(`Failed to save: ${(error as Error).message || 'Unknown error occurred'}`);
    }
  };

  const isButtonDisabled = disabled || isSaving;
  const buttonAriaLabel = isSaving ? "Saving..." : "Save Changes";
  const buttonLoadingState = isSaving ? (
    <>
      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" 
            aria-hidden="true"></span>
      Saving...
    </>
  ) : (
    <>
      <Save size={16} aria-hidden="true" />
      Save Changes
    </>
  );

  return (
    <Button 
      onClick={handleClickWithErrorHandling}
      disabled={isButtonDisabled}
      className="flex items-center gap-1"
      type="button"
      aria-label={buttonAriaLabel}
    >
      {buttonLoadingState}
    </Button>
  );
};

export default SaveChangesButton;
