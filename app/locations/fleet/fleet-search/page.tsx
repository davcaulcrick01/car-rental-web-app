// app/fleet/fleet-search/page.tsx

'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import cars from '@/lib/cars';

export default function FleetSearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  // Get unique brands
  const brands = useMemo(() => 
    Array.from(new Set(cars.map((car) => car.brand))).sort(),
    []
  );

  // Get makes based on selected brand
  const makes = useMemo(() => {
    const filteredCars = selectedBrand 
      ? cars.filter(car => car.brand === selectedBrand)
      : cars;
    return Array.from(new Set(filteredCars.map((car) => car.make))).sort();
  }, [selectedBrand]);

  // Get models based on selected brand and make
  const models = useMemo(() => {
    let filteredCars = cars;
    if (selectedBrand) {
      filteredCars = filteredCars.filter(car => car.brand === selectedBrand);
    }
    if (selectedMake) {
      filteredCars = filteredCars.filter(car => car.make === selectedMake);
    }
    return Array.from(new Set(filteredCars.map((car) => car.model))).sort();
  }, [selectedBrand, selectedMake]);

  // Reset dependent filters when parent filter changes
  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    setSelectedMake('');
    setSelectedModel('');
  };

  const handleMakeChange = (value: string) => {
    setSelectedMake(value);
    setSelectedModel('');
  };

  // Rest of the filters remain the same
  const classes = useMemo(() => 
    Array.from(new Set(cars.map((car) => car.class))).sort(),
    []
  );
  const fuels = useMemo(() => 
    Array.from(new Set(cars.map((car) => car.fuel))).sort(),
    []
  );
  const transmissions = useMemo(() => 
    Array.from(new Set(cars.map((car) => car.transmission))).sort(),
    []
  );
  const capacities = useMemo(() => 
    Array.from(new Set(cars.map((car) => car.capacity))).sort(),
    []
  );

  // Filter cars based on all criteria
  const filteredCars = cars.filter((car) => {
    const matchesSearchTerm = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand ? car.brand === selectedBrand : true;
    const matchesMake = selectedMake ? car.make === selectedMake : true;
    const matchesModel = selectedModel ? car.model === selectedModel : true;
    const matchesClass = selectedClass ? car.class === selectedClass : true;
    const matchesFuel = selectedFuel ? car.fuel === selectedFuel : true;
    const matchesTransmission = selectedTransmission ? car.transmission === selectedTransmission : true;
    const matchesCapacity = selectedCapacity ? car.capacity === Number(selectedCapacity) : true;

    return (
      matchesSearchTerm &&
      matchesBrand &&
      matchesMake &&
      matchesModel &&
      matchesClass &&
      matchesFuel &&
      matchesTransmission &&
      matchesCapacity
    );
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link
            href="/fleet"
            className="inline-flex items-center text-green-600 hover:text-green-500 mb-8"
          >
            <ChevronLeft className="mr-2" /> Back to Fleet
          </Link>

          <h1 className="text-4xl font-bold mb-8">Search Our Fleet</h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="md:w-1/4">
              <div className="bg-gray-900 p-4 rounded-lg sticky top-24">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                {/* Search Input */}
                <Input
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4"
                />

                {/* Brand Filter */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="brand-select">
                    Brand
                  </label>
                  <select
                    id="brand-select"
                    value={selectedBrand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="bg-black border border-gray-700 text-white p-2 rounded w-full"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Make Filter */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="make-select">
                    Make
                  </label>
                  <select
                    id="make-select"
                    value={selectedMake}
                    onChange={(e) => handleMakeChange(e.target.value)}
                    className="bg-black border border-gray-700 text-white p-2 rounded w-full"
                  >
                    <option value="">All Makes</option>
                    {makes.map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Model Filter */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="model-select">
                    Model
                  </label>
                  <select
                    id="model-select"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="bg-black border border-gray-700 text-white p-2 rounded w-full"
                  >
                    <option value="">All Models</option>
                    {models.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Class Filter */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="class-select">
                    Class
                  </label>
                  <select
                    id="class-select"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="bg-black border border-gray-700 text-white p-2 rounded w-full"
                  >
                    <option value="">All Classes</option>
                    {classes.map((carClass) => (
                      <option key={carClass} value={carClass}>
                        {carClass}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fuel Type Filter */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="fuel-select">
                    Fuel Type
                  </label>
                  <select
                    id="fuel-select"
                    value={selectedFuel}
                    onChange={(e) => setSelectedFuel(e.target.value)}
                    className="bg-black border border-gray-700 text-white p-2 rounded w-full"
                  >
                    <option value="">All Fuel Types</option>
                    {fuels.map((fuel) => (
                      <option key={fuel} value={fuel}>
                        {fuel}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Transmission Filter */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="transmission-select">
                    Transmission
                  </label>
                  <select
                    id="transmission-select"
                    value={selectedTransmission}
                    onChange={(e) => setSelectedTransmission(e.target.value)}
                    className="bg-black border border-gray-700 text-white p-2 rounded w-full"
                  >
                    <option value="">All Transmissions</option>
                    {transmissions.map((transmission) => (
                      <option key={transmission} value={transmission}>
                        {transmission}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Capacity Filter */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2" htmlFor="capacity-select">
                    Capacity
                  </label>
                  <select
                    id="capacity-select"
                    value={selectedCapacity}
                    onChange={(e) => setSelectedCapacity(e.target.value)}
                    className="bg-black border border-gray-700 text-white p-2 rounded w-full"
                  >
                    <option value="">All Capacities</option>
                    {capacities.map((capacity) => (
                      <option key={capacity} value={capacity}>
                        {capacity} Passengers
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reset Filters Button */}
                <Button
                  onClick={() => {
                    setSelectedBrand('');
                    setSelectedMake('');
                    setSelectedModel('');
                    setSelectedClass('');
                    setSelectedFuel('');
                    setSelectedTransmission('');
                    setSelectedCapacity('');
                    setSearchTerm('');
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Reset Filters
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCars.map((car) => (
                    <div
                      key={car.id}
                      className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <Image
                        src={car.image}
                        alt={car.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h2 className="text-xl font-bold mb-2">{car.name}</h2>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-400 mb-4">
                          <span>{car.brand}</span>
                          <span>{car.make}</span>
                          <span>{car.model}</span>
                          <span>{car.class}</span>
                          <span>{car.fuel}</span>
                          <span>{car.transmission}</span>
                          <span>{car.capacity} Passengers</span>
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                          Call for Pricing
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center mt-16">
                  <p className="text-xl">No cars match your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
