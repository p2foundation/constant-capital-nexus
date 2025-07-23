
-- Update the admin_manually_confirm_user function to accept confirmed_by parameter
CREATE OR REPLACE FUNCTION public.admin_manually_confirm_user(target_user_id uuid, confirmed_by_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only allow admins to call this function
  IF public.get_user_role(confirmed_by_user_id) NOT IN ('Admin', 'Developer') THEN
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

  -- Insert manual confirmation record with the provided confirmed_by user ID
  INSERT INTO public.user_manual_confirmations (user_id, confirmed_by)
  VALUES (target_user_id, confirmed_by_user_id);

  -- Log the activity
  INSERT INTO public.user_activities (user_id, activity_type, ip_address, user_agent)
  VALUES (target_user_id, 'manual_confirmation', NULL, 'Admin Manual Confirmation');

  RETURN TRUE;
END;
$$;
