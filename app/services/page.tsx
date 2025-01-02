'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import Footer from '@/components/Footer' // Importing the Footer

const services = [
  {
    title: "Luxury Car Rentals",
    description: "Experience the thrill of driving high-end vehicles from top brands.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/services/luxury-rentals"
  },
  {
    title: "Chauffeur Services",
    description: "Enjoy a luxurious ride with our professional chauffeurs.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/services/chauffeur-services",
  },
  {
    title: "Airport Transfers",
    description: "Start your journey in style with our airport pickup and drop-off services.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/services/airport-transfers",
  },
  {
    title: "Wedding Car Services",
    description: "Make your special day unforgettable with our elegant wedding car rentals.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/services/wedding-services",
  },
  {
    title: "Corporate Events",
    description: "Impress your clients and partners with our premium corporate car services.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/services/corporate-events",
  },
  {
    title: "Photoshoot & Film Rentals",
    description: "Add glamour to your productions with our stunning vehicle collection.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/services/photoshoot-rentals",
  },
  {
    title: "Long-Term Rentals",
    description: "Enjoy extended luxury with our flexible long-term rental options.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/services/long-term-rentals",
  },
  {
    title: "Exotic Car Tours",
    description: "Experience scenic routes in style with our guided exotic car tours.",
    image: "/placeholder.svg?height=200&width=300",
    link: "/services/exotic-tours",
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {/* Header */}
      <Header />

      {/* Main Section */}
      <main className="pt-24">
        <section className="bg-gray-800 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-center mb-12">Our Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <Image src={service.image} alt={service.title} width={300} height={200} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <Link href={service.link}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start">
                <Check className="text-green-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Premium Fleet</h3>
                  <p className="text-gray-300">Access to a wide range of luxury and exotic vehicles from top brands.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="text-green-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Exceptional Service</h3>
                  <p className="text-gray-300">Dedicated customer support and personalized experiences.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="text-green-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Flexible Options</h3>
                  <p className="text-gray-300">Tailored rental plans to suit your specific needs and preferences.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="text-green-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Nationwide Coverage</h3>
                  <p className="text-gray-300">Services available in multiple locations across the country.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="text-green-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2">Competitive Pricing</h3>
                  <p className="text-gray-300">Transparent pricing with no hidden fees or surprises.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="text-green-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                  <p className="text-gray-300">Round-the-clock assistance for all your rental needs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
