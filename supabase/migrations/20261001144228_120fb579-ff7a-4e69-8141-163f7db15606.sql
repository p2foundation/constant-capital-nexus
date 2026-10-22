-- Leads: require basic content instead of accepting anything
DROP POLICY IF EXISTS "System can insert leads" ON public.leads;
CREATE POLICY "Public can submit valid leads" ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (
  length(coalesce(name,'')) BETWEEN 1 AND 200
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(coalesce(inquiry,'')) BETWEEN 1 AND 5000
);

-- Trigger functions: nobody needs to call these directly
REVOKE EXECUTE ON FUNCTION public.validate_contact_submission() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_user_tier_and_streak() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Admin-only / signed-in-only functions: block anonymous callers
REVOKE EXECUTE ON FUNCTION public.admin_delete_user(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.admin_manually_confirm_user(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_user_statistics() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_user_activities_with_emails() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.get_users_with_profiles() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_user(uuid), public.admin_manually_confirm_user(uuid),
  public.get_user_statistics(), public.get_user_activities_with_emails(), public.get_users_with_profiles() TO authenticated, service_role;

-- 2-arg confirm trusts the caller-supplied admin id: server (service role) only
REVOKE EXECUTE ON FUNCTION public.admin_manually_confirm_user(uuid, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_manually_confirm_user(uuid, uuid) TO service_role;

-- Rewards: callers may only act on their own account, with sane limits
CREATE OR REPLACE FUNCTION public.award_points(target_user_id uuid, points_amount integer, activity_type_param text, activity_details_param jsonb DEFAULT NULL)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.role() <> 'service_role' AND coalesce(public.get_user_role(), '') NOT IN ('Admin','Developer') THEN
    IF auth.uid() IS NULL OR auth.uid() <> target_user_id THEN
      RAISE EXCEPTION 'Access denied';
    END IF;
    IF points_amount < 1 OR points_amount > 100 THEN
      RAISE EXCEPTION 'Invalid points amount';
    END IF;
  END IF;
  INSERT INTO public.user_rewards (user_id, total_points, available_points, last_activity_date)
  VALUES (target_user_id, points_amount, points_amount, CURRENT_DATE)
  ON CONFLICT (user_id) DO UPDATE SET
    total_points = user_rewards.total_points + points_amount,
    available_points = user_rewards.available_points + points_amount,
    last_activity_date = CURRENT_DATE, updated_at = now();
  INSERT INTO public.reward_transactions (user_id, transaction_type, points, activity_type, activity_details)
  VALUES (target_user_id, 'earned', points_amount, activity_type_param, activity_details_param);
  RETURN TRUE;
END; $$;
REVOKE EXECUTE ON FUNCTION public.award_points(uuid, integer, text, jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.award_points(uuid, integer, text, jsonb) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.redeem_points(uuid, integer, text, reward_category, jsonb) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.unlock_achievement(uuid, text, text, achievement_type, text, integer, text) FROM PUBLIC, anon;