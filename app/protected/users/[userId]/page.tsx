'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
  loyaltyPoints?: number;
  activeRentals?: number;
  memberSince?: string;
}

export default function UserProfilePage() {
  const params = useParams();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user && params.userId !== user.userId) {
      // Handle unauthorized access
      console.error('Unauthorized access to user profile');
    }
  }, [user, loading, params.userId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <div>Not authorized</div>;
  }

  const userProfile: UserProfile = {
    id: user.userId,
    name: user.name || 'User',
    email: user.email,
    role: user.role,
    profilePicture: '/default-avatar.png', // Default value since not in user object
    loyaltyPoints: 0, // Default value since not in user object
    activeRentals: 0, // Default value since not in user object
    memberSince: '2023' // Default value since not in user object
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* User Header */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative w-24 h-24">
            <Image
              src={userProfile.profilePicture || '/default-avatar.png'}
              alt={userProfile.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
            <p className="text-gray-600">{userProfile.email}</p>
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {userProfile.role}
            </span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="font-semibold">Loyalty Points</h3>
            <p className="text-2xl text-blue-600">{userProfile.loyaltyPoints}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="font-semibold">Active Rentals</h3>
            <p className="text-2xl text-blue-600">{userProfile.activeRentals}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="font-semibold">Member Since</h3>
            <p className="text-2xl text-blue-600">{userProfile.memberSince}</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href={`/protected/users/${userProfile.id}/rentals`}
            className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center"
          >
            <h3 className="font-semibold">My Rentals</h3>
            <p className="text-sm text-gray-600">View your rental history</p>
          </Link>
          <Link
            href={`/protected/users/${userProfile.id}/favorites`}
            className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center"
          >
            <h3 className="font-semibold">Favorites</h3>
            <p className="text-sm text-gray-600">View your saved vehicles</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
