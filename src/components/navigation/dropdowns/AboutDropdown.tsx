
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const AboutDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
        <span className="text-sm font-medium text-cc-navy dark:text-white">About Us</span>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-4 w-[300px]">
          <Link to="/about" className="flex flex-col p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
            <div className="font-medium text-cc-navy dark:text-white">Company</div>
            <div className="text-sm text-gray-500 dark:text-muted-foreground">
              Learn about our history, mission and values
            </div>
          </Link>
          <Link to="/leadership" className="flex flex-col p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
            <div className="font-medium text-cc-navy dark:text-white">Leadership</div>
            <div className="text-sm text-gray-500 dark:text-muted-foreground">
              Meet our experienced management team
            </div>
          </Link>
          <Link to="/careers" className="flex flex-col p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80 bg-cc-gold/10 border border-cc-gold/20">
            <div className="font-medium text-cc-navy dark:text-white flex items-center gap-2">
              Careers
              <span className="bg-cc-gold text-cc-navy text-[10px] px-1.5 py-0.5 rounded font-semibold">HIRING</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-muted-foreground">
              Join our team — explore open positions
            </div>
          </Link>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default AboutDropdown;
