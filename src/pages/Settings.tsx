import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggler from '@/components/ThemeToggler';
import { Bell, Mail, Lock, User, Globe, Shield, CreditCard, PanelTop } from 'lucide-react';
import { toast } from "sonner";

const Settings = () => {
  const { profile, user, updateProfile } = useAuth();
  
  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const updateData = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      company: formData.get('company') as string,
      position: formData.get('position') as string,
      email_notifications: formData.get('email_notifications') === 'on',
    };
    
    const result = await updateProfile(updateData);
    
    if (result.success) {
      toast.success("Profile settings updated successfully");
    } else {
      toast.error("Failed to update settings");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-cc-navy/95">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10 flex-grow mt-20">
        <h1 className="text-3xl font-bold text-cc-navy dark:text-white mb-8">Account Settings</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 space-y-4">
              <TabsList className="flex flex-col w-full h-auto bg-transparent gap-1">
                <TabsTrigger 
                  value="profile" 
                  className="w-full justify-start px-3 py-2 h-9 data-[state=active]:bg-cc-navy data-[state=active]:text-white dark:data-[state=active]:bg-cc-gold dark:data-[state=active]:text-cc-navy"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="account" 
                  className="w-full justify-start px-3 py-2 h-9 data-[state=active]:bg-cc-navy data-[state=active]:text-white dark:data-[state=active]:bg-cc-gold dark:data-[state=active]:text-cc-navy"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance" 
                  className="w-full justify-start px-3 py-2 h-9 data-[state=active]:bg-cc-navy data-[state=active]:text-white dark:data-[state=active]:bg-cc-gold dark:data-[state=active]:text-cc-navy"
                >
                  <PanelTop className="mr-2 h-4 w-4" />
                  <span>Appearance</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="w-full justify-start px-3 py-2 h-9 data-[state=active]:bg-cc-navy data-[state=active]:text-white dark:data-[state=active]:bg-cc-gold dark:data-[state=active]:text-cc-navy"
                >
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="subscription" 
                  className="w-full justify-start px-3 py-2 h-9 data-[state=active]:bg-cc-navy data-[state=active]:text-white dark:data-[state=active]:bg-cc-gold dark:data-[state=active]:text-cc-navy"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Subscription</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1">
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal and professional information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first_name">First name</Label>
                          <Input id="first_name" name="first_name" defaultValue={profile?.first_name || ''} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last_name">Last name</Label>
                          <Input id="last_name" name="last_name" defaultValue={profile?.last_name || ''} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={user?.email || ''} disabled />
                        <p className="text-sm text-muted-foreground">
                          Your email cannot be changed
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" name="company" defaultValue={profile?.company || ''} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Input id="position" name="position" defaultValue={profile?.position || ''} />
                        </div>
                      </div>
                      
                      <Button type="submit">Save changes</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>
                      Manage your account security and password
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change password</h3>
                      <div className="space-y-2">
                        <Label htmlFor="current_password">Current password</Label>
                        <Input id="current_password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new_password">New password</Label>
                        <Input id="new_password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm_password">Confirm new password</Label>
                        <Input id="confirm_password" type="password" />
                      </div>
                      <Button>Update password</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-factor authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                      <div className="flex items-center space-x-2">
                        <Switch id="2fa" />
                        <Label htmlFor="2fa">Enable two-factor authentication</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appearance" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize the appearance of the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme</h3>
                      <div className="flex items-center space-x-2">
                        <ThemeToggler />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        The application will automatically switch to dark mode after 6 PM GMT
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Interface density</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="density-compact" name="density" value="compact" />
                          <Label htmlFor="density-compact">Compact</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="density-comfortable" name="density" value="comfortable" checked />
                          <Label htmlFor="density-comfortable">Comfortable</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <Label htmlFor="email_notifications">Email notifications</Label>
                        </div>
                        <Switch id="email_notifications" name="email_notifications" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="notify_research" />
                          <Label htmlFor="notify_research">New research reports</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="notify_market" />
                          <Label htmlFor="notify_market">Market updates</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="notify_news" />
                          <Label htmlFor="notify_news">Industry news</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Frequency</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="frequency-immediate" name="frequency" value="immediate" />
                          <Label htmlFor="frequency-immediate">Immediately</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="frequency-daily" name="frequency" value="daily" checked />
                          <Label htmlFor="frequency-daily">Daily digest</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="frequency-weekly" name="frequency" value="weekly" />
                          <Label htmlFor="frequency-weekly">Weekly digest</Label>
                        </div>
                      </div>
                    </div>
                    
                    <Button>Save preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="subscription" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Plan</CardTitle>
                    <CardDescription>
                      Manage your subscription and billing details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Current Plan</h3>
                      
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Pro Plan</p>
                            <p className="text-sm text-muted-foreground">$199/month</p>
                          </div>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                            Active
                          </span>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm">Next billing date: June 1, 2025</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button variant="outline">Change Plan</Button>
                        <Button variant="outline" className="text-red-600 hover:text-red-700">Cancel Subscription</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Payment Method</h3>
                      
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">Visa ending in 4242</p>
                              <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </div>
                      
                      <Button variant="outline">Add Payment Method</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Billing History</h3>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Invoice</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">May 1, 2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">$199.00</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Paid</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                <a href="#">Download</a>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">Apr 1, 2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">$199.00</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Paid</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                <a href="#">Download</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Settings;
