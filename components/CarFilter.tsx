// components/CarFilter.tsx
import React, { useState } from 'react';

interface FilterValues {
  brand: string;
  type: string;
}

interface CarFilterProps {
  onFilter: (filters: FilterValues) => void;
}

export default function CarFilter({ onFilter }: CarFilterProps) {
  const [filters, setFilters] = useState<FilterValues>({ brand: '', type: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="flex-1">
        <label htmlFor="brand" className="block text-sm font-medium text-gray-300 mb-2">
          Brand
        </label>
        <select
          id="brand"
          name="brand"
          value={filters.brand}
          onChange={handleInputChange}
          className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Brands</option>
          <option value="Rolls-Royce">Rolls-Royce</option>
          <option value="Bentley">Bentley</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Lamborghini">Lamborghini</option>
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={filters.type}
          onChange={handleInputChange}
          className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Sports">Sports</option>
          <option value="Luxury">Luxury</option>
        </select>
      </div>
    </div>
  );
}
