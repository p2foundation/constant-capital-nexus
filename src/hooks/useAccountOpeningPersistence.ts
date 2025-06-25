
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { FormData } from '@/components/account-opening/types';
import { debounce } from 'lodash';

interface ApplicationData {
  id: string;
  form_data: FormData;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export const useAccountOpeningPersistence = () => {
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load existing application data
  const loadApplication = useCallback(async (): Promise<FormData | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('account_opening_applications')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'draft')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading application:', error);
        return null;
      }

      if (data) {
        setApplicationId(data.id);
        return data.form_data as unknown as FormData;
      }

      return null;
    } catch (error) {
      console.error('Error loading application:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Save application data
  const saveApplication = useCallback(async (formData: FormData) => {
    if (!user || isSaving) return;

    setIsSaving(true);
    try {
      if (applicationId) {
        // Update existing application
        const { error } = await supabase
          .from('account_opening_applications')
          .update({ form_data: formData as any })
          .eq('id', applicationId);

        if (error) throw error;
      } else {
        // Create new application
        const { data, error } = await supabase
          .from('account_opening_applications')
          .insert({
            user_id: user.id,
            form_data: formData as any,
            status: 'draft'
          })
          .select('id')
          .single();

        if (error) throw error;
        setApplicationId(data.id);
      }
    } catch (error) {
      console.error('Error saving application:', error);
      toast({
        title: "Save Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [user, applicationId, isSaving, toast]);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce((formData: FormData) => {
      saveApplication(formData);
    }, 2000),
    [saveApplication]
  );

  // Submit final application
  const submitApplication = useCallback(async (formData: FormData) => {
    if (!user || !applicationId) return false;

    try {
      const { error } = await supabase
        .from('account_opening_applications')
        .update({ 
          form_data: formData as any,
          status: 'submitted'
        })
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Your account opening application has been submitted successfully.",
      });

      return true;
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit your application. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  }, [user, applicationId, toast]);

  return {
    loadApplication,
    saveApplication: debouncedSave,
    submitApplication,
    isLoading,
    isSaving,
    hasExistingApplication: !!applicationId
  };
};
