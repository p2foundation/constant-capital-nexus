
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const CalculatorsDropdown = () => {
  return (
    <div className="relative z-10">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
              <span className="text-sm font-medium text-cc-navy dark:text-white flex items-center">
                <Calculator className="h-4 w-4 mr-1" />
                Calculators
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[250px]">
                <Link to="/t-bill-calculator" className="flex flex-col p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
                  <div className="font-medium text-cc-navy dark:text-white">T-Bill Calculator</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Calculate returns on treasury bills
                  </div>
                </Link>
                <Link to="/equity-calculator" className="flex flex-col p-3 rounded-md hover:bg-cc-light-blue dark:hover:bg-cc-navy/80">
                  <div className="font-medium text-cc-navy dark:text-white">Equity Calculator</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Calculate stock investment returns
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

export default CalculatorsDropdown;
