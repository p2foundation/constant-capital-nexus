import React, { useEffect, useRef, useState } from 'react';
import { Upload, X, FileText, Camera, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  label: string;
  accept: string;
  multiple?: boolean;
  onFileSelect: (files: File[]) => void;
  selectedFiles: File[];
  description?: string;
  /** Short tips shown under the box to help the client take a usable photo. */
  tips?: string[];
}

const MAX_BYTES = 10 * 1024 * 1024;
const COMPRESS_OVER = 1.5 * 1024 * 1024;
const MAX_SIDE = 2000;

/** Shrink large phone photos so uploads are quick on mobile data, keeping them sharp enough to read. */
async function prepareImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.size <= COMPRESS_OVER || file.type === 'image/gif') return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.85));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

const Preview: React.FC<{ file: File }> = ({ file }) => {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    if (!file.type.startsWith('image/')) return;
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  return url ? (
    <img src={url} alt={file.name} className="h-14 w-14 rounded object-cover border border-border" />
  ) : (
    <div className="h-14 w-14 rounded border border-border flex items-center justify-center bg-muted"><FileText className="h-5 w-5 text-muted-foreground" /></div>
  );
};

const FileUpload: React.FC<FileUploadProps> = ({ label, accept, multiple = false, onFileSelect, selectedFiles, description, tips }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>();
  const imagesAllowed = accept.includes('image');

  const take = async (list: File[]) => {
    setError(undefined);
    const picked = multiple ? list : list.slice(0, 1);
    if (!picked.length) return;
    setBusy(true);
    const prepared = await Promise.all(picked.map(prepareImage));
    setBusy(false);
    const tooBig = prepared.find((f) => f.size > MAX_BYTES);
    if (tooBig) {
      setError(`"${tooBig.name}" is larger than 10 MB. Please choose a smaller file or take a new photo.`);
      return;
    }
    onFileSelect(prepared);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) take(Array.from(e.dataTransfer.files));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) take(Array.from(e.target.files));
    e.target.value = '';
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}

      <div
        className={`border-2 border-dashed rounded-lg p-5 text-center transition-colors ${dragActive ? 'border-primary bg-primary/10' : 'border-border'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {busy ? (
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-muted-foreground" />
        ) : (
          <Upload className="mx-auto h-7 w-7 text-muted-foreground mb-2" />
        )}
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          <Button type="button" size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={busy}>
            <Upload className="h-4 w-4 mr-1" />Choose file
          </Button>
          {imagesAllowed && (
            <Button type="button" size="sm" variant="outline" onClick={() => cameraRef.current?.click()} disabled={busy}>
              <Camera className="h-4 w-4 mr-1" />Take photo
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          or drag it here · {imagesAllowed ? (accept.includes('pdf') ? 'photo or PDF' : 'photo') : 'PDF, DOC, DOCX'} · max 10 MB
        </p>
      </div>

      <input ref={fileInputRef} type="file" accept={accept} multiple={multiple} onChange={handleFileChange} className="hidden" />
      {imagesAllowed && (
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
      )}

      {tips && tips.length > 0 && selectedFiles.length === 0 && (
        <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-0.5">
          {tips.map((t) => <li key={t}>{t}</li>)}
        </ul>
      )}

      {error && (
        <p className="text-xs text-destructive flex items-start gap-1"><AlertTriangle className="h-4 w-4 shrink-0" />{error}</p>
      )}

      {selectedFiles.map((file, index) => (
        <div key={index} className="flex items-center justify-between gap-3 p-2 bg-muted/50 rounded">
          <div className="flex items-center gap-3 min-w-0">
            <Preview file={file} />
            <div className="min-w-0">
              <p className="text-sm truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-primary" />Added · {(file.size / 1024 / 1024).toFixed(2)} MB · saves automatically
              </p>
            </div>
          </div>
          <Button type="button" variant="ghost" size="sm" aria-label="Remove file" onClick={() => onFileSelect(selectedFiles.filter((_, i) => i !== index))}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FileUpload;
