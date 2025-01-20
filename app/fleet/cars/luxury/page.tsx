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
import { fleetCategories } from '@/lib/constants'
import Breadcrumbs from '@/components/Breadcrumbs'

const luxuryCars = cars.filter(car => car.category === 'Luxury')

const brandLogos = [
  { name: "Mercedes", logo: "/images/mercedes/mercedes-logo.png" },
  { name: "BMW", logo: "/images/bmw/bmw-logo.png" },
  { name: "Rolls Royce", logo: "/images/rolls-royce/rolls-royce-logo.png" },
  { name: "Bentley", logo: "/images/bentley/bentley-logo.png" },
  { name: "Maserati", logo: "/images/maserati/maserati-logo.png" },
]

const faqItems = [
  {
    question: "What makes a car 'luxury'?",
    answer: "Luxury cars are characterized by their high-end features, superior comfort, advanced technology, and exceptional performance. They often come from prestigious brands and offer a premium driving experience."
  },
  {
    question: "Are there any special requirements for renting a luxury car?",
    answer: "Yes, luxury car rentals often have stricter requirements. These may include a higher minimum age (usually 25+), a clean driving record, full coverage insurance, and a larger security deposit."
  },
  {
    question: "Can I rent a luxury car for a special event?",
    answer: "Absolutely! Many customers rent luxury cars for weddings, anniversaries, proms, or business events. We offer special packages for such occasions."
  },
]

const experienceCategories = [
  { name: "DALLAS EXPERIENCE", image: "/images/dallas-travel.avif" },
  { name: "HOURLY DRIVES", image: "/images/hourly-drives.jpg" },
  { name: "24 HOUR RENTALS", image: "/images/24-hour-service.avif" },
  { name: "HOT DEALS", image: "/images/hot-deals.jpg" },
]

const youtubeVideos = [
  { title: "Lamborghini Urus", thumbnail: "/images/lamborghini-urus-thumb.jpg" },
  { title: "Mercedes Benz G550", thumbnail: "/images/mercedes-g550-thumb.jpg" },
  { title: "Rolls Royce Wraith Black", thumbnail: "/images/rolls-royce-wraith-thumb.jpg" },
]

const carGallery = [
  "/images/car-gallery-1.jpg",
  "/images/car-gallery-2.jpg",
  "/images/car-gallery-3.jpg",
  "/images/car-gallery-4.jpg",
  "/images/car-gallery-5.jpg",
  "/images/car-gallery-6.jpg",
  "/images/car-gallery-7.jpg",
  "/images/car-gallery-8.jpg",
]

export default function LuxuryFleetPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Fleet', href: '/fleet' },
            { label: 'Luxury Fleet', href: '/fleet/cars/luxury' },
          ]} />
          <h1 className="text-4xl font-bold mb-8 mt-4 text-center">Luxury Fleet</h1>

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
              <Link key={category.name} href={category.link}>
                <Button
                  variant={category.name === "Luxury Cars" ? "default" : "outline"}
                  className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
                    category.name === "Luxury Cars" ? 'bg-green-600' : ''
                  }`}
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Luxury Cars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {luxuryCars.map((car) => (
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

          {/* Luxury Car Experience Section */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">EXPERIENCE LUXURY ON WHEELS</h2>
            <p className="mb-4">Indulge in the epitome of automotive excellence with our luxury fleet.</p>
            <p className="mb-4">From sleek sedans to opulent SUVs, our collection features the finest vehicles from world-renowned brands.</p>
            <p className="mb-4">Whether it's for a special occasion or to add a touch of elegance to your travels, our luxury cars promise an unforgettable journey.</p>
            <p>Experience comfort, style, and performance like never before with GreyZone Exotics.</p>
          </section>

          {/* Brands Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">LUXURY BRANDS</h2>
            <p className="text-center mb-8">Explore our collection of premium luxury brands:</p>
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
            <h2 className="text-3xl font-bold mb-4">ELEVATE YOUR JOURNEY WITH OUR LUXURY FLEET</h2>
            <p className="mb-8">Experience the pinnacle of automotive engineering and design. Book your luxury ride today and transform your travel into an extraordinary adventure.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Reserve Your Luxury Car
            </Button>
          </section>

          {/* Experience Los Angeles Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">EXPERIENCE LOS ANGELES</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">SUBSCRIBE TO OUR CHANNEL!</h2>
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
                  alt={`Car ${index + 1}`}
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