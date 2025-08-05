
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRewardSystem } from '@/hooks/useRewardSystem';

export const useUserActivity = () => {
  const { user } = useAuth();
  const { trackActivity } = useRewardSystem();

  const logActivity = async (activityType: 'login' | 'logout' | 'profile_update' | 'account_access') => {
    if (!user) return;

    try {
      // Get user's IP address (in a real app, you'd get this from the server)
      const ipResponse = await fetch('https://api.ipify.org?format=json').catch(() => null);
      const ipData = ipResponse ? await ipResponse.json() : null;

      const { error } = await supabase
        .from('user_activities')
        .insert({
          user_id: user.id,
          activity_type: activityType,
          ip_address: ipData?.ip || null,
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Error logging activity:', error);
      } else {
        // Also track for rewards if it's a significant activity
        if (['login', 'account_access', 'profile_update'].includes(activityType)) {
          trackActivity(activityType);
        }
      }
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  return { logActivity };
};
