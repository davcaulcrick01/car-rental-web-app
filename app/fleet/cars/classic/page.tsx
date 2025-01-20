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

const classicCars = cars.filter(car => car.category === 'Classic')

const brandLogos = [
  { name: "Ford", logo: "/images/ford/ford-logo.png" },
  { name: "Chevrolet", logo: "/images/chevrolet/chevrolet-logo.png" },
  { name: "Cadillac", logo: "/images/cadillac/cadillac-logo.png" },
  { name: "Pontiac", logo: "/images/pontiac/pontiac-logo.png" },
  { name: "Oldsmobile", logo: "/images/oldsmobile/oldsmobile-logo.png" },
]

const faqItems = [
  {
    question: "What defines a 'classic car'?",
    answer: "Classic cars are typically vehicles that are at least 20 years old and of historical interest. They often represent a bygone era of automotive design and engineering, and are prized for their nostalgic value and craftsmanship."
  },
  {
    question: "Are there special requirements for renting a classic car?",
    answer: "Yes, renting a classic car often comes with additional requirements. These may include a higher minimum age (usually 25+), a clean driving record, full coverage insurance, and a larger security deposit. Some rentals may also require a demonstration of experience with manual transmissions."
  },
  {
    question: "Can I rent a classic car for a special event?",
    answer: "Absolutely! Many customers rent classic cars for weddings, anniversaries, proms, or photo shoots. We offer special packages for such occasions and can help you choose the perfect classic car to make your event truly memorable."
  },
]

const experienceCategories = [
  { name: "VINTAGE DRIVES", image: "/images/vintage-drives.jpg" },
  { name: "CLASSIC CAR SHOWS", image: "/images/classic-car-shows.jpg" },
  { name: "RETRO ROAD TRIPS", image: "/images/retro-road-trips.jpg" },
  { name: "NOSTALGIC TOURS", image: "/images/nostalgic-tours.jpg" },
]

const youtubeVideos = [
  { title: "1957 Chevrolet Bel Air", thumbnail: "/images/57-chevy-thumb.jpg" },
  { title: "1965 Ford Mustang", thumbnail: "/images/65-mustang-thumb.jpg" },
  { title: "1959 Cadillac Eldorado", thumbnail: "/images/59-cadillac-thumb.jpg" },
]

const carGallery = [
  "/images/classic-gallery-1.jpg",
  "/images/classic-gallery-2.jpg",
  "/images/classic-gallery-3.jpg",
  "/images/classic-gallery-4.jpg",
  "/images/classic-gallery-5.jpg",
  "/images/classic-gallery-6.jpg",
  "/images/classic-gallery-7.jpg",
  "/images/classic-gallery-8.jpg",
]

export default function ClassicCarsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Fleet", href: "/fleet" },
            { label: "Classic Cars", href: "/fleet/cars/classic" },
          ]}
        />

        <h1 className="text-4xl font-bold mb-8">Classic Cars</h1>
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {fleetCategories.map((category) => (
            <Link key={category.name} href={category.link}>
              <Button
                variant={category.name === "Classic Cars" ? "default" : "outline"}
                className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
                  category.name === "Classic Cars" ? 'bg-green-600' : ''
                }`}
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classicCars.map((car) => (
            <Card key={car.id} className="bg-gray-900 border-gray-800">
              <div className="relative h-48">
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/public/images/cars/classic/${car.image}`}
                  alt={car.name}
                  width={600}
                  height={400}
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

        {classicCars.length === 0 && (
          <p className="text-center text-gray-400">
            No classic cars available at the moment. Please check back later.
          </p>
        )}
      </div>
    </Layout>
  )
}