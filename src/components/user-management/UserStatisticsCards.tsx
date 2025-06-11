
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface UserStatistics {
  total_users: number;
  pending_activations: number;
  activated_users: number;
}

interface UserStatisticsCardsProps {
  userStats: UserStatistics;
}

const UserStatisticsCards: React.FC<UserStatisticsCardsProps> = ({ userStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold text-blue-600">{userStats.total_users}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">Pending Activations</p>
              <p className="text-2xl font-bold text-yellow-600">{userStats.pending_activations}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-sm font-medium">Activated Users</p>
              <p className="text-2xl font-bold text-green-600">{userStats.activated_users}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStatisticsCards;
