import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Mail, AlertTriangle, ArrowLeft } from 'lucide-react';

const EmailConfirm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get all possible token parameters from URL
        const tokenHash = searchParams.get('token_hash');
        const token = searchParams.get('token');
        const type = searchParams.get('type');
        const redirectTo = searchParams.get('redirect_to');

        // Use the token_hash if available, otherwise fall back to token
        const finalToken = tokenHash || token;

        console.log('Email confirmation parameters:', { 
          tokenHash, 
          token, 
          finalToken, 
          type, 
          redirectTo,
          allParams: Object.fromEntries(searchParams.entries())
        });

        if (!finalToken || !type) {
          console.log('Missing required parameters:', { finalToken, type });
          setError('Invalid confirmation link. The link may be malformed or incomplete.');
          setIsLoading(false);
          return;
        }

        // Verify the email confirmation
        console.log('Attempting verification with:', { token_hash: finalToken, type });
        
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: finalToken,
          type: type as any,
        });

        console.log('Verification result:', { data, error });

        if (error) {
          console.error('Email confirmation error:', error);
          let errorMessage = 'Failed to confirm email.';
          
          if (error.message.includes('expired')) {
            errorMessage = 'The confirmation link has expired. Please request a new one.';
          } else if (error.message.includes('already been used')) {
            errorMessage = 'This confirmation link has already been used.';
          } else if (error.message.includes('invalid')) {
            errorMessage = 'Invalid confirmation link. Please check that you clicked the correct link.';
          }
          
          setError(errorMessage);
          setIsLoading(false);
          return;
        }

        if (data.user) {
          setIsConfirmed(true);
          toast.success('Email confirmed successfully! Welcome to Constant Capital!');
          
          // Redirect after a short delay
          setTimeout(() => {
            navigate(redirectTo || '/login');
          }, 3000);
        } else {
          setError('Confirmation completed but user data is missing. Please try signing in.');
        }
      } catch (error: any) {
        console.error('Unexpected confirmation error:', error);
        setError('An unexpected error occurred during email confirmation.');
      } finally {
        setIsLoading(false);
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate]);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      // We don't have the email from URL params, so we'll need to prompt for it
      const email = prompt('Please enter your email address to resend the confirmation:');
      
      if (!email) {
        toast.error('Email address is required to resend confirmation.');
        return;
      }

      // Try custom email first
      const { error: customEmailError } = await supabase.functions.invoke('send-custom-auth-email', {
        body: {
          email,
          confirmationUrl: `${window.location.origin}/email-confirm`,
          type: 'signup'
        }
      });

      if (customEmailError) {
        // Fall back to Supabase resend
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email: email,
          options: {
            emailRedirectTo: `${window.location.origin}/email-confirm`
          }
        });

        if (resendError) {
          throw resendError;
        }
      }

      toast.success('New confirmation email sent! Please check your inbox.');
    } catch (error: any) {
      console.error('Error resending confirmation email:', error);
      toast.error('Failed to resend confirmation email. Please try again or contact support.');
    } finally {
      setIsResending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <CardTitle>Confirming Your Email</CardTitle>
            <CardDescription>Please wait while we verify your account...</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-green-900/20">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-green-800 dark:text-green-200">Email Confirmed!</CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Welcome to Constant Capital! Your email has been successfully verified.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                You can now sign in and access all our premium features including market research, 
                investment insights, and real-time financial data.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Button 
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Continue to Sign In
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-red-900/20">
            <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-red-800 dark:text-red-200">Confirmation Failed</CardTitle>
          <CardDescription className="text-red-700 dark:text-red-300">
            {error || 'We couldn\'t confirm your email address.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <strong>Email confirmation is currently experiencing issues.</strong> This is a known problem
              we're working to resolve. You can try the options below.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Button 
              onClick={handleResendEmail}
              disabled={isResending}
              variant="outline"
              className="w-full"
            >
              {isResending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Request New Confirmation Email
                </>
              )}
            </Button>
            
            <Button 
              onClick={() => navigate('/login')}
              variant="outline"
              className="w-full"
            >
              Try Signing In Anyway
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              variant="ghost"
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="pt-4 border-t text-center">
            <p className="text-sm text-muted-foreground">
              Need help? Contact us at{' '}
              <a 
                href="mailto:support@constantcap.com.gh"
                className="text-primary hover:underline"
              >
                support@constantcap.com.gh
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfirm;