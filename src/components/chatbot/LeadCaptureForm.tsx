
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AIChatService, LeadData } from './AIChatService';

interface LeadCaptureFormProps {
  onSubmit: (leadData: LeadData) => void;
  onCancel: () => void;
  initialInquiry: string;
  category: string;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  onSubmit,
  onCancel,
  initialInquiry,
  category
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: initialInquiry
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const leadData: LeadData = {
        ...formData,
        category
      };

      const chatService = new AIChatService();
      const success = await chatService.submitLead(leadData);

      if (success) {
        toast({
          title: "Thank you!",
          description: "Your inquiry has been submitted. Sefakor will contact you soon.",
        });
        onSubmit(leadData);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly at info@constantcapital.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="text-sm text-gray-600 dark:text-gray-300">
        I'd love to connect you with our investment team. Please share your contact details:
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="inquiry">Your Inquiry</Label>
          <Textarea
            id="inquiry"
            value={formData.inquiry}
            onChange={(e) => setFormData(prev => ({ ...prev, inquiry: e.target.value }))}
            rows={3}
            className="mt-1"
          />
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LeadCaptureForm;
