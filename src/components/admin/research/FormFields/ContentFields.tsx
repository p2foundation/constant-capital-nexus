
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContentFieldsProps {
  preview: string;
  setPreview: (preview: string) => void;
  content: string;
  setContent: (content: string) => void;
}

const ContentFields: React.FC<ContentFieldsProps> = ({
  preview,
  setPreview,
  content,
  setContent,
}) => {
  return (
    <>
      <div>
        <Label htmlFor="preview">Preview/Summary</Label>
        <Textarea
          id="preview"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          placeholder="Write a brief summary or preview of the report"
          required
          rows={2}
        />
      </div>
      
      <div>
        <Label htmlFor="content">Full Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Full report content in HTML or Markdown format"
          rows={8}
        />
      </div>
    </>
  );
};

export default ContentFields;
