'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Star, Users, Globe, Clock } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const achievements = [
  { number: "10+", text: "Years of Excellence" },
  { number: "1000+", text: "Satisfied Clients" },
  { number: "200+", text: "Luxury Vehicles" },
  { number: "3", text: "Major City Locations" }
]

const values = [
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Every vehicle in our fleet undergoes rigorous maintenance and quality checks."
  },
  {
    icon: Award,
    title: "Excellence in Service",
    description: "Dedicated concierge team available 24/7 to ensure a seamless experience."
  },
  {
    icon: Star,
    title: "Customer First",
    description: "Tailored solutions and personalized attention for every client."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Passionate professionals with deep knowledge of luxury automobiles."
  },
  {
    icon: Globe,
    title: "Global Standards",
    description: "Meeting and exceeding international luxury service benchmarks."
  },
  {
    icon: Clock,
    title: "Timely Service",
    description: "Punctual delivery and efficient handling of all requests."
  }
]

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="/images/about-hero.jpg"
          alt="Luxury Cars"
          fill
          className="object-cover brightness-50"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Redefining Luxury</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto px-4">
            Experience the pinnacle of automotive excellence with GreyZone Exotics
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Achievements Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">{achievement.number}</h3>
              <p className="text-gray-300">{achievement.text}</p>
            </div>
          ))}
        </div>

        {/* Story Section with Parallax */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Journey to Excellence</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Founded in the heart of Los Angeles, GreyZone Exotics emerged from a vision to revolutionize the luxury car rental industry. Our founders, driven by passion and expertise, established a brand that would later become synonymous with automotive excellence.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we pride ourselves on curating the most exclusive collection of vehicles, from rare limited editions to the latest releases from prestigious manufacturers worldwide.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/about-journey.jpg"
                alt="Our Journey"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-gray-800 border-none">
                <CardContent className="p-6 text-center">
                  <value.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Luxury?</h2>
          <p className="text-xl text-gray-300 mb-8">Join our exclusive clientele and discover the GreyZone difference</p>
          <div className="flex justify-center gap-4">
            <Link href="/fleet">
              <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Explore Our Fleet
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="text-lg px-8 py-6">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
