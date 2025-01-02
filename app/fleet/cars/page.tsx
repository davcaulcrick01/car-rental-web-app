// app/fleet/cars/page.tsx
"use client"

import { useState } from 'react';
import CarList from '@/components/CarList';
import CarFilter from '@/components/CarFilter';
import cars from '@/lib/cars'; // Array of car data (defined below)

export default function CarsPage() {
  const [filteredCars, setFilteredCars] = useState(cars);

  const handleFilter = (filters) => {
    const filtered = cars.filter((car) =>
      (!filters.brand || car.brand === filters.brand) &&
      (!filters.type || car.type === filters.type)
    );
    setFilteredCars(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center">All Cars</h1>
      <CarFilter onFilter={handleFilter} />
      <CarList cars={filteredCars} />
    </div>
  );
}
