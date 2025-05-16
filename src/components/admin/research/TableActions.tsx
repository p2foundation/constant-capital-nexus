
import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, Download } from "lucide-react";

interface TableActionsProps {
  reportId: string;
  onEdit: () => void;
  onDelete: () => void;
  downloadUrl?: string;
}

const TableActions: React.FC<TableActionsProps> = ({
  reportId,
  onEdit,
  onDelete,
  downloadUrl
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button size="sm" variant="ghost" asChild>
        <a href={`/research/${reportId}`} target="_blank" rel="noopener noreferrer">
          <Eye className="h-4 w-4" />
        </a>
      </Button>
      {downloadUrl && (
        <Button size="sm" variant="ghost" asChild>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer" download>
            <Download className="h-4 w-4" />
          </a>
        </Button>
      )}
      <Button 
        size="sm" 
        variant="ghost"
        onClick={onEdit}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="ghost"
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TableActions;
