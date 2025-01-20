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
import Layout from '@/components/Layout'
import { fleetCategories } from '@/lib/constants'

const featuredCars = [
  { id: 1, name: "AUDI R8", image: "/images/audi/audi-r8-spyder-white-1.jpg" },
  { id: 2, name: "FERARRI 488", image: "/images/ferrari/ferarri-488-white-1.jpg" },
  { id: 3, name: "MERCEDES BENZ GLE53", image: "/images/mercedes/mercedes-gle53-black-1.webp" },
  { id: 4, name: "LAMBORGHINI URUS", image: "/images/lamborghini/lamborghini-urus-yellow-1.webp" },
  { id: 5, name: "ROLLS ROYCE GHOST", image: "/images/rolls-royce/rolls-royce-ghost-white-1.jpg" },
  { id: 6, name: "MERCEDES BENZ G63", image: "/images/mercedes/mercedes-G63-black-1.webp" },
]

const experienceCategories = [
  { name: "DALLAS EXPERIENCE", image: "/images/dallas-travel.avif" },
  { name: "HOURLY DRIVES", image: "/images/hourly-drives.jpg" },
  { name: "24 HOUR RENTALS", image: "/images/24-hour-service.avif" },
  { name: "HOT DEALS", image: "/images/hot-deals.jpg" },
]

const brandLogos = [
  { name: "Mercedes", logo: "/images/mercedes/mercedes-logo.png" },
  { name: "BMW", logo: "/images/bmw/bmw-logo.png" },
  { name: "McLaren", logo: "/images/mclaren/mclaren-logo.png" },
  { name: "Lamborghini", logo: "/images/lamborghini/lamborghini-logo.png" },
  { name: "Porsche", logo: "/images/porsche/porsche-logo.png" },
  { name: "Rolls Royce", logo: "/images/rolls-royce/rolls-royce-logo.png" },
  { name: "Jeep", logo: "/images/jeep/jeep-logo.png" },
  { name: "SRT", logo: "/images/srt/srt-logo.png" },
  { name: "Cadillac", logo: "/images/cadillac/cadillac-logo.png" },
  { name: "Bentley", logo: "/images/bentley/bentley-logo.png" },
  { name: "Range Rover", logo: "/images/range-rover/range-rover-logo.png" },
  { name: "Corvette", logo: "/images/corvette/corvette-logo.png" },
  { name: "RAM", logo: "/images/ram/ram-logo.png" },
  { name: "Maserati", logo: "/images/maserati/maserati-logo.png" },
  { name: "Tesla", logo: "/images/tesla/tesla-logo.png" },
  { name: "Bentley", logo: "/images/bentley/bentley-logo.png" },
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

const faqItems = [
  {
    question: "Can international drivers rent exotic cars in the USA?",
    answer: "Yes, international drivers can rent exotic cars in the USA. You'll need a valid driver's license from your home country, a passport, and in some cases, an International Driving Permit."
  },
  {
    question: "In what condition am I required to return the vehicle?",
    answer: "You should return the vehicle in the same condition you received it, with a full tank of fuel. Any damage or excessive wear will be your responsibility."
  },
  {
    question: "How does renting a Lamborghini work?",
    answer: "Renting a Lamborghini is similar to renting any other car, but with additional requirements due to the car's value. You'll need to be at least 25 years old, have a valid driver's license, provide proof of full coverage insurance, and leave a security deposit."
  },
  {
    question: "What are the requirements to rent?",
    answer: "Generally, you must be at least 25 years old, have a valid driver's license, provide proof of full coverage insurance, and have a clean driving record. Some exotic car rentals may have additional requirements."
  },
  {
    question: "Does 777 Exotics have hourly car rentals?",
    answer: "Yes, we offer hourly rentals for many of our exotic and luxury vehicles. This is perfect for photo shoots, special events, or just a few hours of driving excitement."
  },
]

export default function FleetPage() {
  const [selectedCategory, setSelectedCategory] = useState(fleetCategories[0].name)

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Our Fleet</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleetCategories.map((category) => (
            <div key={category.name} className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-400 mb-4">{category.description}</p>
                <Link href={category.link}>
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    View Cars
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}