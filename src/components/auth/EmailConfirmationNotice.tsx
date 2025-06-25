
import React from 'react';
import { Mail, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmailConfirmationNoticeProps {
  email: string;
  onResendEmail?: () => void;
  isResending?: boolean;
}

const EmailConfirmationNotice: React.FC<EmailConfirmationNoticeProps> = ({
  email,
  onResendEmail,
  isResending = false
}) => {
  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 dark:bg-cc-navy dark:border-gray-800 text-center">
        <div className="mb-6">
          <div className="bg-cc-navy/10 dark:bg-cc-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-cc-navy dark:text-cc-gold" />
          </div>
          <h2 className="text-2xl font-bold text-cc-navy dark:text-white mb-2">
            Check Your Email
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We've sent a confirmation email to:
          </p>
          <p className="font-semibold text-cc-navy dark:text-cc-gold">
            {email}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3 text-left">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Click the confirmation link
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Look for an email from Constant Capital and click the confirmation button
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 text-left">
            <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Check your spam folder
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Sometimes our emails end up in spam or promotions folders
              </p>
            </div>
          </div>
        </div>

        <div className="bg-cc-gray/50 dark:bg-gray-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong className="text-cc-navy dark:text-cc-gold">What's next?</strong><br />
            After confirming your email, you'll have full access to Constant Capital's premium research, 
            market data, and investment advisory services.
          </p>
        </div>

        {onResendEmail && (
          <Button
            onClick={onResendEmail}
            disabled={isResending}
            variant="outline"
            className="w-full"
          >
            {isResending ? 'Sending...' : 'Resend Confirmation Email'}
          </Button>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Having trouble? Contact our support team for assistance.
        </p>
      </div>
    </div>
  );
};

export default EmailConfirmationNotice;
