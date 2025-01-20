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

const superCars = cars.filter(car => car.category === 'Super')

const brandLogos = [
  { name: "Ferrari", logo: "/images/ferrari/ferrari-logo.png" },
  { name: "Lamborghini", logo: "/images/lamborghini/lamborghini-logo.png" },
  { name: "McLaren", logo: "/images/mclaren/mclaren-logo.png" },
  { name: "Porsche", logo: "/images/porsche/porsche-logo.png" },
  { name: "Aston Martin", logo: "/images/aston-martin/aston-martin-logo.png" },
]

const faqItems = [
  {
    question: "What defines a 'super car'?",
    answer: "Super cars are high-performance vehicles that combine cutting-edge technology, exceptional speed, and striking design. They often feature advanced aerodynamics, powerful engines, and lightweight materials for optimal performance."
  },
  {
    question: "Are there special requirements for renting a super car?",
    answer: "Yes, renting a super car typically comes with stricter requirements. These may include a higher minimum age (usually 25+), a clean driving record, substantial driving experience, full coverage insurance, and a larger security deposit."
  },
  {
    question: "Can I rent a super car for a special event?",
    answer: "Absolutely! Many customers rent super cars for weddings, anniversaries, photo shoots, or track days. We offer special packages for such occasions to make your event truly unforgettable."
  },
]

const experienceCategories = [
  { name: "TRACK DAYS", image: "/images/track-days.jpg" },
  { name: "SCENIC DRIVES", image: "/images/scenic-drives.jpg" },
  { name: "PHOTO SHOOTS", image: "/images/photo-shoots.jpg" },
  { name: "VIP EVENTS", image: "/images/vip-events.jpg" },
]

const youtubeVideos = [
  { title: "Ferrari SF90 Stradale Review", thumbnail: "/images/ferrari-sf90-thumb.jpg" },
  { title: "Lamborghini Aventador vs McLaren 720S", thumbnail: "/images/aventador-720s-thumb.jpg" },
  { title: "Porsche 911 GT3 RS Track Test", thumbnail: "/images/porsche-gt3rs-thumb.jpg" },
]

const carGallery = [
  "/images/super-gallery-1.jpg",
  "/images/super-gallery-2.jpg",
  "/images/super-gallery-3.jpg",
  "/images/super-gallery-4.jpg",
  "/images/super-gallery-5.jpg",
  "/images/super-gallery-6.jpg",
  "/images/super-gallery-7.jpg",
  "/images/super-gallery-8.jpg",
]

export default function SuperCarsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Fleet", href: "/fleet" },
            { label: "Super Cars", href: "/fleet/cars/super" },
          ]}
        />

        <h1 className="text-4xl font-bold mb-8">Super Cars</h1>
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {fleetCategories.map((category) => (
            <Link key={category.name} href={category.link}>
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

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {superCars.map((car) => (
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

        {superCars.length === 0 && (
          <p className="text-center text-gray-400">
            No super cars available at the moment. Please check back later.
          </p>
        )}
      </div>
    </Layout>
  )
}