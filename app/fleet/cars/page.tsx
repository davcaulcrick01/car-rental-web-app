// app/fleet/cars/page.tsx
"use client"

import { useState } from 'react';
import CarList from '@/components/CarList';
import CarFilter from '@/components/CarFilter';
import { Car as ImportedCar } from '@/lib/cars';
import cars from '@/lib/cars';

// Make all optional fields required in Car interface
interface Car extends Omit<ImportedCar, 'brand' | 'type'> {
  image: string;
  brand: string;
  type: string;
}

interface FilterOptions {
  brand?: string;
  type?: string;
}

export default function CarsPage() {
  // Cast and validate the imported cars to include required properties
  const carsWithImages = cars.map(car => {
    if (!car.brand || !car.type) {
      throw new Error(`Car ${car.id} is missing required brand or type`);
    }
    return car as Car;
  });
  
  const [filteredCars, setFilteredCars] = useState<Car[]>(carsWithImages);

  const handleFilter = (filters: FilterOptions) => {
    const filtered = carsWithImages.filter((car) =>
      (!filters.brand || car.brand === filters.brand) &&
      (!filters.type || car.type === filters.type)
    );
    setFilteredCars(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center">All Cars</h1>
      <CarFilter onFilter={handleFilter} />
      <CarList cars={filteredCars.map(car => ({
        ...car,
        id: car.id.toString() // Convert number id to string
      }))} />
    </div>
  );
}
