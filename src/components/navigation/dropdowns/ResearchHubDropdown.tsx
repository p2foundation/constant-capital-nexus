import React from 'react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';

const ResearchHubDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-cc-navy dark:text-white hover:text-cc-blue dark:hover:text-cc-gold">
        Research Hub
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <li className="row-span-2">
            <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-cc-navy/50 to-cc-blue p-6 no-underline outline-none focus:shadow-md">
              <div className="mb-2 mt-4 text-lg font-medium text-white">
                Research Hub
              </div>
              <p className="text-sm leading-tight text-gray-200">
                Access comprehensive market research and analysis tools.
              </p>
            </div>
          </li>
          <li>
            <Link
              to="/research"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Daily Reports</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Daily market analysis and investment research reports
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/full-market-report"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Market Report</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Comprehensive market analysis and performance charts
              </p>
            </Link>
          </li>
          <li>
            <a
              href="https://research.constantcap.com.gh"
              target="_blank"
              rel="noopener noreferrer"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Research Portal</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Advanced research platform and analytical tools
              </p>
            </a>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ResearchHubDropdown;