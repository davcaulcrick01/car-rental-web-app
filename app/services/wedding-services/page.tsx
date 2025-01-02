'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Calendar, Clock, Star, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

const weddingPackages = [
  {
    title: "Classic Elegance",
    description: "Perfect for traditional weddings",
    image: "/images/wedding/classic.jpg",
    features: ["Rolls-Royce Phantom", "4 hours service", "Decorated vehicle"]
  },
  {
    title: "Modern Luxury",
    description: "Contemporary style for modern couples",
    image: "/images/wedding/modern.jpg",
    features: ["Mercedes-Maybach", "6 hours service", "Champagne service"]
  },
  {
    title: "Exotic Romance",
    description: "Make a bold statement",
    image: "/images/wedding/exotic.jpg",
    features: ["Lamborghini Urus", "Full day rental", "Photo session"]
  },
  {
    title: "Royal Experience",
    description: "The ultimate in wedding luxury",
    image: "/images/wedding/royal.jpg",
    features: ["Bentley Flying Spur", "8 hours service", "Red carpet service"]
  }
]

const carouselItems = [
  {
    image: "/images/wedding/car1.jpg",
    title: "Rolls-Royce Phantom",
    description: "The epitome of luxury and elegance"
  },
  {
    image: "/images/wedding/car2.jpg",
    title: "Bentley Flying Spur",
    description: "Classic British luxury"
  },
  {
    image: "/images/wedding/car3.jpg",
    title: "Mercedes-Maybach S-Class",
    description: "Modern sophistication"
  },
  // Add more items as needed
]

export default function WeddingServicesPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Wedding Services", href: "/services/wedding-services" },
            ]}
          />

          {/* Hero Section */}
          <section className="relative h-[80vh] mb-20 rounded-xl overflow-hidden">
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/wedding-cars.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
              <div className="h-full flex flex-col justify-center items-start px-8 md:px-16 text-white">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                  Your Perfect Wedding Car
                </h1>
                <p className="text-lg md:text-2xl mb-8 max-w-xl">
                  Make your special day even more memorable with our luxury wedding car service.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4">
                    View Packages
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Wedding Packages */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">WEDDING PACKAGES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {weddingPackages.map((package_) => (
                <div key={package_.title} className="bg-gray-900 rounded-xl overflow-hidden group">
                  <div className="relative h-64">
                    <Image
                      src={package_.image}
                      alt={package_.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{package_.title}</h3>
                    <p className="text-gray-400 mb-4">{package_.description}</p>
                    <ul className="space-y-2 mb-6">
                      {package_.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Heart className="text-red-500 mr-2" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Inquire Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Wedding Cars Carousel */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Wedding Fleet</h2>
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="relative h-64 rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">WHY CHOOSE US</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Luxury Fleet</h3>
                <p>Choose from our collection of prestigious vehicles, perfect for your wedding day.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Professional Service</h3>
                <p>Our experienced chauffeurs ensure a smooth and elegant experience.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">Customized Experience</h3>
                <p>We tailor every detail to match your wedding theme and preferences.</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-800 p-16 rounded-xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Plan Your Wedding Transportation?</h2>
            <p className="text-xl mb-8">Let us help make your special day perfect</p>
            <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100">
              Schedule Consultation <ChevronRight className="ml-2" />
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}