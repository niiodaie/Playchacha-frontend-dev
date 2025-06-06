import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  DollarSign, 
  Trophy, 
  Clock,
  Users,
  Target,
  Zap,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { formatAmount } = useCurrency();

  const stats = [
    {
      title: 'Total Balance',
      value: formatAmount(2450.75),
      icon: DollarSign,
      change: '+12.5%',
      positive: true,
    },
    {
      title: 'Active Bets',
      value: '8',
      icon: Target,
      change: '+2',
      positive: true,
    },
    {
      title: 'Win Rate',
      value: '73.2%',
      icon: Trophy,
      change: '+5.1%',
      positive: true,
    },
    {
      title: 'Total Winnings',
      value: formatAmount(8920.50),
      icon: TrendingUp,
      change: '+18.3%',
      positive: true,
    },
  ];

  const recentBets = [
    {
      id: 1,
      event: 'Manchester United vs Liverpool',
      sport: 'Football',
      amount: formatAmount(100),
      odds: '2.1x',
      status: 'active',
      time: '2h 30m',
    },
    {
      id: 2,
      event: 'Lakers vs Warriors',
      sport: 'Basketball',
      amount: formatAmount(250),
      odds: '1.8x',
      status: 'won',
      time: 'Yesterday',
    },
    {
      id: 3,
      event: 'Djokovic vs Nadal',
      sport: 'Tennis',
      amount: formatAmount(150),
      odds: '2.3x',
      status: 'lost',
      time: '2 days ago',
    },
  ];

  const liveEvents = [
    {
      id: 1,
      teams: 'Chelsea vs Arsenal',
      sport: 'Football',
      time: 'Live',
      odds: '1.9x',
    },
    {
      id: 2,
      teams: 'Celtics vs Heat',
      sport: 'Basketball',
      time: '1h 15m',
      odds: '2.2x',
    },
    {
      id: 3,
      teams: 'Federer vs Murray',
      sport: 'Tennis',
      time: '3h 45m',
      odds: '1.7x',
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container-custom space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your bets today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Bets */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Bets</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBets.map((bet) => (
                    <div key={bet.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-primary font-semibold text-xs">
                            {bet.sport.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium">{bet.event}</h4>
                          <p className="text-sm text-muted-foreground">
                            {bet.amount} • {bet.odds} • {bet.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          bet.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          bet.status === 'won' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {bet.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    View All Bets
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Events */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Live Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liveEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">{event.teams}</h4>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{event.sport}</span>
                          <span className={event.time === 'Live' ? 'text-red-500 font-medium' : ''}>
                            {event.time === 'Live' && (
                              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1 pulse-animation"></span>
                            )}
                            {event.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{event.odds}</span>
                          <Button size="sm" variant="outline">
                            Bet Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button className="w-full">
                    View All Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <DollarSign className="h-6 w-6" />
                <span>Deposit</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span>Withdraw</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>Invite Friends</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Shield className="h-6 w-6" />
                <span>Security</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

