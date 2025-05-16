
import React, { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResearchReport } from '@/types/supabase';
import { Profile } from '@/types/supabase';

// Import form field components
import BasicInfoFields from './FormFields/BasicInfoFields';
import ContentFields from './FormFields/ContentFields';
import AuthorSettings from './FormFields/AuthorSettings';
import FileUploadFields from './FormFields/FileUploadFields';
import FormActions from './FormFields/FormActions';

interface ResearchReportFormProps {
  isOpen: boolean;
  editingReport: ResearchReport | null;
  profile: Profile | null;
  onSubmit: (
    reportData: {
      title: string;
      type: string;
      date: string;
      preview: string;
      content: string;
      author: string;
      isPremium: boolean;
    },
    files: File[],
    coverImage: File | null
  ) => Promise<void>;
  onCancel: () => void;
}

const ResearchReportForm = ({
  isOpen,
  editingReport,
  profile,
  onSubmit,
  onCancel,
}: ResearchReportFormProps) => {
  // Form state
  const [title, setTitle] = useState("");
  const [type, setType] = useState("market-report");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  
  // Set the author field to the logged-in user's name when opening the form
  useEffect(() => {
    if (isOpen && !editingReport) {
      // Only auto-populate if this is a new report (not editing) and the author field is empty
      if (!author) {
        const userName = profile ? 
          `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : '';
        setAuthor(userName);
      }
    }
  }, [isOpen, profile, editingReport, author]);

  // Set form values when editing a report
  useEffect(() => {
    if (editingReport) {
      setTitle(editingReport.title);
      setType(editingReport.type);
      setDate(editingReport.date);
      setPreview(editingReport.preview);
      setContent(editingReport.content || '');
      setAuthor(editingReport.author || '');
      setIsPremium(editingReport.is_premium);
    } else {
      resetForm();
    }
  }, [editingReport]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !type || !preview) {
      return; // Validation is handled by parent component
    }
    
    await onSubmit(
      {
        title,
        type, 
        date,
        preview,
        content,
        author,
        isPremium
      },
      files,
      coverImage
    );
  };

  const resetForm = () => {
    setTitle("");
    setType("market-report");
    setDate(new Date().toISOString().split('T')[0]);
    setPreview("");
    setContent("");
    setAuthor("");
    setIsPremium(false);
    setFiles([]);
    setCoverImage(null);
    setCoverImagePreview(null);
  };

  return (
    <ScrollArea className="h-[calc(100vh-7rem)] pr-4">
      <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
        <BasicInfoFields
          title={title}
          setTitle={setTitle}
          type={type}
          setType={setType}
          date={date}
          setDate={setDate}
        />
        
        <ContentFields
          preview={preview}
          setPreview={setPreview}
          content={content}
          setContent={setContent}
        />
        
        <AuthorSettings
          author={author}
          setAuthor={setAuthor}
          isPremium={isPremium}
          setIsPremium={setIsPremium}
        />
        
        <FileUploadFields
          files={files}
          setFiles={setFiles}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          coverImagePreview={coverImagePreview}
          setCoverImagePreview={setCoverImagePreview}
        />
        
        <FormActions
          isEditing={!!editingReport}
          onCancel={onCancel}
        />
      </form>
    </ScrollArea>
  );
};

export default ResearchReportForm;
