import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Send, Clock, Users, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { JobListing } from '@/data/careers';

interface JobSidebarProps {
  job: JobListing;
  onApplyClick: () => void;
  showForm: boolean;
}

const JobSidebar = ({ job, onApplyClick, showForm }: JobSidebarProps) => {
  const { toast } = useToast();

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24 space-y-4">
        {/* Apply CTA */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground mb-2">Apply for this role</h3>
          <p className="text-xs text-muted-foreground mb-4">Submit your application and join our team</p>
          <Button
            onClick={onApplyClick}
            className="w-full bg-cc-gold hover:bg-cc-gold/90 text-cc-navy font-bold mb-3 h-11"
          >
            <Send className="w-4 h-4 mr-2" /> {showForm ? 'Hide Application' : 'Apply Now'}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Or email directly:{' '}
            <a href={`mailto:${job.applicationEmail}?subject=${encodeURIComponent(job.subjectLine)}`} className="text-cc-gold hover:underline">
              {job.applicationEmail}
            </a>
          </p>
        </div>

        {/* Job Summary */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground mb-3 text-sm">Job Summary</h3>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Department', value: job.department },
              { label: 'Type', value: job.type },
              { label: 'Work Mode', value: job.workMode },
              { label: 'Location', value: job.location },
              { label: 'Posted', value: format(new Date(job.postedDate), 'MMM d, yyyy') },
              ...(job.closingDate ? [{ label: 'Deadline', value: format(new Date(job.closingDate), 'MMM d, yyyy') }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground mb-3 text-sm">Why People Join Us</h3>
          <div className="space-y-3">
            {[
              { icon: TrendingUp, text: 'Fast career progression' },
              { icon: Users, text: 'Collaborative team culture' },
              { icon: Clock, text: 'Work-life balance' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-cc-gold flex-shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold text-foreground mb-3 text-sm">Share this role</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast({ title: "Link copied!" });
            }}>
              Copy Link
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out this role: ${job.title} at Constant Capital`)}`} target="_blank" rel="noopener noreferrer">
                X / Twitter
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSidebar;
