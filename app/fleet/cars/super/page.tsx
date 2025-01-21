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

// Filter for supercars
const superCars = cars.filter((car) => car.category === 'super');

// Brand logos for supercars
const brandLogos = [
  { name: "Ferrari", logo: `${BASE_PATH}/ferrari/ferrari-logo.png` },
  { name: "Lamborghini", logo: `${BASE_PATH}/lamborghini/lamborghini-logo.png` },
  { name: "McLaren", logo: `${BASE_PATH}/mclaren/mclaren-logo.png` },
  { name: "Porsche", logo: `${BASE_PATH}/porsche/porsche-logo.png` },
  { name: "Aston Martin", logo: `${BASE_PATH}/aston-martin/aston-martin-logo.png` },
];

// Experience categories for supercars
const experienceCategories = [
  { name: "TRACK DAYS", image: `${BASE_PATH}/experiences/track-days.jpg` },
  { name: "SCENIC DRIVES", image: `${BASE_PATH}/experiences/scenic-drives.jpg` },
  { name: "PHOTO SHOOTS", image: `${BASE_PATH}/experiences/photo-shoots.jpg` },
  { name: "VIP EVENTS", image: `${BASE_PATH}/experiences/vip-events.jpg` },
];

// FAQs for the supercar page
const faqItems = [
  {
    question: "What defines a 'super car'?",
    answer: "Super cars are high-performance vehicles that combine cutting-edge technology, exceptional speed, and striking design. They often feature advanced aerodynamics, powerful engines, and lightweight materials for optimal performance.",
  },
  {
    question: "Are there special requirements for renting a super car?",
    answer: "Yes, renting a super car typically comes with stricter requirements. These may include a higher minimum age (usually 25+), a clean driving record, substantial driving experience, full coverage insurance, and a larger security deposit.",
  },
  {
    question: "Can I rent a super car for a special event?",
    answer: "Absolutely! Many customers rent super cars for weddings, anniversaries, photo shoots, or track days. We offer special packages for such occasions to make your event truly unforgettable.",
  },
];

// Supercar gallery images
const carGallery = [
  `${BASE_PATH}/gallery/super-gallery-1.jpg`,
  `${BASE_PATH}/gallery/super-gallery-2.jpg`,
  `${BASE_PATH}/gallery/super-gallery-3.jpg`,
  `${BASE_PATH}/gallery/super-gallery-4.jpg`,
  `${BASE_PATH}/gallery/super-gallery-5.jpg`,
  `${BASE_PATH}/gallery/super-gallery-6.jpg`,
  `${BASE_PATH}/gallery/super-gallery-7.jpg`,
  `${BASE_PATH}/gallery/super-gallery-8.jpg`,
];

export default function SuperCarFleetPage() {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const handleNextCar = () => {
    setCurrentCarIndex((prevIndex) => (prevIndex + 1) % superCars.length);
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
              { label: 'Super Cars', href: '/fleet/cars/super' },
            ]}
          />

          <h1 className="text-4xl font-bold text-center my-8">Super Car Fleet</h1>

          {/* Fleet Categories Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {fleetCategories.map((category) => (
              <Link key={category.name} href={category.path}>
                <Button
                  variant={category.name === "Super Cars" ? "default" : "outline"}
                  className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
                    category.name === "Super Cars" ? 'bg-green-600' : ''
                  }`}
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Featured Super Car */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Super Car</h2>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={superCars[currentCarIndex]?.images[0]}
                alt={superCars[currentCarIndex]?.name}
                width={800}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-4">
                <div className="text-white">
                  <h3 className="text-2xl font-bold">{superCars[currentCarIndex]?.name}</h3>
                  <p>{superCars[currentCarIndex]?.description}</p>
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

          {/* Super Car Brands */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Super Car Brands</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">Super Car Experiences</h2>
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
            <Accordion type="single" collapsible className="w-full">
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
                  alt={`Super Car ${index + 1}`}
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
