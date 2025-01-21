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

// Base path for image URLs
const BASE_PATH = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cars`

// Filter SUVs from the car list
const suvCars = cars.filter(car => car.category === 'SUVs')

// Brand logos for SUVs
const brandLogos = [
  { name: "Range Rover", logo: `${BASE_PATH}/range-rover/range-rover-logo.png` },
  { name: "Mercedes", logo: `${BASE_PATH}/mercedes/mercedes-logo.png` },
  { name: "BMW", logo: `${BASE_PATH}/bmw/bmw-logo.png` },
  { name: "Cadillac", logo: `${BASE_PATH}/cadillac/cadillac-logo.png` },
  { name: "Porsche", logo: `${BASE_PATH}/porsche/porsche-logo.png` },
]

// FAQs for the SUV fleet page
const faqItems = [
  {
    question: "What are the advantages of renting an SUV?",
    answer: "SUVs offer spacious interiors, higher ground clearance, and often come with advanced safety features. They're ideal for family trips, outdoor adventures, or when you need extra cargo space.",
  },
  {
    question: "Are luxury SUVs available for rent?",
    answer: "Yes, we offer a range of luxury SUVs from premium brands. These vehicles combine the practicality of an SUV with high-end features and comfort.",
  },
  {
    question: "Can I rent an SUV for off-road adventures?",
    answer: "While many of our SUVs are capable of light off-road driving, we recommend discussing your specific plans with our team to ensure you get the right vehicle for your needs.",
  },
]

// Experience categories for SUVs
const experienceCategories = [
  { name: "City Exploration", image: `${BASE_PATH}/experiences/city-exploration.jpg` },
  { name: "Road Trips", image: `${BASE_PATH}/experiences/road-trips.jpg` },
  { name: "Family Vacations", image: `${BASE_PATH}/experiences/family-vacations.jpg` },
  { name: "Outdoor Adventures", image: `${BASE_PATH}/experiences/outdoor-adventures.jpg` },
]

// YouTube video thumbnails for SUVs
const youtubeVideos = [
  { title: "Range Rover Sport Review", thumbnail: `${BASE_PATH}/youtube/range-rover-sport-thumb.jpg` },
  { title: "Mercedes GLS vs BMW X7", thumbnail: `${BASE_PATH}/youtube/gls-x7-comparison-thumb.jpg` },
  { title: "Top 5 Luxury SUVs of 2023", thumbnail: `${BASE_PATH}/youtube/top-5-luxury-suvs-thumb.jpg` },
]

// Car gallery images for SUVs
const carGallery = [
  `${BASE_PATH}/gallery/suv-gallery-1.jpg`,
  `${BASE_PATH}/gallery/suv-gallery-2.jpg`,
  `${BASE_PATH}/gallery/suv-gallery-3.jpg`,
  `${BASE_PATH}/gallery/suv-gallery-4.jpg`,
  `${BASE_PATH}/gallery/suv-gallery-5.jpg`,
  `${BASE_PATH}/gallery/suv-gallery-6.jpg`,
  `${BASE_PATH}/gallery/suv-gallery-7.jpg`,
  `${BASE_PATH}/gallery/suv-gallery-8.jpg`,
]

export default function SUVFleetPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Fleet', href: '/fleet' },
            { label: 'SUVs', href: '/fleet/cars/suv' },
          ]} />
          <h1 className="text-4xl font-bold mb-8 mt-4 text-center">SUV Fleet</h1>

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

          {/* SUV Cars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {suvCars.map((car) => (
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

          {/* SUV Experience Section */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">EXPERIENCE VERSATILITY AND COMFORT</h2>
            <p className="mb-4">Discover the perfect blend of luxury, space, and capability with our SUV fleet.</p>
            <p className="mb-4">From compact crossovers to full-size luxury SUVs, we have the ideal vehicle for your needs.</p>
            <p className="mb-4">Whether you're planning a family vacation or a business trip, our SUVs provide comfort and versatility for any journey.</p>
            <p>Experience the road with confidence and style in a GreyZone Exotics SUV.</p>
          </section>

          {/* Brands Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">FEATURED SUV BRANDS</h2>
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
            <h2 className="text-3xl font-bold mb-4">ELEVATE YOUR JOURNEY WITH OUR SUV FLEET</h2>
            <p className="mb-8">Experience the perfect combination of luxury, space, and capability. Book your SUV today and transform your travel into an extraordinary adventure.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Reserve Your SUV
            </Button>
          </section>

          {/* Experience Categories Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">SUV EXPERIENCES</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">SUBSCRIBE TO OUR SUV CHANNEL!</h2>
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
                  alt={`SUV ${index + 1}`}
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
