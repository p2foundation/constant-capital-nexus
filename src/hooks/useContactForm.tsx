
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitContactForm = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Insert into Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          status: 'unread'
        });

      if (error) {
        throw error;
      }

      // Call edge function to send email notification
      try {
        await supabase.functions.invoke('send-contact-notification', {
          body: data
        });
      } catch (emailError) {
        console.warn('Email notification failed:', emailError);
        // Don't fail the whole submission if email fails
      }

      toast.success("Thank you for your message. We'll get back to you soon!");
      return true;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error("Sorry, there was an error submitting your message. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitContactForm, isSubmitting };
};
