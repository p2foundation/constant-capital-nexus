CREATE OR REPLACE FUNCTION public.get_user_statistics()
RETURNS TABLE(total_users bigint, pending_activations bigint, activated_users bigint)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF coalesce(public.get_user_role(), '') NOT IN ('Admin','Developer') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;
  RETURN QUERY SELECT COUNT(*), COUNT(*) FILTER (WHERE au.email_confirmed_at IS NULL), COUNT(*) FILTER (WHERE au.email_confirmed_at IS NOT NULL) FROM auth.users au;
END; $$;

CREATE OR REPLACE FUNCTION public.redeem_points(target_user_id uuid, points_cost integer, reward_name_param text, reward_category_param reward_category, redemption_details_param jsonb DEFAULT NULL)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE current_points INTEGER;
BEGIN
  IF auth.role() <> 'service_role' AND (auth.uid() IS NULL OR auth.uid() <> target_user_id) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;
  IF points_cost <= 0 THEN RAISE EXCEPTION 'Invalid points cost'; END IF;
  SELECT available_points INTO current_points FROM public.user_rewards WHERE user_id = target_user_id FOR UPDATE;
  IF current_points IS NULL OR current_points < points_cost THEN RAISE EXCEPTION 'Insufficient points for redemption'; END IF;
  UPDATE public.user_rewards SET available_points = available_points - points_cost, redeemed_points = redeemed_points + points_cost, updated_at = now() WHERE user_id = target_user_id;
  INSERT INTO public.reward_transactions (user_id, transaction_type, points, activity_type) VALUES (target_user_id, 'redeemed', -points_cost, 'redemption');
  INSERT INTO public.reward_redemptions (user_id, reward_name, reward_category, points_cost, redemption_details) VALUES (target_user_id, reward_name_param, reward_category_param, points_cost, redemption_details_param);
  RETURN TRUE;
END; $$;

CREATE OR REPLACE FUNCTION public.unlock_achievement(target_user_id uuid, achievement_code_param text, achievement_name_param text, achievement_type_param achievement_type, description_param text, points_awarded_param integer DEFAULT 0, icon_name_param text DEFAULT NULL)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE inserted_count integer;
BEGIN
  IF auth.role() <> 'service_role' AND (auth.uid() IS NULL OR auth.uid() <> target_user_id) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;
  IF points_awarded_param < 0 OR points_awarded_param > 500 THEN RAISE EXCEPTION 'Invalid points'; END IF;
  INSERT INTO public.reward_achievements (user_id, achievement_code, achievement_name, achievement_type, description, points_awarded, icon_name)
  VALUES (target_user_id, achievement_code_param, achievement_name_param, achievement_type_param, description_param, points_awarded_param, icon_name_param)
  ON CONFLICT (user_id, achievement_code) DO NOTHING;
  GET DIAGNOSTICS inserted_count = ROW_COUNT;
  -- Only award once per achievement
  IF inserted_count > 0 AND points_awarded_param > 0 THEN
    INSERT INTO public.user_rewards (user_id, total_points, available_points, last_activity_date)
    VALUES (target_user_id, points_awarded_param, points_awarded_param, CURRENT_DATE)
    ON CONFLICT (user_id) DO UPDATE SET total_points = user_rewards.total_points + points_awarded_param, available_points = user_rewards.available_points + points_awarded_param, last_activity_date = CURRENT_DATE, updated_at = now();
    INSERT INTO public.reward_transactions (user_id, transaction_type, points, activity_type, activity_details)
    VALUES (target_user_id, 'earned', points_awarded_param, 'achievement', jsonb_build_object('achievement_code', achievement_code_param));
  END IF;
  RETURN TRUE;
END; $$;
REVOKE EXECUTE ON FUNCTION public.get_user_statistics() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.redeem_points(uuid, integer, text, reward_category, jsonb) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.unlock_achievement(uuid, text, text, achievement_type, text, integer, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_user_statistics(), public.redeem_points(uuid, integer, text, reward_category, jsonb), public.unlock_achievement(uuid, text, text, achievement_type, text, integer, text) TO authenticated, service_role;