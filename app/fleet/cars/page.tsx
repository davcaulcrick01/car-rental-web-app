"use client"

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import CarList from '@/components/CarList';
import CarFilter from '@/components/CarFilter';
import cars from '@/lib/cars'; // Array of car data

export default function CarsPage() {
  const fleetCategories = [
    { name: "Sedans", path: "/fleet/cars/sedan" },
    { name: "SUVs", path: "/fleet/cars/suv" },
    { name: "Luxury", path: "/fleet/cars/luxury" },
    { name: "Exotic", path: "/fleet/cars/exotic" },
    { name: "Super Cars", path: "/fleet/cars/super" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Explore Our Fleet</h1>

      {/* Fleet Categories Navigation */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6 text-center">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fleetCategories.map((category) => (
            <Link key={category.name} href={category.path}>
              <a className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition">
                <span className="text-xl font-bold">{category.name}</span>
                <ChevronRight className="text-gray-500" />
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* All Cars Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6 text-center">All Cars</h2>
        <div>
          <CarFilter />
          <CarList cars={cars} />
        </div>
      </section>
    </div>
  );
}
