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
          
          {/* Right: Map Section */}
          <div className="flex justify-center">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.9602561302815!2d-118.38327968478277!3d34.06353682599895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2be18c321320f%3A0xdf6022be4d4116e5!2sRodeo%20Exotic%20Car%20Rentals!5e0!3m2!1sen!2sus!4v1635240197891!5m2!1sen!2sus"
                width="100%"
                height="400"
                allowFullScreen={true}
                loading="lazy"
                title="Location Map"
                className="rounded-lg"
                ></iframe>
            </div>
            
           {/* Center: Payment Cards Section */}
           <div className="flex flex-col items-center justify-center space-y-6">
            <h4 className="text-lg font-semibold text-white mb-2">Payment Cards Accepted</h4>
            <Image 
              src="/images/logos/accepted-credit-card.png" 
              alt="Accepted Payment Cards" 
              width={400} 
              height={100}
              className="mx-auto"
            />
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
