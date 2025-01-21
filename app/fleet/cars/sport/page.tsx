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

// Filter for sport cars
const sportCars = cars.filter((car) => car.category === 'sport');

// Brand logos for sport cars
const brandLogos = [
  { name: "Porsche", logo: `${BASE_PATH}/porsche/porsche-logo.png` },
  { name: "BMW M", logo: `${BASE_PATH}/bmw/bmw-m-logo.png` },
  { name: "Mercedes-AMG", logo: `${BASE_PATH}/mercedes/mercedes-amg-logo.png` },
  { name: "Audi Sport", logo: `${BASE_PATH}/audi/audi-sport-logo.png` },
  { name: "Nissan NISMO", logo: `${BASE_PATH}/nissan/nissan-nismo-logo.png` },
];

// FAQs for the sport car page
const faqItems = [
  {
    question: "What defines a 'sport' car?",
    answer: "Sport cars are designed for performance driving. They feature powerful engines, responsive handling, and aerodynamic designs.",
  },
  {
    question: "Are there special requirements for renting a sport car?",
    answer: "Yes, renting a sport car may include age restrictions (25+), clean driving records, and full insurance. Some cars require prior experience.",
  },
  {
    question: "Can I rent a sport car for a track day?",
    answer: "Yes, many sport cars are available for track days. Contact us to discuss policies, additional insurance, or agreements.",
  },
];

// Experience categories
const experienceCategories = [
  { name: 'Mountain Drives', image: `${BASE_PATH}/experiences/mountain-drives.jpg` },
  { name: 'Track Experiences', image: `${BASE_PATH}/experiences/track-experiences.jpg` },
  { name: 'City Cruises', image: `${BASE_PATH}/experiences/city-cruises.jpg` },
  { name: 'Weekend Getaways', image: `${BASE_PATH}/experiences/weekend-getaways.jpg` },
];

// YouTube videos
const youtubeVideos = [
  { title: "Porsche 911 GT3 Review", thumbnail: `${BASE_PATH}/youtube/porsche-911-gt3-thumb.jpg` },
  { title: "BMW M4 vs Mercedes-AMG C63", thumbnail: `${BASE_PATH}/youtube/bmw-m4-vs-amg-c63-thumb.jpg` },
  { title: "Audi RS6 Avant Test Drive", thumbnail: `${BASE_PATH}/youtube/audi-rs6-avant-thumb.jpg` },
];

// Car gallery images
const carGallery = [
  `${BASE_PATH}/gallery/sport-gallery-1.jpg`,
  `${BASE_PATH}/gallery/sport-gallery-2.jpg`,
  `${BASE_PATH}/gallery/sport-gallery-3.jpg`,
  `${BASE_PATH}/gallery/sport-gallery-4.jpg`,
];

// Navigation Menu for Fleet Categories
const CategoryNavigation = () => (
  <div className="flex flex-wrap justify-center gap-4 mb-12">
    {fleetCategories.map((category) => (
      <Link key={category.name} href={category.path}>
        <Button
          variant={category.name === 'Sport Cars' ? 'default' : 'outline'}
          className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
            category.name === 'Sport Cars' ? 'bg-green-600' : ''
          }`}
        >
          {category.name}
        </Button>
      </Link>
    ))}
  </div>
);

export default function SportCarFleetPage() {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const handleNextCar = () => {
    setCurrentCarIndex((prevIndex) => (prevIndex + 1) % sportCars.length);
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
              { label: 'Sport Cars', href: '/fleet/cars/sport' },
            ]}
          />

          {/* Page Header */}
          <h1 className="text-4xl font-bold text-center my-8">Sport Car Fleet</h1>

          {/* Navigation to Other Categories */}
          <CategoryNavigation />

          {/* Featured Sport Car */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Sport Car</h2>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <Image
                src={sportCars[currentCarIndex]?.images[0]}
                alt={sportCars[currentCarIndex]?.name}
                width={800}
                height={400}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between px-4">
                <div className="text-white">
                  <h3 className="text-2xl font-bold">{sportCars[currentCarIndex]?.name}</h3>
                  <p>{sportCars[currentCarIndex]?.description}</p>
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

          {/* Sport Cars Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Sport Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sportCars.map((car) => (
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

          {/* YouTube Channel Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Subscribe to Our Sport Car Channel!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {youtubeVideos.map((video, index) => (
                <div key={index} className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4">
                      <Play size={32} />
                    </Button>
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
            <div className="grid grid-cols-4 gap-4">
              {carGallery.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Sport Car ${index + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-40 object-cover rounded-lg hover:opacity-75 transition-opacity"
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
