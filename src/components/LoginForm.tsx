
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LogIn, ShieldCheck } from 'lucide-react';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, session, profile, getRedirectPath } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Get the return URL from location state or use default from role
  const from = location.state?.from?.pathname || null;
  
  // Redirect if already logged in
  useEffect(() => {
    if (session && profile) {
      // Use the specific redirect if provided, otherwise use role-based redirect
      const redirectTo = from || getRedirectPath();
      navigate(redirectTo, { replace: true });
    }
  }, [session, profile, navigate, from, getRedirectPath]);

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const { success } = await signIn(values.email, values.password);
      
      if (success) {
        // Auth context will handle the session update and redirect will happen via the effect
      }
    } catch (error) {
      toast.error("An unexpected error occurred during login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="mb-8 text-center">
        <ShieldCheck className="h-12 w-12 mx-auto mb-4 text-cc-navy dark:text-white" />
        <h2 className="text-2xl font-bold text-cc-navy dark:text-white mb-2">Sign In</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Access Constant Capital research and market data
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    {...field}
                    disabled={isLoading}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    disabled={isLoading}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full bg-cc-navy hover:bg-cc-blue dark:bg-cc-gold dark:hover:bg-cc-gold/90 dark:text-cc-navy"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-cc-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <LogIn className="mr-2 h-5 w-5" />
                Sign In
              </div>
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <button 
            className="text-cc-blue hover:text-cc-navy dark:text-cc-gold dark:hover:text-white hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Forgot your password?{" "}
          <button
            className="text-cc-blue hover:text-cc-navy dark:text-cc-gold dark:hover:text-white hover:underline"
            onClick={() => navigate("/reset-password")}
          >
            Reset it here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
