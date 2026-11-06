import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { supabase } from '@/integrations/supabase/client';
import type { FormData } from '@/components/account-opening/types';
import { createUploadCache } from './accountSaveConcurrency';

export const DOCUMENTS_BUCKET = 'account-documents';

export const FILE_FIELDS = [
  'passportPhoto',
  'ghanaCardFront',
  'ghanaCardBack',
  'passportDocument',
  'idDocument1',
  'idDocument2',
  'applicantSignature',
  'witnessSignature',
] as const;

export type StoredDocuments = Record<string, string[]>;
export interface StoredPdf { type: 'CSD' | 'KYC'; path: string }

/** File objects can't be stored as JSON; drop them (and any stale `{}` leftovers). */
export function stripFiles<T extends Record<string, any>>(data: T): T {
  const copy: Record<string, any> = { ...data };
  for (const f of FILE_FIELDS) delete copy[f];
  return copy as T;
}

/** Remove non-File junk from loaded data so the form can safely read `.length`. */
export function sanitizeLoaded(data: FormData): FormData {
  const copy: Record<string, any> = { ...data };
  for (const f of FILE_FIELDS) {
    const v = copy[f];
    if (!Array.isArray(v) || !v.every((x) => x instanceof File)) delete copy[f];
  }
  return copy as FormData;
}

const safeName = (n: string) => n.replace(/[^a-zA-Z0-9._-]/g, '_');

async function upload(path: string, body: Blob, contentType: string) {
  const { error } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .upload(path, body, { upsert: true, contentType });
  if (error) throw error;
  return path;
}

const uploadOnce = createUploadCache();

/** Upload any newly selected files now (so they survive a reload); returns field -> path of the latest file. */
export async function uploadPendingFiles(userId: string, appId: string, formData: FormData): Promise<Record<string, string>> {
  const out: Record<string, string> = { ...(formData._uploaded || {}) };
  for (const field of FILE_FIELDS) {
    const files = (formData as any)[field] as File[] | undefined;
    const file = Array.isArray(files) ? files[0] : undefined;
    if (!(file instanceof File)) continue;
    const path = await uploadOnce(file, `${userId}/${appId}/${field}`, () =>
      upload(`${userId}/${appId}/${field}-${Date.now()}-${safeName(file.name)}`, file, file.type || 'application/octet-stream'),
    );
    out[field] = path;
  }
  return out;
}

export async function uploadApplicationFiles(
  userId: string,
  appId: string,
  formData: FormData,
): Promise<StoredDocuments> {
  const out: StoredDocuments = {};
  for (const field of FILE_FIELDS) {
    const files = (formData as any)[field] as File[] | undefined;
    if (!Array.isArray(files) || files.length === 0) continue;
    out[field] = [];
    for (const [i, file] of files.entries()) {
      if (!(file instanceof File)) continue;
      const path = `${userId}/${appId}/${field}-${i}-${safeName(file.name)}`;
      out[field].push(await upload(path, file, file.type || 'application/octet-stream'));
    }
  }
  return out;
}

async function waitForImages(el: HTMLElement) {
  const imgs = Array.from(el.querySelectorAll('img'));
  await Promise.all(
    imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((r) => { img.onload = () => r(); img.onerror = () => r(); }),
    ),
  );
}

/** Render a DOM node into a multi-page A4 PDF. */
export async function elementToPdf(el: HTMLElement): Promise<Blob> {
  await waitForImages(el);
  const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgH = (canvas.height * pageW) / canvas.width;
  const img = canvas.toDataURL('image/jpeg', 0.92);
  let offset = 0;
  pdf.addImage(img, 'JPEG', 0, 0, pageW, imgH);
  while (imgH - offset > pageH) {
    offset += pageH;
    pdf.addPage();
    pdf.addImage(img, 'JPEG', 0, -offset, pageW, imgH);
  }
  return pdf.output('blob');
}

export async function uploadPdf(userId: string, appId: string, type: 'CSD' | 'KYC', blob: Blob) {
  return upload(`${userId}/${appId}/${type}-form.pdf`, blob, 'application/pdf');
}

export async function getSignedUrl(path: string, download?: string) {
  const { data, error } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .createSignedUrl(path, 60 * 60, download ? { download } : undefined);
  if (error) throw error;
  return data.signedUrl;
}
