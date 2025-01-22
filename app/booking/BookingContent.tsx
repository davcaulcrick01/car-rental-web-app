'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from '@/components/Footer'; // Import the Footer component
import cars, { Car } from '@/lib/cars';

interface BookingContentProps {
  selectedCar?: Car | null; // Allow passing the selected car as a prop (optional)
}

export default function BookingContent({ selectedCar: initialSelectedCar }: BookingContentProps) {
  const searchParams = useSearchParams();
  const [selectedCar, setSelectedCar] = useState<Car | null>(initialSelectedCar || null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If no car is passed as a prop, fetch from the URL search params
    if (!initialSelectedCar) {
      const carParam = searchParams.get('car');
      if (carParam) {
        const carId = parseInt(carParam, 10);
        const car = cars.find((c) => c.id === carId);
        if (car) {
          setSelectedCar(car);
        }
      }
    }
  }, [initialSelectedCar, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add booking logic here
      console.log('Booking:', { selectedCar, startDate, endDate });
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedCar) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-400">
          No vehicle selected. Please select a vehicle from our fleet.
        </p>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Book Your Vehicle</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Details */}
          <div>
            <div className="relative h-64 rounded-lg overflow-hidden mb-4">
              <Image
                src={selectedCar.images[0]}
                alt={selectedCar.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedCar.name}</h2>
            <p className="text-green-400 text-xl mb-4">${selectedCar.price}/day</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Engine:</span>
                <p>{selectedCar.engine}</p>
              </div>
              <div>
                <span className="text-gray-400">Transmission:</span>
                <p>{selectedCar.transmission}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // Prevent past dates
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]} // Prevent end date before start date
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Book Now'}
            </Button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
