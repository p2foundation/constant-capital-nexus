
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'Admin' | 'Developer' | 'Analyst' | 'Customer' | 'User' | 'Client';
  company: string;
  job_position: string;
  phone: string;
  industry: string;
  created_at: string;
  last_sign_in_at: string;
  is_active: boolean;
  email_confirmed_at: string;
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

      // Type assertion to ensure proper typing
      const typedUsers = (data || []).map((user: any) => ({
        ...user,
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

  // Fetch user activities
  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);
      
      if (error) {
        console.error('Error fetching activities:', error);
        toast.error('Failed to fetch user activities');
        return;
      }

      // Type assertion to ensure proper typing
      const typedActivities = (data || []).map((activity: any) => ({
        ...activity,
        activity_type: activity.activity_type as 'login' | 'logout' | 'profile_update' | 'account_access'
      }));

      setActivities(typedActivities);
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
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        // Note: In production, you might want to soft delete or deactivate instead
        toast.info('User deletion would be implemented here');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    try {
      // This would need to be implemented with actual user deactivation logic
      toast.info('User status toggle would be implemented here');
    } catch (error) {
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
      
      <Footer />
    </div>
  );
};

export default UserManagement;
