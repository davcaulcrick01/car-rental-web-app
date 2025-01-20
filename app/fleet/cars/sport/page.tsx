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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Layout from '@/components/Layout'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import cars from '@/lib/cars'
import { fleetCategories } from '@/lib/constants'
import Breadcrumbs from '@/components/Breadcrumbs'

const sportCars = cars.filter(car => car.category === 'Sport')

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

export default function SportCarsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Fleet", href: "/fleet" },
            { label: "Sport Cars", href: "/fleet/cars/sport" },
          ]}
        />

        <h1 className="text-4xl font-bold mb-8">Sport Cars</h1>
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {fleetCategories.map((category) => (
            <Link key={category.name} href={category.link}>
              <Button
                variant={category.name === "Sports Cars" ? "default" : "outline"}
                className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
                  category.name === "Sports Cars" ? 'bg-green-600' : ''
                }`}
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sportCars.map((car) => (
            <Card key={car.id} className="bg-gray-900 border-gray-800">
              <div className="relative h-48">
                <Image
                  src={car.images[0]}
                  alt={car.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{car.name}</span>
                  <span className="text-green-400">${car.price}/day</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">{car.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-400">Engine:</span>
                    <p>{car.engine}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Transmission:</span>
                    <p>{car.transmission}</p>
                  </div>
                </div>
                <Link href={`/booking?car=${car.id}`}>
                  <Button className="w-full">
                    Book Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {sportCars.length === 0 && (
          <p className="text-center text-gray-400">
            No sport cars available at the moment. Please check back later.
          </p>
        )}
      </div>
    </Layout>
  )
}