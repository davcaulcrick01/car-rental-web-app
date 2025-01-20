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

const convertibleCars = cars.filter(car => car.category === 'Convertible')

const brandLogos = [
  { name: "BMW", logo: "/images/bmw/bmw-logo.png" },
  { name: "Mercedes", logo: "/images/mercedes/mercedes-logo.png" },
  { name: "Porsche", logo: "/images/porsche/porsche-logo.png" },
  { name: "Audi", logo: "/images/audi/audi-logo.png" },
  { name: "Chevrolet", logo: "/images/chevrolet/chevrolet-logo.png" },
]

const faqItems = [
  {
    question: "What's special about convertible cars?",
    answer: "Convertible cars offer an open-air driving experience, allowing you to enjoy the sunshine and breeze. They're perfect for scenic drives and adding a touch of excitement to your journey."
  },
  {
    question: "Can I rent a convertible in winter?",
    answer: "Yes, you can rent a convertible year-round. Many modern convertibles have excellent heating systems and some even have features like neck warmers for comfortable top-down driving in cooler weather."
  },
  {
    question: "Are convertibles safe?",
    answer: "Modern convertibles are designed with safety in mind. They often include reinforced windshield frames, pop-up roll bars, and other safety features to protect passengers in the event of a rollover."
  },
]

const experienceCategories = [
  { name: "COASTAL DRIVES", image: "/images/coastal-drives.jpg" },
  { name: "CITY CRUISING", image: "/images/city-cruising.jpg" },
  { name: "SUNSET TOURS", image: "/images/sunset-tours.jpg" },
  { name: "WEEKEND GETAWAYS", image: "/images/weekend-getaways.jpg" },
]

const youtubeVideos = [
  { title: "Top 5 Convertibles of 2023", thumbnail: "/images/top-5-convertibles-thumb.jpg" },
  { title: "Convertible vs Coupe: Which to Choose?", thumbnail: "/images/convertible-vs-coupe-thumb.jpg" },
  { title: "The Ultimate Convertible Road Trip", thumbnail: "/images/convertible-road-trip-thumb.jpg" },
]

const carGallery = [
  "/images/convertible-gallery-1.jpg",
  "/images/convertible-gallery-2.jpg",
  "/images/convertible-gallery-3.jpg",
  "/images/convertible-gallery-4.jpg",
  "/images/convertible-gallery-5.jpg",
  "/images/convertible-gallery-6.jpg",
  "/images/convertible-gallery-7.jpg",
  "/images/convertible-gallery-8.jpg",
]

export default function ConvertibleFleetPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Fleet', href: '/fleet' },
            { label: 'Convertibles', href: '/fleet/cars/convertible' },
          ]} />
          <h1 className="text-4xl font-bold mb-8 mt-4 text-center">Convertible Fleet</h1>

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
                  variant={category.name === "Convertibles" ? "default" : "outline"}
                  className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
                    category.name === "Convertibles" ? 'bg-green-600' : ''
                  }`}
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Convertible Cars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {convertibleCars.map((car) => (
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

          {/* Convertible Experience Section */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">EXPERIENCE OPEN-AIR FREEDOM</h2>
            <p className="mb-4">Feel the wind in your hair and the sun on your face with our convertible fleet.</p>
            <p className="mb-4">From sporty roadsters to luxurious drop-tops, our collection offers the perfect vehicle for your open-air adventure.</p>
            <p className="mb-4">Whether it's a coastal drive or a city cruise, our convertibles promise an exhilarating and unforgettable journey.</p>
            <p>Experience the thrill of top-down driving with GreyZone Exotics.</p>
          </section>

          {/* Brands Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">CONVERTIBLE BRANDS</h2>
            <p className="text-center mb-8">Explore our collection of premium convertible brands:</p>
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
            <h2 className="text-3xl font-bold mb-4">EMBRACE THE OPEN ROAD WITH OUR CONVERTIBLE FLEET</h2>
            <p className="mb-8">Experience the freedom of the open air. Book your convertible today and make every drive an adventure.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Reserve Your Convertible
            </Button>
          </section>

          {/* Experience Categories Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">CONVERTIBLE EXPERIENCES</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">SUBSCRIBE TO OUR CONVERTIBLE CHANNEL!</h2>
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
                  alt={`Convertible ${index + 1}`}
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