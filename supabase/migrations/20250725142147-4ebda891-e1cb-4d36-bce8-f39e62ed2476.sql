-- Create function to get user activities with email information for admin users
CREATE OR REPLACE FUNCTION public.get_user_activities_with_emails()
RETURNS TABLE(
  id uuid,
  user_id uuid,
  activity_type text,
  timestamp timestamp with time zone,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone,
  user_email text,
  user_first_name text,
  user_last_name text
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
    ua.id,
    ua.user_id,
    ua.activity_type,
    ua.timestamp,
    ua.ip_address,
    ua.user_agent,
    ua.created_at,
    au.email::text as user_email,
    COALESCE(p.first_name, '') as user_first_name,
    COALESCE(p.last_name, '') as user_last_name
  FROM public.user_activities ua
  LEFT JOIN auth.users au ON ua.user_id = au.id
  LEFT JOIN public.profiles p ON ua.user_id = p.id
  ORDER BY ua.timestamp DESC
  LIMIT 50;
END;
$$;