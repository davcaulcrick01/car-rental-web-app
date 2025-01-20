// app/fleet/fleet-search/page.tsx

'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import cars, { Car } from '@/lib/cars';

export default function FleetSearchPage() {
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [sortBy, setSortBy] = useState('price-low');
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;

  // Memoized filter options
  const brands = useMemo(() => 
    Array.from(new Set(cars.map(car => car.brand)))
      .filter((brand): brand is string => typeof brand === 'string')
      .sort(),
    []
  );

  const types = useMemo(() => {
    const filteredCars = selectedBrand
      ? cars.filter(car => car.brand === selectedBrand)
      : cars;
    return Array.from(new Set(filteredCars.map(car => car.type)))
      .filter((type): type is string => typeof type === 'string')
      .sort();
  }, [selectedBrand]);

  const years = useMemo(() => 
    Array.from(new Set(cars.map(car => car.year.toString())))
      .sort((a, b) => parseInt(b) - parseInt(a)),
    []
  );

  const transmissions = useMemo(() => 
    Array.from(new Set(cars.map(car => car.transmission)))
      .filter((trans): trans is string => typeof trans === 'string')
      .sort(),
    []
  );

  const categories = useMemo(() => 
    Array.from(new Set(cars.map(car => car.category)))
      .filter((cat): cat is string => typeof cat === 'string')
      .sort(),
    []
  );

  // Filter cars based on all criteria
  const handleFilter = () => {
    let filtered = cars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = !selectedBrand || car.brand === selectedBrand;
      const matchesType = !selectedType || car.type === selectedType;
      const matchesYear = !selectedYear || car.year.toString() === selectedYear;
      const matchesTransmission = !selectedTransmission || car.transmission === selectedTransmission;
      const matchesCategory = !selectedCategory || car.category === selectedCategory;
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      
      return matchesSearch && matchesBrand && matchesType && matchesYear && 
             matchesTransmission && matchesCategory && matchesPrice;
    });

    // Sort filtered cars
    filtered = sortCars(filtered, sortBy);
    setFilteredCars(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Sort cars based on selected criteria
  const sortCars = (carsToSort: Car[], sortCriteria: string) => {
    return [...carsToSort].sort((a, b) => {
      switch (sortCriteria) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'year-new':
          return b.year - a.year;
        case 'year-old':
          return a.year - b.year;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedType('');
    setSelectedYear('');
    setSelectedTransmission('');
    setSelectedCategory('');
    setPriceRange([0, 5000]);
    setSortBy('price-low');
    setCurrentPage(1);
    setFilteredCars(cars);
  };

  // Pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  // Update filters when any criteria changes
  useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedBrand, selectedType, selectedYear, selectedTransmission, 
      selectedCategory, priceRange, sortBy]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Link href="/fleet" className="inline-flex items-center text-green-600 hover:text-green-500 mb-8">
            <ChevronLeft className="mr-2" /> Back to Fleet
          </Link>

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Search Our Fleet</h1>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="year-new">Year: Newest First</SelectItem>
                  <SelectItem value="year-old">Year: Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={resetFilters} variant="outline" className="gap-2">
                <X className="h-4 w-4" /> Reset Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
                <div className="space-y-6">
                  {/* Search Input */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search</label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search cars..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Brand</label>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Brands</SelectItem>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        {types.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Year Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Year</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Years</SelectItem>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="text-sm font-medium mb-4 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      min={0}
                      max={5000}
                      step={100}
                      value={priceRange}
                      onChange={setPriceRange}
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Transmission Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Transmission</label>
                    <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Transmissions</SelectItem>
                        {transmissions.map((transmission) => (
                          <SelectItem key={transmission} value={transmission}>{transmission}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentCars.map((car) => (
                  <div key={car.id} className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={car.images[0]}
                        alt={car.name}
                        width={600}
                        height={400}
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
                        <div>
                          <span className="text-gray-400">Year:</span>
                          <p>{car.year}</p>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      variant={currentPage === page ? "default" : "outline"}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {filteredCars.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">
                    No cars match your search criteria. Please try different filters.
                  </p>
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
