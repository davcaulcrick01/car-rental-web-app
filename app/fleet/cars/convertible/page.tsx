'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import cars from '@/lib/cars';
import { fleetCategories } from '@/app/fleet/page';

// Base bucket path for images
const BASE_PATH = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars`;

// Filter for convertible cars
const convertibleCars = cars.filter((car) => car.category === 'convertible');

// Brand logos for convertible cars
const brandLogos = [
  { name: 'BMW', logo: `${BASE_PATH}/bmw/bmw-logo.png` },
  { name: 'Mercedes', logo: `${BASE_PATH}/mercedes/mercedes-logo.png` },
  { name: 'Porsche', logo: `${BASE_PATH}/porsche/porsche-logo.png` },
  { name: 'Audi', logo: `${BASE_PATH}/audi/audi-logo.png` },
  { name: 'Chevrolet', logo: `${BASE_PATH}/chevrolet/chevrolet-logo.png` },
];

// FAQs for the convertible car page
const faqItems = [
  {
    question: "What's special about convertible cars?",
    answer: "Convertible cars offer an open-air driving experience, allowing you to enjoy the sunshine and breeze.",
  },
  {
    question: "Can I rent a convertible in winter?",
    answer: "Yes! Many modern convertibles have excellent heating systems and features for comfortable top-down driving.",
  },
  {
    question: "Are convertibles safe?",
    answer: "Modern convertibles include safety features such as reinforced frames and pop-up roll bars.",
  },
];

// Car gallery images
const carGallery = [
  `${BASE_PATH}/gallery/convertible-gallery-1.jpg`,
  `${BASE_PATH}/gallery/convertible-gallery-2.jpg`,
  `${BASE_PATH}/gallery/convertible-gallery-3.jpg`,
  `${BASE_PATH}/gallery/convertible-gallery-4.jpg`,
];

// Experience categories
const experienceCategories = [
  { name: 'Coastal Drives', image: `${BASE_PATH}/experiences/coastal-drives.jpg` },
  { name: 'City Cruising', image: `${BASE_PATH}/experiences/city-cruising.jpg` },
  { name: 'Sunset Tours', image: `${BASE_PATH}/experiences/sunset-tours.jpg` },
  { name: 'Weekend Getaways', image: `${BASE_PATH}/experiences/weekend-getaways.jpg` },
];

// Navigation Menu for Fleet Categories
const CategoryNavigation = () => (
  <div className="flex flex-wrap justify-center gap-4 mb-12">
    {fleetCategories.map((category) => (
      <Link key={category.name} href={category.path}>
        <Button
          variant={category.name === 'Convertibles' ? 'default' : 'outline'}
          className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
            category.name === 'Convertibles' ? 'bg-green-600' : ''
          }`}
        >
          {category.name}
        </Button>
      </Link>
    ))}
  </div>
);

export default function ConvertibleFleetPage() {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const handleNextCar = () => {
    setCurrentCarIndex((prevIndex) => (prevIndex + 1) % convertibleCars.length);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Fleet', href: '/fleet' },
              { label: 'Convertibles', href: '/fleet/cars/convertible' },
            ]}
          />

          {/* Page Header */}
          <h1 className="text-4xl font-bold text-center my-8">Convertibles</h1>

          {/* Navigation to Other Categories */}
          <CategoryNavigation />

          {/* Featured Convertible */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Convertible</h2>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={convertibleCars[currentCarIndex]?.images[0]}
                alt={convertibleCars[currentCarIndex]?.name}
                width={800}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-4">
                <div className="text-white">
                  <h3 className="text-2xl font-bold">{convertibleCars[currentCarIndex]?.name}</h3>
                  <p>{convertibleCars[currentCarIndex]?.description}</p>
                </div>
                <Button
                  onClick={handleNextCar}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
                >
                  <span>Next Car</span>
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </section>

          {/* Convertible Cars Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Convertibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {convertibleCars.map((car) => (
                <div key={car.id} className="bg-gray-900 rounded-lg overflow-hidden">
                  <Image
                    src={car.images[0]}
                    alt={car.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{car.name}</h2>
                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        className="text-white border-white hover:bg-green-600 hover:text-white"
                      >
                        Call For Pricing
                      </Button>
                      <Link href={`/booking?car=${car.id}`}>
                        <Button className="bg-green-600 hover:bg-green-700">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Other Sections (Brands, Experiences, Gallery, FAQ) */}
          {/* Convertible Brands */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Convertible Brands</h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-8">
              {brandLogos.map((brand) => (
                <div key={brand.name} className="flex justify-center">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Experience Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Convertible Experiences</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {experienceCategories.map((category) => (
                <div key={category.name} className="relative group cursor-pointer">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-green-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
            <Accordion type="multiple" className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
