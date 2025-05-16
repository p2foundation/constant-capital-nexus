
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const ServicesDropdown = () => {
  return (
    <div className="relative z-10">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
              <span className="text-sm font-medium text-cc-navy dark:text-white">Services</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                <Link to="/securities-trading" className="flex items-start p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
                  <div className="font-medium text-cc-navy dark:text-white">Securities Trading</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    Execute trades across equities and fixed income markets.
                  </div>
                </Link>
                <Link to="/financings-capital-markets" className="flex items-start p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
                  <div className="font-medium text-cc-navy dark:text-white">Financings & Capital Markets</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    Raise capital through debt and equity offerings.
                  </div>
                </Link>
                <Link to="/research-services" className="flex items-start p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
                  <div className="font-medium text-cc-navy dark:text-white">Research Services</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    Comprehensive analysis of markets and securities.
                  </div>
                </Link>
                <Link to="/investment-advisory" className="flex items-start p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
                  <div className="font-medium text-cc-navy dark:text-white">Investment Advisory</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    Tailored investment strategies for your financial goals.
                  </div>
                </Link>
                <Link to="/strategic-advisory" className="flex items-start p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
                  <div className="font-medium text-cc-navy dark:text-white">Strategic Advisory</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    Expert guidance for complex business decisions.
                  </div>
                </Link>
                <Link to="/private-equity" className="flex items-start p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
                  <div className="font-medium text-cc-navy dark:text-white">Private Equity</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    Private capital investment opportunities.
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

export default ServicesDropdown;
