import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Activity,
  Shield,
  FileText
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserStatisticsCards from '@/components/user-management/UserStatisticsCards';
import UserTable from '@/components/user-management/UserTable';
import ActivitiesTable from '@/components/user-management/ActivitiesTable';
import AccountOpeningsSection from '@/components/user-management/AccountOpeningsSection';
import EditUserDialog from '@/components/user-management/EditUserDialog';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'Admin' | 'Developer' | 'Analyst' | 'Customer' | 'User' | 'Client';
  company: string;
  position: string; // Use position to match database column
  phone: string;
  industry: string;
  created_at: string;
  last_sign_in_at: string;
  is_active: boolean;
  email_confirmed_at: string;
  manually_confirmed_by: string | null;
  manual_confirmation_date: string | null;
}

interface UserActivity {
  id: string;
  user_id: string;
  activity_type: 'login' | 'logout' | 'profile_update' | 'account_access';
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
}

interface UserStatistics {
  total_users: number;
  pending_activations: number;
  activated_users: number;
}

interface AccountOpening {
  id: string;
  user_id: string;
  application_type: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at?: string;
  documents_complete: boolean;
}

const UserManagement = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [userStats, setUserStats] = useState<UserStatistics>({ total_users: 0, pending_activations: 0, activated_users: 0 });
  const [accountOpenings, setAccountOpenings] = useState<AccountOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activitiesCurrentPage, setActivitiesCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activitiesPerPage] = useState(10);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // Mock data for account openings (will be replaced later)
  const mockAccountOpenings: AccountOpening[] = [
    {
      id: '1',
      user_id: '1',
      application_type: 'Individual Trading',
      status: 'pending',
      submitted_at: '2024-06-01T10:00:00Z',
      documents_complete: true
    },
    {
      id: '2',
      user_id: '2',
      application_type: 'Corporate Trading',
      status: 'approved',
      submitted_at: '2024-05-28T15:30:00Z',
      reviewed_at: '2024-05-30T09:00:00Z',
      documents_complete: true
    },
    {
      id: '3',
      user_id: '3',
      application_type: 'Individual Investment',
      status: 'under_review',
      submitted_at: '2024-05-25T11:15:00Z',
      documents_complete: false
    }
  ];

  // Fetch real user data from Supabase
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.rpc('get_users_with_profiles');
      
      if (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
        return;
      }

      // Type assertion and fix data mapping
      const typedUsers = (data || []).map((user: any) => ({
        ...user,
        position: user.position || '', // Use position directly from database
        role: user.role as 'Admin' | 'Developer' | 'Analyst' | 'Customer' | 'User' | 'Client'
      }));

      setUsers(typedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    }
  };

  // Fetch user statistics
  const fetchUserStatistics = async () => {
    try {
      const { data, error } = await supabase.rpc('get_user_statistics');
      
      if (error) {
        console.error('Error fetching user statistics:', error);
        toast.error('Failed to fetch user statistics');
        return;
      }

      if (data && data.length > 0) {
        setUserStats({
          total_users: Number(data[0].total_users),
          pending_activations: Number(data[0].pending_activations),
          activated_users: Number(data[0].activated_users)
        });
      }
    } catch (error) {
      console.error('Error fetching user statistics:', error);
      toast.error('Failed to fetch user statistics');
    }
  };

  // Fetch user activities with email information
  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase.rpc('get_user_activities_with_emails');
      
      if (error) {
        console.error('Error fetching activities:', error);
        toast.error('Failed to fetch user activities');
        return;
      }

      // Map the data to match the expected format
      const mappedActivities = (data || []).map((activity: any) => ({
        id: activity.id,
        user_id: activity.user_id,
        activity_type: activity.activity_type as 'login' | 'logout' | 'profile_update' | 'account_access',
        timestamp: activity.activity_timestamp,
        ip_address: activity.ip_address,
        user_agent: activity.user_agent,
        user_email: activity.user_email,
        user_first_name: activity.user_first_name,
        user_last_name: activity.user_last_name
      }));

      setActivities(mappedActivities);
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast.error('Failed to fetch user activities');
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchUsers(),
        fetchUserStatistics(),
        fetchActivities()
      ]);
      setAccountOpenings(mockAccountOpenings); // Keep mock data for now
      setLoading(false);
    };

    loadData();
  }, [isAdmin]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    setUserToDelete(userId);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    setIsDeletingUser(true);

    try {
      console.log('Attempting to delete user:', userToDelete);
      
      const { data, error } = await supabase.functions.invoke('admin-delete-user', {
        body: { userId: userToDelete }
      });

      console.log('Delete user response:', { data, error });

      if (error) {
        console.error('Edge function error:', error);
        
        // Handle different types of errors with more specific messages
        if (error.message?.includes('FunctionsHttpError')) {
          const errorDetails = error.context?.body;
          if (errorDetails) {
            const parsedError = typeof errorDetails === 'string' 
              ? JSON.parse(errorDetails) 
              : errorDetails;
            
            // Provide more user-friendly error messages
            let userMessage = 'Failed to delete user';
            if (parsedError.error?.includes('Access denied')) {
              userMessage = 'Access denied. You do not have permission to delete users.';
            } else if (parsedError.error?.includes('User profile not found')) {
              userMessage = 'User profile not found. The user may have already been deleted.';
            } else if (parsedError.error?.includes('Cannot delete your own account')) {
              userMessage = 'You cannot delete your own account.';
            } else if (parsedError.error) {
              userMessage = `Failed to delete user: ${parsedError.error}`;
            }
            
            toast.error(userMessage);
            if (parsedError.details) {
              console.error('Error details:', parsedError.details);
            }
          } else {
            toast.error('Failed to delete user. Please try again or contact support.');
          }
        } else if (error.message?.includes('Invalid token')) {
          toast.error('Your session has expired. Please log in again.');
        } else {
          toast.error(`Failed to delete user: ${error.message}`);
        }
        return;
      }

      // Check if the response indicates success
      if (data?.success) {
        // Remove user from local state immediately
        setUsers(users.filter(user => user.id !== userToDelete));
        await fetchUserStatistics(); // Refresh statistics
        toast.success('User deleted successfully');
      } else {
        console.error('Unexpected response format:', data);
        toast.error('Failed to delete user. Please try again.');
      }
    } catch (error: any) {
      console.error('Unexpected error deleting user:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsDeletingUser(false);
      setUserToDelete(null);
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ is_active: !user.is_active })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      // Update local state
      setUsers(users.map(u => 
        u.id === userId ? { ...u, is_active: !u.is_active } : u
      ));

      toast.success(`User ${!user.is_active ? 'activated' : 'deactivated'} successfully`);
    } catch (error: any) {
      console.error('Error toggling user status:', error);
      toast.error('Failed to update user status');
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole as 'Admin' | 'Developer' | 'Analyst' | 'Customer' | 'User' | 'Client' })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      // Refresh users data
      await fetchUsers();
      toast.success('User role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  };

  const handleUserUpdated = () => {
    fetchUsers(); // Refresh the user list
  };

  const handleManuallyConfirmUser = async (userId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("You must be logged in to perform this action");
        return;
      }

      // First confirm the user
      const response = await supabase.functions.invoke('admin-confirm-user', {
        body: { userId },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to manually confirm user');
      }

      // Get user details for email notification
      const user = users.find(u => u.id === userId);
      if (user && user.email && user.first_name) {
        // Get admin name from current session
        const { data: adminProfile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', session.user.id)
          .single();

        const adminName = adminProfile 
          ? `${adminProfile.first_name} ${adminProfile.last_name}`.trim()
          : 'Admin';

        // Send confirmation email
        try {
          await supabase.functions.invoke('send-manual-confirmation-email', {
            body: {
              userEmail: user.email,
              userName: user.first_name,
              adminName: adminName
            },
          });
          console.log('Manual confirmation email sent successfully');
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the confirmation if email fails
        }
      }

      toast.success("User has been manually confirmed and notified via email");
      fetchUsers();
    } catch (error) {
      console.error('Error manually confirming user:', error);
      toast.error(error instanceof Error ? error.message : "Failed to manually confirm user");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-cc-navy/95">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cc-gold mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading user data...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-cc-navy/95">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cc-navy dark:text-white mb-2">User Management Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage users, monitor activities, and oversee account openings
          </p>
          
          <UserStatisticsCards userStats={userStats} />
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Account Openings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserTable
              users={users}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
                    onEditUser={handleEditUser}
                    onDeleteUser={handleDeleteUser}
                    onToggleUserStatus={handleToggleUserStatus}
                    onUpdateRole={handleUpdateRole}
                    onManuallyConfirmUser={handleManuallyConfirmUser}
            />
          </TabsContent>

          <TabsContent value="activities">
            <ActivitiesTable
              activities={activities}
              users={users}
              activitiesCurrentPage={activitiesCurrentPage}
              setActivitiesCurrentPage={setActivitiesCurrentPage}
              activitiesPerPage={activitiesPerPage}
            />
          </TabsContent>

          <TabsContent value="accounts">
            <AccountOpeningsSection accountOpenings={accountOpenings} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Edit User Dialog */}
      <EditUserDialog
        user={selectedUser}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUserUpdated={handleUserUpdated}
      />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone and will permanently remove the user from both the authentication system and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletingUser}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteUser} 
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeletingUser}
            >
              {isDeletingUser ? 'Deleting...' : 'Delete User'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
    </div>
  );
};

export default UserManagement;
