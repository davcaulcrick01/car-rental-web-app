// app/fleet/fleet-search/page.tsx

'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from '@/components/Layout';
import cars, { Car } from '@/lib/cars';

interface SelectChangeEvent {
  value: string;
}

export default function FleetSearchPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);

  // Get unique brands
  const brands = useMemo(() => {
    return Array.from(new Set(cars.map((car) => car.brand))).sort();
  }, []);

  // Get types based on selected brand
  const types = useMemo(() => {
    const filteredCars = selectedBrand
      ? cars.filter(car => car.brand === selectedBrand)
      : cars;
    return Array.from(new Set(filteredCars.map((car) => car.type))).sort();
  }, [selectedBrand]);

  // Filter cars based on selections
  const handleFilter = () => {
    const filtered = cars.filter((car) => {
      const matchesBrand = !selectedBrand || car.brand === selectedBrand;
      const matchesType = !selectedType || car.type === selectedType;
      return matchesBrand && matchesType;
    });
    setFilteredCars(filtered);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Search Our Fleet</h1>

        {/* Search Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Select
            value={selectedBrand}
            onValueChange={(value: string) => {
              setSelectedBrand(value);
              setSelectedType('');
              handleFilter();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedType}
            onValueChange={(value: string) => {
              setSelectedType(value);
              handleFilter();
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/public/images/cars/${car.category}/${car.image}`}
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
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-400">Brand:</span>
                    <p>{car.brand}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Type:</span>
                    <p>{car.type}</p>
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
            No cars match your search criteria. Please try different filters.
          </p>
        )}
      </div>
    </Layout>
  );
}
