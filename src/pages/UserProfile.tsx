import React, { useState, useEffect } from 'react';
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PasswordChangeModal from '@/components/profile/PasswordChangeModal';
import { useAnalytics } from '@/hooks/useAnalytics';
import { 
  Building2, 
  User, 
  Phone, 
  Briefcase, 
  Layers, 
  AlertCircle, 
  Mail, 
  Camera, 
  Shield, 
  Calendar,
  MapPin,
  Edit3,
  Save,
  Settings,
  Bell
} from 'lucide-react';
import { toast } from "sonner";
import { format } from 'date-fns';

const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  industry: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const UserProfile = () => {
  useAnalytics();
  
  const { profile, updateProfile, isLoading: authLoading, user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      company: '',
      position: '',
      industry: '',
      phone: '',
      bio: '',
    }
  });

  // Update form when profile data changes
  useEffect(() => {
    if (profile) {
      form.reset({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        company: profile.company || '',
        position: profile.position || '',
        industry: profile.industry || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
      });
    }
  }, [profile, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      toast.error('You must be logged in to update your profile');
      return;
    }

    setIsUpdating(true);
    
    try {
      const result = await updateProfile({
        first_name: data.firstName,
        last_name: data.lastName,
        company: data.company,
        position: data.position,
        industry: data.industry || null,
        phone: data.phone || null,
        bio: data.bio || null,
      });

      if (result.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  const getProfileCompleteness = () => {
    if (!profile) return 0;
    const fields = [
      profile.first_name,
      profile.last_name,
      profile.company,
      profile.position,
      profile.industry,
      profile.phone,
      profile.bio
    ];
    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`.toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const handleChangePassword = () => {
    setIsPasswordModalOpen(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cc-blue"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-gray-950">
        <Navbar />
        <main className="flex-1 pt-16 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto mt-12 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-cc-navy dark:text-white mb-2">Access Denied</h1>
            <p className="text-gray-500 dark:text-gray-400">
              You must be logged in to view your profile.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto mt-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
                <p className="text-muted-foreground">
                  Manage your account information and preferences
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  Profile {getProfileCompleteness()}% Complete
                </Badge>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>
            </div>
            
            {/* Profile Completeness Progress */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Profile Completeness</span>
                <span className="text-sm font-medium">{getProfileCompleteness()}%</span>
              </div>
              <Progress value={getProfileCompleteness()} className="w-full h-2" />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <Calendar className="h-4 w-4" />
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Profile Overview Card */}
                <div className="lg:col-span-4">
                  <Card className="sticky top-6">
                    <CardHeader className="text-center pb-4">
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={profile?.avatar_url || ''} />
                            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                              {getInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <Button
                            size="icon"
                            variant="outline"
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                          >
                            <Camera className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-xl">
                        {profile?.first_name && profile?.last_name 
                          ? `${profile.first_name} ${profile.last_name}`
                          : 'Complete your profile'}
                      </CardTitle>
                      <CardDescription className="text-center">
                        {profile?.position && profile?.company 
                          ? `${profile.position} at ${profile.company}`
                          : 'Add your professional details'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="font-medium truncate">{user?.email || 'Not set'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Shield className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <div>
                            <p className="text-sm text-muted-foreground">Role</p>
                            <Badge variant="outline" className="capitalize">
                              {profile?.role || 'User'}
                            </Badge>
                          </div>
                        </div>

                        {profile?.phone && (
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <div>
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p className="font-medium">{profile.phone}</p>
                            </div>
                          </div>
                        )}

                        {profile?.industry && (
                          <div className="flex items-center gap-3">
                            <Layers className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <div>
                              <p className="text-sm text-muted-foreground">Industry</p>
                              <p className="font-medium">{profile.industry}</p>
                            </div>
                          </div>
                        )}

                        {user?.created_at && (
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <div>
                              <p className="text-sm text-muted-foreground">Member since</p>
                              <p className="font-medium">{format(new Date(user.created_at), 'MMMM yyyy')}</p>
                            </div>
                          </div>
                        )}

                        {profile?.bio && (
                          <div className="pt-4 border-t">
                            <p className="text-sm text-muted-foreground mb-2">About</p>
                            <p className="text-sm leading-relaxed">{profile.bio}</p>
                          </div>
                        )}
                      </div>

                      <Separator className="my-6" />
                      
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start gap-2"
                          onClick={handleChangePassword}
                        >
                          <Shield className="h-4 w-4" />
                          Change Password
                        </Button>
                        {(profile?.role === 'Admin' || profile?.role === 'Developer' || profile?.role === 'Analyst') && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start gap-2"
                            onClick={() => window.location.href = '/admin'}
                          >
                            <Settings className="h-4 w-4" />
                            Admin Dashboard
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Profile Form */}
                <div className="lg:col-span-8">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Personal Information</CardTitle>
                          <CardDescription>
                            {isEditing 
                              ? 'Update your personal and professional details'
                              : 'Your personal and professional information'}
                          </CardDescription>
                        </div>
                        {!isEditing && (
                          <Button
                            onClick={() => setIsEditing(true)}
                            variant="ghost"
                            size="sm"
                            className="gap-2"
                          >
                            <Edit3 className="h-4 w-4" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {isEditing ? (
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name *</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter your first name"
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
                                    <FormLabel>Last Name *</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter your last name"
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
                                    <FormLabel>Company *</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter your company name"
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
                                    <FormLabel>Position *</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="Enter your job title"
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
                                    <FormLabel>Industry</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="e.g., Financial Services"
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
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        placeholder="e.g., +233 20 000 0000"
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
                                  <FormLabel>About</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      rows={4}
                                      className="resize-none"
                                      placeholder="Tell us about your professional background and interests..."
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="flex gap-3 pt-4">
                              <Button 
                                type="submit" 
                                disabled={isUpdating}
                                className="gap-2"
                              >
                                <Save className="h-4 w-4" />
                                {isUpdating ? 'Saving...' : 'Save Changes'}
                              </Button>
                              <Button 
                                type="button"
                                variant="outline" 
                                onClick={() => setIsEditing(false)}
                                disabled={isUpdating}
                              >
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </Form>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">First Name</p>
                              <p className="font-medium">{profile?.first_name || 'Not set'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Last Name</p>
                              <p className="font-medium">{profile?.last_name || 'Not set'}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Company</p>
                              <p className="font-medium">{profile?.company || 'Not set'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Position</p>
                              <p className="font-medium">{profile?.position || 'Not set'}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Industry</p>
                              <p className="font-medium">{profile?.industry || 'Not set'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Phone</p>
                              <p className="font-medium">{profile?.phone || 'Not set'}</p>
                            </div>
                          </div>

                          {profile?.bio && (
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">About</p>
                              <p className="leading-relaxed">{profile.bio}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and privacy settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleChangePassword}
                    >
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Download Account Data
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                    <CardDescription>
                      Configure how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Research Reports</p>
                        <p className="text-sm text-muted-foreground">Get notified about new reports</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Account Activity
                  </CardTitle>
                  <CardDescription>
                    Recent activity and account history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Profile Updated</p>
                        <p className="text-sm text-muted-foreground">You updated your profile information</p>
                      </div>
                      <p className="text-sm text-muted-foreground">Just now</p>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">Account Created</p>
                        <p className="text-sm text-muted-foreground">Welcome to Constant Capital</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {user?.created_at ? format(new Date(user.created_at), 'MMM dd, yyyy') : 'Recently'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      
      <PasswordChangeModal 
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </div>
  );
};

export default UserProfile;
