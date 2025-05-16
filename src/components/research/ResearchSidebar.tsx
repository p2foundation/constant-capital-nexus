
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { LogIn, Download } from 'lucide-react';

const ResearchSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Research Access</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Log in to access our premium research reports and market insights. For clients with investment accounts.
          </p>
          <Button asChild className="w-full">
            <Link to="/login" className="flex items-center justify-center">
              <LogIn className="h-4 w-4 mr-2" />
              Log In to Access
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Research Publications</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Weekly Market Review</span>
              <Button size="sm" variant="outline">
                <Download className="h-3 w-3 mr-1" /> Sample
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Monthly Economic Update</span>
              <Button size="sm" variant="outline">
                <Download className="h-3 w-3 mr-1" /> Sample
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Quarterly Outlook</span>
              <Button size="sm" variant="outline">
                <Download className="h-3 w-3 mr-1" /> Sample
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium text-lg mb-4">Subscribe to Updates</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Stay informed with our latest research reports and market insights delivered to your inbox.
          </p>
          <form className="space-y-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Button className="w-full">Subscribe</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchSidebar;
