interface RewardTier {
    name: string;
    minimumPoints: number;
    benefits: string[];
}

interface Reward {
    id: string;
    name: string;
    description: string;
    pointsCost: number;
    available: boolean;
}

interface RewardsData {
    currentPoints: number;
    tierProgress: number;
    nextTier: string;
    pointsToNextTier: number;
    availableRewards: Reward[];
}

const REWARD_TIERS: RewardTier[] = [
    {
        name: 'Bronze',
        minimumPoints: 0,
        benefits: ['Basic rewards catalog access']
    },
    {
        name: 'Silver',
        minimumPoints: 1000,
        benefits: ['5% bonus points', 'Priority customer service']
    },
    {
        name: 'Gold',
        minimumPoints: 5000,
        benefits: ['10% bonus points', 'Free upgrades', 'Dedicated support line']
    },
    {
        name: 'Platinum',
        minimumPoints: 10000,
        benefits: ['15% bonus points', 'Guaranteed upgrades', 'Airport pickup']
    }
];

const calculateTierProgress = (points: number): {
    currentTier: RewardTier,
    nextTier: RewardTier | null,
    progress: number
} => {
    let currentTier = REWARD_TIERS[0];
    let nextTier: RewardTier | null = null;

    for (let i = REWARD_TIERS.length - 1; i >= 0; i--) {
        if (points >= REWARD_TIERS[i].minimumPoints) {
            currentTier = REWARD_TIERS[i];
            nextTier = REWARD_TIERS[i + 1] || null;
            break;
        }
    }

    const progress = nextTier ?
        ((points - currentTier.minimumPoints) / (nextTier.minimumPoints - currentTier.minimumPoints)) * 100 :
        100;

    return {
        currentTier,
        nextTier,
        progress: Math.min(Math.max(progress, 0), 100)
    };
};

export const getRewardsData = async (userId: string): Promise<RewardsData> => {
    const response = await fetch(`/api/users/${userId}/rewards`);
    if (!response.ok) {
        throw new Error('Failed to fetch rewards data');
    }
    const data = await response.json();

    const { currentTier, nextTier, progress } = calculateTierProgress(data.points);

    return {
        currentPoints: data.points,
        tierProgress: progress,
        nextTier: nextTier?.name || 'Maximum Tier Reached',
        pointsToNextTier: nextTier ? nextTier.minimumPoints - data.points : 0,
        availableRewards: data.availableRewards
    };
};

export const redeemReward = async (userId: string, rewardId: string): Promise<void> => {
    const response = await fetch(`/api/users/${userId}/rewards/redeem`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rewardId })
    });

    if (!response.ok) {
        throw new Error('Failed to redeem reward');
    }
};
