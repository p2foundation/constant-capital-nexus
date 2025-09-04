
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminFooter from '@/components/admin/AdminFooter';
import MarketSummaryManager from '@/components/admin/MarketSummaryManager';
import MarketDataManager from '@/components/admin/MarketDataManager';
import MarketDataSourceSettings from '@/components/admin/MarketDataSourceSettings';
import ContentManager from '@/components/admin/ContentManager';
import ContactInbox from '@/components/admin/ContactInbox';
import EmailTestingPanel from '@/components/auth/EmailTestingPanel';
import { AdminProvider } from '@/contexts/AdminContext';
import { FileText, ChartBar, Settings, Layout, Database, Calendar, TrendingUp, Mail } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';

const AdminDashboard = () => {
  useAnalytics();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'content';
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <AdminProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-cc-navy/95">
        <AdminNavbar />
        
        {/* Add padding-top to account for fixed navbar */}
        <div className="container mx-auto px-4 py-8 flex-grow pt-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-cc-navy dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-300 mt-2">
              Manage market data and website content
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-6 flex flex-wrap">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                <span>Content</span>
              </TabsTrigger>
              <TabsTrigger value="contact-inbox" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Contact Inbox</span>
              </TabsTrigger>
              <TabsTrigger value="market-summary" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Market Summary</span>
              </TabsTrigger>
              <TabsTrigger value="market-data" className="flex items-center gap-2">
                <ChartBar className="h-4 w-4" />
                <span>Market Data</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
              <TabsTrigger value="email-testing" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email Testing</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-0">
              <ContentManager />
            </TabsContent>

            <TabsContent value="contact-inbox" className="mt-0">
              <ContactInbox />
            </TabsContent>
            
            <TabsContent value="market-summary" className="mt-0">
              <MarketSummaryManager />
            </TabsContent>
            
            <TabsContent value="market-data" className="mt-0">
              <MarketDataManager />
            </TabsContent>
            
            <TabsContent value="events" className="mt-0">
              <div className="grid gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-xl font-medium mb-4">Upcoming Events Calendar</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Manage investor conferences, earnings calls, and market events
                  </p>
                  
                  <div className="border rounded-md p-4 mb-6">
                    <div className="grid grid-cols-7 gap-1 mb-4 font-medium text-center">
                      <div>Sun</div>
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-sm">
                      {Array.from({ length: 35 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-16 border rounded-sm p-1 ${
                            i % 7 === 0 || i % 7 === 6 ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                          } ${
                            [10, 15, 22].includes(i) ? 'border-blue-500 border-2' : ''
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{i + 1}</span>
                            {[10, 15, 22].includes(i) && (
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            )}
                          </div>
                          {i === 10 && <div className="text-xs text-blue-500">GSE Brief</div>}
                          {i === 15 && <div className="text-xs text-blue-500">Conference</div>}
                          {i === 22 && <div className="text-xs text-blue-500">Earnings</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4">
                    <Button variant="outline">Add Event</Button>
                    <Button>View All Events</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <div className="space-y-6">
                <MarketDataSourceSettings onDataSourceChange={(source) => {
                  console.log('Data source changed to:', source);
                }} />
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-xl font-medium mb-4">Dashboard Settings</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Configure dashboard preferences and account settings.
                  </p>
                  <div className="space-y-4">
                    <Button variant="outline">Manage Account</Button>
                    <Button variant="outline">API Connections</Button>
                    <Button variant="outline">Data Backup</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="email-testing" className="mt-0">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h2 className="text-xl font-medium mb-4">Email System Testing & Diagnostics</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Use this tool to test and troubleshoot email confirmation issues. This helps diagnose
                    problems with user registration and email delivery.
                  </p>
                  <EmailTestingPanel />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <AdminFooter />
      </div>
    </AdminProvider>
  );
};

export default AdminDashboard;
