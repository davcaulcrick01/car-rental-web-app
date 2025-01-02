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

const sedanCars = cars.filter(car => car.category === 'sedan')

const brandLogos = [
  { name: "Toyota", logo: "/images/toyota/toyota-logo.png" },
  { name: "Honda", logo: "/images/honda/honda-logo.png" },
  { name: "Nissan", logo: "/images/nissan/nissan-logo.png" },
  { name: "Mazda", logo: "/images/mazda/mazda-logo.png" },
  { name: "Hyundai", logo: "/images/hyundai/hyundai-logo.png" },
]

const faqItems = [
  {
    question: "What are the advantages of renting a sedan?",
    answer: "Sedans offer a perfect balance of comfort, fuel efficiency, and practicality. They're ideal for business trips, family vacations, or everyday driving in urban environments."
  },
  {
    question: "Are sedans suitable for long trips?",
    answer: "Absolutely! Sedans are designed for comfort over long distances. They typically offer good fuel economy, smooth rides, and ample trunk space for luggage."
  },
  {
    question: "Can I rent a luxury sedan?",
    answer: "Yes, we offer a range of sedans from economical models to luxury vehicles. You can choose based on your preferences and budget."
  },
]

const experienceCategories = [
  { name: "CITY CRUISES", image: "/images/city-cruises.jpg" },
  { name: "BUSINESS TRAVEL", image: "/images/business-travel.jpg" },
  { name: "FAMILY TRIPS", image: "/images/family-trips.jpg" },
  { name: "WEEKEND GETAWAYS", image: "/images/weekend-getaways.jpg" },
]

const youtubeVideos = [
  { title: "2023 Toyota Camry Review", thumbnail: "/images/toyota-camry-thumb.jpg" },
  { title: "Honda Accord vs Nissan Altima", thumbnail: "/images/accord-altima-thumb.jpg" },
  { title: "Top 5 Sedans of 2023", thumbnail: "/images/top-5-sedans-thumb.jpg" },
]

const carGallery = [
  "/images/sedan-gallery-1.jpg",
  "/images/sedan-gallery-2.jpg",
  "/images/sedan-gallery-3.jpg",
  "/images/sedan-gallery-4.jpg",
  "/images/sedan-gallery-5.jpg",
  "/images/sedan-gallery-6.jpg",
  "/images/sedan-gallery-7.jpg",
  "/images/sedan-gallery-8.jpg",
]

export default function SedanFleetPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Fleet', href: '/fleet' },
            { label: 'Sedans', href: '/fleet/cars/sedan' },
          ]} />
          <h1 className="text-4xl font-bold mb-8 mt-4 text-center">Sedan Fleet</h1>

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
                  variant={category.name === "Sedans" ? "default" : "outline"}
                  className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
                    category.name === "Sedans" ? 'bg-green-600' : ''
                  }`}
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Sedan Cars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

          {/* Sedan Experience Section */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">EXPERIENCE COMFORT AND EFFICIENCY</h2>
            <p className="mb-4">Discover the perfect balance of style, comfort, and practicality with our sedan fleet.</p>
            <p className="mb-4">From fuel-efficient compact sedans to spacious mid-size options, we have the ideal car for your needs.</p>
            <p className="mb-4">Whether you're on a business trip or a family vacation, our sedans provide a smooth and enjoyable ride.</p>
            <p>Experience reliability and comfort on the road with GreyZone Exotics' sedan collection.</p>
          </section>

          {/* Brands Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">FEATURED SEDAN BRANDS</h2>
            <p className="text-center mb-8">Explore our collection of top sedan brands:</p>
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
            <h2 className="text-3xl font-bold mb-4">CHOOSE YOUR PERFECT SEDAN</h2>
            <p className="mb-8">From compact efficiency to mid-size luxury, find the ideal sedan for your journey. Book your comfortable ride today and enjoy the perfect blend of style and practicality.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Reserve Your Sedan
            </Button>
          </section>

          {/* Experience Categories Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">SEDAN EXPERIENCES</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">SUBSCRIBE TO OUR SEDAN CHANNEL!</h2>
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
                  alt={`Sedan ${index + 1}`}
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