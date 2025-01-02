'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Shield, Wallet, Clock, ChevronRight, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

const rentalPlans = [
  {
    title: "Monthly Luxury",
    description: "Perfect for extended stays and business trips",
    image: "/images/rentals/monthly-luxury.jpg",
    features: ["Flexible terms", "Insurance included", "Maintenance covered"]
  },
  {
    title: "Seasonal Exotic",
    description: "Experience different exotics throughout the season",
    image: "/images/rentals/seasonal-exotic.jpg",
    features: ["Vehicle swaps", "Priority booking", "VIP service"]
  },
  {
    title: "Corporate Fleet",
    description: "Dedicated fleet solutions for businesses",
    image: "/images/rentals/corporate-fleet.jpg",
    features: ["Multiple vehicles", "Account management", "Corporate billing"]
  },
  {
    title: "Extended Prestige",
    description: "Long-term access to prestige vehicles",
    image: "/images/rentals/extended-prestige.jpg",
    features: ["Concierge service", "Unlimited miles", "24/7 support"]
  }
]

const benefits = [
  {
    icon: Calendar,
    title: "Flexible Duration",
    description: "Rent from one month to a year with adjustable terms"
  },
  {
    icon: Shield,
    title: "Full Coverage",
    description: "Comprehensive insurance and maintenance included"
  },
  {
    icon: Wallet,
    title: "Cost Effective",
    description: "Significant savings compared to short-term rentals"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance and roadside support"
  }
]

export default function LongTermRentalsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Long Term Rentals', href: '/services/long-term-rentals' },
          ]} />

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
                  Extended Luxury at Your Service
                </h1>
                <p className="text-lg md:text-2xl mb-8 max-w-xl">
                  Experience the freedom of long-term luxury car rentals with exclusive benefits and flexible terms
                </p>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-4"
                  >
                    View Plans
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

          {/* Why Choose Long Term Section */}
          <section className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-8">WHY CHOOSE LONG TERM?</h2>
            <div className="bg-gray-800 p-8 rounded-lg">
              <ul className="list-disc space-y-3 pl-5 text-gray-300 max-w-4xl mx-auto text-left">
                <li>Significant cost savings compared to daily or weekly rentals</li>
                <li>Flexibility to switch between different luxury vehicles</li>
                <li>Comprehensive maintenance and insurance coverage included</li>
                <li>Dedicated account manager for personalized service</li>
                <li>No long-term commitment - adjust your rental duration as needed</li>
              </ul>
            </div>
          </section>

          {/* Rental Plans */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">RENTAL PLANS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rentalPlans.map((plan) => (
                <div key={plan.title} className="bg-gray-900 rounded-xl overflow-hidden group">
                  <div className="relative h-64">
                    <Image
                      src={plan.image}
                      alt={plan.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature) => (
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

          {/* Benefits */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">KEY BENEFITS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit) => (
                <Card key={benefit.title} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <benefit.icon className="w-12 h-12 text-blue-500 mb-4" />
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Vehicle Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">AVAILABLE VEHICLE CATEGORIES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <Image
                  src="/images/categories/luxury-sedans.jpg"
                  alt="Luxury Sedans"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Luxury Sedans</h3>
                  <p className="text-gray-400 mb-4">Perfect for business professionals and everyday luxury</p>
                  <Button variant="outline" className="w-full">View Options</Button>
                </div>
              </div>
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <Image
                  src="/images/categories/exotic-sports.jpg"
                  alt="Exotic Sports Cars"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Exotic Sports Cars</h3>
                  <p className="text-gray-400 mb-4">For the ultimate driving experience</p>
                  <Button variant="outline" className="w-full">View Options</Button>
                </div>
              </div>
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <Image
                  src="/images/categories/luxury-suvs.jpg"
                  alt="Luxury SUVs"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Luxury SUVs</h3>
                  <p className="text-gray-400 mb-4">Combining comfort with versatility</p>
                  <Button variant="outline" className="w-full">View Options</Button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">What's included in long-term rentals?</h3>
                <p className="text-gray-400">Our long-term rentals include comprehensive insurance, regular maintenance, 24/7 roadside assistance, and the flexibility to switch vehicles (subject to availability).</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">What is the minimum rental period?</h3>
                <p className="text-gray-400">Our long-term rentals start from a minimum of 30 days, with flexible extensions available to suit your needs.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Can I modify my rental duration?</h3>
                <p className="text-gray-400">Yes, you can extend or shorten your rental period with advance notice, subject to our terms and conditions.</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Are there mileage restrictions?</h3>
                <p className="text-gray-400">Long-term rentals come with generous mileage allowances, and additional miles can be purchased if needed.</p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">CLIENT EXPERIENCES</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="italic">"The long-term rental program gave me the flexibility I needed during my 3-month business project in LA. Exceptional service!"</p>
                <p className="mt-4 text-gray-400">- Michael R., Business Executive</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="italic">"Switching between different luxury vehicles during my extended stay was a fantastic experience. The team made everything seamless."</p>
                <p className="mt-4 text-gray-400">- Sarah K., Seasonal Resident</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="italic">"The corporate fleet program has been perfect for our company's executive transportation needs. Highly recommended!"</p>
                <p className="mt-4 text-gray-400">- David M., Corporate Client</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-800 p-16 rounded-xl">
            <h2 className="text-4xl font-bold mb-4">Ready for Extended Luxury?</h2>
            <p className="text-xl mb-8">Contact us to discuss your long-term rental needs</p>
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