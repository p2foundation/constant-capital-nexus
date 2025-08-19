import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Building, Briefcase, TrendingUp, FileText, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface ReviewStepProps {
  form: UseFormReturn<any>;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ form }) => {
  const formData = form.getValues();

  const personalInfo = [
    { icon: User, label: 'Full Name', value: `${formData.firstName} ${formData.lastName}` },
    { icon: Mail, label: 'Email Address', value: formData.email },
    { icon: Phone, label: 'Phone Number', value: formData.phone },
  ];

  const professionalInfo = [
    { icon: Building, label: 'Company', value: formData.company || 'Not specified' },
    { icon: Briefcase, label: 'Position', value: formData.position || 'Not specified' },
    { icon: TrendingUp, label: 'Industry', value: formData.industry || 'Not specified' },
  ];

  const getRoleDisplayName = (role: string) => {
    const roleMap = {
      'User': 'Individual Investor',
      'Client': 'Corporate Client',
      'Customer': 'Institutional Customer',
      'Analyst': 'Financial Professional',
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  const getRoleBadgeVariant = (role: string): "default" | "destructive" | "outline" | "secondary" => {
    const variantMap = {
      'User': 'default' as const,
      'Client': 'secondary' as const,
      'Customer': 'outline' as const,
      'Analyst': 'destructive' as const,
    };
    return variantMap[role as keyof typeof variantMap] || 'default';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Review Your Information
        </h2>
        <p className="text-muted-foreground">
          Please review your details before creating your account
        </p>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {personalInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Professional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-primary" />
              Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {professionalInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Account Type */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-primary" />
              Account Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Selected Account Type
              </span>
              <Badge variant={getRoleBadgeVariant(formData.role)}>
                {getRoleDisplayName(formData.role)}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Information */}
      {formData.bio && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {formData.bio}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Terms and Privacy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-muted/30 p-4 rounded-lg"
      >
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">
              By creating your account, you agree to our{' '}
              <a
                href="/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Privacy Policy
              </a>
              .
            </p>
            <p>
              We'll send you a confirmation email to verify your account. 
              Your information is encrypted and secure.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Edit Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground mb-4">
          Need to make changes? Use the Previous button to go back and edit any information.
        </p>
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg border border-primary/10">
          <p className="text-sm text-foreground font-medium mb-2">
            🎉 You're almost done!
          </p>
          <p className="text-xs text-muted-foreground">
            Click "Create Account" to complete your registration and gain access to 
            Constant Capital's investment platform and research tools.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewStep;