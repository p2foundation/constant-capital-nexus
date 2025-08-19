import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Users, Building2, TrendingUp, User } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface AccountPreferencesStepProps {
  form: UseFormReturn<any>;
}

const accountTypes = [
  {
    value: 'User',
    title: 'Individual Investor',
    description: 'Personal investment and wealth management',
    icon: User,
    features: ['Personal portfolio tracking', 'Market insights', 'Investment research'],
  },
  {
    value: 'Client',
    title: 'Corporate Client',
    description: 'Business and corporate financial services',
    icon: Building2,
    features: ['Corporate treasury', 'Business financing', 'Risk management'],
  },
  {
    value: 'Customer',
    title: 'Institutional Customer',
    description: 'Large-scale institutional investment services',
    icon: TrendingUp,
    features: ['Institutional-grade research', 'Portfolio management', 'Custom solutions'],
  },
  {
    value: 'Analyst',
    title: 'Financial Professional',
    description: 'For financial analysts and industry professionals',
    icon: Users,
    features: ['Professional tools', 'Advanced analytics', 'Research collaboration'],
  },
];

const AccountPreferencesStep: React.FC<AccountPreferencesStepProps> = ({ form }) => {
  const selectedRole = form.watch('role');

  return (
    <Form {...form}>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Account Preferences
          </h2>
          <p className="text-muted-foreground">
            Choose the account type that best suits your needs
          </p>
        </motion.div>

        {/* Account Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground mb-4 block">
                  Account Type <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {accountTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = selectedRole === type.value;
                      
                      return (
                        <motion.div
                          key={type.value}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + accountTypes.indexOf(type) * 0.1 }}
                        >
                          <Label
                            htmlFor={type.value}
                            className="cursor-pointer"
                          >
                            <Card
                              className={`transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                                isSelected
                                  ? 'ring-2 ring-primary shadow-lg bg-primary/5'
                                  : 'hover:border-primary/30'
                              }`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start space-x-3">
                                  <RadioGroupItem
                                    value={type.value}
                                    id={type.value}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <Icon className={`h-5 w-5 ${
                                        isSelected ? 'text-primary' : 'text-muted-foreground'
                                      }`} />
                                      <h3 className="font-medium text-foreground">
                                        {type.title}
                                      </h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">
                                      {type.description}
                                    </p>
                                    <ul className="space-y-1">
                                      {type.features.map((feature, index) => (
                                        <li
                                          key={index}
                                          className="text-xs text-muted-foreground flex items-center"
                                        >
                                          <div className="w-1 h-1 rounded-full bg-primary mr-2" />
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Label>
                        </motion.div>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Bio/Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Additional Information (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your investment goals, experience, or any specific areas of interest..."
                    className="min-h-[100px] bg-background/50 border-muted focus:border-primary transition-colors resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground mt-2">
                  This information helps us provide more relevant content and services.
                </p>
              </FormItem>
            )}
          />
        </motion.div>

        {/* Account Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-secondary/10 to-primary/10 p-6 rounded-lg"
        >
          <h4 className="font-medium text-foreground mb-3">
            What you'll get with your account:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-sm text-muted-foreground">
                Real-time market data and insights
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-sm text-muted-foreground">
                Personalized investment research
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-sm text-muted-foreground">
                Access to financial tools and calculators
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-sm text-muted-foreground">
                Expert market analysis and reports
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </Form>
  );
};

export default AccountPreferencesStep;