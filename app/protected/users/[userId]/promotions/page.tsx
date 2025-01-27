'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Promotion {
  id: string;
  code: string;
  description: string;
  discountPercentage: number;
  expiryDate: string;
  isRedeemed: boolean;
}

export default function PromotionsPage() {
  const { userId } = useParams();
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    fetchPromotions();
  }, [userId]);

  const fetchPromotions = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/promotions`);
      if (!response.ok) throw new Error('Failed to fetch promotions');
      const data = await response.json();
      setPromotions(data);
    } catch (err) {
      setError('Failed to load promotions');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPromotion = async (promotionId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/promotions/${promotionId}/redeem`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to apply promotion');
      
      // Refresh promotions list
      fetchPromotions();
    } catch (err) {
      setError('Failed to apply promotion');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  const activePromotions = promotions.filter(p => !p.isRedeemed && new Date(p.expiryDate) > new Date());
  const pastPromotions = promotions.filter(p => p.isRedeemed || new Date(p.expiryDate) <= new Date());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Promotions</h1>
      
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-4">
          <button
            className={`pb-2 px-1 ${activeTab === 'active' ? 'border-b-2 border-primary font-semibold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('active')}
          >
            Active Promotions
          </button>
          <button
            className={`pb-2 px-1 ${activeTab === 'past' ? 'border-b-2 border-primary font-semibold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('past')}
          >
            Past Promotions
          </button>
        </div>
      </div>

      {activeTab === 'active' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activePromotions.map(promotion => (
            <div key={promotion.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{promotion.code}</h3>
              <p className="text-gray-600 my-2">{promotion.description}</p>
              <p className="text-green-600 font-bold">{promotion.discountPercentage}% OFF</p>
              <p className="text-sm text-gray-500">
                Expires: {new Date(promotion.expiryDate).toLocaleDateString()}
              </p>
              <Button 
                className="mt-4 w-full"
                onClick={() => handleApplyPromotion(promotion.id)}
              >
                Apply Promotion
              </Button>
            </div>
          ))}
          {activePromotions.length === 0 && (
            <p className="text-gray-500">No active promotions available</p>
          )}
        </div>
      )}

      {activeTab === 'past' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pastPromotions.map(promotion => (
            <div key={promotion.id} className="bg-white p-4 rounded-lg shadow opacity-70">
              <h3 className="text-lg font-semibold">{promotion.code}</h3>
              <p className="text-gray-600 my-2">{promotion.description}</p>
              <p className="text-gray-600">{promotion.discountPercentage}% OFF</p>
              <p className="text-sm text-gray-500">
                {promotion.isRedeemed ? 'Redeemed' : `Expired: ${new Date(promotion.expiryDate).toLocaleDateString()}`}
              </p>
            </div>
          ))}
          {pastPromotions.length === 0 && (
            <p className="text-gray-500">No past promotions</p>
          )}
        </div>
      )}
    </div>
  );
}
