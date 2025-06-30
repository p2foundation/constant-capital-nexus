
-- Update the get_users_with_profiles function to use correct column names
CREATE OR REPLACE FUNCTION public.get_users_with_profiles()
 RETURNS TABLE(id uuid, email text, first_name text, last_name text, role text, company text, job_position text, phone text, industry text, created_at timestamp with time zone, last_sign_in_at timestamp with time zone, is_active boolean, email_confirmed_at timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
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
    COALESCE(p."position", '') as job_position, -- Map position column to job_position
    COALESCE(p.phone, '') as phone,
    COALESCE(p.industry, '') as industry,
    au.created_at,
    au.last_sign_in_at,
    COALESCE(p.is_active, true) as is_active, -- Use the new is_active column
    au.email_confirmed_at
  FROM auth.users au
  LEFT JOIN public.profiles p ON au.id = p.id
  ORDER BY au.created_at DESC;
END;
$function$;
