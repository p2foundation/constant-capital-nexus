
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Activity, Edit } from 'lucide-react';

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
  user_email?: string;
  user_first_name?: string;
  user_last_name?: string;
}

interface ActivitiesTableProps {
  activities: UserActivity[];
  users: User[];
  activitiesCurrentPage: number;
  setActivitiesCurrentPage: (page: number) => void;
  activitiesPerPage: number;
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({
  activities,
  users,
  activitiesCurrentPage,
  setActivitiesCurrentPage,
  activitiesPerPage
}) => {
  const paginatedActivities = activities.slice(
    (activitiesCurrentPage - 1) * activitiesPerPage,
    activitiesCurrentPage * activitiesPerPage
  );

  const totalActivitiesPages = Math.ceil(activities.length / activitiesPerPage);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return <Activity className="h-4 w-4 text-green-500" />;
      case 'logout': return <Activity className="h-4 w-4 text-red-500" />;
      case 'profile_update': return <Edit className="h-4 w-4 text-blue-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          User Activities
        </CardTitle>
        <CardDescription>
          Monitor user login/logout activities and system access
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedActivities.map((activity) => {
                // Use the data from the database function or fall back to the users prop
                const user = users.find(u => u.id === activity.user_id);
                const displayName = activity.user_first_name || activity.user_last_name 
                  ? `${activity.user_first_name || ''} ${activity.user_last_name || ''}`.trim()
                  : activity.user_email || user?.email || 'Unknown User';

                return (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getActivityIcon(activity.activity_type)}
                        <span className="capitalize">
                          {activity.activity_type.replace('_', ' ')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {displayName}
                    </TableCell>
                    <TableCell>
                      {new Date(activity.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {activity.ip_address || 'N/A'}
                      </code>
                    </TableCell>
                  </TableRow>
                );
              })}
              {paginatedActivities.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No activities recorded yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalActivitiesPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setActivitiesCurrentPage(Math.max(1, activitiesCurrentPage - 1))}
                    className={activitiesCurrentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: totalActivitiesPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setActivitiesCurrentPage(page)}
                      isActive={activitiesCurrentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setActivitiesCurrentPage(Math.min(totalActivitiesPages, activitiesCurrentPage + 1))}
                    className={activitiesCurrentPage === totalActivitiesPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivitiesTable;
