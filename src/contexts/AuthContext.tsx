import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { Profile } from '@/types/supabase';
import { toast } from "sonner";
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '@/services/api';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, profileData: Partial<Profile>) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ success: boolean; error?: string }>;
  isAdmin: boolean;
  canEdit: boolean;
  canApprove: boolean;
  getRedirectPath: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Computed properties for role-based permissions
  const isAdmin = profile?.role === 'Admin' || profile?.role === 'Developer';
  const canEdit = isAdmin || profile?.role === 'Analyst';
  const canApprove = isAdmin;
  
  // Function to determine redirect path based on user role
  const getRedirectPath = () => {
    if (!profile) return '/';
    
    // Redirect to admin dashboard for users with management roles first (Admin/Developer)
    if (profile.role === 'Admin' || profile.role === 'Developer') {
      return '/admin';
    }
    
    // Then redirect Analysts to research admin
    if (profile.role === 'Analyst') {
      return '/research-admin';
    }
    
    // Regular users go to the main site
    return '/';
  };

  // Function to clean up auth state
  const cleanupAuthState = () => {
    // Clear all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Clear from sessionStorage as well
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  // Function to log user activity
  const logActivity = async (activityType: 'login' | 'logout' | 'profile_update' | 'account_access', userId: string) => {
    try {
      // Get user's IP address (in a real app, you'd get this from the server)
      const ipResponse = await fetch('https://api.ipify.org?format=json').catch(() => null);
      const ipData = ipResponse ? await ipResponse.json() : null;

      const { error } = await supabase
        .from('user_activities')
        .insert({
          user_id: userId,
          activity_type: activityType,
          ip_address: ipData?.ip || null,
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Error logging activity:', error);
      }
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  // Function to fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId as any)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      // Use type assertion to convert the data to Profile type
      setProfile(data as unknown as Profile);
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Log activity for sign in events
        if (event === 'SIGNED_IN' && currentSession?.user) {
          setTimeout(() => {
            logActivity('login', currentSession.user.id);
          }, 1000);
        }
        
        // Log activity for sign out events
        if (event === 'SIGNED_OUT') {
          // Clear profile when signed out
          setProfile(null);
          console.log('User signed out');
        }
        
        // Fetch profile for the user if session exists
        if (currentSession?.user) {
          setTimeout(() => {
            fetchProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      // Clean up existing state before signing in
      cleanupAuthState();
      
      // Attempt to sign out any existing session
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }

      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
      });
      
      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }
      
      toast.success('Signed in successfully');
      return { success: true };
    } catch (error: any) {
      toast.error('An error occurred during sign in');
      return { success: false, error: error.message };
    }
  };

  // Sign up function with profile creation
  const signUp = async (email: string, password: string, profileData: Partial<Profile>) => {
    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: profileData.first_name,
            last_name: profileData.last_name
          }
        }
      });
      
      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }
      
      // The profile is auto-created by the trigger, but we need to update it with provided data
      if (data.user) {
        // Type casting to any to avoid TypeScript errors with Supabase types
        const profileDataToUpdate: any = {
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          company: profileData.company,
          position: profileData.position,
          industry: profileData.industry,
          phone: profileData.phone,
          bio: profileData.bio,
          role: profileData.role || 'User' // Default to User if no role specified
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .update(profileDataToUpdate)
          .eq('id', data.user.id as any);
          
        if (profileError) {
          console.error('Error updating profile:', profileError);
          // Don't return error here as the user is already created
        }
      }
      
      toast.success('Account created successfully');
      return { success: true };
    } catch (error: any) {
      toast.error('An error occurred during sign up');
      return { success: false, error: error.message };
    }
  };

  // Sign out function with improved cleanup
  const signOut = async () => {
    try {
      // Log logout activity before signing out
      if (user) {
        await logActivity('logout', user.id);
      }
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        console.log('Global signout failed, continuing with local cleanup');
      }
      
      // Force clear local state
      setSession(null);
      setUser(null);
      setProfile(null);
      
      toast.info('Signed out successfully');
      
      // Force page reload to ensure complete cleanup
      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing out:', error);
      // Even if there's an error, clear local state and redirect
      cleanupAuthState();
      setSession(null);
      setUser(null);
      setProfile(null);
      toast.error('Signed out (with errors)');
      window.location.href = '/login';
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<Profile>) => {
    try {
      if (!user) {
        return { success: false, error: 'Not authenticated' };
      }

      // Convert to any type to avoid TypeScript errors
      const { error } = await supabase
        .from('profiles')
        .update(data as any)
        .eq('id', user.id as any);
        
      if (error) {
        toast.error('Failed to update profile');
        return { success: false, error: error.message };
      }

      // Log profile update activity
      await logActivity('profile_update', user.id);

      // Refresh profile data
      await fetchProfile(user.id);
      
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error: any) {
      toast.error('An error occurred while updating profile');
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      isLoading,
      signIn,
      signUp,
      signOut,
      updateProfile,
      isAdmin,
      canEdit,
      canApprove,
      getRedirectPath
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
