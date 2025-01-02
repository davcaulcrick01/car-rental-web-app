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
  { id: 1, name: "Airport Transfer", description: "Luxurious and punctual airport transfers", image: "https://images.unsplash.com/photo-1609349239791-53cf7964978f?auto=format&fit=crop&w=800&h=400&q=80" },
  { id: 2, name: "Corporate Events", description: "Impress clients with our premium chauffeur service", image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=800&h=400&q=80" },
  { id: 3, name: "Wedding Service", description: "Make your special day even more memorable", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&h=400&q=80" },
  { id: 4, name: "City Tours", description: "Explore the city in style with our knowledgeable chauffeurs", image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=800&h=400&q=80" },
]

export default function ChauffeurServicesPage() {
  return (
    <>
      <Header /> {/* Header added here */}
      <div className="bg-gray-900 text-white min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Chauffeur Services</h1>
          <p className="text-center text-xl mb-12">Experience the epitome of luxury and convenience with our professional chauffeur services.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <Image
                    src={service.image}
                    alt={service.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <Button className="w-full">Book Service</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
