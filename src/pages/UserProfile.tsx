
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
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
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building2, User, Phone, Briefcase, Layers } from 'lucide-react';

const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  position: z.string().min(2, "Position must be at least 2 characters"),
  industry: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const UserProfile = () => {
  const { profile, updateProfile, isLoading: authLoading } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: profile?.first_name || '',
      lastName: profile?.last_name || '',
      company: profile?.company || '',
      position: profile?.position || '',
      industry: profile?.industry || '',
      phone: profile?.phone || '',
      bio: profile?.bio || '',
    },
    values: {
      firstName: profile?.first_name || '',
      lastName: profile?.last_name || '',
      company: profile?.company || '',
      position: profile?.position || '',
      industry: profile?.industry || '',
      phone: profile?.phone || '',
      bio: profile?.bio || '',
    }
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsUpdating(true);
    
    try {
      await updateProfile({
        first_name: data.firstName,
        last_name: data.lastName,
        company: data.company,
        position: data.position,
        industry: data.industry || null,
        phone: data.phone || null,
        bio: data.bio || null,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cc-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 pt-16 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mt-12">
          <h1 className="text-3xl font-bold text-cc-navy dark:text-white mb-2">My Profile</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Manage your account information and preferences
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Account Details</CardTitle>
                  <CardDescription className="dark:text-gray-300">Your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-cc-blue dark:text-cc-gold" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                        <p className="font-medium dark:text-white">{profile?.first_name} {profile?.last_name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5 text-cc-blue dark:text-cc-gold" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                        <p className="font-medium dark:text-white">{profile?.company || '—'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5 text-cc-blue dark:text-cc-gold" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Position</p>
                        <p className="font-medium dark:text-white">{profile?.position || '—'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Layers className="h-5 w-5 text-cc-blue dark:text-cc-gold" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Account Type</p>
                        <p className="font-medium dark:text-white capitalize">{profile?.role || 'User'}</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4 dark:bg-gray-700" />
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium dark:text-white">Account Actions</p>
                    <Button variant="outline" size="sm" className="w-full dark:border-gray-600 dark:text-white">
                      Change Password
                    </Button>
                    {profile?.role === 'Admin' || profile?.role === 'Developer' || profile?.role === 'Analyst' ? (
                      <Button variant="outline" size="sm" className="w-full dark:border-gray-600 dark:text-white" 
                        onClick={() => window.location.href = '/admin'}>
                        Go to Admin Dashboard
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="shadow-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Edit Profile</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Update your personal and company information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-white">First Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                                  {...field}
                                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-white">Company</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                                  {...field}
                                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-white">Industry</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                              </FormControl>
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
                                  {...field}
                                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-white">About</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={4}
                                className="resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          className="bg-cc-navy hover:bg-cc-blue dark:bg-cc-gold dark:hover:bg-cc-gold/90 dark:text-cc-navy"
                          disabled={isUpdating}
                        >
                          {isUpdating ? 'Updating...' : 'Update Profile'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;
