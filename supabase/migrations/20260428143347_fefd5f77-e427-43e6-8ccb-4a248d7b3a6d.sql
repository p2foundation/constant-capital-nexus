
CREATE TABLE public.career_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id TEXT NOT NULL,
  job_title TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  current_position TEXT,
  years_experience TEXT,
  notice_period TEXT,
  expected_salary TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  heard_from TEXT,
  cover_letter TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit career applications"
ON public.career_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (
  full_name IS NOT NULL AND trim(full_name) <> ''
  AND email IS NOT NULL AND email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND phone IS NOT NULL AND trim(phone) <> ''
  AND cover_letter IS NOT NULL AND trim(cover_letter) <> ''
  AND length(cover_letter) <= 10000
  AND status = 'new'
);

CREATE POLICY "Admins can view career applications"
ON public.career_applications
FOR SELECT
TO authenticated
USING (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]));

CREATE POLICY "Admins can update career applications"
ON public.career_applications
FOR UPDATE
TO authenticated
USING (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]));
