
-- Add columns to track manual confirmation by admins
ALTER TABLE auth.users 
ADD COLUMN manually_confirmed_by uuid REFERENCES auth.users(id),
ADD COLUMN manual_confirmation_date timestamp with time zone;

-- Update the get_user_statistics function to account for manual confirmations
CREATE OR REPLACE FUNCTION public.get_user_statistics()
RETURNS TABLE(total_users bigint, pending_activations bigint, activated_users bigint)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_users,
    COUNT(*) FILTER (WHERE au.email_confirmed_at IS NULL AND au.manual_confirmation_date IS NULL) as pending_activations,
    COUNT(*) FILTER (WHERE au.email_confirmed_at IS NOT NULL OR au.manual_confirmation_date IS NOT NULL) as activated_users
  FROM auth.users au;
END;
$$;

-- Update the get_users_with_profiles function to include manual confirmation data
CREATE OR REPLACE FUNCTION public.get_users_with_profiles()
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
    (au.email_confirmed_at IS NOT NULL OR au.manual_confirmation_date IS NOT NULL) as is_active,
    au.email_confirmed_at,
    au.manually_confirmed_by,
    au.manual_confirmation_date
  FROM auth.users au
  LEFT JOIN public.profiles p ON au.id = p.id
  ORDER BY au.created_at DESC;
END;
$$;

-- Create function to manually confirm a user
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

  -- Check if user exists and is not already confirmed
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = target_user_id) THEN
    RAISE EXCEPTION 'User not found.';
  END IF;

  -- Check if user is already confirmed via email or manual confirmation
  IF EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = target_user_id 
    AND (email_confirmed_at IS NOT NULL OR manual_confirmation_date IS NOT NULL)
  ) THEN
    RAISE EXCEPTION 'User is already confirmed.';
  END IF;

  -- Update user with manual confirmation
  UPDATE auth.users 
  SET 
    manually_confirmed_by = auth.uid(),
    manual_confirmation_date = now()
  WHERE id = target_user_id;

  -- Log the activity
  INSERT INTO public.user_activities (user_id, activity_type, ip_address, user_agent)
  VALUES (target_user_id, 'account_access', NULL, 'Admin Manual Confirmation');

  RETURN TRUE;
END;
$$;
