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

const classicCars = cars.filter(car => car.category === 'classic')

const brandLogos = [
  { name: "Ford", logo: `${process.env.NEXT_PUBLIC_CDN_URL}/images/ford/ford-logo.png` },
  { name: "Chevrolet", logo: `${process.env.NEXT_PUBLIC_CDN_URL}/images/chevrolet/chevrolet-logo.png` },
  { name: "Cadillac", logo: `${process.env.NEXT_PUBLIC_CDN_URL}/images/cadillac/cadillac-logo.png` },
  { name: "Pontiac", logo: `${process.env.NEXT_PUBLIC_CDN_URL}/images/pontiac/pontiac-logo.png` },
  { name: "Oldsmobile", logo: `${process.env.NEXT_PUBLIC_CDN_URL}/images/oldsmobile/oldsmobile-logo.png` },
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
  { name: "VINTAGE DRIVES", image: `${process.env.NEXT_PUBLIC_CDN_URL}/images/vintage-drives.jpg` },
  { name: "CLASSIC CAR SHOWS", image: `${process.env.NEXT_PUBLIC_CDN_URL}/images/classic-car-shows.jpg` },
  { name: "RETRO ROAD TRIPS", image: `${process.env.NEXT_PUBLIC_CDN_URL}/images/retro-road-trips.jpg` },
  { name: "NOSTALGIC TOURS", image: `${process.env.NEXT_PUBLIC_CDN_URL}/images/nostalgic-tours.jpg` },
]

const youtubeVideos = [
  { title: "1957 Chevrolet Bel Air", thumbnail: `${process.env.NEXT_PUBLIC_CDN_URL}/images/57-chevy-thumb.jpg` },
  { title: "1965 Ford Mustang", thumbnail: `${process.env.NEXT_PUBLIC_CDN_URL}/images/65-mustang-thumb.jpg` },
  { title: "1959 Cadillac Eldorado", thumbnail: `${process.env.NEXT_PUBLIC_CDN_URL}/images/59-cadillac-thumb.jpg` },
]

const carGallery = [
  `${process.env.NEXT_PUBLIC_CDN_URL}/images/classic-gallery-1.jpg`,
  `${process.env.NEXT_PUBLIC_CDN_URL}/images/classic-gallery-2.jpg`,
  `${process.env.NEXT_PUBLIC_CDN_URL}/images/classic-gallery-3.jpg`,
  `${process.env.NEXT_PUBLIC_CDN_URL}/images/classic-gallery-4.jpg`,
  `${process.env.NEXT_PUBLIC_CDN_URL}/images/classic-gallery-5.jpg`,
  `${process.env.NEXT_PUBLIC_CDN_URL}/images/classic-gallery-6.jpg`,
  `${process.env.NEXT_PUBLIC_CDN_URL}/images/classic-gallery-7.jpg`,
  `${process.env.NEXT_PUBLIC_CDN_URL}/images/classic-gallery-8.jpg`,
]

export default function ClassicCarsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Fleet', href: '/fleet' },
            { label: 'Classic Cars', href: '/fleet/cars/classic' },
          ]} />
          <h1 className="text-4xl font-bold mb-8 mt-4 text-center">Classic Cars</h1>

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

          {/* Classic Cars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {classicCars.map((car) => (
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

          {/* Classic Car Experience Section */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">EXPERIENCE TIMELESS ELEGANCE</h2>
            <p className="mb-4">Step back in time with our collection of meticulously maintained classic cars.</p>
            <p className="mb-4">From iconic American muscle to elegant European classics, our fleet represents the golden age of automotive design.</p>
            <p className="mb-4">Whether it's for a special occasion or a nostalgic cruise, our classic cars promise an unforgettable journey through automotive history.</p>
            <p>Experience the charm, style, and character of a bygone era with GreyZone Classics.</p>
          </section>

          {/* Brands Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">CLASSIC BRANDS</h2>
            <p className="text-center mb-8">Explore our collection of iconic classic car brands:</p>
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
            <h2 className="text-3xl font-bold mb-4">RELIVE THE GOLDEN AGE OF AUTOMOBILES</h2>
            <p className="mb-8">Experience the nostalgia and craftsmanship of classic cars. Book your vintage ride today and cruise through history in style.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Reserve Your Classic Car
            </Button>
          </section>

          {/* Experience Categories Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">CLASSIC CAR EXPERIENCES</h2>
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
            <h2 className="text-3xl font-bold mb-8 text-center">SUBSCRIBE TO OUR CLASSIC CAR CHANNEL!</h2>
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
                  alt={`Classic Car ${index + 1}`}
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