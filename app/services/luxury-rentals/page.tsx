'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, Star, Clock, Car, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

const luxuryBrands = [
  { name: "Rolls-Royce", logo: "/images/brands/rolls-royce.png" },
  { name: "Bentley", logo: "/images/brands/bentley.png" },
  { name: "Mercedes-Maybach", logo: "/images/brands/maybach.png" },
  { name: "Aston Martin", logo: "/images/brands/aston-martin.png" },
]

const features = [
  {
    icon: Shield,
    title: "Premium Insurance",
    description: "Comprehensive coverage for peace of mind.",
  },
  {
    icon: Star,
    title: "Concierge Service",
    description: "24/7 dedicated luxury concierge.",
  },
  {
    icon: Clock,
    title: "Flexible Duration",
    description: "From daily to monthly rentals.",
  },
  {
    icon: Car,
    title: "Door-to-Door Delivery",
    description: "Complimentary delivery to your location.",
  },
]

const testimonials = [
  {
    name: "John Doe",
    feedback: "The service was exceptional and the car was immaculate. A truly luxurious experience!",
    image: "/images/testimonials/john-doe.jpg",
  },
  {
    name: "Jane Smith",
    feedback: "Seamless booking process and outstanding customer support. Highly recommend!",
    image: "/images/testimonials/jane-smith.jpg",
  },
]

const specialOffers = [
  {
    title: "Weekend Getaway",
    description: "Enjoy a 20% discount on all rentals booked for the weekend.",
    image: "/images/offers/weekend-getaway.jpg",
  },
  {
    title: "Extended Luxury",
    description: "Book for 7 days or more and receive an additional day free.",
    image: "/images/offers/extended-luxury.jpg",
  },
]

export default function LuxuryRentalsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Luxury Rentals", href: "/services/luxury-rentals" },
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
              <source src="/videos/luxury-cars.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
              <div className="h-full flex flex-col justify-center items-start px-8 md:px-16 text-white">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                  Experience Unparalleled Luxury
                </h1>
                <p className="text-lg md:text-2xl mb-8 max-w-xl">
                  Indulge in our curated collection of the world's finest
                  automobiles.
                </p>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 px-8 py-4"
                  >
                    View Fleet
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black px-8 py-4"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Vehicles Carousel */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Featured Vehicles
            </h2>
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-4">
                    <Image
                      src="/images/featured-car-1.jpg"
                      alt="Featured Car"
                      width={600}
                      height={400}
                      className="rounded-xl"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-4">
                    <Image
                      src="/images/featured-car-2.jpg"
                      alt="Featured Car"
                      width={600}
                      height={400}
                      className="rounded-xl"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* Testimonials Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="bg-gray-800 p-8 rounded-lg text-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-300 italic">"{testimonial.feedback}"</p>
                  <h3 className="text-lg font-bold mt-4">{testimonial.name}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Special Offers Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specialOffers.map((offer) => (
                <div key={offer.title} className="relative bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-64"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4">
                    <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                    <p className="text-gray-300 mb-4">{offer.description}</p>
                    <Button className="bg-green-600 hover:bg-green-700">Book Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
