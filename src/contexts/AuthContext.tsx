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

  // Function to fetch user profile with better error handling
  const fetchProfile = async (userId: string, retries = 3) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId as any)
        .single();

      if (error) {
        if (error.code === 'PGRST116' && retries > 0) {
          // Profile doesn't exist yet, retry after a short delay
          console.log('Profile not found, retrying...', retries);
          setTimeout(() => {
            fetchProfile(userId, retries - 1);
          }, 1000);
          return;
        }
        console.error('Error fetching profile:', error);
        return;
      }

      // Use type assertion to convert the data to Profile type
      setProfile(data as unknown as Profile);
    } catch (error) {
      console.error('Profile fetch error:', error);
      if (retries > 0) {
        setTimeout(() => {
          fetchProfile(userId, retries - 1);
        }, 1000);
      }
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

  // Enhanced sign in function
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
        let errorMessage = error.message;
        
        // Provide more user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many login attempts. Please wait a moment before trying again.';
        }
        
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
      
      toast.success('Signed in successfully');
      return { success: true };
    } catch (error: any) {
      const errorMessage = 'An error occurred during sign in. Please try again.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Enhanced sign up function with better profile handling
  const signUp = async (email: string, password: string, profileData: Partial<Profile>) => {
    try {
      // Validate required fields
      if (!profileData.first_name || !profileData.last_name) {
        const errorMessage = 'First name and last name are required.';
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }

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
        let errorMessage = error.message;
        
        // Provide more user-friendly error messages
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please sign in instead.';
        } else if (error.message.includes('Password should be')) {
          errorMessage = 'Password must be at least 6 characters long.';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        
        toast.error(errorMessage);
        return { success: false, error: errorMessage };
      }
      
      // The profile is auto-created by the trigger, but we need to update it with provided data
      if (data.user) {
        // Wait a moment for the trigger to create the profile
        setTimeout(async () => {
          try {
            const profileDataToUpdate: any = {
              first_name: profileData.first_name,
              last_name: profileData.last_name,
              company: profileData.company || null,
              position: profileData.position || null,
              industry: profileData.industry || null,
              phone: profileData.phone || null,
              bio: profileData.bio || null,
              role: profileData.role || 'User'
            };

            const { error: profileError } = await supabase
              .from('profiles')
              .update(profileDataToUpdate)
              .eq('id', data.user.id as any);
              
            if (profileError) {
              console.error('Error updating profile:', profileError);
            }
          } catch (updateError) {
            console.error('Error in profile update:', updateError);
          }
        }, 2000);
      }
      
      toast.success('Account created successfully! Please check your email to confirm your account.');
      return { success: true };
    } catch (error: any) {
      const errorMessage = 'An error occurred during account creation. Please try again.';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
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

  // Enhanced update profile function with better validation
  const updateProfile = async (data: Partial<Profile>) => {
    try {
      if (!user) {
        return { success: false, error: 'Not authenticated' };
      }

      // Validate required fields
      if (data.first_name && data.first_name.length < 2) {
        return { success: false, error: 'First name must be at least 2 characters' };
      }
      if (data.last_name && data.last_name.length < 2) {
        return { success: false, error: 'Last name must be at least 2 characters' };
      }
      if (data.company && data.company.length < 1) {
        return { success: false, error: 'Company name is required' };
      }
      if (data.position && data.position.length < 1) {
        return { success: false, error: 'Position is required' };
      }

      // Clean the data to remove empty strings
      const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value === '') {
          acc[key] = null;
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as any);

      const { error } = await supabase
        .from('profiles')
        .update(cleanData)
        .eq('id', user.id as any);
        
      if (error) {
        console.error('Profile update error:', error);
        let errorMessage = 'Failed to update profile';
        
        if (error.message.includes('duplicate key')) {
          errorMessage = 'This information is already in use.';
        } else if (error.message.includes('check constraint')) {
          errorMessage = 'Invalid data provided. Please check your inputs.';
        }
        
        return { success: false, error: errorMessage };
      }

      // Log profile update activity
      await logActivity('profile_update', user.id);

      // Refresh profile data
      await fetchProfile(user.id);
      
      return { success: true };
    } catch (error: any) {
      console.error('Profile update error:', error);
      return { success: false, error: 'An unexpected error occurred while updating profile' };
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
