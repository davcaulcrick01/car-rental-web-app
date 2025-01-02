'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Camera, Star, Clock, Users, Calendar, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

const photoshootPackages = [
  {
    title: "Fashion Editorial",
    description: "Perfect for fashion magazines and model portfolios",
    image: "/images/photoshoots/fashion.jpg",
    features: ["4-hour session", "Multiple car options", "Professional lighting"]
  },
  {
    title: "Commercial Production",
    description: "Ideal for advertising and commercial shoots",
    image: "/images/photoshoots/commercial.jpg",
    features: ["Full-day access", "Location permits", "Technical support"]
  },
  {
    title: "Social Media Content",
    description: "Create engaging content for your social platforms",
    image: "/images/photoshoots/social.jpg",
    features: ["2-hour session", "Multiple locations", "Quick turnaround"]
  },
  {
    title: "Automotive Showcase",
    description: "Specialized shoots for car dealers and collectors",
    image: "/images/photoshoots/automotive.jpg",
    features: ["Custom setup", "Detail shots", "Portfolio building"]
  }
]

export default function PhotoshootRentalsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Photoshoot Rentals", href: "/services/photoshoot-rentals" },
            ]}
          />

          {/* Hero Section - Similar to LuxuryRentalsPage */}
          <section className="relative h-[80vh] mb-20 rounded-xl overflow-hidden">
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/photoshoot.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
              <div className="h-full flex flex-col justify-center items-start px-8 md:px-16 text-white">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                  Capture Automotive Excellence
                </h1>
                <p className="text-lg md:text-2xl mb-8 max-w-xl">
                  Premium vehicles for your photography and video production needs.
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

          {/* Packages Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">PHOTOSHOOT PACKAGES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {photoshootPackages.map((package_) => (
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
                          <Star className="text-blue-500 mr-2" size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Now</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Work Carousel - Similar to LuxuryRentalsPage */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center">Featured Work</h2>
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent>
                {/* Add your carousel items here */}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* Call to Action */}
          <section className="text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-800 p-16 rounded-xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Create Something Amazing?</h2>
            <p className="text-xl mb-8">Let's bring your vision to life with our premium vehicles</p>
            <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100">
              Start Your Project <ChevronRight className="ml-2" />
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}