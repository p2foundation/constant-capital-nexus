import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRewardSystem } from '@/hooks/useRewardSystem';
import { 
  Trophy, 
  Star, 
  Gift, 
  TrendingUp, 
  Calendar, 
  Award,
  Sparkles,
  Crown,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const RewardDashboard = () => {
  const { userReward, recentTransactions, achievements, isLoading, getTierProgress } = useRewardSystem();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!userReward) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Reward System
          </CardTitle>
          <CardDescription>
            Start earning points by engaging with our platform!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Complete your profile, use our tools, and engage with our research to start earning rewards.
          </p>
        </CardContent>
      </Card>
    );
  }

  const tierProgress = getTierProgress();
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'text-amber-600';
      case 'Silver': return 'text-slate-500';
      case 'Gold': return 'text-yellow-500';
      case 'Platinum': return 'text-purple-500';
      default: return 'text-muted-foreground';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Bronze': return Trophy;
      case 'Silver': return Star;
      case 'Gold': return Award;
      case 'Platinum': return Crown;
      default: return Trophy;
    }
  };

  const TierIcon = getTierIcon(userReward.tier_level);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              Available Points
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-primary">
              {userReward.available_points.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Total earned: {userReward.total_points.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TierIcon className={cn("h-5 w-5", getTierColor(userReward.tier_level))} />
              {userReward.tier_level} Tier
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {tierProgress && tierProgress.next ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to {tierProgress.next}</span>
                  <span>{Math.round(tierProgress.progress)}%</span>
                </div>
                <Progress value={tierProgress.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {tierProgress.pointsToNext.toLocaleString()} points to go
                </p>
              </div>
            ) : (
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">
                  Maximum Tier Reached
                </Badge>
                <p className="text-sm text-muted-foreground">
                  You've achieved the highest tier!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-full" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Flame className="h-5 w-5 text-destructive" />
              Streak
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold text-destructive">
              {userReward.streak_days}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {userReward.streak_days === 1 ? 'day' : 'days'} in a row
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed View */}
      <Tabs defaultValue="achievements" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="redeem">Redeem</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Your Achievements
              </CardTitle>
              <CardDescription>
                Badges you've unlocked for your activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {achievements.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-4 border rounded-lg space-y-2 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <Badge variant="outline">
                          {achievement.achievement_type}
                        </Badge>
                      </div>
                      <h4 className="font-semibold">{achievement.achievement_name}</h4>
                      {achievement.description && (
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-primary font-medium">
                          +{achievement.points_awarded} points
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(achievement.unlocked_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No achievements unlocked yet. Start engaging with the platform to earn your first badges!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest point transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentTransactions.length > 0 ? (
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          transaction.transaction_type === 'earned' ? 'bg-green-500' :
                          transaction.transaction_type === 'redeemed' ? 'bg-red-500' :
                          'bg-blue-500'
                        )} />
                        <div>
                          <p className="font-medium">
                            {transaction.activity_type.replace('_', ' ').toUpperCase()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className={cn(
                        "font-semibold",
                        transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                      )}>
                        {transaction.points > 0 ? '+' : ''}{transaction.points}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No transactions yet. Start using the platform to earn points!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="redeem" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Redeem Rewards
              </CardTitle>
              <CardDescription>
                Use your points to unlock exclusive benefits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Digital Rewards */}
                <RewardCard
                  title="Premium Research Access"
                  description="Get 1 month of premium research reports"
                  points={2000}
                  category="digital"
                  available={userReward.available_points >= 2000}
                />
                <RewardCard
                  title="Advanced Calculator Features"
                  description="Unlock advanced financial calculator tools"
                  points={1500}
                  category="digital"
                  available={userReward.available_points >= 1500}
                />
                <RewardCard
                  title="Priority Ako Chat"
                  description="Get priority responses from our AI assistant"
                  points={1000}
                  category="digital"
                  available={userReward.available_points >= 1000}
                />
                
                {/* Experience Rewards */}
                <RewardCard
                  title="Free Consultation"
                  description="30-minute consultation with our experts"
                  points={4000}
                  category="consultation"
                  available={userReward.available_points >= 4000}
                />
                <RewardCard
                  title="Exclusive Webinar Access"
                  description="Join our premium investment webinars"
                  points={1800}
                  category="experience"
                  available={userReward.available_points >= 1800}
                />
                
                {/* Investment Benefits */}
                <RewardCard
                  title="Reduced Brokerage Fees"
                  description="One free transaction with reduced fees"
                  points={3000}
                  category="investment"
                  available={userReward.available_points >= 3000}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface RewardCardProps {
  title: string;
  description: string;
  points: number;
  category: 'digital' | 'physical' | 'experience' | 'investment' | 'consultation';
  available: boolean;
}

const RewardCard = ({ title, description, points, category, available }: RewardCardProps) => {
  const { redeemPoints } = useRewardSystem();

  const handleRedeem = () => {
    if (available) {
      redeemPoints(title, points, category);
    }
  };

  return (
    <div className={cn(
      "p-4 border rounded-lg space-y-3 transition-all duration-200",
      available ? "hover:shadow-md hover:border-primary/50" : "opacity-60"
    )}>
      <div className="space-y-2">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-xs">
          {category}
        </Badge>
        <span className="font-semibold text-primary">{points.toLocaleString()} pts</span>
      </div>
      <Button 
        onClick={handleRedeem}
        disabled={!available}
        className="w-full"
        size="sm"
      >
        {available ? 'Redeem' : 'Insufficient Points'}
      </Button>
    </div>
  );
};