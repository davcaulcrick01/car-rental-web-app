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

// Filter for classic cars
const classicCars = cars.filter((car) => car.category === 'classic');

// Brand logos for classic cars
const brandLogos = [
  { name: 'Ford', logo: `${BASE_PATH}/ford/ford-logo.png` },
  { name: 'Chevrolet', logo: `${BASE_PATH}/chevrolet/chevrolet-logo.png` },
  { name: 'Cadillac', logo: `${BASE_PATH}/cadillac/cadillac-logo.png` },
  { name: 'Pontiac', logo: `${BASE_PATH}/pontiac/pontiac-logo.png` },
  { name: 'Porsche', logo: `${BASE_PATH}/porsche/porsche-logo.png` },
];

// FAQs for the classic car page
const faqItems = [
  {
    question: "What defines a 'classic car'?",
    answer: "Classic cars are vehicles at least 20 years old with historical significance or unique craftsmanship.",
  },
  {
    question: "Are there special requirements for renting a classic car?",
    answer: "Renting a classic car often requires a higher minimum age, clean driving record, and full coverage insurance.",
  },
  {
    question: "Can I rent a classic car for a special event?",
    answer: "Absolutely! Many customers rent classic cars for weddings, anniversaries, or photo shoots. We offer event packages.",
  },
];

// Car gallery images
const carGallery = [
  `${BASE_PATH}/gallery/classic-gallery-1.jpg`,
  `${BASE_PATH}/gallery/classic-gallery-2.jpg`,
  `${BASE_PATH}/gallery/classic-gallery-3.jpg`,
  `${BASE_PATH}/gallery/classic-gallery-4.jpg`,
];

// Experience categories
const experienceCategories = [
  { name: 'Vintage Drives', image: `${BASE_PATH}/experiences/vintage-drives.jpg` },
  { name: 'Classic Car Shows', image: `${BASE_PATH}/experiences/classic-car-shows.jpg` },
  { name: 'Retro Road Trips', image: `${BASE_PATH}/experiences/retro-road-trips.jpg` },
  { name: 'Nostalgic Tours', image: `${BASE_PATH}/experiences/nostalgic-tours.jpg` },
];

// Navigation Menu for Fleet Categories
const CategoryNavigation = () => (
  <div className="flex flex-wrap justify-center gap-4 mb-12">
    {fleetCategories.map((category) => (
      <Link key={category.name} href={category.path}>
        <Button
          variant={category.name === 'Classic Cars' ? 'default' : 'outline'}
          className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
            category.name === 'Classic Cars' ? 'bg-green-600' : ''
          }`}
        >
          {category.name}
        </Button>
      </Link>
    ))}
  </div>
);

export default function ClassicCarsPage() {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const handleNextCar = () => {
    setCurrentCarIndex((prevIndex) => (prevIndex + 1) % classicCars.length);
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
              { label: 'Classic Cars', href: '/fleet/cars/classic' },
            ]}
          />

          {/* Page Header */}
          <h1 className="text-4xl font-bold text-center my-8">Classic Cars</h1>

          {/* Navigation to Other Categories */}
          <CategoryNavigation />

          {/* Featured Classic Car */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Classic Car</h2>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={classicCars[currentCarIndex]?.images[0]}
                alt={classicCars[currentCarIndex]?.name}
                width={800}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-4">
                <div className="text-white">
                  <h3 className="text-2xl font-bold">{classicCars[currentCarIndex]?.name}</h3>
                  <p>{classicCars[currentCarIndex]?.description}</p>
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

          {/* Classic Cars Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Classic Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classicCars.map((car) => (
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

          {/* Other Sections (Brands, Gallery, Experiences, FAQ) */}
          {/* Classic Car Brands */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Classic Car Brands</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Classic Car Experiences</h2>
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
