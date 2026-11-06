
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
      status: 'draft' | 'pending_review';
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
  const [saving, setSaving] = useState(false);
  const submitIntent = React.useRef<'draft' | 'pending_review'>('pending_review');
  
  // Auto-populate author field when form opens for new reports
  useEffect(() => {
    if (isOpen && !editingReport && profile) {
      const userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
      if (userName) {
        setAuthor(userName);
      }
    }
  }, [isOpen, editingReport, profile]);

  // Set form values when editing a report
  useEffect(() => {
    if (editingReport) {
      setTitle(editingReport.title);
      setType(editingReport.type);
      setDate((editingReport.date || '').slice(0, 10));
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
    
    if (!title || !type || !preview || saving) return;
    setSaving(true);
    try {
    await onSubmit(
      {
        title,
        type, 
        date,
        preview,
        content,
        author,
        isPremium,
        status: submitIntent.current
      },
      files,
      coverImage
    );
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setType("market-report");
    setDate(new Date().toISOString().split('T')[0]);
    setPreview("");
    setContent("");
    // Don't reset author here - it will be set by the useEffect above
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
          title={title}
          setTitle={setTitle}
          type={type}
          files={files}
          setFiles={setFiles}
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
          saving={saving}
          reviewNote={editingReport?.status === 'rejected' ? editingReport.review_note : null}
          onIntent={(i) => { submitIntent.current = i; }}
        />
      </form>
    </ScrollArea>
  );
};

export default ResearchReportForm;
