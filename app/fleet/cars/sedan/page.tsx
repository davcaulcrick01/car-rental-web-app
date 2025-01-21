'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import cars from '@/lib/cars';
import { fleetCategories } from '@/app/fleet/page';

// Base bucket path for images
const BASE_PATH = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars`;

// Filter for sedan cars
const sedanCars = cars.filter((car) => car.category === 'sedan');

// Experience categories for sedan cars
const experienceCategories = [
  { name: 'City Cruises', image: `${BASE_PATH}/experiences/city-cruises.jpg` },
  { name: 'Business Travel', image: `${BASE_PATH}/experiences/business-travel.jpg` },
  { name: 'Family Trips', image: `${BASE_PATH}/experiences/family-trips.jpg` },
  { name: 'Weekend Getaways', image: `${BASE_PATH}/experiences/weekend-getaways.jpg` },
];

// FAQs for sedan cars
const faqItems = [
  {
    question: "What are the advantages of renting a sedan?",
    answer: "Sedans offer a perfect balance of comfort, fuel efficiency, and practicality. They're ideal for business trips, family vacations, or everyday driving.",
  },
  {
    question: "Are sedans suitable for long trips?",
    answer: "Absolutely! Sedans are designed for comfort over long distances. They typically offer good fuel economy, smooth rides, and ample trunk space for luggage.",
  },
  {
    question: "Can I rent a luxury sedan?",
    answer: "Yes, we offer a range of sedans from economical models to luxury vehicles. Choose based on your preferences and budget.",
  },
];

// Sedan car gallery images
const carGallery = [
  `${BASE_PATH}/gallery/sedan-gallery-1.jpg`,
  `${BASE_PATH}/gallery/sedan-gallery-2.jpg`,
  `${BASE_PATH}/gallery/sedan-gallery-3.jpg`,
];

// Navigation Menu for Fleet Categories
const CategoryNavigation = () => (
  <div className="flex flex-wrap justify-center gap-4 mb-12">
    {fleetCategories.map((category) => (
      <Link key={category.name} href={category.path}>
        <Button
          variant={category.name === 'Sedans' ? 'default' : 'outline'}
          className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
            category.name === 'Sedans' ? 'bg-green-600' : ''
          }`}
        >
          {category.name}
        </Button>
      </Link>
    ))}
  </div>
);

export default function SedanFleetPage() {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const handleNextCar = () => {
    setCurrentCarIndex((prevIndex) => (prevIndex + 1) % sedanCars.length);
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
              { label: 'Sedans', href: '/fleet/cars/sedan' },
            ]}
          />

          {/* Page Header */}
          <h1 className="text-4xl font-bold text-center my-8">Sedan Fleet</h1>

          {/* Navigation to Other Categories */}
          <CategoryNavigation />

          {/* Featured Sedan Car */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Sedan</h2>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={sedanCars[currentCarIndex]?.images[0]}
                alt={sedanCars[currentCarIndex]?.name}
                width={800}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-4">
                <div className="text-white">
                  <h3 className="text-2xl font-bold">{sedanCars[currentCarIndex]?.name}</h3>
                  <p>{sedanCars[currentCarIndex]?.description}</p>
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

          {/* Sedan Cars Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Sedan Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sedanCars.map((car) => (
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

          {/* Experience Categories Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Sedan Experiences</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="multiple" className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Car Gallery */}
          <section className="mb-16">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-1">
              {carGallery.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Sedan ${index + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-24 object-cover cursor-pointer hover:opacity-75 transition-opacity"
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
