
-- Create a separate table for manual confirmations in the public schema
CREATE TABLE public.user_manual_confirmations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  confirmed_by uuid NOT NULL REFERENCES auth.users(id),
  confirmation_date timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS for the manual confirmations table
ALTER TABLE public.user_manual_confirmations ENABLE ROW LEVEL SECURITY;

-- Only admins can view manual confirmations
CREATE POLICY "Admins can view manual confirmations"
  ON public.user_manual_confirmations
  FOR SELECT
  USING (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]));

-- Only admins can insert manual confirmations
CREATE POLICY "Admins can insert manual confirmations"
  ON public.user_manual_confirmations
  FOR INSERT
  WITH CHECK (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]));

-- Update the admin_manually_confirm_user function to use the new table
CREATE OR REPLACE FUNCTION public.admin_manually_confirm_user(target_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only allow admins to call this function
  IF public.get_user_role() NOT IN ('Admin', 'Developer') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  -- Check if user exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = target_user_id) THEN
    RAISE EXCEPTION 'User not found.';
  END IF;

  -- Check if user is already confirmed via email or manual confirmation
  IF EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = target_user_id 
    AND email_confirmed_at IS NOT NULL
  ) THEN
    RAISE EXCEPTION 'User is already confirmed via email.';
  END IF;

  -- Check if user is already manually confirmed
  IF EXISTS (
    SELECT 1 FROM public.user_manual_confirmations 
    WHERE user_id = target_user_id
  ) THEN
    RAISE EXCEPTION 'User is already manually confirmed.';
  END IF;

  -- Insert manual confirmation record
  INSERT INTO public.user_manual_confirmations (user_id, confirmed_by)
  VALUES (target_user_id, auth.uid());

  -- Log the activity
  INSERT INTO public.user_activities (user_id, activity_type, ip_address, user_agent)
  VALUES (target_user_id, 'manual_confirmation', NULL, 'Admin Manual Confirmation');

  RETURN TRUE;
END;
$$;

-- Drop the existing function first to allow changing return type
DROP FUNCTION IF EXISTS public.get_users_with_profiles();

-- Create the get_users_with_profiles function with manual confirmation data
CREATE FUNCTION public.get_users_with_profiles()
RETURNS TABLE(
  id uuid, 
  email text, 
  first_name text, 
  last_name text, 
  role text, 
  company text, 
  job_position text, 
  phone text, 
  industry text, 
  created_at timestamp with time zone, 
  last_sign_in_at timestamp with time zone, 
  is_active boolean, 
  email_confirmed_at timestamp with time zone,
  manually_confirmed_by uuid,
  manual_confirmation_date timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only allow admins to call this function
  IF public.get_user_role() NOT IN ('Admin', 'Developer') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    au.id,
    au.email::TEXT,
    COALESCE(p.first_name, '') as first_name,
    COALESCE(p.last_name, '') as last_name,
    p.role::TEXT,
    COALESCE(p.company, '') as company,
    COALESCE(p."position", '') as job_position,
    COALESCE(p.phone, '') as phone,
    COALESCE(p.industry, '') as industry,
    au.created_at,
    au.last_sign_in_at,
    (au.email_confirmed_at IS NOT NULL OR umc.user_id IS NOT NULL) as is_active,
    au.email_confirmed_at,
    umc.confirmed_by as manually_confirmed_by,
    umc.confirmation_date as manual_confirmation_date
  FROM auth.users au
  LEFT JOIN public.profiles p ON au.id = p.id
  LEFT JOIN public.user_manual_confirmations umc ON au.id = umc.user_id
  ORDER BY au.created_at DESC;
END;
$$;
