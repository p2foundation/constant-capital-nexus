import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail, RefreshCw, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [resendCount, setResendCount] = useState(0);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Use our custom password reset function that sends branded emails
      const { data, error } = await supabase.functions.invoke('custom-password-reset', {
        body: { email }
      });

      if (error) {
        console.error('Password reset error:', error);
        setError('Failed to send reset email. Please try again or contact support.');
      } else {
        setIsSubmitted(true);
        setResendCount(prev => prev + 1);
        toast.success('Password reset email sent successfully!');
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      setError('An error occurred while sending the reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCount >= 3) {
      toast.error('Maximum resend limit reached. Please contact support.');
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('custom-password-reset', {
        body: { email }
      });

      if (error) {
        throw error;
      }

      setResendCount(prev => prev + 1);
      toast.success('Reset email sent again! Please check your inbox.');
    } catch (error) {
      console.error('Resend error:', error);
      toast.error('Failed to resend email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Mail className="mx-auto h-12 w-12 text-cc-navy" />
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We've sent a password reset link to <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
              <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                <strong>Important:</strong> If you don't see the email, check your spam folder. 
                The reset link will expire in 1 hour for security.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">What to do next:</h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• Check your inbox for an email from Constant Capital</li>
                <li>• Look in your spam/junk folder if needed</li>
                <li>• Click the "Reset Password" button in the email</li>
                <li>• Create your new password on the next page</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleResend}
                disabled={isLoading || resendCount >= 3}
                variant="outline" 
                className="w-full"
              >
                {isLoading ? (
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
                  Maximum resend limit reached. Please contact support at{' '}
                  <a href="mailto:support@constantcap.com.gh" className="underline">
                    support@constantcap.com.gh
                  </a>
                </p>
              )}
            </div>

            <div className="pt-4 border-t">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Reset your password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a secure link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-800 dark:text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading || !email.trim()}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                'Send reset link'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-cc-blue dark:text-cc-gold hover:underline dark:hover:text-cc-orange">
              <ArrowLeft className="h-4 w-4 inline mr-1" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;