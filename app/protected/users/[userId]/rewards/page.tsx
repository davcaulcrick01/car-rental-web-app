'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { getRewardsData } from '@/lib/api/rewards';

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
}

interface RewardsData {
  currentPoints: number;
  tierProgress: number;
  nextTier: string;
  pointsToNextTier: number;
  availableRewards: Reward[];
}

export default function RewardsPage({ params }: { params: { userId: string } }) {
  const [rewards, setRewards] = useState<RewardsData>({
    currentPoints: 0,
    tierProgress: 0,
    nextTier: '',
    pointsToNextTier: 0,
    availableRewards: []
  });

  useEffect(() => {
    const loadRewardsData = async () => {
      const data = await getRewardsData(params.userId);
      setRewards(data);
    };
    loadRewardsData();
  }, [params.userId]);

  const handleRedemption = async (rewardId: string) => {
    // TODO: Implement reward redemption logic
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Rewards</h1>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Points Balance</h2>
        <div className="text-4xl font-bold text-primary">
          {rewards.currentPoints} points
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Tier Progress</h2>
        <Progress 
          value={rewards.tierProgress} 
          max={100}
          label={`${rewards.pointsToNextTier} points to ${rewards.nextTier}`}
        />
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Available Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.availableRewards.map((reward) => (
            <Card key={reward.id} className="p-4">
              <h3 className="font-semibold">{reward.name}</h3>
              <p className="text-gray-600">{reward.description}</p>
              <p className="font-medium mt-2">{reward.pointsCost} points</p>
              <Button
                onClick={() => handleRedemption(reward.id)}
                disabled={rewards.currentPoints < reward.pointsCost}
                className="mt-3"
              >
                Redeem
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
