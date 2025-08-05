import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import { useRewardSystem } from '@/hooks/useRewardSystem';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, LogOut, Settings, LayoutDashboard, FileText, Users, CreditCard, HelpCircle, Palette, Star, Trophy, Gift, BookOpen } from 'lucide-react';
import ThemeToggler from '../ThemeToggler';

const AuthButtons = () => {
  const { session, user, profile, signOut, isAdmin } = useAuth();
  const { userReward, trackActivity } = useRewardSystem();
  const navigate = useNavigate();
  
  const calculateRewardPoints = () => {
    if (!user || !profile) return 0;
    
    let points = 0;
    const accountAge = new Date().getTime() - new Date(user.created_at).getTime();
    const daysActive = Math.floor(accountAge / (1000 * 60 * 60 * 24));
    
    // Base points for account longevity (1 point per day)
    points += Math.min(daysActive, 365);
    
    // Profile completion bonus
    const profileFields = [profile.first_name, profile.last_name, profile.company, profile.position, profile.phone, profile.industry, profile.bio];
    const completedFields = profileFields.filter(field => field && field.trim() !== '').length;
    points += completedFields * 50;
    
    // Role-based bonus points
    const roleBonuses = {
      'Admin': 1000,
      'Developer': 800,
      'Analyst': 600,
      'Client': 400,
      'Customer': 200,
      'User': 100
    };
    points += roleBonuses[profile.role] || 0;
    
    // Email verification bonus
    if (user.email_confirmed_at) {
      points += 200;
    }
    
    // Weekly activity simulation (based on current day of week)
    const dayOfWeek = new Date().getDay();
    points += dayOfWeek * 15; // Simulates weekly engagement
    
    return points;
  };

  const getRewardTier = (points: number) => {
    if (points >= 2000) return { name: 'Diamond', color: 'text-blue-400', icon: '💎' };
    if (points >= 1500) return { name: 'Platinum', color: 'text-gray-400', icon: '🏆' };
    if (points >= 1000) return { name: 'Gold', color: 'text-yellow-500', icon: '🥇' };
    if (points >= 500) return { name: 'Silver', color: 'text-gray-300', icon: '🥈' };
    return { name: 'Bronze', color: 'text-amber-600', icon: '🥉' };
  };

  const getNextTierPoints = (points: number) => {
    if (points < 500) return 500 - points;
    if (points < 1000) return 1000 - points;
    if (points < 1500) return 1500 - points;
    if (points < 2000) return 2000 - points;
    return 0;
  };
  
  // Track login activity when component mounts
  useEffect(() => {
    if (user && trackActivity) {
      trackActivity('login');
    }
  }, [user, trackActivity]);

  const handleSignOut = async () => {
    if (trackActivity) {
      await trackActivity('logout');
    }
    await signOut();
    navigate('/login');
  };
  
  if (session && user) {
    // Use reward system data if available, fallback to calculated points
    const rewardPoints = userReward?.available_points || calculateRewardPoints();
    const tier = userReward ? 
      { name: userReward.tier_level, color: getRewardTier(rewardPoints).color, icon: getRewardTier(rewardPoints).icon } :
      getRewardTier(rewardPoints);
    const nextTierPoints = getNextTierPoints(rewardPoints);
    const progressPercentage = nextTierPoints > 0 ? ((rewardPoints % 500) / 500) * 100 : 100;

    return (
      <div className="hidden md:flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 h-auto">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cc-gold text-white font-medium text-sm">
                {profile?.first_name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-cc-navy dark:text-white font-medium text-sm">
                  {profile?.first_name || 'User'}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32">
                  {user.email}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-2 mt-2 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 mb-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cc-gold text-white text-lg font-medium">
                {profile?.first_name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium dark:text-white truncate">
                  {profile?.first_name && profile?.last_name 
                    ? `${profile.first_name} ${profile.last_name}`
                    : profile?.first_name || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
                {profile?.role && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cc-gold/10 text-cc-gold mt-1">
                    {profile.role}
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 mb-3 bg-gradient-to-r from-cc-gold/10 to-cc-blue/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-cc-gold" />
                  <span className="text-sm font-medium">Reward Points</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-cc-gold">{rewardPoints.toLocaleString()}</span>
                  <Star className="w-3 h-3 text-cc-gold" />
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium ${tier.color}`}>
                  {tier.icon} {tier.name} Member
                </span>
                {nextTierPoints > 0 && (
                  <span className="text-xs text-gray-500">
                    {nextTierPoints} to next tier
                  </span>
                )}
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-cc-gold to-cc-blue h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Earn points by using our platform</span>
                <Gift className="w-3 h-3" />
              </div>
            </div>

            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="flex items-center space-x-3 px-3 py-2 cursor-pointer rounded-md">
                <Link to="/profile" className="flex items-center w-full">
                  <UserCircle className="w-4 h-4" />
                  <span className="ml-3">My Profile</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild className="flex items-center space-x-3 px-3 py-2 cursor-pointer rounded-md">
                <Link to="/rewards" className="flex items-center w-full">
                  <Trophy className="w-4 h-4" />
                  <span className="ml-3">Rewards</span>
                </Link>
              </DropdownMenuItem>
            
              
              {(isAdmin || profile?.role === 'Analyst') && (
                <>
                  <DropdownMenuItem asChild className="flex items-center space-x-3 px-3 py-2 cursor-pointer rounded-md">
                    <Link to="/research-admin" className="flex items-center w-full">
                      <BookOpen className="w-4 h-4" />
                      <span className="ml-3">Research Admin</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  {isAdmin && (
                    <DropdownMenuItem asChild className="flex items-center space-x-3 px-3 py-2 cursor-pointer rounded-md">
                      <Link to="/admin" className="flex items-center w-full">
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="ml-3">Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  {isAdmin && (
                    <DropdownMenuItem asChild className="flex items-center space-x-3 px-3 py-2 cursor-pointer rounded-md">
                      <Link to="/user-management" className="flex items-center w-full">
                        <Users className="w-4 h-4" />
                        <span className="ml-3">User Management</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-md">
                <div className="flex items-center">
                  <Palette className="w-4 h-4" />
                  <span className="ml-3">Appearance</span>
                </div>
                <ThemeToggler />
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild className="flex items-center space-x-3 px-3 py-2 cursor-pointer rounded-md">
                <Link to="/settings" className="flex items-center w-full">
                  <Settings className="w-4 h-4" />
                  <span className="ml-3">Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center space-x-3 px-3 py-2 cursor-pointer rounded-md">
                <HelpCircle className="w-4 h-4" />
                <span className="ml-3">Help Center</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem 
              onClick={handleSignOut}
              className="flex items-center space-x-3 px-3 py-2 cursor-pointer rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4" />
              <span className="ml-3">Sign Out</span>
            </DropdownMenuItem>
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
