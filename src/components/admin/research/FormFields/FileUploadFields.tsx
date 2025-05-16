
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FileUp,
  ImagePlus,
  Trash2
} from "lucide-react";

interface FileUploadFieldsProps {
  files: File[];
  setFiles: (files: File[]) => void;
  coverImage: File | null;
  setCoverImage: (file: File | null) => void;
  coverImagePreview: string | null;
  setCoverImagePreview: (preview: string | null) => void;
}

const FileUploadFields: React.FC<FileUploadFieldsProps> = ({
  files,
  setFiles,
  coverImage,
  setCoverImage,
  coverImagePreview,
  setCoverImagePreview,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="files">Attach Files (PDFs, etc.)</Label>
        <div className="mt-1 flex items-center">
          <label className="w-full cursor-pointer rounded-md border border-dashed border-gray-300 px-3 py-2 text-center hover:bg-gray-50">
            <FileUp className="mx-auto h-4 w-4 text-gray-400" />
            <span className="mt-1 block text-xs font-medium text-gray-600">
              {files.length === 0 
                ? "Click to upload files" 
                : `${files.length} file(s) selected`}
            </span>
            <Input
              id="files"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
          </label>
        </div>
        {files.length > 0 && (
          <ul className="mt-2 text-xs text-gray-500">
            {Array.from(files).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
      
      <div>
        <Label htmlFor="coverImage">Cover Image</Label>
        <div className="mt-1">
          {coverImagePreview ? (
            <div className="relative h-32 w-full">
              <img
                src={coverImagePreview}
                alt="Cover preview"
                className="h-full w-full rounded-md object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute right-1 top-1"
                onClick={() => {
                  setCoverImage(null);
                  setCoverImagePreview(null);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 hover:bg-gray-50">
              <ImagePlus className="h-8 w-8 text-gray-400" />
              <span className="mt-1 text-xs font-medium text-gray-600">
                Click to upload cover image
              </span>
              <Input
                id="coverImage"
                type="file"
                onChange={handleCoverImageChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadFields;
