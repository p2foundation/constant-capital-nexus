import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Mail, TestTube, AlertCircle, CheckCircle } from 'lucide-react';

const EmailTestingPanel = () => {
  const [testEmail, setTestEmail] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const runEmailTest = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsTesting(true);
    setTestResults([]);
    const results: string[] = [];

    try {
      results.push('🔄 Starting email system test...');
      setTestResults([...results]);

      // Test 1: Check if custom email function exists
      results.push('✅ Testing custom email function...');
      setTestResults([...results]);

      const { data: customEmailResult, error: customEmailError } = await supabase.functions.invoke('send-custom-auth-email', {
        body: {
          email: testEmail,
          confirmationUrl: `https://constantcap.com.gh/email-confirm?test=true`,
          type: 'signup',
          firstName: 'Test',
          lastName: 'User'
        }
      });

      if (customEmailError) {
        results.push(`❌ Custom email function failed: ${customEmailError.message}`);
        
        // Test 2: Fallback to Supabase native email
        results.push('🔄 Testing Supabase fallback email...');
        setTestResults([...results]);

        const { error: fallbackError } = await supabase.auth.resend({
          type: 'signup',
          email: testEmail,
          options: {
            emailRedirectTo: `https://constantcap.com.gh/email-confirm?test=true`
          }
        });

        if (fallbackError) {
          results.push(`❌ Fallback email also failed: ${fallbackError.message}`);
        } else {
          results.push('✅ Fallback email sent successfully');
        }
      } else {
        results.push('✅ Custom email function working correctly');
      }

      // Test 3: Check domain configuration
      results.push('🔄 Checking domain configuration...');
      const currentDomain = window.location.origin;
      results.push(`📍 Current domain: ${currentDomain}`);
      
      if (currentDomain.includes('lovable.app')) {
        results.push('⚠️ Running on Lovable domain - emails may not work in production');
      } else if (currentDomain.includes('localhost')) {
        results.push('⚠️ Running on localhost - check Supabase redirect URLs');
      } else {
        results.push('✅ Running on production domain');
      }

      results.push('🎉 Test completed! Check your email inbox and spam folder.');
      
    } catch (error: any) {
      results.push(`❌ Unexpected error: ${error.message}`);
    } finally {
      setTestResults(results);
      setIsTesting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <TestTube className="h-5 w-5 text-blue-600" />
          <CardTitle>Email System Testing Panel</CardTitle>
        </div>
        <CardDescription>
          Test the email confirmation system to diagnose any issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Admin Tool:</strong> This panel helps test and troubleshoot email delivery issues.
            Use a real email address you have access to for testing.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="test-email">Test Email Address</Label>
          <Input
            id="test-email"
            type="email"
            placeholder="Enter email address for testing"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            disabled={isTesting}
          />
        </div>

        <Button 
          onClick={runEmailTest} 
          disabled={isTesting || !testEmail}
          className="w-full"
        >
          {isTesting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Running Tests...
            </>
          ) : (
            <>
              <Mail className="h-4 w-4 mr-2" />
              Test Email System
            </>
          )}
        </Button>

        {testResults.length > 0 && (
          <Card className="bg-slate-50 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm font-mono">
                {testResults.map((result, index) => (
                  <div key={index} className="p-1">
                    {result}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>What to check after testing:</strong>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Check the test email inbox and spam folder</li>
              <li>Verify the confirmation link works correctly</li>
              <li>Ensure the redirect URL points to the right domain</li>
              <li>Check Supabase Auth settings for proper URL configuration</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default EmailTestingPanel;