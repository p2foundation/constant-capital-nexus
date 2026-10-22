import React, { useEffect, useState } from 'react';
import { Download, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSignedUrl, StoredPdf } from '@/lib/accountDocuments';

const SubmittedDocuments: React.FC<{ pdfs: StoredPdf[]; showPreview?: boolean }> = ({ pdfs, showPreview = true }) => {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [active, setActive] = useState<string | null>(pdfs[0]?.path ?? null);

  useEffect(() => {
    let alive = true;
    Promise.all(pdfs.map(async (p) => [p.path, await getSignedUrl(p.path)] as const))
      .then((pairs) => alive && setUrls(Object.fromEntries(pairs)))
      .catch((e) => console.error('Signed URL error', e));
    return () => { alive = false; };
  }, [pdfs]);

  const download = async (p: StoredPdf) => {
    window.open(await getSignedUrl(p.path, `${p.type}-form.pdf`), '_blank');
  };

  if (pdfs.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {pdfs.map((p) => (
          <div key={p.path} className="flex gap-1">
            <Button variant={active === p.path ? 'default' : 'outline'} size="sm" onClick={() => setActive(p.path)}>
              {p.type} form
            </Button>
            <Button variant="ghost" size="sm" onClick={() => download(p)} aria-label={`Download ${p.type} form`}>
              <Download className="h-4 w-4" />
            </Button>
            {urls[p.path] && (
              <Button variant="ghost" size="sm" asChild aria-label={`Open ${p.type} form`}>
                <a href={urls[p.path]} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4" /></a>
              </Button>
            )}
          </div>
        ))}
      </div>
      {showPreview && active && (
        urls[active] ? (
          <iframe title="Submitted form" src={urls[active]} className="w-full h-[70vh] rounded-lg border bg-background" />
        ) : (
          <div className="flex items-center justify-center h-40 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading document…
          </div>
        )
      )}
    </div>
  );
};

export default SubmittedDocuments;
