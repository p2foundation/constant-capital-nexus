-- Create leads table for chatbot inquiries
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  inquiry TEXT NOT NULL,
  category TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'Ako Chatbot',
  assigned_to TEXT DEFAULT 'sefakor.add@constantcap.com.gh',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policies for leads access
CREATE POLICY "Admins can view all leads" 
ON public.leads 
FOR SELECT 
USING (get_user_role() IN ('Admin', 'Developer'));

CREATE POLICY "Admins can update leads" 
ON public.leads 
FOR UPDATE 
USING (get_user_role() IN ('Admin', 'Developer'));

CREATE POLICY "System can insert leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);
CREATE INDEX idx_leads_status ON public.leads(status);

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();