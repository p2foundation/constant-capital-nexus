
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserCircle, LogOut, Settings, LayoutDashboard, FileText, PanelTop } from 'lucide-react';
import ThemeToggler from '../ThemeToggler';

const AuthButtons = () => {
  const { session, user, profile, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };
  
  if (session && user) {
    return (
      <div className="hidden md:flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cc-gold text-white">
                {profile?.first_name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
              <span className="text-cc-navy dark:text-white font-medium text-sm">
                {profile?.first_name || 'Account'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-4 mt-2 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cc-gold text-white text-lg font-medium">
                  {profile?.first_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">
                    {profile?.first_name && profile?.last_name 
                      ? `${profile.first_name} ${profile.last_name}`
                      : user.email}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                    {profile?.role || 'User'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-y dark:border-gray-700 py-3">
                <div className="text-sm text-gray-500 dark:text-gray-400">Theme</div>
                <ThemeToggler />
              </div>

              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="flex items-center space-x-2 px-1 py-2 cursor-pointer">
                  <Link to="/profile" className="flex items-center">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="flex items-center space-x-2 px-1 py-2 cursor-pointer">
                  <Link to="/research" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Research Reports</span>
                  </Link>
                </DropdownMenuItem>
                
                {/* Show admin link for admin users */}
                {(isAdmin || profile?.role === 'Analyst') && (
                  <DropdownMenuItem asChild className="flex items-center space-x-2 px-1 py-2 cursor-pointer">
                    <Link to="/admin" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem asChild className="flex items-center space-x-2 px-1 py-2 cursor-pointer">
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleSignOut}
                className="w-full mt-2"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-2">
      <Button variant="ghost" asChild className="text-cc-navy hover:bg-gray-100 hover:text-cc-blue dark:text-white dark:hover:bg-gray-800">
        <Link to="/login">Sign in</Link>
      </Button>
      <Button asChild className="bg-cc-navy hover:bg-cc-blue dark:bg-cc-gold dark:hover:bg-cc-gold/90 dark:text-cc-navy">
        <Link to="/register">Register</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
