import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Users, Search, Eye, Edit, Trash2, MoreHorizontal, Clock, CheckCircle, UserCheck } from 'lucide-react';
import ViewUserDialog from './ViewUserDialog';

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

interface UserTableProps {
  users: User[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onToggleUserStatus: (userId: string) => void;
  onUpdateRole: (userId: string, newRole: string) => Promise<void>;
  onManuallyConfirmUser: (userId: string) => Promise<void>;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  searchTerm,
  setSearchTerm,
  selectedRole,
  setSelectedRole,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  onEditUser,
  onDeleteUser,
  onToggleUserStatus,
  onUpdateRole,
  onManuallyConfirmUser
}) => {
  const [selectedViewUser, setSelectedViewUser] = useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleViewUser = (user: User) => {
    setSelectedViewUser(user);
    setIsViewDialogOpen(true);
  };
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription>
          Manage user accounts, roles, and permissions
        </CardDescription>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="min-w-0 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full sm:w-[180px] sm:shrink-0">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Developer">Developer</SelectItem>
              <SelectItem value="Analyst">Analyst</SelectItem>
              <SelectItem value="Customer">Customer</SelectItem>
              <SelectItem value="Client">Client</SelectItem>
              <SelectItem value="User">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="min-w-0 overflow-hidden rounded-md border">
          <Table className="min-w-[1216px] table-fixed">
            <colgroup>
              <col className="w-[26%]" />
              <col className="w-[21%]" />
              <col className="w-[13%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
              <col className="w-[9%]" />
              <col className="w-[5%]" />
            </colgroup>
            <TableHeader>
              <TableRow className="bg-muted/40 [&>th]:whitespace-nowrap">
                <TableHead>User</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Confirmation</TableHead>
                <TableHead>Last Sign In</TableHead>
                <TableHead className="px-2 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No users found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="w-8 h-8 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                          {user.first_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium break-words">
                            {user.first_name && user.last_name 
                              ? `${user.first_name} ${user.last_name}`
                              : user.email}
                          </div>
                          <div className="text-sm text-muted-foreground break-all">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 break-words">
                        <div className="font-medium">{user.company || 'N/A'}</div>
                        <div className="text-sm text-muted-foreground">{user.position || 'N/A'}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.role || 'User'}
                        onValueChange={(value) => onUpdateRole(user.id, value)}
                      >
                        <SelectTrigger className="w-full" aria-label={`Role for ${user.first_name || user.email}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="User">User</SelectItem>
                          <SelectItem value="Client">Client</SelectItem>
                          <SelectItem value="Customer">Customer</SelectItem>
                          <SelectItem value="Analyst">Analyst</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Developer">Developer</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-start gap-2">
                        {user.is_active ? (
                          <Badge variant="secondary">Active</Badge>
                        ) : (
                          <Badge variant="outline" className="text-destructive">Inactive</Badge>
                        )}
                        <Switch
                          aria-label={`Active status for ${user.first_name || user.email}`}
                          checked={user.is_active}
                          onCheckedChange={() => onToggleUserStatus(user.id)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.email_confirmed_at ? (
                          <div className="flex items-center gap-1.5 text-foreground">
                            <CheckCircle className="h-4 w-4 shrink-0" />
                            <span className="text-sm">Email Confirmed</span>
                          </div>
                        ) : user.manual_confirmation_date ? (
                          <div className="flex items-center gap-1.5 text-foreground">
                            <UserCheck className="h-4 w-4 shrink-0" />
                            <span className="text-sm">Manually Confirmed</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-start gap-2">
                            <Badge variant="outline">Pending</Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onManuallyConfirmUser(user.id)}
                              className="h-auto min-h-8 whitespace-normal text-left text-xs"
                            >
                              Manually Authorize
                            </Button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 whitespace-nowrap text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 shrink-0" />
                        {user.last_sign_in_at 
                          ? new Date(user.last_sign_in_at).toLocaleDateString()
                          : 'Never'}
                      </div>
                    </TableCell>
                    <TableCell className="px-2 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label={`Actions for ${user.first_name || user.email}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewUser(user)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEditUser(user)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onDeleteUser(user.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
      
      <ViewUserDialog
        user={selectedViewUser}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />
    </Card>
  );
};

export default UserTable;
