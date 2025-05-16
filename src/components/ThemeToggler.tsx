
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from '@/hooks/use-mobile';

const ThemeToggler = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Check if user has a preference stored
    const savedTheme = localStorage.getItem('theme');
    const currentHour = new Date().getUTCHours(); // Get current hour in GMT
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Auto dark mode after 6 PM GMT (18:00)
      if (currentHour >= 18 || currentHour < 6) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-cc-gold" />
      <Switch 
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
        className="data-[state=checked]:bg-cc-navy"
      />
      <Moon className="h-4 w-4 text-cc-navy dark:text-cc-gold" />
      {!isMobile && (
        <span className="text-sm font-medium">
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </div>
  );
};

export default ThemeToggler;
