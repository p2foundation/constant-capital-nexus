
import { Profile } from '@/types/supabase';

export const canAccessPremiumContent = (profile: Profile | null): boolean => {
  if (!profile) return false;
  
  // Admins, Developers, and Analysts can always access premium content
  if (profile.role === 'Admin' || profile.role === 'Developer' || profile.role === 'Analyst') {
    return true;
  }
  
  // TODO: Add subscription check when subscription system is implemented
  // For now, only role-based access is implemented
  return false;
};
