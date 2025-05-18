
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import { toast } from "sonner";
import ThemeToggler from '@/components/ThemeToggler';
import { useAuth } from '@/contexts/AuthContext';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const handleLogout = async () => {
    await signOut();
    // Redirect to login page after signOut
    navigate("/login");
  };
  
  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-cc-navy dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/admin" className="flex items-center">
              <span className="text-xl font-serif font-bold text-cc-navy dark:text-white">
                Constant<span className="text-cc-gold">Capital</span> <span className="text-gray-500 text-sm font-sans ml-2">Admin</span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggler />
            <Button variant="ghost" onClick={handleLogout} className="flex items-center">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">View Site</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
