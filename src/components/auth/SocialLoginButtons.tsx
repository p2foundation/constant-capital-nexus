import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SocialLoginButtonsProps {
  mode?: 'login' | 'register';
  onLoading?: (loading: boolean) => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ 
  mode = 'login',
  onLoading 
}) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'linkedin_oidc') => {
    setLoadingProvider(provider);
    onLoading?.(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error(`${provider} auth error:`, error);
        toast.error(`Failed to ${mode} with ${provider === 'google' ? 'Google' : 'LinkedIn'}: ${error.message}`);
      }
    } catch (error: any) {
      console.error(`${provider} auth error:`, error);
      toast.error(`Failed to ${mode} with ${provider === 'google' ? 'Google' : 'LinkedIn'}`);
    } finally {
      setLoadingProvider(null);
      onLoading?.(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-cc-navy px-2 text-gray-500 dark:text-gray-400">
            Or {mode} with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('google')}
          disabled={loadingProvider !== null}
          className="w-full dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {loadingProvider === 'google' ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <FcGoogle className="h-4 w-4" />
          )}
          <span className="ml-2">Google</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialLogin('linkedin_oidc')}
          disabled={loadingProvider !== null}
          className="w-full dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {loadingProvider === 'linkedin_oidc' ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <FaLinkedin className="h-4 w-4 text-blue-600" />
          )}
          <span className="ml-2">LinkedIn</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;