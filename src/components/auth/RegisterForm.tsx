
import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Briefcase, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must include uppercase, lowercase, and number"
    ),
  confirmPassword: z.string(),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  industry: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(["Client", "User", "Customer"]).default("User"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      company: "",
      position: "",
      industry: "",
      phone: "",
      bio: "",
      role: "User",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const { success, error } = await signUp(values.email, values.password, {
        first_name: values.firstName,
        last_name: values.lastName,
        company: values.company,
        position: values.position,
        industry: values.industry || null,
        phone: values.phone || null,
        bio: values.bio || null,
        role: values.role as any,
      });

      if (success) {
        navigate("/login", {
          state: {
            message:
              "Account created successfully. Please check your email to confirm your registration.",
          },
        });
      } else if (error && error.includes('check your email')) {
        // Handle email confirmation case
        navigate("/login", {
          state: {
            message:
              "Account created successfully. Please check your email to confirm your registration before signing in.",
          },
        });
      } else if (error) {
        console.error("Registration error:", error);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto">
      <div className="mb-8 text-center">
        <UserPlus className="h-12 w-12 mx-auto mb-4 text-cc-navy dark:text-white" />
        <h2 className="text-2xl font-bold text-cc-navy dark:text-white mb-2">Create an Account</h2>
        <p className="text-gray-600 dark:text-gray-300">Join Constant Capital for access to premium research and market data</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <UserPlus className="h-5 w-5 text-cc-navy dark:text-white" />
                <h3 className="text-lg font-medium text-cc-navy dark:text-white">Personal Information</h3>
              </div>

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Confirm Password</FormLabel>
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
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-5 w-5 text-cc-navy dark:text-white" />
                <h3 className="text-lg font-medium text-cc-navy dark:text-white">Company Information</h3>
              </div>

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Company Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Acme Corporation"
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
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Position</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Investment Analyst"
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
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Industry</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="Financial Services">Financial Services</SelectItem>
                        <SelectItem value="Banking">Banking</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                        <SelectItem value="Asset Management">Asset Management</SelectItem>
                        <SelectItem value="Investment Banking">Investment Banking</SelectItem>
                        <SelectItem value="Private Equity">Private Equity</SelectItem>
                        <SelectItem value="Venture Capital">Venture Capital</SelectItem>
                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Energy">Energy</SelectItem>
                        <SelectItem value="Mining">Mining</SelectItem>
                        <SelectItem value="Agriculture">Agriculture</SelectItem>
                        <SelectItem value="Telecommunications">Telecommunications</SelectItem>
                        <SelectItem value="Government">Government</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+233 XX XXX XXXX"
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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Account Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="dark:bg-gray-800">
                        <SelectItem value="Client">Corporate Client</SelectItem>
                        <SelectItem value="Customer">Investment Customer</SelectItem>
                        <SelectItem value="User">General User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">About</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself or your investment interests"
                        {...field}
                        rows={3}
                        className="resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-cc-navy hover:bg-cc-blue dark:bg-cc-gold dark:hover:bg-cc-gold/90 dark:text-cc-navy"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-cc-navy"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Account
                </div>
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            By creating an account, you agree to our{" "}
            <a href="/terms-of-service" className="text-cc-blue hover:underline dark:text-cc-gold" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-cc-blue hover:underline dark:text-cc-gold" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <button
                type="button"
                className="text-cc-blue hover:text-cc-navy dark:text-cc-gold dark:hover:text-white hover:underline"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
