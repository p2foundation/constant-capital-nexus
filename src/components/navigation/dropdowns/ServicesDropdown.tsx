
import React from 'react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';

const ServicesDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-cc-navy dark:text-white hover:text-cc-blue dark:hover:text-cc-gold">
        Services
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <li className="row-span-3">
            <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-cc-navy/50 to-cc-blue p-6 no-underline outline-none focus:shadow-md">
              <div className="mb-2 mt-4 text-lg font-medium text-white">
                Our Services
              </div>
              <p className="text-sm leading-tight text-gray-200">
                Comprehensive financial services tailored to your investment needs.
              </p>
            </div>
          </li>
          <li>
            <Link
              to="/securities-trading"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Securities Trading</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Professional trading services for equities and fixed income securities
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/investment-research"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Investment Research</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Comprehensive market analysis and investment insights
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/private-equity"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Private Equity</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Strategic investments in private companies and growth opportunities
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/strategic-advisory"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Strategic Advisory</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Expert financial advisory services for corporate clients
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/capital-markets"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Capital Markets</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Capital raising and market making services
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/investment-advisory"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Investment Advisory</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Personalized investment advice and portfolio management
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/account-opening"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-cc-gold/10 border border-cc-gold/20"
            >
              <div className="text-sm font-medium leading-none text-cc-navy dark:text-cc-gold">Open Account</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Start your investment journey with our digital account opening
              </p>
            </Link>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default ServicesDropdown;
