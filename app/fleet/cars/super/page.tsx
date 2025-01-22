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

const superCars = cars.filter(car => car.category === 'super')

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

export default function SuperCarFleetPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Fleet', href: '/fleet' },
            { label: 'Super Cars', href: '/fleet/cars/super' },
          ]} />
          <h1 className="text-4xl font-bold mb-8 mt-4 text-center">Super Car Fleet</h1>

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

          {/* Super Cars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {superCars.map((car) => (
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

          {/* Super Car Experience Section */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">EXPERIENCE UNPARALLELED PERFORMANCE</h2>
            <p className="mb-4">Unleash the power of engineering excellence with our super car fleet.</p>
            <p className="mb-4">From blistering acceleration to precise handling, our collection features the pinnacle of automotive performance.</p>
            <p className="mb-4">Whether it's for a track day or to make a statement on the streets, our super cars promise an adrenaline-fueled experience.</p>
            <p>Experience the thrill of cutting-edge technology and design with GreyZone Exotics.</p>
          </section>

          {/* Brands Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">SUPER CAR BRANDS</h2>
            <p className="text-center mb-8">Explore our collection of elite super car brands:</p>
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
            <h2 className="text-3xl font-bold mb-4">UNLEASH THE POWER OF SUPER CARS</h2>
            <p className="mb-8">Experience the pinnacle of automotive engineering. Book your super car today and elevate your driving to new heights.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Reserve Your Super Car
            </Button>
          </section>

          {/* Experience Categories Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">SUPER CAR EXPERIENCES</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">SUBSCRIBE TO OUR SUPER CAR CHANNEL!</h2>
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
                  alt={`Super Car ${index + 1}`}
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