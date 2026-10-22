import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertCircle, BarChart3, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminSection } from './AdminSection';

const MarketSummaryManager = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <AdminSection title="Publishing connection required" description="This editor is intentionally paused until its output is connected to a real published record.">
      <div className="flex min-h-64 flex-col items-center justify-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="mt-5 font-heading text-xl font-semibold">No false save confirmations</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          The former market-summary screen used sample April 2025 text and never wrote to the website. It has been disabled rather than letting analysts believe changes were published.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={() => setSearchParams({ tab: 'research' })}><Newspaper className="mr-2 h-4 w-4" />Publish research</Button>
          <Button variant="outline" onClick={() => setSearchParams({ tab: 'market-data' })}><BarChart3 className="mr-2 h-4 w-4" />Manage figures</Button>
        </div>
      </div>
    </AdminSection>
  );
};

export default MarketSummaryManager;