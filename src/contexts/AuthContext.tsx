
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { Profile } from '@/types/supabase';
import { toast } from "sonner";
import { useNavigate, useLocation } from 'react-router-dom';

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
    
    // Redirect to admin dashboard for users with management roles
    if (profile.role === 'Admin' || profile.role === 'Developer' || profile.role === 'Analyst') {
      return '/admin';
    }
    
    // Regular users go to the main site
    return '/';
  };

  // Function to fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data as Profile);
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
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
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: profileData.first_name,
            last_name: profileData.last_name,
            company: profileData.company,
            position: profileData.position,
            industry: profileData.industry,
            phone: profileData.phone,
            bio: profileData.bio,
            role: profileData.role || 'User' // Default to User if no role specified
          })
          .eq('id', data.user.id);
          
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

  // Sign out function
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.info('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<Profile>) => {
    try {
      if (!user) {
        return { success: false, error: 'Not authenticated' };
      }

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
        
      if (error) {
        toast.error('Failed to update profile');
        return { success: false, error: error.message };
      }

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
