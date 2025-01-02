'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Map, Star, Camera, Navigation, ChevronRight, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

const tourPackages = [
  {
    title: "Dallas Supercar Experience",
    description: "Drive through iconic LA locations in a supercar of your choice",
    image: "/images/tours/la-supercar.jpg",
    features: ["4-hour duration", "Professional photographer", "Multiple car switches"]
  },
  {
    title: "Dallas Coastal Run",
    description: "Experience Pacific Coast Highway in exotic vehicles",
    image: "/images/tours/malibu-coast.jpg",
    features: ["Scenic route", "Lunch included", "Photo opportunities"]
  },
  {
    title: "DFW Luxury Tour",
    description: "Tour beautiful homes and luxury shopping districts",
    image: "/images/tours/beverly-hills.jpg",
    features: ["Celebrity homes", "Shopping stops", "Luxury experience"]
  },
  {
    title: "Downtown Adventure",
    description: "Night tour of Dallas most famous district",
    image: "/images/tours/sunset-strip.jpg",
    features: ["Evening tour", "Nightlife spots", "City lights"]
  }
]

const features = [
    {
      icon: Navigation,
      title: "Curated Routes",
      description: "Carefully planned routes showcasing LA's best views and attractions"
    },
    {
      icon: Camera,
      title: "Photo Package",
      description: "Professional photography to capture your exotic car experience"
    },
    {
      icon: Star,
      title: "VIP Treatment",
      description: "Access to exclusive locations and premium experiences"
    },
    {
      icon: Map,
      title: "Local Expertise",
      description: "Knowledgeable guides sharing insider tips and stories"
    }
  ]

export default function ExoticToursPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Exotic Tours', href: '/services/exotic-tours' },
          ]} />

          {/* Hero Section */}
          <section className="relative h-[70vh] mb-16 rounded-xl overflow-hidden">
            <Image
              src="/images/tours/exotic-tour-hero.jpg"
              alt="Exotic Car Tours"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
              <div className="h-full flex flex-col justify-center max-w-2xl px-8">
                <h1 className="text-5xl font-bold mb-6">
                  Experience LA in Style
                </h1>
                <p className="text-xl mb-8">
                  Discover Los Angeles behind the wheel of the world's most exclusive cars
                </p>
                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    View Tours
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Description */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-900/40 via-blue-900/20 to-black/40 p-12 rounded-xl backdrop-blur">
              <h2 className="text-4xl font-bold mb-8 text-center">UNFORGETTABLE EXOTIC CAR EXPERIENCES</h2>
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-lg leading-relaxed text-gray-300">
                  Combine the thrill of driving exotic supercars with guided tours of Los Angeles' most iconic locations. Our exotic car tours offer an unparalleled way to experience the city, whether you're cruising down Sunset Boulevard or taking in ocean views on the Pacific Coast Highway.
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  Each tour is carefully curated to showcase the best of LA while putting you behind the wheel of the world's most exclusive vehicles. From Ferrari to Lamborghini, choose your dream car and let our expert guides show you the city like never before.
                </p>
              </div>
            </div>
          </section>

          {/* Tour Packages */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">SIGNATURE TOURS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tourPackages.map((tour) => (
                <div key={tour.title} className="bg-gray-900 rounded-xl overflow-hidden group">
                  <div className="relative h-64">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{tour.title}</h3>
                    <p className="text-gray-400 mb-4">{tour.description}</p>
                    <ul className="space-y-2 mb-6">
                      {tour.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="text-blue-500 mr-2" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Tour</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">THE EXOTIC TOURS DIFFERENCE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Experience LA Section - Similar to LuxuryFleetPage */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">FEATURED LOCATIONS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Reunion Tower', 'Dallas Downtown', 'Dallas Museum of Art', 'Downtown DFW'].map((location) => (
                <div key={location} className="relative group cursor-pointer">
                  <Image
                    src={`/images/locations/${location.toLowerCase().replace(' ', '-')}.jpg`}
                    alt={location}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-xl font-bold text-white">{location}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-800 p-16 rounded-xl">
            <h2 className="text-4xl font-bold mb-4">Ready for an Unforgettable Experience?</h2>
            <p className="text-xl mb-8">Book your exotic car tour today</p>
            <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100">
              Reserve Now <ChevronRight className="ml-2" />
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}