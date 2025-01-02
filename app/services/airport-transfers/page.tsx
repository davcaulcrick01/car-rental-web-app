'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin, Shield, Plane, Car, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

const features = [
  {
    icon: Clock,
    title: "24/7 Service",
    description: "Available round-the-clock for all your airport transfer needs"
  },
  {
    icon: MapPin,
    title: "Flight Tracking",
    description: "Real-time flight monitoring to ensure timely pickup"
  },
  {
    icon: Shield,
    title: "Professional Drivers",
    description: "Licensed, vetted, and professionally trained chauffeurs"
  },
  {
    icon: Car,
    title: "Luxury Fleet",
    description: "Choose from our selection of premium vehicles"
  }
]

const airports = [
  {
    name: "LAX International",
    image: "/images/airports/lax.jpg",
    description: "Premier service at Los Angeles International Airport"
  },
  {
    name: "John Wayne Airport",
    image: "/images/airports/sna.jpg",
    description: "Seamless transfers at Orange County's main airport"
  },
  {
    name: "Long Beach Airport",
    image: "/images/airports/lgb.jpg",
    description: "Efficient service at Long Beach's convenient airport"
  },
  {
    name: "Hollywood Burbank",
    image: "/images/airports/bur.jpg",
    description: "Quick access to the San Fernando Valley"
  }
]

export default function AirportTransfersPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Airport Transfers', href: '/services/airport-transfers' },
          ]} />

          {/* Hero Section */}
          <section className="relative h-[70vh] mb-16 rounded-xl overflow-hidden">
            <Image
              src="/images/airport-transfer-hero.jpg"
              alt="Luxury Airport Transfer"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
              <div className="h-full flex flex-col justify-center max-w-2xl px-8">
                <h1 className="text-5xl font-bold mb-6">
                  Luxury Airport Transfers
                </h1>
                <p className="text-xl mb-8">
                  Begin and end your journey in ultimate comfort and style
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Book Transfer
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    View Services
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Service Description */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-900/40 via-blue-900/20 to-black/40 p-12 rounded-xl backdrop-blur">
              <h2 className="text-4xl font-bold mb-8 text-center">SEAMLESS AIRPORT TRANSFERS</h2>
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-lg leading-relaxed text-gray-300">
                  Experience the pinnacle of airport transfer services with our luxury fleet and professional chauffeurs. We understand that every minute counts when it comes to air travel, which is why we've crafted a service that prioritizes punctuality, comfort, and style.
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  Our dedicated team monitors your flight in real-time, ensuring your chauffeur is ready when you are. From curbside pickup to your final destination, enjoy a journey that's as luxurious as it is efficient.
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">WHY CHOOSE OUR SERVICE</h2>
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

          {/* Airports Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">AIRPORTS WE SERVE</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {airports.map((airport) => (
                <div key={airport.name} className="relative group overflow-hidden rounded-xl">
                  <Image
                    src={airport.image}
                    alt={airport.name}
                    width={600}
                    height={300}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold mb-2">{airport.name}</h3>
                    <p className="text-gray-300">{airport.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-800 p-16 rounded-xl">
            <h2 className="text-4xl font-bold mb-4">Ready for Your Transfer?</h2>
            <p className="text-xl mb-8">Book your luxury airport transfer today</p>
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