import React, { useRef, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Square, FileText, Heading, ScanText } from "lucide-react";
import { extractPdfText, renderPdfPages, imageToDataUrl } from "@/lib/pdfText";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ContentFieldsProps {
  preview: string;
  setPreview: (preview: string) => void;
  content: string;
  setContent: (content: string) => void;
  title?: string;
  setTitle?: (t: string) => void;
  type?: string;
  files?: File[];
  setFiles?: (files: File[]) => void;
}

const ContentFields: React.FC<ContentFieldsProps> = ({
  preview,
  setPreview,
  content,
  setContent,
  title,
  setTitle,
  type,
  files = [],
  setFiles,
}) => {
  const [generating, setGenerating] = useState<false | 'summary' | 'title' | 'scan'>(false);
  const [dragOver, setDragOver] = useState(false);
  const scanInputRef = useRef<HTMLInputElement>(null);
  const [reading, setReading] = useState(false);
  const pdf = files.find((f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));

  const readPdf = async () => {
    if (!pdf) return toast.error('Attach a PDF below first.');
    setReading(true);
    try {
      const text = await extractPdfText(pdf);
      if (text.length < 100) throw new Error('No readable text found — the PDF may be a scanned image. Paste the text instead.');
      if (content.trim() && !window.confirm('Replace the current Full Content with the PDF text?')) return;
      setContent(text);
      toast.success(`Read ${text.split(/\s+/).length.toLocaleString()} words from ${pdf.name}. Review, then use the AI buttons.`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setReading(false);
    }
  };
  const abortRef = useRef<AbortController | null>(null);

  const generate = async (mode: 'summary' | 'title' | 'scan' = 'summary', scan?: { content?: string; images?: string[] }) => {
    if (mode !== 'scan' && content.trim().length < 100) {
      toast.error("Add at least a paragraph of full content first.");
      return;
    }
    const controller = new AbortController();
    abortRef.current = controller;
    setGenerating(mode);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/summarize-report`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify(mode === 'scan' ? { title, type, mode, content: scan?.content ?? "", images: scan?.images ?? [] } : { title, type, content, mode }),
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let text = "";
      const apply = mode === 'title'
        ? (t: string) => setTitle?.(t.replace(/^["“]|["”]$/g, '').trim())
        : (t: string) => setPreview(t.split('===FULL TEXT===')[0].trim());
      apply("");
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const evt = JSON.parse(payload);
            if (evt.type === "response.output_text.delta" && evt.delta) {
              text += evt.delta;
              apply(text);
            } else if (evt.type === "response.failed" || evt.type === "error") {
              throw new Error(evt.response?.error?.message || evt.message || "AI request failed");
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            throw e;
          }
        }
      }
      if (!text.trim()) throw new Error("The AI returned no summary. Please try again later.");
      if (mode === 'scan') {
        const transcript = text.split('===FULL TEXT===')[1]?.trim();
        if (transcript && (!content.trim() || window.confirm('Replace Full Content with the text read from the scan?'))) setContent(transcript);
        toast.success("Scan complete — summary and key details drafted. Review before saving.");
        return;
      }
      toast.success(mode === "title" ? "Title suggested — edit as needed." : "Summary drafted — review before saving.");
    } catch (e) {
      if ((e as Error).name !== "AbortError") toast.error((e as Error).message);
    } finally {
      setGenerating(false);
      abortRef.current = null;
    }
  };

  const scanFile = async (file: File) => {
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/');
    if (!isPdf && !isImage) return toast.error('Drop a PDF or an image (JPG, PNG).');
    if (file.size > 25 * 1024 * 1024) return toast.error('File is larger than 25 MB.');
    // Keep the PDF as the report attachment so staff don't upload it twice
    if (isPdf && setFiles && !files.some((f) => f.name === file.name && f.size === file.size)) {
      setFiles([...files, file]);
      toast.info(`${file.name} added to attachments.`);
    }
    setReading(true);
    try {
      if (isPdf) {
        const text = await extractPdfText(file);
        if (text.length >= 100) {
          if (!content.trim() || window.confirm('Replace the current Full Content with the PDF text?')) setContent(text);
          setReading(false);
          return generate('scan', { content: text });
        }
        const images = await renderPdfPages(file);
        setReading(false);
        return generate('scan', { images });
      }
      const image = await imageToDataUrl(file);
      setReading(false);
      return generate('scan', { images: [image] });
    } catch (e) {
      toast.error((e as Error).message || 'Could not read this file.');
    } finally {
      setReading(false);
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => scanInputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scanInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) scanFile(f); }}
        className={`flex items-center gap-3 rounded-lg border-2 border-dashed p-4 cursor-pointer transition-colors ${dragOver ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/60 hover:bg-muted/40'}`}
      >
        {reading || generating === 'scan'
          ? <Loader2 className="h-6 w-6 text-primary animate-spin shrink-0" />
          : <ScanText className="h-6 w-6 text-primary shrink-0" />}
        <div className="text-sm">
          <p className="font-medium">AI scan — drop a PDF or image here</p>
          <p className="text-muted-foreground text-xs">
            {reading ? 'Reading the document…' : generating === 'scan' ? 'Extracting key details and writing the summary…' : 'We read it, fill the content, and draft a public summary with key details. PDFs are also added to attachments.'}
          </p>
        </div>
        <input
          ref={scanInputRef}
          type="file"
          accept="application/pdf,image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) scanFile(f); e.target.value = ''; }}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="preview">Preview/Summary</Label>
          {generating ? (
            <Button type="button" size="sm" variant="outline" onClick={() => abortRef.current?.abort()}>
              <Square className="h-3.5 w-3.5 mr-1" /> Stop
            </Button>
          ) : (
            <div className="flex gap-1">
              {setTitle && (
                <Button type="button" size="sm" variant="ghost" onClick={() => generate('title')} title="Suggest a headline from the content">
                  <Heading className="h-3.5 w-3.5 mr-1" /> Suggest title
                </Button>
              )}
              <Button type="button" size="sm" variant="outline" onClick={() => generate('summary')}>
                <Sparkles className="h-3.5 w-3.5 mr-1" /> Generate summary
              </Button>
            </div>
          )}
        </div>
        <Textarea
          id="preview"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          placeholder="Write a brief summary, or paste the full content below and click Generate with AI"
          required
          rows={generating === 'summary' || preview.length > 200 ? 7 : 2}
        />
        {generating && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" /> {generating === 'title' ? 'Suggesting a title…' : generating === 'scan' ? 'Scanning document for key details…' : 'Drafting summary and key points…'}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="content">Full Content</Label>
          <Button type="button" size="sm" variant="outline" onClick={readPdf} disabled={reading || !pdf} title={pdf ? `Read text from ${pdf.name}` : 'Attach a PDF below first'}>
            {reading ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <FileText className="h-3.5 w-3.5 mr-1" />}
            Fill from attached PDF
          </Button>
        </div>
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
