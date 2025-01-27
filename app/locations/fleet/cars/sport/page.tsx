'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Play } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import cars from '@/lib/cars'
import { fleetCategories } from '@/app/fleet/page'
import Breadcrumbs from '@/components/Breadcrumbs'

const sportCars = cars.filter(car => car.category === 'sport')

const brandLogos = [
  { name: "Porsche", logo: "/images/porsche/porsche-logo.png" },
  { name: "BMW M", logo: "/images/bmw/bmw-m-logo.png" },
  { name: "Mercedes-AMG", logo: "/images/mercedes/mercedes-amg-logo.png" },
  { name: "Audi Sport", logo: "/images/audi/audi-sport-logo.png" },
  { name: "Nissan NISMO", logo: "/images/nissan/nissan-nismo-logo.png" },
]

const faqItems = [
  {
    question: "What defines a 'sport' car?",
    answer: "Sport cars are designed for performance driving. They typically feature powerful engines, responsive handling, and aerodynamic designs. While they may not be as extreme as supercars, they offer an exciting driving experience with a balance of everyday usability."
  },
  {
    question: "Are there special requirements for renting a sport car?",
    answer: "Renting a sport car often comes with some additional requirements. These may include a minimum age (usually 25+), a clean driving record, and full coverage insurance. Some high-performance models might require previous experience with similar vehicles."
  },
  {
    question: "Can I rent a sport car for a track day?",
    answer: "Many of our sport cars are suitable for track days, but this depends on the specific model and our current policies. Please contact us directly to discuss track day rentals, as additional insurance or agreements may be required."
  },
]

const experienceCategories = [
  { name: "MOUNTAIN DRIVES", image: "/images/mountain-drives.jpg" },
  { name: "TRACK EXPERIENCES", image: "/images/track-experiences.jpg" },
  { name: "CITY CRUISES", image: "/images/city-cruises.jpg" },
  { name: "WEEKEND GETAWAYS", image: "/images/weekend-getaways.jpg" },
]

const youtubeVideos = [
  { title: "Porsche 911 GT3 Review", thumbnail: "/images/porsche-911-gt3-thumb.jpg" },
  { name: "BMW M4 vs Mercedes-AMG C63", thumbnail: "/images/bmw-m4-vs-amg-c63-thumb.jpg" },
  { name: "Audi RS6 Avant Test Drive", thumbnail: "/images/audi-rs6-avant-thumb.jpg" },
]

const carGallery = [
  "/images/sport-gallery-1.jpg",
  "/images/sport-gallery-2.jpg",
  "/images/sport-gallery-3.jpg",
  "/images/sport-gallery-4.jpg",
  "/images/sport-gallery-5.jpg",
  "/images/sport-gallery-6.jpg",
  "/images/sport-gallery-7.jpg",
  "/images/sport-gallery-8.jpg",
]

export default function SportCarFleetPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Fleet', href: '/fleet' },
            { label: 'Sport Cars', href: '/fleet/cars/sport' },
          ]} />
          <h1 className="text-4xl font-bold mb-8 mt-4 text-center">Sport Car Fleet</h1>

          {/* Search Cars Button */}
          <div className="text-center mb-8">
            <Link href="/fleet/fleet-search">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                Search Cars
              </Button>
            </Link>
          </div>

          {/* Fleet Categories Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {fleetCategories.map((category) => (
              <Link key={category.name} href={category.path}>
                <Button
                  variant={category.name === "Sport Cars" ? "default" : "outline"}
                  className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
                    category.name === "Sport Cars" ? 'bg-green-600' : ''
                  }`}
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Sport Cars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                  <h2 className="text-xl font-bold mb-4">{car.name}</h2>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" className="text-white border-white hover:bg-green-600 hover:text-white">
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

          {/* Sport Car Experience Section */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">EXPERIENCE THRILLING PERFORMANCE</h2>
            <p className="mb-4">Discover the perfect balance of power and agility with our sport car fleet.</p>
            <p className="mb-4">From nimble hot hatches to track-focused coupes, our collection features the best in automotive engineering.</p>
            <p className="mb-4">Whether you're carving up mountain roads or hitting the track, our sport cars promise an exhilarating drive.</p>
            <p>Experience the thrill of precision handling and responsive power with GreyZone Exotics.</p>
          </section>

          {/* Brands Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">SPORT CAR BRANDS</h2>
            <p className="text-center mb-8">Explore our collection of high-performance sport car brands:</p>
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

          {/* Call to Action */}
          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">UNLEASH YOUR INNER DRIVER</h2>
            <p className="mb-8">Experience the thrill of high-performance driving. Book your sport car today and elevate your driving experience to new heights.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Reserve Your Sport Car
            </Button>
          </section>

          {/* Experience Categories Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">SPORT CAR EXPERIENCES</h2>
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

          {/* YouTube Channel Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">SUBSCRIBE TO OUR SPORT CAR CHANNEL!</h2>
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

          {/* Car Gallery */}
          <section className="mb-16">
            <div className="grid grid-cols-4 md:grid-cols-8 gap-1">
              {carGallery.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Sport Car ${index + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-24 object-cover cursor-pointer hover:opacity-75 transition-opacity"
                />
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">FREQUENTLY ASKED QUESTIONS</h2>
            <Accordion type="single" collapsible className="w-full">
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
  )
}