import React, { useRef, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Square } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ContentFieldsProps {
  preview: string;
  setPreview: (preview: string) => void;
  content: string;
  setContent: (content: string) => void;
  title?: string;
  type?: string;
}

const ContentFields: React.FC<ContentFieldsProps> = ({
  preview,
  setPreview,
  content,
  setContent,
  title,
  type,
}) => {
  const [generating, setGenerating] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const generate = async () => {
    if (content.trim().length < 100) {
      toast.error("Add at least a paragraph of full content first.");
      return;
    }
    const controller = new AbortController();
    abortRef.current = controller;
    setGenerating(true);
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
        body: JSON.stringify({ title, type, content }),
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let text = "";
      setPreview("");
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
              setPreview(text);
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
      toast.success("Summary drafted — review before saving.");
    } catch (e) {
      if ((e as Error).name !== "AbortError") toast.error((e as Error).message);
    } finally {
      setGenerating(false);
      abortRef.current = null;
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="preview">Preview/Summary</Label>
          {generating ? (
            <Button type="button" size="sm" variant="outline" onClick={() => abortRef.current?.abort()}>
              <Square className="h-3.5 w-3.5 mr-1" /> Stop
            </Button>
          ) : (
            <Button type="button" size="sm" variant="outline" onClick={generate}>
              <Sparkles className="h-3.5 w-3.5 mr-1" /> Generate with AI
            </Button>
          )}
        </div>
        <Textarea
          id="preview"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          placeholder="Write a brief summary, or paste the full content below and click Generate with AI"
          required
          rows={generating || preview.length > 200 ? 7 : 2}
        />
        {generating && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" /> Drafting summary and key points…
          </p>
        )}
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
