// app/fleet/cars/page.tsx
"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Layout from '@/components/Layout'
import cars, { Car } from '@/lib/cars'
import { fleetCategories } from '@/lib/constants'

interface FilterOptions {
  brand?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}

export default function FleetCarsPage() {
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);

  const handleFilter = (filters: FilterOptions) => {
    const filtered = cars.filter((car) =>
      (!filters.brand || car.brand === filters.brand) &&
      (!filters.type || car.type === filters.type) &&
      (!filters.category || car.category === filters.category) &&
      (!filters.minPrice || car.price >= filters.minPrice) &&
      (!filters.maxPrice || car.price <= filters.maxPrice)
    );
    setFilteredCars(filtered);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Our Fleet</h1>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {fleetCategories.map((category) => (
            <Link key={category.name} href={category.link}>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-green-600 hover:text-white transition-colors"
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={car.images[0]}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-green-400 text-lg">${car.price}/day</span>
                  <span className="text-gray-400">{car.category}</span>
                </div>
                <p className="text-gray-400 mb-4">{car.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-400">Brand:</span>
                    <p>{car.brand}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Type:</span>
                    <p>{car.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Engine:</span>
                    <p>{car.engine}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Transmission:</span>
                    <p>{car.transmission}</p>
                  </div>
                </div>
                <Link href={`/booking?car=${car.id}`}>
                  <Button className="w-full">
                    Book Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <p className="text-center text-gray-400">
            No cars match your filter criteria. Please try different filters.
          </p>
        )}
      </div>
    </Layout>
  )
}
