'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Check, AlertTriangle, Star, Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { format, addMonths } from 'date-fns';
import { DateRange } from 'react-day-picker';
import cars, { Car } from '@/lib/cars'; // Import Car type
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [calendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    const carIdParam = searchParams.get('car');
    if (carIdParam) {
      const carId = parseInt(carIdParam, 10);
      const car = cars.find((c) => c.id === carId);
      if (car) {
        setSelectedCar(car);
      }
    }
  }, [searchParams]);

  const handleNextImage = () => {
    if (!selectedCar) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedCar.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    if (!selectedCar) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedCar.images.length - 1 : prevIndex - 1
    );
  };

  if (!selectedCar) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-2xl">Car not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-36">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-white hover:text-gray-300 flex items-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} />
            Back to Fleet
          </Button>
        </div>

        <h2 className="text-4xl font-bold mb-8 text-center">{selectedCar.name} Booking Experience</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Image Gallery */}
          <div className="relative group rounded-lg overflow-hidden">
            <Image
              src={selectedCar.images[currentImageIndex]}
              alt={`Image of ${selectedCar.name}`}
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-500 transform group-hover:scale-105"
              priority
            />
            <button
              aria-label="Previous image"
              className="absolute top-1/2 left-4 p-2 bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={handlePrevImage}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Next image"
              className="absolute top-1/2 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={handleNextImage}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Car Details and Booking */}
          <div className="space-y-6 bg-gray-800 p-6 rounded-lg">
            <div>
              <h3 className="text-3xl font-bold mb-2">{selectedCar.name}</h3>
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">{selectedCar.category}</span>
                <span className="text-gray-400">{selectedCar.year}</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star className="fill-current" size={20} key={i} />
                ))}
              </div>
              <p className="text-3xl font-bold text-green-400 mb-2">${selectedCar.price}/day</p>
              <p className="text-xl text-yellow-400 mb-4">3-Day Special: ${selectedCar.threeDaySpecial}</p>
              <p className="text-gray-300">{selectedCar.description}</p>
            </div>

            {/* Car Specifications */}
            <div className="grid grid-cols-2 gap-4 bg-gray-700 p-4 rounded-lg">
              <div>
                <h4 className="text-lg font-semibold text-blue-300">Transmission</h4>
                <p className="text-gray-300">{selectedCar.transmission}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-300">Engine</h4>
                <p className="text-gray-300">{selectedCar.engine}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-300">Top Speed</h4>
                <p className="text-gray-300">220 mph</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-300">Turbo</h4>
                <p className="text-gray-300">Twin Turbo</p>
              </div>
            </div>

            {/* Date Picker Section */}
            <div className="space-y-4">
              <Button
                onClick={() => setCalendarVisible(!calendarVisible)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
              >
                {calendarVisible ? 'Hide Calendar' : 'Choose Date'}
              </Button>
              {calendarVisible && (
                <div className="bg-gray-700 p-4 rounded-lg transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range: DateRange | undefined) => setDateRange(range)}
                      className="rounded-md border-0"
                    />
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range: DateRange | undefined) => setDateRange(range)}
                      month={addMonths(new Date(), 1)}
                      className="rounded-md border-0"
                    />
                  </div>
                </div>
              )}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-300 mb-2 flex items-center">
                  <CalendarIcon className="mr-2" size={20} />
                  Selected Dates
                </h4>
                {dateRange?.from && dateRange?.to ? (
                  <div className="space-y-2">
                    <p className="text-white">
                      From: <span className="font-semibold">{format(dateRange.from, 'MMMM d, yyyy')}</span>
                    </p>
                    <p className="text-white">
                      To: <span className="font-semibold">{format(dateRange.to, 'MMMM d, yyyy')}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Total days: {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400">Please select a date range for your booking.</p>
                )}
              </div>
            </div>

            {/* Deposit Information */}
            <div className="bg-red-900 p-4 rounded-lg flex items-start space-x-3">
              <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" />
              <p className="text-lg text-red-300">
                <span className="font-semibold">Security Deposit Required:</span> A refundable deposit of $500 is required at the time of booking.
              </p>
            </div>

            {/* Dummy Payment Buttons */}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold transition-colors duration-300">
              Proceed to Payment
            </Button>

            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-300">
              <span>Pay with Stripe</span>
              <Check size={20} />
            </Button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Why Choose Our Luxury Car Rental?</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>24/7 Roadside Assistance</li>
            <li>Flexible Pick-up and Drop-off Locations</li>
            <li>No Hidden Fees</li>
            <li>Thoroughly Sanitized Vehicles</li>
            <li>Experienced and Professional Staff</li>
          </ul>
        </div>

        {/* Customer Reviews */}
        <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">What Our Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-300 italic">"An unforgettable experience! The car was in pristine condition and the service was top-notch."</p>
              <p className="text-right text-gray-400 mt-2">- John D.</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-300 italic">"Smooth booking process and the car exceeded my expectations. Will definitely rent again!"</p>
              <p className="text-right text-gray-400 mt-2">- Sarah M.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
