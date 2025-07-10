
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { trackBusinessEvent } from '@/utils/analytics';

const ResearchSubscribe: React.FC = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit lead to database
      const { error } = await supabase.functions.invoke('submit-lead', {
        body: {
          email,
          fullName,
          company,
          leadType: 'research_subscription',
          source: 'research_subscribe_form'
        }
      });

      if (error) throw error;

      // Track analytics
      trackBusinessEvent.newsletterSubscribe();
      
      toast.success('Successfully subscribed to research updates!');
      setIsOpen(false);
      setEmail('');
      setFullName('');
      setCompany('');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
      <h3 className="font-medium text-cc-navy dark:text-white mb-4 text-left">Subscribe to Research</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-left">
        Get premium research reports delivered directly to your inbox.
        Subscribe to our research newsletter for market insights.
      </p>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full border-cc-blue text-cc-blue hover:bg-cc-light-blue dark:border-cc-gold dark:text-cc-gold dark:hover:bg-cc-gold/10">
            Subscribe Now
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-cc-navy dark:text-white">Subscribe to Research Updates</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                defaultValue={user?.email || ''}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter your company name"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-cc-blue hover:bg-cc-blue/90 text-white"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResearchSubscribe;
