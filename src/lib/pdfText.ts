import * as pdfjs from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

/** Reads the selectable text from a PDF in the browser (scanned images have no text). */
export async function extractPdfText(file: File, maxPages = 60): Promise<string> {
  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= Math.min(doc.numPages, maxPages); i++) {
    const page = await doc.getPage(i);
    const tc = await page.getTextContent();
    pages.push(
      tc.items
        .map((it: any) => ("str" in it ? it.str + (it.hasEOL ? "\n" : " ") : ""))
        .join("")
        .replace(/[ \t]+/g, " ")
        .trim(),
    );
  }
  return pages.filter(Boolean).join("\n\n");
}

/** Storage-safe, collision-free object name. */
export function safeStorageName(name: string): string {
  const dot = name.lastIndexOf(".");
  const base = (dot > 0 ? name.slice(0, dot) : name).replace(/[^a-zA-Z0-9-_]+/g, "-").slice(0, 60);
  const ext = dot > 0 ? name.slice(dot).toLowerCase().replace(/[^a-z0-9.]/g, "") : "";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${base || "file"}${ext}`;
}

/** Renders the first pages of a PDF to JPEG data URLs (for AI scanning of image-only PDFs). */
export async function renderPdfPages(file: File, maxPages = 4, scale = 1.5): Promise<string[]> {
  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
  const out: string[] = [];
  for (let i = 1; i <= Math.min(doc.numPages, maxPages); i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvas, canvasContext: canvas.getContext("2d")!, viewport } as any).promise;
    out.push(canvas.toDataURL("image/jpeg", 0.8));
  }
  return out;
}

/** Reads an image file as a (downscaled) JPEG data URL. */
export async function imageToDataUrl(file: File, maxSide = 1800): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const ratio = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * ratio);
  canvas.height = Math.round(bitmap.height * ratio);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}
