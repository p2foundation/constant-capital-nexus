import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, AlertCircle, CheckCircle, RefreshCw, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EmailConfirmationAlertProps {
  email: string;
  onDismiss?: () => void;
}

const EmailConfirmationAlert: React.FC<EmailConfirmationAlertProps> = ({
  email,
  onDismiss
}) => {
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [lastResendTime, setLastResendTime] = useState<Date | null>(null);

  const handleResendEmail = async () => {
    if (resendCount >= 3) {
      toast.error('Maximum resend limit reached. Please contact support if you continue having issues.');
      return;
    }

    // Check if we need to wait before resending (rate limiting)
    if (lastResendTime && Date.now() - lastResendTime.getTime() < 60000) {
      const waitTime = Math.ceil((60000 - (Date.now() - lastResendTime.getTime())) / 1000);
      toast.error(`Please wait ${waitTime} seconds before requesting another email.`);
      return;
    }

    setIsResending(true);
    try {
      // First try to resend with custom email
      const { error: customEmailError } = await supabase.functions.invoke('send-custom-auth-email', {
        body: {
          email,
          confirmationUrl: `https://constantcap.com.gh/email-confirm`,
          type: 'signup'
        }
      });

      if (customEmailError) {
        console.error('Custom email resend failed:', customEmailError);
        // Fall back to Supabase resend
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email: email,
          options: {
            emailRedirectTo: `https://constantcap.com.gh/email-confirm`
          }
        });

        if (resendError) {
          throw resendError;
        }
      }

      setResendCount(prev => prev + 1);
      setLastResendTime(new Date());
      toast.success('Confirmation email sent! Please check your inbox and spam folder.');
    } catch (error: any) {
      console.error('Error resending confirmation email:', error);
      toast.error('Failed to resend confirmation email. Please try again or contact support.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <CardTitle className="text-amber-800 dark:text-amber-200">Email Confirmation Required</CardTitle>
          </div>
          <CardDescription className="text-amber-700 dark:text-amber-300">
            We've sent a confirmation email to <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <strong>Important:</strong> Email confirmation is currently experiencing issues. 
              Please check your spam folder and try the troubleshooting steps below.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-medium text-amber-800 dark:text-amber-200">What to do next:</h4>
            <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 dark:text-green-400" />
                <span>Check your inbox for an email from Constant Capital</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 dark:text-green-400" />
                <span>Check your spam/junk folder</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 dark:text-green-400" />
                <span>Click the confirmation link in the email</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <Button
              onClick={handleResendEmail}
              disabled={isResending || resendCount >= 3}
              variant="outline"
              size="sm"
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Resend Email {resendCount > 0 && `(${resendCount}/3)`}
                </>
              )}
            </Button>

            {resendCount >= 3 && (
              <p className="text-xs text-red-600 dark:text-red-400 text-center">
                Maximum resend limit reached. Please contact support if needed.
              </p>
            )}
          </div>

          <div className="pt-3 border-t border-amber-200 dark:border-amber-700">
            <p className="text-xs text-amber-600 dark:text-amber-400">
              <strong>Still having trouble?</strong> Contact our support team at{' '}
              <a 
                href="mailto:support@constantcap.com.gh" 
                className="underline hover:no-underline"
              >
                support@constantcap.com.gh
              </a>
            </p>
          </div>

          {onDismiss && (
            <Button 
              onClick={onDismiss}
              variant="ghost" 
              size="sm" 
              className="w-full mt-4"
            >
              Continue without confirming (limited access)
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfirmationAlert;