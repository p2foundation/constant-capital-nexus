import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Phone, Building, Briefcase, TrendingUp } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ContactInfoStepProps {
  form: UseFormReturn<any>;
}

const industries = [
  'Banking & Finance',
  'Insurance',
  'Investment Management',
  'Real Estate',
  'Technology',
  'Healthcare',
  'Manufacturing',
  'Retail & Consumer Goods',
  'Energy & Utilities',
  'Agriculture',
  'Education',
  'Government',
  'Non-profit',
  'Consulting',
  'Media & Entertainment',
  'Transportation',
  'Telecommunications',
  'Other',
];

const ContactInfoStep: React.FC<ContactInfoStepProps> = ({ form }) => {
  return (
    <Form {...form}>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Contact & Professional Information
          </h2>
          <p className="text-muted-foreground">
            Help us understand your professional background
          </p>
        </motion.div>

        {/* Phone Number - Required */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Phone Number <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="tel"
                      placeholder="+233 24 123 4567"
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

        {/* Company Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Company / Organization
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Enter your company name"
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
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Job Title / Position
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="e.g., Financial Analyst"
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

        {/* Industry Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Industry
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                      <SelectTrigger className="pl-10 h-12 bg-background/50 border-muted focus:border-primary transition-colors">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </div>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Information Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg border border-primary/10"
        >
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                Why do we collect this information?
              </h4>
              <p className="text-xs text-muted-foreground">
                Your professional information helps us provide personalized investment insights, 
                research reports, and market analysis tailored to your industry and role. 
                All information is kept confidential and secure.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Optional Fields Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground"
        >
          <p>
            <span className="text-destructive">*</span> Required fields. 
            Professional information is optional but helps us serve you better.
          </p>
        </motion.div>
      </div>
    </Form>
  );
};

export default ContactInfoStep;