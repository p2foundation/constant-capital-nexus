
-- Create enum for application status
CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected');

-- Create table for account opening applications
CREATE TABLE public.account_opening_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  status application_status NOT NULL DEFAULT 'draft',
  application_type TEXT NOT NULL DEFAULT 'CSD_KYC',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.account_opening_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for users to manage their own applications
CREATE POLICY "Users can view their own applications" 
  ON public.account_opening_applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" 
  ON public.account_opening_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own draft applications" 
  ON public.account_opening_applications 
  FOR UPDATE 
  USING (auth.uid() = user_id AND status = 'draft');

-- Create policy for admins to view all applications
CREATE POLICY "Admins can view all applications" 
  ON public.account_opening_applications 
  FOR SELECT 
  USING (public.get_user_role() IN ('Admin', 'Developer'));

-- Create policy for admins to update application status
CREATE POLICY "Admins can update application status" 
  ON public.account_opening_applications 
  FOR UPDATE 
  USING (public.get_user_role() IN ('Admin', 'Developer'));

-- Create index for better performance
CREATE INDEX idx_account_opening_applications_user_id ON public.account_opening_applications(user_id);
CREATE INDEX idx_account_opening_applications_status ON public.account_opening_applications(status);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_account_opening_applications_updated_at 
  BEFORE UPDATE ON public.account_opening_applications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
