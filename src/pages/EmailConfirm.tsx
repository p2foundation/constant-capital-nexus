import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const EmailConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the token and type from URL parameters
        const token = searchParams.get('token');
        const type = searchParams.get('type');
        const redirectTo = searchParams.get('redirect_to');

        if (!token || !type) {
          toast.error('Invalid confirmation link');
          navigate('/login');
          return;
        }

        // Verify the email confirmation
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: type as any,
        });

        if (error) {
          console.error('Email confirmation error:', error);
          toast.error('Failed to confirm email. The link may have expired.');
          navigate('/login');
          return;
        }

        if (data.user) {
          setIsConfirmed(true);
          toast.success('Email confirmed successfully! You can now sign in.');
          
          // Redirect after a short delay
          setTimeout(() => {
            navigate(redirectTo || '/login');
          }, 2000);
        }
      } catch (error) {
        console.error('Confirmation error:', error);
        toast.error('An error occurred during email confirmation');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Confirming your email...</h1>
          <p className="text-muted-foreground">Please wait while we verify your account.</p>
        </div>
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-foreground">Email Confirmed!</h1>
          <p className="text-muted-foreground mb-4">
            Your email has been successfully verified. You will be redirected to the login page shortly.
          </p>
          <a 
            href="/login" 
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Continue to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-foreground">Confirmation Failed</h1>
        <p className="text-muted-foreground mb-4">
          We couldn't confirm your email. The link may have expired or been used already.
        </p>
        <a 
          href="/login" 
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default EmailConfirm;