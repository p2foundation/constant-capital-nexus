import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserReward {
  id: string;
  user_id: string;
  total_points: number;
  available_points: number;
  redeemed_points: number;
  tier_level: string;
  streak_days: number;
  last_activity_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface RewardTransaction {
  id: string;
  user_id: string;
  transaction_type: 'earned' | 'redeemed' | 'expired' | 'bonus' | 'referral';
  points: number;
  activity_type: string;
  activity_details: any;
  reference_id: string | null;
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_code: string;
  achievement_name: string;
  achievement_type: 'onboarding' | 'engagement' | 'milestone' | 'social' | 'learning' | 'loyalty';
  description: string | null;
  points_awarded: number;
  icon_name: string | null;
  unlocked_at: string;
}

export interface RewardRedemption {
  id: string;
  user_id: string;
  reward_name: string;
  reward_category: 'digital' | 'physical' | 'experience' | 'investment' | 'consultation';
  points_cost: number;
  status: string;
  redemption_details: any;
  redeemed_at: string;
  fulfilled_at: string | null;
  expires_at: string | null;
}

export const useRewardSystem = () => {
  const { user } = useAuth();
  const [userReward, setUserReward] = useState<UserReward | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<RewardTransaction[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user reward data
  const fetchUserReward = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_rewards')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user rewards:', error);
        return;
      }

      setUserReward(data);
    } catch (error) {
      console.error('Error fetching user rewards:', error);
    }
  };

  // Fetch recent transactions
  const fetchRecentTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('reward_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      setRecentTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Fetch achievements
  const fetchAchievements = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('reward_achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('unlocked_at', { ascending: false });

      if (error) {
        console.error('Error fetching achievements:', error);
        return;
      }

      setAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  // Award points for activity
  const awardPoints = async (
    activityType: string,
    points: number,
    activityDetails?: any
  ) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('award_points', {
        target_user_id: user.id,
        points_amount: points,
        activity_type_param: activityType,
        activity_details_param: activityDetails || null
      });

      if (error) {
        console.error('Error awarding points:', error);
        return false;
      }

      // Refresh data after awarding points
      await fetchUserReward();
      await fetchRecentTransactions();

      // Show toast notification
      toast.success(`+${points} points earned!`, {
        description: `Earned for ${activityType.replace('_', ' ')}`
      });

      return true;
    } catch (error) {
      console.error('Error awarding points:', error);
      return false;
    }
  };

  // Redeem points for reward
  const redeemPoints = async (
    rewardName: string,
    pointsCost: number,
    category: 'digital' | 'physical' | 'experience' | 'investment' | 'consultation',
    redemptionDetails?: any
  ) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('redeem_points', {
        target_user_id: user.id,
        points_cost: pointsCost,
        reward_name_param: rewardName,
        reward_category_param: category,
        redemption_details_param: redemptionDetails || null
      });

      if (error) {
        console.error('Error redeeming points:', error);
        toast.error('Failed to redeem reward');
        return false;
      }

      // Refresh data after redemption
      await fetchUserReward();
      await fetchRecentTransactions();

      toast.success('Reward redeemed successfully!', {
        description: `You've redeemed ${rewardName} for ${pointsCost} points`
      });

      return true;
    } catch (error: any) {
      console.error('Error redeeming points:', error);
      toast.error(error.message || 'Failed to redeem reward');
      return false;
    }
  };

  // Unlock achievement
  const unlockAchievement = async (
    achievementCode: string,
    achievementName: string,
    achievementType: 'onboarding' | 'engagement' | 'milestone' | 'social' | 'learning' | 'loyalty',
    description: string,
    pointsAwarded: number = 0,
    iconName?: string
  ) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('unlock_achievement', {
        target_user_id: user.id,
        achievement_code_param: achievementCode,
        achievement_name_param: achievementName,
        achievement_type_param: achievementType,
        description_param: description,
        points_awarded_param: pointsAwarded,
        icon_name_param: iconName || null
      });

      if (error) {
        console.error('Error unlocking achievement:', error);
        return false;
      }

      // Refresh data after unlocking achievement
      await fetchAchievements();
      if (pointsAwarded > 0) {
        await fetchUserReward();
        await fetchRecentTransactions();
      }

      // Show achievement notification
      toast.success('🏆 Achievement Unlocked!', {
        description: `${achievementName} ${pointsAwarded > 0 ? `(+${pointsAwarded} points)` : ''}`
      });

      return true;
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      return false;
    }
  };

  // Track activity with automatic point awarding
  const trackActivity = async (activityType: string, details?: any) => {
    if (!user) return;

    // Prevent duplicate awards within a cooldown period
    const activityKey = `${activityType}_${user.id}`;
    const lastActivity = localStorage.getItem(activityKey);
    const now = Date.now();
    
    // Set different cooldowns for different activities
    const cooldowns: Record<string, number> = {
      'login': 24 * 60 * 60 * 1000, // 24 hours
      'calculator_use': 5 * 60 * 1000, // 5 minutes
      'chat_interaction': 2 * 60 * 1000, // 2 minutes
      'research_view': 30 * 1000, // 30 seconds
      'market_data_view': 60 * 60 * 1000, // 1 hour
      'profile_update': 24 * 60 * 60 * 1000, // 24 hours
    };
    
    const cooldown = cooldowns[activityType] || 60 * 1000; // Default 1 minute
    
    if (lastActivity && (now - parseInt(lastActivity)) < cooldown) {
      return; // Skip if within cooldown period
    }

    const pointsConfig: Record<string, number> = {
      'login': 10,
      'calculator_use': 25,
      'chat_interaction': 15,
      'research_view': 30,
      'market_data_view': 10,
      'profile_update': 50,
      'account_opening_start': 200,
      'account_opening_complete': 1000,
      'referral': 500,
      'social_share': 100
    };

    const points = pointsConfig[activityType] || 0;
    if (points > 0) {
      // Store activity timestamp
      localStorage.setItem(activityKey, now.toString());
      await awardPoints(activityType, points, details);
    }

    // Check for achievements (less frequently)
    if (Math.random() < 0.1) { // Only 10% chance to check achievements
      await checkActivityAchievements(activityType, details);
    }
  };

  // Check for activity-based achievements
  const checkActivityAchievements = async (activityType: string, details?: any) => {
    if (!user || !userReward) return;

    // Example achievement checks
    if (activityType === 'calculator_use' && recentTransactions.filter(t => 
      t.activity_type === 'calculator_use'
    ).length >= 100) {
      await unlockAchievement(
        'calculator_pro',
        'Calculator Pro',
        'milestone',
        'Used calculators 100 times',
        1000,
        'Calculator'
      );
    }

    if (activityType === 'login' && userReward.streak_days >= 365) {
      await unlockAchievement(
        'loyalty_star',
        'Loyalty Star',
        'loyalty',
        'Maintained a 365-day login streak',
        5000,
        'Star'
      );
    }
  };

  // Get tier progress information
  const getTierProgress = () => {
    if (!userReward) return null;

    const tiers = {
      'Bronze': { min: 0, max: 9999, next: 'Silver' },
      'Silver': { min: 10000, max: 24999, next: 'Gold' },
      'Gold': { min: 25000, max: 49999, next: 'Platinum' },
      'Platinum': { min: 50000, max: Infinity, next: null }
    };

    const currentTier = tiers[userReward.tier_level as keyof typeof tiers];
    if (!currentTier) return null;

    const progress = currentTier.max === Infinity ? 100 : 
      ((userReward.total_points - currentTier.min) / (currentTier.max - currentTier.min)) * 100;

    return {
      current: userReward.tier_level,
      next: currentTier.next,
      progress: Math.min(progress, 100),
      pointsToNext: currentTier.next ? (currentTier.max + 1) - userReward.total_points : 0
    };
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      Promise.all([
        fetchUserReward(),
        fetchRecentTransactions(),
        fetchAchievements()
      ]).finally(() => setIsLoading(false));
    } else {
      setUserReward(null);
      setRecentTransactions([]);
      setAchievements([]);
      setIsLoading(false);
    }
  }, [user]);

  return {
    userReward,
    recentTransactions,
    achievements,
    isLoading,
    awardPoints,
    redeemPoints,
    unlockAchievement,
    trackActivity,
    getTierProgress,
    refreshData: () => {
      if (user) {
        fetchUserReward();
        fetchRecentTransactions();
        fetchAchievements();
      }
    }
  };
};