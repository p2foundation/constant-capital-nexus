-- Create enum for reward transaction types
CREATE TYPE public.reward_transaction_type AS ENUM (
  'earned',
  'redeemed',
  'expired',
  'bonus',
  'referral'
);

-- Create enum for achievement types
CREATE TYPE public.achievement_type AS ENUM (
  'onboarding',
  'engagement',
  'milestone',
  'social',
  'learning',
  'loyalty'
);

-- Create enum for reward redemption categories
CREATE TYPE public.reward_category AS ENUM (
  'digital',
  'physical',
  'experience',
  'investment',
  'consultation'
);

-- User rewards table to track cumulative points and tier
CREATE TABLE public.user_rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  total_points INTEGER NOT NULL DEFAULT 0,
  available_points INTEGER NOT NULL DEFAULT 0,
  redeemed_points INTEGER NOT NULL DEFAULT 0,
  tier_level TEXT NOT NULL DEFAULT 'Bronze',
  streak_days INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Reward transactions table to log all point activities
CREATE TABLE public.reward_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  transaction_type reward_transaction_type NOT NULL,
  points INTEGER NOT NULL,
  activity_type TEXT NOT NULL,
  activity_details JSONB,
  reference_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Reward achievements table for milestone badges
CREATE TABLE public.reward_achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  achievement_code TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  achievement_type achievement_type NOT NULL,
  description TEXT,
  points_awarded INTEGER NOT NULL DEFAULT 0,
  icon_name TEXT,
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, achievement_code)
);

-- Reward redemptions table for tracking what users have redeemed
CREATE TABLE public.reward_redemptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  reward_name TEXT NOT NULL,
  reward_category reward_category NOT NULL,
  points_cost INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  redemption_details JSONB,
  redeemed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  fulfilled_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on all tables
ALTER TABLE public.user_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_redemptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_rewards
CREATE POLICY "Users can view their own rewards"
ON public.user_rewards
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own rewards"
ON public.user_rewards
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "System can insert user rewards"
ON public.user_rewards
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage all rewards"
ON public.user_rewards
FOR ALL
USING (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]));

-- RLS Policies for reward_transactions
CREATE POLICY "Users can view their own transactions"
ON public.reward_transactions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can insert transactions"
ON public.reward_transactions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all transactions"
ON public.reward_transactions
FOR SELECT
USING (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]));

-- RLS Policies for reward_achievements
CREATE POLICY "Users can view their own achievements"
ON public.reward_achievements
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can insert achievements"
ON public.reward_achievements
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage all achievements"
ON public.reward_achievements
FOR ALL
USING (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]));

-- RLS Policies for reward_redemptions
CREATE POLICY "Users can view their own redemptions"
ON public.reward_redemptions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create redemptions"
ON public.reward_redemptions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all redemptions"
ON public.reward_redemptions
FOR ALL
USING (get_user_role() = ANY (ARRAY['Admin'::text, 'Developer'::text]));

-- Create function to update user rewards
CREATE OR REPLACE FUNCTION public.award_points(
  target_user_id UUID,
  points_amount INTEGER,
  activity_type_param TEXT,
  activity_details_param JSONB DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Create function to redeem points
CREATE OR REPLACE FUNCTION public.redeem_points(
  target_user_id UUID,
  points_cost INTEGER,
  reward_name_param TEXT,
  reward_category_param reward_category,
  redemption_details_param JSONB DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Create function to unlock achievements
CREATE OR REPLACE FUNCTION public.unlock_achievement(
  target_user_id UUID,
  achievement_code_param TEXT,
  achievement_name_param TEXT,
  achievement_type_param achievement_type,
  description_param TEXT,
  points_awarded_param INTEGER DEFAULT 0,
  icon_name_param TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Create trigger to update streak and tier
CREATE OR REPLACE FUNCTION public.update_user_tier_and_streak()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
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
$$;

CREATE TRIGGER update_tier_and_streak
  BEFORE UPDATE ON public.user_rewards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_tier_and_streak();

-- Create indexes for better performance
CREATE INDEX idx_user_rewards_user_id ON public.user_rewards(user_id);
CREATE INDEX idx_reward_transactions_user_id ON public.reward_transactions(user_id);
CREATE INDEX idx_reward_transactions_type ON public.reward_transactions(transaction_type);
CREATE INDEX idx_reward_achievements_user_id ON public.reward_achievements(user_id);
CREATE INDEX idx_reward_redemptions_user_id ON public.reward_redemptions(user_id);