import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Building2, Briefcase, Phone, Calendar, Shield, Layers } from 'lucide-react';
import { format } from 'date-fns';

interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'Admin' | 'Developer' | 'Analyst' | 'Customer' | 'User' | 'Client';
  company: string;
  position: string;
  phone: string;
  industry: string;
  bio?: string;
  created_at: string;
  last_sign_in_at: string;
  is_active: boolean;
  email_confirmed_at: string;
  manually_confirmed_by?: string | null;
  manual_confirmation_date?: string | null;
}

interface ViewUserDialogProps {
  user: UserData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewUserDialog: React.FC<ViewUserDialogProps> = ({
  user,
  open,
  onOpenChange
}) => {
  if (!user) return null;

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Admin':
      case 'Developer':
        return 'destructive';
      case 'Analyst':
        return 'secondary';
      case 'Client':
      case 'Customer':
        return 'default';
      default:
        return 'outline';
    }
  };

  const getStatusBadgeVariant = (isActive: boolean, emailConfirmed: string, manualConfirmed: string | null) => {
    if (isActive && (emailConfirmed || manualConfirmed)) {
      return 'default'; // Active
    }
    return 'secondary'; // Pending
  };

  const getStatusText = (isActive: boolean, emailConfirmed: string, manualConfirmed: string | null) => {
    if (isActive && (emailConfirmed || manualConfirmed)) {
      return 'Active';
    }
    return 'Pending Activation';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[700px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg sm:text-xl flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Complete information for {user.first_name} {user.last_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">
                      {user.first_name && user.last_name 
                        ? `${user.first_name} ${user.last_name}`
                        : user.first_name || 'Not provided'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium truncate" title={user.email}>
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                    {user.role}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={getStatusBadgeVariant(user.is_active, user.email_confirmed_at, user.manually_confirmed_by)}>
                    {getStatusText(user.is_active, user.email_confirmed_at, user.manually_confirmed_by)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-medium">{user.company || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Position</p>
                    <p className="font-medium">{user.position || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Industry</p>
                    <p className="font-medium">{user.industry || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{user.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {user.bio && (
                <div>
                  <p className="text-sm text-muted-foreground">Bio</p>
                  <p className="font-medium text-sm leading-relaxed">{user.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">
                      {format(new Date(user.created_at), 'PPP')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Sign In</p>
                    <p className="font-medium">
                      {user.last_sign_in_at 
                        ? format(new Date(user.last_sign_in_at), 'PPP')
                        : 'Never'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {user.email_confirmed_at && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email Confirmed</p>
                    <p className="font-medium">
                      {format(new Date(user.email_confirmed_at), 'PPP')}
                    </p>
                  </div>
                </div>
              )}

              {user.manually_confirmed_by && user.manual_confirmation_date && (
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Manually Confirmed</p>
                    <p className="font-medium">
                      {format(new Date(user.manual_confirmation_date), 'PPP')}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserDialog;