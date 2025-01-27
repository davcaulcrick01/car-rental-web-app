'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Rental {
  id: string;
  carId: string;
  carMake: string;
  carModel: string;
  carYear: number;
  imageUrl: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'active' | 'upcoming' | 'completed';
}

export default function RentalsPage() {
  const { userId } = useParams();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch(`/api/users/${userId}/rentals`);
        const data = await response.json();
        setRentals(data);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentals();
  }, [userId]);

  const handleCancelRental = async (rentalId: string) => {
    try {
      await fetch(`/api/rentals/${rentalId}`, {
        method: 'DELETE',
      });
      setRentals(rentals.filter(rental => rental.id !== rentalId));
    } catch (error) {
      console.error('Error canceling rental:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Rentals</h1>

      {rentals.length === 0 ? (
        <p className="text-gray-500">You don't have any rentals yet.</p>
      ) : (
        <div className="space-y-6">
          {rentals.map((rental) => (
            <div key={rental.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-64 h-48">
                  <Image
                    src={rental.imageUrl}
                    alt={`${rental.carMake} ${rental.carModel}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-semibold">
                    {rental.carYear} {rental.carMake} {rental.carModel}
                  </h2>
                  <div className="mt-2 space-y-2 text-gray-600">
                    <p>Start Date: {new Date(rental.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(rental.endDate).toLocaleDateString()}</p>
                    <p>Total Price: ${rental.totalPrice}</p>
                    <p className="capitalize">Status: {rental.status}</p>
                  </div>
                  <div className="mt-4 space-x-4">
                    <Link
                      href={`/rentals/${rental.id}`}
                      className="inline-block text-blue-600 hover:text-blue-800"
                    >
                      View Details
                    </Link>
                    {rental.status === 'upcoming' && (
                      <Button
                        onClick={() => handleCancelRental(rental.id)}
                        variant="destructive"
                      >
                        Cancel Rental
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
