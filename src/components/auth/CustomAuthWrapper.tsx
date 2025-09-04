
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import EmailConfirmationNotice from './EmailConfirmationNotice';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CustomAuthWrapperProps {
  children: React.ReactNode;
  showEmailConfirmation?: boolean;
  userEmail?: string;
}

const CustomAuthWrapper: React.FC<CustomAuthWrapperProps> = ({
  children,
  showEmailConfirmation = false,
  userEmail = ''
}) => {
  const [isResending, setIsResending] = useState(false);
  const { user } = useAuth();

  const handleResendConfirmation = async () => {
    if (!userEmail) return;

    setIsResending(true);
    try {
      // Trigger custom email via our edge function
      const { error } = await supabase.functions.invoke('send-custom-auth-email', {
        body: {
          email: userEmail,
          confirmationUrl: `https://constantcap.com.gh/auth/confirm`,
          type: 'signup'
        }
      });

      if (error) throw error;

      toast.success('Confirmation email sent! Please check your inbox.');
    } catch (error: any) {
      console.error('Error resending confirmation:', error);
      toast.error('Failed to resend confirmation email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  if (showEmailConfirmation && userEmail) {
    return (
      <EmailConfirmationNotice
        email={userEmail}
        onResendEmail={handleResendConfirmation}
        isResending={isResending}
      />
    );
  }

  return <>{children}</>;
};

export default CustomAuthWrapper;
