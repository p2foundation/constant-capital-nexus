-- Fix remaining database functions with search path security
-- Continue updating all remaining functions

-- Update get_user_activities_with_emails function
CREATE OR REPLACE FUNCTION public.get_user_activities_with_emails()
RETURNS TABLE(id uuid, user_id uuid, activity_type text, activity_timestamp timestamp with time zone, ip_address inet, user_agent text, created_at timestamp with time zone, user_email text, user_first_name text, user_last_name text) AS $$
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
    ua.timestamp as activity_timestamp,
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update redeem_points function
CREATE OR REPLACE FUNCTION public.redeem_points(target_user_id uuid, points_cost integer, reward_name_param text, reward_category_param reward_category, redemption_details_param jsonb DEFAULT NULL::jsonb)
RETURNS boolean AS $$
DECLARE
  current_points INTEGER;
BEGIN
  -- Check if user has enough points
  SELECT available_points INTO current_points
  FROM public.user_rewards
  WHERE user_id = target_user_id;

  IF current_points IS NULL OR current_points < points_cost THEN
    RAISE EXCEPTION 'Insufficient points for redemption';
  END IF;

  -- Deduct points
  UPDATE public.user_rewards
  SET
    available_points = available_points - points_cost,
    redeemed_points = redeemed_points + points_cost,
    updated_at = now()
  WHERE user_id = target_user_id;

  -- Log the redemption transaction
  INSERT INTO public.reward_transactions (user_id, transaction_type, points, activity_type)
  VALUES (target_user_id, 'redeemed', -points_cost, 'redemption');

  -- Create redemption record
  INSERT INTO public.reward_redemptions (user_id, reward_name, reward_category, points_cost, redemption_details)
  VALUES (target_user_id, reward_name_param, reward_category_param, points_cost, redemption_details_param);

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update unlock_achievement function
CREATE OR REPLACE FUNCTION public.unlock_achievement(target_user_id uuid, achievement_code_param text, achievement_name_param text, achievement_type_param achievement_type, description_param text, points_awarded_param integer DEFAULT 0, icon_name_param text DEFAULT NULL::text)
RETURNS boolean AS $$
BEGIN
  -- Insert achievement (ON CONFLICT DO NOTHING to prevent duplicates)
  INSERT INTO public.reward_achievements (
    user_id, achievement_code, achievement_name, achievement_type,
    description, points_awarded, icon_name
  )
  VALUES (
    target_user_id, achievement_code_param, achievement_name_param, achievement_type_param,
    description_param, points_awarded_param, icon_name_param
  )
  ON CONFLICT (user_id, achievement_code) DO NOTHING;

  -- Award points if any
  IF points_awarded_param > 0 THEN
    PERFORM public.award_points(
      target_user_id,
      points_awarded_param,
      'achievement',
      jsonb_build_object('achievement_code', achievement_code_param)
    );
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update update_user_tier_and_streak function
CREATE OR REPLACE FUNCTION public.update_user_tier_and_streak()
RETURNS trigger AS $$
DECLARE
  new_tier TEXT;
  streak_increment INTEGER := 0;
BEGIN
  -- Calculate new tier based on total points
  IF NEW.total_points >= 50000 THEN
    new_tier := 'Platinum';
  ELSIF NEW.total_points >= 25000 THEN
    new_tier := 'Gold';
  ELSIF NEW.total_points >= 10000 THEN
    new_tier := 'Silver';
  ELSE
    new_tier := 'Bronze';
  END IF;

  -- Update streak if activity was today
  IF NEW.last_activity_date = CURRENT_DATE THEN
    IF OLD.last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN
      streak_increment := 1;
    ELSIF OLD.last_activity_date != CURRENT_DATE THEN
      NEW.streak_days := 1;
    END IF;
  END IF;

  NEW.tier_level := new_tier;
  NEW.streak_days := NEW.streak_days + streak_increment;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update admin_manually_confirm_user function (overloaded versions)
CREATE OR REPLACE FUNCTION public.admin_manually_confirm_user(target_user_id uuid)
RETURNS boolean AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update admin_manually_confirm_user function (with confirmed_by parameter)
CREATE OR REPLACE FUNCTION public.admin_manually_confirm_user(target_user_id uuid, confirmed_by_user_id uuid)
RETURNS boolean AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update get_users_with_profiles function
CREATE OR REPLACE FUNCTION public.get_users_with_profiles()
RETURNS TABLE(id uuid, email text, first_name text, last_name text, role text, company text, job_position text, phone text, industry text, created_at timestamp with time zone, last_sign_in_at timestamp with time zone, is_active boolean, email_confirmed_at timestamp with time zone, manually_confirmed_by uuid, manual_confirmation_date timestamp with time zone) AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    first_name, 
    last_name, 
    company, 
    position, 
    industry, 
    phone, 
    bio,
    role
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name', 
    NEW.raw_user_meta_data ->> 'company',
    NEW.raw_user_meta_data ->> 'position',
    NEW.raw_user_meta_data ->> 'industry',
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'bio',
    'User'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;