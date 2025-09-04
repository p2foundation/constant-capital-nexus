-- Security Enhancement: Fix database function search paths
-- Add SET search_path = public to all functions to prevent search path attacks

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Update get_user_role function
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid DEFAULT auth.uid())
RETURNS text AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role::TEXT INTO user_role FROM public.profiles WHERE id = user_id;
  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Update can_approve_content function
CREATE OR REPLACE FUNCTION public.can_approve_content()
RETURNS boolean AS $$
DECLARE
  role_name TEXT;
BEGIN
  role_name := public.get_user_role();
  RETURN role_name IN ('Admin', 'Developer');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Update can_edit_content function
CREATE OR REPLACE FUNCTION public.can_edit_content()
RETURNS boolean AS $$
DECLARE
  role_name TEXT;
BEGIN
  role_name := public.get_user_role();
  RETURN role_name IN ('Admin', 'Developer', 'Analyst');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Update can_view_premium_content function
CREATE OR REPLACE FUNCTION public.can_view_premium_content()
RETURNS boolean AS $$
DECLARE
  role_name TEXT;
  has_active_subscription BOOLEAN;
BEGIN
  role_name := public.get_user_role();
  
  -- Admins, Developers, and Analysts can always view premium content
  IF role_name IN ('Admin', 'Developer', 'Analyst') THEN
    RETURN TRUE;
  END IF;
  
  -- Check if the user has an active subscription
  SELECT EXISTS (
    SELECT 1 
    FROM public.subscriptions 
    WHERE user_id = auth.uid() 
    AND status = 'active' 
    AND current_period_end > now()
  ) INTO has_active_subscription;
  
  RETURN has_active_subscription;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Update admin_delete_user function
CREATE OR REPLACE FUNCTION public.admin_delete_user(target_user_id uuid)
RETURNS boolean AS $$
BEGIN
  -- Only allow admins to call this function
  IF public.get_user_role() NOT IN ('Admin', 'Developer') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  -- Delete from profiles table first (due to foreign key)
  DELETE FROM public.profiles WHERE id = target_user_id;
  
  -- Note: We cannot delete from auth.users via SQL due to security restrictions
  -- This will be handled by the edge function using the Admin API
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update get_user_statistics function
CREATE OR REPLACE FUNCTION public.get_user_statistics()
RETURNS TABLE(total_users bigint, pending_activations bigint, activated_users bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_users,
    COUNT(*) FILTER (WHERE au.email_confirmed_at IS NULL) as pending_activations,
    COUNT(*) FILTER (WHERE au.email_confirmed_at IS NOT NULL) as activated_users
  FROM auth.users au;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update award_points function
CREATE OR REPLACE FUNCTION public.award_points(target_user_id uuid, points_amount integer, activity_type_param text, activity_details_param jsonb DEFAULT NULL::jsonb)
RETURNS boolean AS $$
BEGIN
  -- Insert or update user_rewards
  INSERT INTO public.user_rewards (user_id, total_points, available_points, last_activity_date)
  VALUES (target_user_id, points_amount, points_amount, CURRENT_DATE)
  ON CONFLICT (user_id)
  DO UPDATE SET
    total_points = user_rewards.total_points + points_amount,
    available_points = user_rewards.available_points + points_amount,
    last_activity_date = CURRENT_DATE,
    updated_at = now();

  -- Log the transaction
  INSERT INTO public.reward_transactions (user_id, transaction_type, points, activity_type, activity_details)
  VALUES (target_user_id, 'earned', points_amount, activity_type_param, activity_details_param);

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update validate_contact_submission function
CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS trigger AS $$
BEGIN
  -- Ensure all required fields are present and not empty
  IF NEW.first_name IS NULL OR trim(NEW.first_name) = '' THEN
    RAISE EXCEPTION 'First name is required';
  END IF;
  
  IF NEW.last_name IS NULL OR trim(NEW.last_name) = '' THEN
    RAISE EXCEPTION 'Last name is required';
  END IF;
  
  IF NEW.email IS NULL OR trim(NEW.email) = '' THEN
    RAISE EXCEPTION 'Email is required';
  END IF;
  
  -- Basic email validation
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  IF NEW.subject IS NULL OR trim(NEW.subject) = '' THEN
    RAISE EXCEPTION 'Subject is required';
  END IF;
  
  IF NEW.message IS NULL OR trim(NEW.message) = '' THEN
    RAISE EXCEPTION 'Message is required';
  END IF;
  
  -- Prevent excessively long content (potential spam)
  IF length(NEW.first_name) > 100 THEN
    RAISE EXCEPTION 'First name too long';
  END IF;
  
  IF length(NEW.last_name) > 100 THEN
    RAISE EXCEPTION 'Last name too long';
  END IF;
  
  IF length(NEW.subject) > 500 THEN
    RAISE EXCEPTION 'Subject too long';
  END IF;
  
  IF length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message too long';
  END IF;
  
  -- Ensure status is always set to 'unread' for new submissions
  NEW.status := 'unread';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;