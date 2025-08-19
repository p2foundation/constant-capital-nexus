import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';
import { Separator } from '@/components/ui/separator';

interface PersonalInfoStepProps {
  form: UseFormReturn<any>;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ form }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    return strength;
  };

  const passwordValue = form.watch('password') || '';
  const passwordStrength = getPasswordStrength(passwordValue);

  const strengthColors = [
    'bg-destructive',
    'bg-destructive',
    'bg-amber-500',
    'bg-amber-500',
    'bg-green-500',
  ];

  const strengthLabels = [
    'Very Weak',
    'Weak',
    'Fair',
    'Good',
    'Strong',
  ];

  return (
    <Form {...form}>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Personal Information
          </h2>
          <p className="text-muted-foreground">
            Let's start with your basic details
          </p>
        </motion.div>

        {/* Social Login Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SocialLoginButtons mode="register" />
          
          <div className="relative my-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-card px-4 text-sm text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>
        </motion.div>

        {/* Name Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  First Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Enter your first name"
                      {...field}
                      className="pl-10 h-12 bg-background/50 border-muted focus:border-primary transition-colors"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Last Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Enter your last name"
                      {...field}
                      className="pl-10 h-12 bg-background/50 border-muted focus:border-primary transition-colors"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Email Address <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="pl-10 h-12 bg-background/50 border-muted focus:border-primary transition-colors"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Password Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Password <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      {...field}
                      className="pl-10 pr-12 h-12 bg-background/50 border-muted focus:border-primary transition-colors"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
                
                {/* Password Strength Indicator */}
                {passwordValue.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            i < passwordStrength
                              ? strengthColors[passwordStrength - 1]
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password strength: {strengthLabels[passwordStrength - 1] || 'Very Weak'}
                    </p>
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Confirm Password <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      {...field}
                      className="pl-10 pr-12 h-12 bg-background/50 border-muted focus:border-primary transition-colors"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Password Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-muted/30 p-4 rounded-lg"
        >
          <h4 className="text-sm font-medium text-foreground mb-2">Password Requirements:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${passwordValue.length >= 8 ? 'bg-green-500' : 'bg-muted'}`} />
              At least 8 characters long
            </li>
            <li className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(passwordValue) ? 'bg-green-500' : 'bg-muted'}`} />
              Contains uppercase letter
            </li>
            <li className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${/[a-z]/.test(passwordValue) ? 'bg-green-500' : 'bg-muted'}`} />
              Contains lowercase letter
            </li>
            <li className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${/\d/.test(passwordValue) ? 'bg-green-500' : 'bg-muted'}`} />
              Contains number
            </li>
            <li className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${/[@$!%*?&]/.test(passwordValue) ? 'bg-green-500' : 'bg-muted'}`} />
              Contains special character
            </li>
          </ul>
        </motion.div>
      </div>
    </Form>
  );
};

export default PersonalInfoStep;