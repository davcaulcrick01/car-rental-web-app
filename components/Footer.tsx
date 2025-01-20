"use client"
import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import cars from '@/lib/cars'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select"
import { Car } from '@/lib/cars'

interface CategoryMap {
  [key: string]: Car[];
}

export default function Footer() {
  const [selectedCar, setSelectedCar] = useState<string | null>(null)

  // Group cars by category
  const carsByCategory = cars.reduce<CategoryMap>((acc, car) => {
    const category = car.category.toLowerCase()
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(car)
    return acc
  }, {})

  console.log('Cars by category:', carsByCategory)

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p>Email: info@carrental.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li>Fleet</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>
        </div>
        <Image 
          src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/public/images/logo-white.png`}
          alt="Car Rental Logo"
          width={150}
          height={50}
        />
      </div>
    </footer>
  );
}
