
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const CalculatorsDropdown = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-cc-navy dark:text-white hover:text-cc-blue dark:hover:text-cc-gold">
        <Calculator className="h-4 w-4 mr-1" />
        Calculators
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <li className="row-span-2">
            <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-cc-navy/50 to-cc-blue p-6 no-underline outline-none focus:shadow-md">
              <div className="mb-2 mt-4 text-lg font-medium text-white">
                Financial Calculators
              </div>
              <p className="text-sm leading-tight text-gray-200">
                Calculate returns and analyze investment opportunities.
              </p>
            </div>
          </li>
          <li>
            <Link
              to="/t-bill-calculator"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">T-Bill Calculator</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Calculate returns on treasury bills and government securities
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/equity-calculator"
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="text-sm font-medium leading-none">Equity Calculator</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                Calculate stock investment returns and analyze equity performance
              </p>
            </Link>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default CalculatorsDropdown;
