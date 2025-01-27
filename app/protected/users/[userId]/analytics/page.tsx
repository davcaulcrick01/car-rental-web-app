'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  BarChart,
  LineChart,
  PieChart,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AnalyticsData {
  rentalHistory: {
    carType: string;
    location: string;
    date: string;
    cost: number;
  }[];
  loyaltyPoints: {
    earned: number;
    redeemed: number;
    balance: number;
    history: {
      date: string;
      amount: number;
      type: 'earned' | 'redeemed';
    }[];
  };
  totalSpending: number;
  estimatedSavings: number;
}

export default function UserAnalytics() {
  const { userId } = useParams();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/analytics`);
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userId]);

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  if (!analyticsData) {
    return <div>Failed to load analytics data</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Account Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>Total Spending</CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold">
              ${analyticsData.totalSpending.toFixed(2)}
            </h2>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>Estimated Savings</CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold text-green-600">
              ${analyticsData.estimatedSavings.toFixed(2)}
            </h2>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rentals" className="space-y-6">
        <TabsList>
          <TabsTrigger value="rentals">Rental Trends</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Points</TabsTrigger>
        </TabsList>

        <TabsContent value="rentals">
          <div className="grid gap-6">
            <Card>
              <CardHeader>Car Type Preferences</CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {/* Add PieChart configuration */}
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>Rental Locations</CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.rentalHistory}>
                    {/* Add BarChart configuration */}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loyalty">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>Points Earned</CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold">
                    {analyticsData.loyaltyPoints.earned}
                  </h3>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>Points Redeemed</CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold">
                    {analyticsData.loyaltyPoints.redeemed}
                  </h3>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>Current Balance</CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold">
                    {analyticsData.loyaltyPoints.balance}
                  </h3>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>Points History</CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.loyaltyPoints.history}>
                    {/* Add LineChart configuration */}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
