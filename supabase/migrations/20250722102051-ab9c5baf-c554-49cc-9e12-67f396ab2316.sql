-- Check if the function exists and recreate it
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
  VALUES (target_user_id, 'manual_confirmation', NULL, 'Admin Manual Confirmation');

  RETURN TRUE;
END;
$$;