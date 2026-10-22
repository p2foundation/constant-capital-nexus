import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { BarChart3, Newspaper, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminSection } from './AdminSection';

const destinations = [
  {
    id: 'research',
    title: 'Research reports',
    description: 'Create and publish reports, files, previews and AI-assisted summaries.',
    icon: Newspaper,
  },
  {
    id: 'market-summary',
    title: 'Market commentary',
    description: 'Review the status of the market-summary publishing tool.',
    icon: TrendingUp,
  },
  {
    id: 'market-data',
    title: 'Market data',
    description: 'Synchronize verified figures and save analyst corrections.',
    icon: BarChart3,
  },
] as const;

const ContentManager = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <AdminSection title="Publishing tools" description="Choose the verified system that owns the content you want to change.">
      <div className="grid gap-4 md:grid-cols-3">
        {destinations.map(item => (
          <div key={item.id} className="flex min-h-52 flex-col rounded-lg border bg-background p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <item.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-heading text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            <Button variant="outline" className="mt-5 justify-between" onClick={() => setSearchParams({ tab: item.id })}>
              Open tool <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t pt-4 text-xs text-muted-foreground">The previous sample content cards were removed because they were stored only in the browser and could falsely appear published.</p>
    </AdminSection>
  );
};

export default ContentManager;