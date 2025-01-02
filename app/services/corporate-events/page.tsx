'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Building, Users, Calendar, Shield, Award, ChevronRight, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

const services = [
  {
    title: "Executive Transportation",
    description: "Premium fleet service for corporate executives and VIP clients",
    image: "/images/services/executive-transport.jpg",
    features: ["Dedicated chauffeur", "Wi-Fi enabled vehicles", "Privacy assured"]
  },
  {
    title: "Corporate Events",
    description: "Fleet management for conferences, meetings, and corporate gatherings",
    image: "/images/services/corporate-events.jpg",
    features: ["Multiple vehicle coordination", "Professional staff", "Custom branding"]
  },
  {
    title: "Airport Transfers",
    description: "Reliable airport transportation for business travelers",
    image: "/images/services/airport-corporate.jpg",
    features: ["Flight tracking", "Meet & greet", "24/7 availability"]
  },
  {
    title: "Roadshows",
    description: "Comprehensive transportation for multi-city business tours",
    image: "/images/services/roadshow.jpg",
    features: ["Multi-city coordination", "Flexible scheduling", "Dedicated coordinator"]
  }
]

const features = [
  {
    icon: Building,
    title: "Corporate Accounts",
    description: "Dedicated account management and customized billing solutions"
  },
  {
    icon: Users,
    title: "Group Transportation",
    description: "Seamless coordination for large corporate groups"
  },
  {
    icon: Calendar,
    title: "Event Planning",
    description: "Expert assistance with transportation logistics"
  },
  {
    icon: Shield,
    title: "Security Options",
    description: "Enhanced security protocols for VIP clients"
  }
]

const testimonials = [
  {
    text: "Their corporate service has been invaluable for our executive team. Reliable, professional, and always punctual.",
    author: "Michael Chen",
    role: "Director of Operations, Tech Global"
  },
  {
    text: "The level of service for our corporate events has been exceptional. They handle everything flawlessly.",
    author: "Sarah Williams",
    role: "Event Manager, Fortune 500"
  },
  {
    text: "A trusted partner for all our corporate transportation needs. Their attention to detail is unmatched.",
    author: "David Thompson",
    role: "CEO, Investment Corp"
  }
]

export default function CorporateEventsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Corporate Events', href: '/services/corporate-events' },
          ]} />

          {/* Hero Section */}
          <section className="relative h-[70vh] mb-16 rounded-xl overflow-hidden">
            <Image
              src="/images/corporate-hero.jpg"
              alt="Corporate Transportation Services"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent">
              <div className="h-full flex flex-col justify-center max-w-2xl px-8">
                <h1 className="text-5xl font-bold mb-6">
                  ELEVATE YOUR CORPORATE TRAVEL
                </h1>
                <p className="text-xl mb-8">
                  Premium transportation solutions tailored for business excellence
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Our Services
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Service Description */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-900/40 via-blue-900/20 to-black/40 p-12 rounded-xl backdrop-blur">
              <h2 className="text-4xl font-bold mb-8 text-center">CORPORATE EXCELLENCE</h2>
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-lg leading-relaxed text-gray-300">
                  We understand that corporate transportation requires more than just vehicles – it demands reliability, professionalism, and attention to detail. Our corporate services are designed to meet the exacting standards of business professionals and organizations.
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  From executive transportation to large-scale event logistics, our team ensures seamless coordination and impeccable service. We offer customized solutions that align with your corporate identity and requirements.
                </p>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">OUR CORPORATE SOLUTIONS</h2>
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
            <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Corporate Travel?</h2>
            <p className="text-xl mb-8">Contact us to discuss your corporate transportation needs</p>
            <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100">
              Get Started <ChevronRight className="ml-2" />
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}