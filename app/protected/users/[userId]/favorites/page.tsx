'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaTrash } from 'react-icons/fa';

interface FavoriteCar {
  id: string;
  make: string;
  model: string;
  year: number;
  imageUrl: string;
  pricePerDay: number;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/favorites');
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (carId: string) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/favorites/${carId}`, {
        method: 'DELETE',
      });
      setFavorites(favorites.filter(car => car.id !== carId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Favorite Cars</h1>
      
      {favorites.length === 0 ? (
        <p className="text-gray-500">You haven't saved any cars to your favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={car.imageUrl}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">
                  {car.year} {car.make} {car.model}
                </h2>
                <p className="text-gray-600 mt-2">${car.pricePerDay} per day</p>
                <div className="flex justify-between mt-4">
                  <Link
                    href={`/cars/${car.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => removeFavorite(car.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Remove from favorites"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
