import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Step Components
import PersonalInfoStep from './steps/PersonalInfoStep';
import ContactInfoStep from './steps/ContactInfoStep';
import AccountPreferencesStep from './steps/AccountPreferencesStep';
import ReviewStep from './steps/ReviewStep';

// UI Components
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Enhanced form schema with mandatory fields
const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name is too long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name is too long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  company: z.string().optional(),
  position: z.string().optional(),
  industry: z.string().optional(),
  role: z.enum(['User', 'Analyst', 'Customer', 'Client']).default('User'),
  bio: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: 'Personal Information', description: 'Your basic details' },
  { id: 2, title: 'Contact & Professional', description: 'How we can reach you' },
  { id: 3, title: 'Account Preferences', description: 'Customize your experience' },
  { id: 4, title: 'Review & Submit', description: 'Confirm your information' },
];

const RegistrationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      company: '',
      position: '',
      industry: '',
      role: 'User' as const,
      bio: '',
    },
  });

  // Load persisted data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('registration-progress');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData.formData);
        setCurrentStep(parsedData.currentStep);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, [form]);

  // Persist data on change
  useEffect(() => {
    const subscription = form.watch((data) => {
      const progressData = {
        formData: data,
        currentStep: currentStep,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('registration-progress', JSON.stringify(progressData));
    });
    return () => subscription.unsubscribe();
  }, [form, currentStep]);

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);
    return isValid;
  };

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
      case 2:
        return ['phone'];
      case 3:
        return ['role'];
      default:
        return [];
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const profileData = {
        first_name: data.firstName,
        last_name: data.lastName,
        company: data.company || null,
        position: data.position || null,
        industry: data.industry || null,
        phone: data.phone,
        bio: data.bio || null,
        role: data.role,
      };

      const result = await signUp(data.email, data.password, profileData);
      
      if (result.success) {
        // Clear saved progress
        localStorage.removeItem('registration-progress');
        
        // Navigate to email confirmation
        navigate('/register', {
          state: {
            showEmailConfirmation: true,
            userEmail: data.email,
            message: 'Registration successful! Please check your email and click the confirmation link to activate your account.'
          }
        });
      } else if (result.error && result.error.includes('check your email')) {
        // Clear saved progress
        localStorage.removeItem('registration-progress');
        
        navigate('/register', {
          state: {
            showEmailConfirmation: true,
            userEmail: data.email,
            message: result.error
          }
        });
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;
      case 2:
        return <ContactInfoStep form={form} />;
      case 3:
        return <AccountPreferencesStep form={form} />;
      case 4:
        return <ReviewStep form={form} />;
      default:
        return null;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/5 bg-pattern">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              Join <span className="text-gradient">Constant Capital</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Create your account in a few simple steps
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        currentStep >= step.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step.id}
                    </div>
                    <div className="text-center mt-2 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-muted mx-4 hidden sm:block">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: currentStep > step.id ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>

          {/* Main Content */}
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-between items-center mt-8 pt-6 border-t border-border"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Step {currentStep} of {steps.length}
                    </span>
                  </div>

                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center bg-gradient hover:opacity-90"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </motion.div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8 text-sm text-muted-foreground"
          >
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationWizard;