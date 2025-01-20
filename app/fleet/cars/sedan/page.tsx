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

const sedanCars = cars.filter(car => car.category === 'Sedan')

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

export default function SedanCarsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Fleet", href: "/fleet" },
            { label: "Sedan Cars", href: "/fleet/cars/sedan" },
          ]}
        />

        <h1 className="text-4xl font-bold mb-8">Sedan Cars</h1>
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {fleetCategories.map((category) => (
            <Link key={category.name} href={category.link}>
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

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sedanCars.map((car) => (
            <Card key={car.id} className="bg-gray-900 border-gray-800">
              <div className="relative h-48">
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/public/images/cars/sedan/${car.image}`}
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

        {sedanCars.length === 0 && (
          <p className="text-center text-gray-400">
            No sedan cars available at the moment. Please check back later.
          </p>
        )}
      </div>
    </Layout>
  )
}