
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[]; // Can be a single role or array of roles
  adminOnly?: boolean; // Added this property to match how it's used in App.tsx
}

const ProtectedRoute = ({ 
  children, 
  requiredRole,
  adminOnly = false // Default to false
}: ProtectedRouteProps) => {
  const { session, user, profile, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cc-navy dark:text-white" />
        <span className="ml-2 text-lg dark:text-white">Loading...</span>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!session || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // For adminOnly routes, check if user is Admin or Developer
  if (adminOnly && !(profile?.role === 'Admin' || profile?.role === 'Developer')) {
    return <Navigate to="/" replace />;
  }

  // If no specific role is required, allow access
  if (!requiredRole) {
    return <>{children}</>;
  }

  // Handle array of roles or single role
  const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  // Role-based access control
  if (profile?.role && requiredRoles.includes(profile.role)) {
    return <>{children}</>;
  }
  
  // Special access rules
  if (profile?.role === 'Admin' || profile?.role === 'Developer') {
    // Admins and Developers have access to everything
    return <>{children}</>;
  }
  
  if (profile?.role === 'Analyst' && 
      (requiredRoles.includes('Analyst') || 
       requiredRoles.some(r => r.includes('edit') || r.includes('view')))) {
    // Analysts can access their own routes plus edit and view routes
    return <>{children}</>;
  }

  // For users with insufficient permissions
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
