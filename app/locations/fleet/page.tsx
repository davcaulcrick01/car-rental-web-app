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

export const fleetCategories = [
  { name: "Classic Cars", path: "/fleet/cars/classic" },
  { name: "Luxury Fleet", path: "/fleet/cars/luxury" },
  { name: "Sedans", path: "/fleet/cars/sedan" },
  { name: "Convertibles", path: "/fleet/cars/convertible" },
  { name: "Super Cars", path: "/fleet/cars/super" },
  { name: "Sport Cars", path: "/fleet/cars/sport" },
  { name: "SUVs", path: "/fleet/cars/suv" },
  { name: "Exotic Cars", path: "/fleet/cars/exotic" }
]

const featuredCars = [
  { id: 1, name: "AUDI R8", image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/audi/audi-r8-spyder-white-1.jpg`},
  { id: 2, name: "FERARRI 488", image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/ferrari/ferarri-488-white-1.jpg` }, 
  { id: 3, name: "MERCEDES BENZ GLE53", image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/mercedes/mercedes-gle53-black-1.webp` },
  { id: 4, name: "LAMBORGHINI URUS", image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/lamborghini/lamborghini-urus-yellow-1.webp` },
  { id: 5, name: "ROLLS ROYCE GHOST", image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/rolls-royce/rolls-royce-ghost-white-1.jpg` },
  { id: 6, name: "MERCEDES BENZ G63", image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/mercedes/mercedes-G63-black-1.webp` },
]

const experienceCategories = [
  { name: "DALLAS EXPERIENCE", image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/dallas-travel.avif` },
  { name: "HOURLY DRIVES", image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/hourly-drives.jpg` },
  { name: "24 HOUR RENTALS", image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/24-hour-service.avif` },
  { name: "HOT DEALS", image: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/hot-deals.jpg` },
]

const brandLogos = [
  { name: "Mercedes", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/mercedes/mercedes-logo.png` },
  { name: "BMW", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/bmw/bmw-logo.png` },
  { name: "McLaren", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/mclaren/mclaren-logo.png` },
  { name: "Lamborghini", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/lamborghini/lamborghini-logo.png` },
  { name: "Porsche", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/porsche/porsche-logo.png` },
  { name: "Rolls Royce", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/rolls-royce/rolls-royce-logo.png` },
  { name: "Jeep", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/jeep/jeep-logo.png` },
  { name: "SRT", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/srt/srt-logo.png` },
  { name: "Cadillac", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/cadillac/cadillac-logo.png` },
  { name: "Bentley", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/bentley/bentley-logo.png` },
  { name: "Range Rover", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/range-rover/range-rover-logo.png` },
  { name: "Corvette", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/corvette/corvette-logo.png` },
  { name: "RAM", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/ram/ram-logo.png` },
  { name: "Maserati", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/maserati/maserati-logo.png` },
  { name: "Tesla", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/tesla/tesla-logo.png` },
  { name: "Bentley", logo: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/bentley/bentley-logo.png` },
]

const youtubeVideos = [
  { title: "Lamborghini Urus", thumbnail: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/lamborghini-urus-thumb.jpg` },
  { title: "Mercedes Benz G550", thumbnail: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/mercedes-g550-thumb.jpg` },
  { title: "Rolls Royce Wraith Black", thumbnail: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/rolls-royce-wraith-thumb.jpg` },
]

const carGallery = [
  "/images/lamborghini-aventador.jpg",
  "/images/lamborghini-centenario.jpg",
  "/images/lamborghini-huracan.jpg",
  "/images/mclaren.jpg",
  "/images/mercedes-G63.jpg",
  "/images/mercedes-gle-coupe.jpg",
  "/images/rollsroyce-cullinan.jpg",
  "/images/rollsroyce-phantom.jpg",
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
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">OUR FLEET</h1>

          {/* Search Cars Button */}
          <div className="text-center mb-8">
            <Link href="/fleet/fleet-search">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                Search Cars
              </Button>
            </Link>
          </div>

          {/* Fleet Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {fleetCategories.map((category) => (
              <Link key={category.name} href={category.path}>
                <Button
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className={`text-white border-white hover:bg-green-600 hover:text-white transition-colors ${
                    selectedCategory === category.name ? 'bg-green-600' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Featured Cars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredCars.map((car) => (
              <div key={car.id} className="bg-gray-900 rounded-lg overflow-hidden">
                <Image
                  src={car.image}
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
                    <Button className="bg-green-600 hover:bg-green-700">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Renting a Luxury Car Section */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">RENTING A LUXURY CAR IS EASY.</h2>
            <p className="mb-4">You can select from Lamborghini, Ferrari, Rolls Royce and even Classic Cars.</p>
            <p className="mb-4">We specialize in exotic car rentals that are a perfect fit for Los Angeles and Las Vegas.</p>
            <p className="mb-4">Selecting the perfect car for your wedding, prom or homecoming gives you the chance to create something special for yourself and your partner.</p>
            <p className="mb-4">Our chauffeur services are popular when you want to leave the driving to someone else.</p>
            <p>GreyZone Exotics is conveniently located near LAX airport and Beverly Hills. Our Las Vegas office is adjacent to the famous Strip and hotels.</p>
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

          {/* Brands Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">BRANDS</h2>
            <p className="text-center mb-8">Browse rental cars by brand:</p>
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

          {/* Call to Action */}
          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">WE INVITE YOU TO EXPERIENCE SOMETHING WONDERFUL WITH THE FINEST CARS IN THE WORLD.</h2>
            <p className="mb-8">Driving from Los Angeles to Las Vegas is a trip to remember. The desert has many views and unique places to stop along the historic Route 66.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Reserve Now
            </Button>
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