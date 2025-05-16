
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const AboutDropdown = () => {
  return (
    <div className="relative z-10">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
              <span className="text-sm font-medium text-cc-navy dark:text-white">About Us</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[300px]">
                <Link to="/about" className="flex flex-col p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
                  <div className="font-medium text-cc-navy dark:text-white">Company</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Learn about our history, mission and values
                  </div>
                </Link>
                <Link to="/leadership" className="flex flex-col p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
                  <div className="font-medium text-cc-navy dark:text-white">Leadership</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Meet our experienced management team
                  </div>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default AboutDropdown;
