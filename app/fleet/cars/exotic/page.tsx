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

// Filter for exotic cars
const exoticCars = cars.filter((car) => car.category === 'exotic');

// Brand logos for exotic cars
const brandLogos = [
  { name: 'Ferrari', logo: `${BASE_PATH}/ferrari/ferrari-logo.png` },
  { name: 'Lamborghini', logo: `${BASE_PATH}/lamborghini/lamborghini-logo.png` },
  { name: 'McLaren', logo: `${BASE_PATH}/mclaren/mclaren-logo.png` },
  { name: 'Bugatti', logo: `${BASE_PATH}/bugatti/bugatti-logo.png` },
  { name: 'Koenigsegg', logo: `${BASE_PATH}/koenigsegg/koenigsegg-logo.png` },
];

// FAQs for the exotic car page
const faqItems = [
  {
    question: "What defines an 'exotic' car?",
    answer: "Exotic cars are rare, luxurious vehicles with advanced technology and exceptional performance.",
  },
  {
    question: "Are there special requirements for renting an exotic car?",
    answer: "Yes, requirements include higher minimum age, clean driving record, and full coverage insurance.",
  },
  {
    question: "Can I rent an exotic car for a special event?",
    answer: "Absolutely! Exotic cars are perfect for weddings, anniversaries, and high-profile events.",
  },
];

// Experience categories
const experienceCategories = [
  { name: 'Track Days', image: `${BASE_PATH}/experiences/track-days.jpg` },
  { name: 'Luxury Escapes', image: `${BASE_PATH}/experiences/luxury-escapes.jpg` },
  { name: 'Photo Shoots', image: `${BASE_PATH}/experiences/photo-shoots.jpg` },
  { name: 'VIP Events', image: `${BASE_PATH}/experiences/vip-events.jpg` },
];

// Navigation Menu for Fleet Categories
const CategoryNavigation = () => (
  <div className="flex flex-wrap justify-center gap-4 mb-12">
    {fleetCategories.map((category) => (
      <Link key={category.name} href={category.path}>
        <Button
          variant={category.name === 'Exotic Cars' ? 'default' : 'outline'}
          className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
            category.name === 'Exotic Cars' ? 'bg-green-600' : ''
          }`}
        >
          {category.name}
        </Button>
      </Link>
    ))}
  </div>
);

export default function ExoticFleetPage() {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const handleNextCar = () => {
    setCurrentCarIndex((prevIndex) => (prevIndex + 1) % exoticCars.length);
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
              { label: 'Exotic Cars', href: '/fleet/cars/exotic' },
            ]}
          />

          <h1 className="text-4xl font-bold text-center my-8">Exotic Cars</h1>

          <CategoryNavigation />

          {/* Featured Exotic Car */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Exotic Car</h2>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={exoticCars[currentCarIndex]?.images[0]}
                alt={exoticCars[currentCarIndex]?.name}
                width={800}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-4">
                <div className="text-white">
                  <h3 className="text-2xl font-bold">{exoticCars[currentCarIndex]?.name}</h3>
                  <p>{exoticCars[currentCarIndex]?.description}</p>
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

          {/* Exotic Cars Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Exotic Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exoticCars.map((car) => (
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

          {/* Exotic Car Brands */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Exotic Car Brands</h2>
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
