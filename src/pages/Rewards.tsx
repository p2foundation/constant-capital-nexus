import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { RewardDashboard } from '@/components/rewards/RewardDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Rewards = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Trophy className="h-6 w-6 text-primary" />
                  Rewards Center
                </CardTitle>
                <CardDescription>
                  Please sign in to view your rewards and achievements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Join our platform to start earning points for your activities and redeem exciting rewards!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Rewards Center
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Earn points by engaging with our platform and redeem them for exclusive benefits
              </p>
            </div>
          </div>

          {/* Reward Dashboard */}
          <RewardDashboard />
        </div>
      </div>
    </div>
  );
};

export default Rewards;