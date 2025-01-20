'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
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

const suvCars = cars.filter(car => car.category === 'SUVs')

const brandLogos = [
  { name: "Range Rover", logo: "/images/range-rover/range-rover-logo.png" },
  { name: "Mercedes", logo: "/images/mercedes/mercedes-logo.png" },
  { name: "BMW", logo: "/images/bmw/bmw-logo.png" },
  { name: "Cadillac", logo: "/images/cadillac/cadillac-logo.png" },
  { name: "Porsche", logo: "/images/porsche/porsche-logo.png" },
]

const faqItems = [
  {
    question: "What are the advantages of renting an SUV?",
    answer: "SUVs offer spacious interiors, higher ground clearance, and often come with advanced safety features. They're ideal for family trips, outdoor adventures, or when you need extra cargo space."
  },
  {
    question: "Are luxury SUVs available for rent?",
    answer: "Yes, we offer a range of luxury SUVs from premium brands. These vehicles combine the practicality of an SUV with high-end features and comfort."
  },
  {
    question: "Can I rent an SUV for off-road adventures?",
    answer: "While many of our SUVs are capable of light off-road driving, we recommend discussing your specific plans with our team to ensure you get the right vehicle for your needs."
  },
]

const experienceCategories = [
  { name: "CITY EXPLORATION", image: "/images/city-exploration.jpg" },
  { name: "ROAD TRIPS", image: "/images/road-trips.jpg" },
  { name: "FAMILY VACATIONS", image: "/images/family-vacations.jpg" },
  { name: "OUTDOOR ADVENTURES", image: "/images/outdoor-adventures.jpg" },
]

const youtubeVideos = [
  { title: "Range Rover Sport Review", thumbnail: "/images/range-rover-sport-thumb.jpg" },
  { title: "Mercedes GLS vs BMW X7", thumbnail: "/images/gls-x7-comparison-thumb.jpg" },
  { title: "Top 5 Luxury SUVs of 2023", thumbnail: "/images/top-5-luxury-suvs-thumb.jpg" },
]

const carGallery = [
  "/images/suv-gallery-1.jpg",
  "/images/suv-gallery-2.jpg",
  "/images/suv-gallery-3.jpg",
  "/images/suv-gallery-4.jpg",
  "/images/suv-gallery-5.jpg",
  "/images/suv-gallery-6.jpg",
  "/images/suv-gallery-7.jpg",
  "/images/suv-gallery-8.jpg",
]

export default function SUVCarsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Fleet", href: "/fleet" },
            { label: "SUV Cars", href: "/fleet/cars/suv" },
          ]}
        />

        <h1 className="text-4xl font-bold mb-8">SUV Cars</h1>
        
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {fleetCategories.map((category) => (
            <Link key={category.name} href={category.link}>
              <Button
                variant={category.name === "SUVs" ? "default" : "outline"}
                className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
                  category.name === "SUVs" ? 'bg-green-600' : ''
                }`}
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suvCars.map((car) => (
            <Card key={car.id} className="bg-gray-900 border-gray-800">
              <div className="relative h-48">
                <Image
                  src={car.images[0]}
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

        {suvCars.length === 0 && (
          <p className="text-center text-gray-400">
            No SUV cars available at the moment. Please check back later.
          </p>
        )}
      </div>
    </Layout>
  )
}