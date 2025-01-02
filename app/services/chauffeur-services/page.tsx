'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, Star, Clock, Car, MapPin, Users, Award, ChevronRight, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

const services = [
  {
    title: "Airport Transfers",
    description: "Punctual and luxurious airport transportation",
    image: "/images/services/airport-transfer.jpg",
    features: ["Flight tracking", "Meet & greet", "Luggage assistance"]
  },
  {
    title: "Corporate Service",
    description: "Premium transportation for business professionals",
    image: "/images/services/corporate.jpg",
    features: ["Professional drivers", "Wi-Fi equipped", "Corporate accounts"]
  },
  {
    title: "Wedding Service",
    description: "Make your special day truly memorable",
    image: "/images/services/wedding.jpg",
    features: ["Decorated vehicles", "Photo opportunities", "Red carpet service"]
  },
  {
    title: "City Tours",
    description: "Explore Los Angeles in ultimate comfort",
    image: "/images/services/city-tour.jpg",
    features: ["Customized routes", "Knowledgeable guides", "Flexible duration"]
  }
]

const features = [
  {
    icon: Shield,
    title: "Professional Chauffeurs",
    description: "Highly trained, background-checked, and professionally attired drivers"
  },
  {
    icon: Star,
    title: "Premium Fleet",
    description: "Luxury vehicles maintained to the highest standards"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock service for all your transportation needs"
  },
  {
    icon: MapPin,
    title: "Global Coverage",
    description: "Service available in major cities worldwide"
  }
]

const testimonials = [
  {
    text: "The most professional chauffeur service I've experienced. Punctual, courteous, and luxurious.",
    author: "James Wilson",
    role: "CEO, Tech Industries"
  },
  {
    text: "Our wedding day was perfect thanks to their amazing service. The attention to detail was outstanding.",
    author: "Sarah & Michael",
    role: "Newlyweds"
  },
  {
    text: "Regular user for business travel. Consistently excellent service every time.",
    author: "Linda Chen",
    role: "Executive Director"
  }
]

export default function ChauffeurServicesPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Chauffeur Services', href: '/services/chauffeur-services' },
          ]} />

          {/* Hero Section */}
          <section className="relative h-[70vh] mb-16 rounded-xl overflow-hidden">
            <Image
              src="/images/chauffeur-hero.jpg"
              alt="Luxury Chauffeur Service"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
              <div className="h-full flex flex-col justify-center max-w-2xl px-8">
                <h1 className="text-5xl font-bold mb-6">
                  Luxury Chauffeur Services
                </h1>
                <p className="text-xl mb-8">
                  Experience the pinnacle of professional transportation
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Book Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Service Description */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-900/40 via-blue-900/20 to-black/40 p-12 rounded-xl backdrop-blur">
              <h2 className="text-4xl font-bold mb-8 text-center">ELEVATE YOUR JOURNEY</h2>
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-lg leading-relaxed text-gray-300">
                  Welcome to the epitome of luxury ground transportation. Our chauffeur service combines sophisticated vehicles with professional drivers to deliver an unparalleled travel experience. Whether for business or pleasure, our commitment to excellence ensures every journey exceeds expectations.
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  From airport transfers to special events, our chauffeurs are more than drivers – they are hospitality professionals dedicated to your comfort and safety. Each journey is meticulously planned and executed with attention to every detail.
                </p>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">OUR SERVICES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div key={service.title} className="bg-gray-900 rounded-xl overflow-hidden group">
                  <div className="relative h-64">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="text-blue-500 mr-2" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Learn More</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">WHY CHOOSE US</h2>
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

          {/* Testimonials */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">CLIENT TESTIMONIALS</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-900 p-6 rounded-xl">
                  <p className="italic mb-4">{testimonial.text}</p>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-800 p-16 rounded-xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Experience Excellence?</h2>
            <p className="text-xl mb-8">Book your luxury chauffeur service today</p>
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