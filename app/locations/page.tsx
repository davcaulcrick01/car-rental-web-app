'use client'

import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Layout from '@/components/Layout'
import Header from '@/components/Header'


const locations = [
  {
    id: 1,
    city: "Los Angeles",
    address: "123 Hollywood Blvd, Los Angeles, CA 90001",
    phone: "+1 (323) 555-1234",
    image: "https://images.unsplash.com/photo-1515896769750-31548aa180ed?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 2,
    city: "New York",
    address: "456 5th Avenue, New York, NY 10018",
    phone: "+1 (212) 555-5678",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 3,
    city: "Miami",
    address: "789 Ocean Drive, Miami Beach, FL 33139",
    phone: "+1 (305) 555-9012",
    image: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 4,
    city: "Las Vegas",
    address: "1011 Las Vegas Blvd, Las Vegas, NV 89109",
    phone: "+1 (702) 555-3456",
    image: "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=600&h=400&q=80"
  }
]

export default function LocationsPage() {
  return (
    <Layout>
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12">Our Locations</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {locations.map((location) => (
              <div key={location.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <Image src={location.image} alt={location.city} width={600} height={400} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{location.city}</h3>
                  <p className="text-gray-400 mb-2">{location.address}</p>
                  <p className="text-gray-400 mb-6">{location.phone}</p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm uppercase font-semibold px-4 py-2 rounded-full transition duration-300 ease-in-out">
                    Get Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}