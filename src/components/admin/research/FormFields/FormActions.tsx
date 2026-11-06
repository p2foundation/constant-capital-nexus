import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Send, Save } from "lucide-react";

interface FormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
  saving?: boolean;
  reviewNote?: string | null;
  onIntent: (intent: 'draft' | 'pending_review') => void;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditing, onCancel, saving, reviewNote, onIntent }) => (
  <div className="space-y-3 pt-2">
    {reviewNote && (
      <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm">
        <span className="font-medium">Reviewer asked for changes:</span> {reviewNote}
      </div>
    )}
    <p className="text-xs text-muted-foreground">
      Reports go live only after a manager other than the writer approves them.
      {isEditing && " Saving changes to a published report sends it back for approval."}
    </p>
    <div className="flex flex-wrap justify-end gap-2">
      <Button type="button" variant="ghost" onClick={onCancel} disabled={saving}>Cancel</Button>
      <Button type="submit" variant="outline" disabled={saving} onClick={() => onIntent('draft')}>
        <Save className="h-4 w-4 mr-1" /> Save draft
      </Button>
      <Button type="submit" disabled={saving} onClick={() => onIntent('pending_review')}>
        {saving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Send className="h-4 w-4 mr-1" />}
        Submit for approval
      </Button>
    </div>
  </div>
);

export default FormActions;
