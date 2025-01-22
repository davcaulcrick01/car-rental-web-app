"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import cars from '@/lib/cars'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select"

interface CarsByCategory {
  [key: string]: any[]
}

export default function Footer() {
  const [selectedCar, setSelectedCar] = useState('')

  // Group cars by category
  const carsByCategory: CarsByCategory = cars.reduce((acc: CarsByCategory, car) => {
    const category = car.category.toLowerCase()
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(car)
    return acc
  }, {})

  console.log('Cars by category:', carsByCategory)

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Footer Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Left: Get in Touch + Booking Form Section */}
          <div className="col-span-1 flex flex-col space-y-8">
            {/* Booking Form Section */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">Book Your Luxury Experience Now</h4>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white">Name*</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">Email*</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white">Phone Number*</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="car-selection" className="block text-sm font-medium text-white">Select Car</label>
                  <Select onValueChange={setSelectedCar}>
                    <SelectTrigger id="car-selection" className="w-full bg-white text-gray-900 font-semibold">
                      <SelectValue placeholder="Choose a car" />
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-white border-2 border-gray-300 shadow-xl max-h-[300px] overflow-y-auto" 
                      position="popper"
                      sideOffset={5}
                    >
                      {Object.entries(carsByCategory).map(([category, categoryCars]) => (
                        <SelectGroup key={category}>
                          <SelectLabel className="bg-gray-200 text-gray-900 font-bold px-4 py-2 text-sm uppercase tracking-wider">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectLabel>
                          {Array.isArray(categoryCars) && categoryCars.map((car: any) => (
                            <SelectItem 
                              key={car.id} 
                              value={car.id.toString()}
                              className="px-4 py-2 text-gray-900 hover:bg-blue-50 cursor-pointer font-normal text-sm border-b border-gray-100 last:border-0"
                            >
                              {car.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white">Message (Optional)</label>
                  <textarea
                    id="message"
                    placeholder="Add any additional details here..."
                    className="w-full p-2 mt-1 border border-gray-300 rounded-lg text-gray-900"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Submit Booking Request</button>
              </form>
            </div>
          </div>
          
          {/* Get in Touch Section */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h4 className="text-xl font-bold mb-2">Visit Our Showroom</h4>
            <p className="text-gray-400 mb-4">
              Experience luxury firsthand at our state-of-the-art showroom. Our knowledgeable staff is ready to assist you in finding the perfect vehicle for your needs.
            </p>
            <div className="mb-4">
              <h5 className="text-lg font-semibold">Address</h5>
              <p className="text-gray-400">1401 Kirkdale Drive, Melissa, TX 75454</p>
            </div>
            <div className="mb-4">
              <h5 className="text-lg font-semibold">Hours</h5>
              <p className="text-gray-400">Monday - Friday: 9AM - 7PM</p>
              <p className="text-gray-400">Saturday: 10AM - 6PM</p>
              <p className="text-gray-400">Sunday: Closed</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold">Contact</h5>
              <p className="text-gray-400">Phone: (469) 743-1824</p>
              <p className="text-gray-400">Email: <a href="mailto:info@greyzoneexotics.com" className="text-blue-500 hover:text-blue-400">info@greyzoneexotics.com</a></p>
            </div>
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
            />
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

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <Image 
            src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/logos/GreyZone-Exotics-01.png`}
            alt="Car Rental Logo"
            width={150}
            height={50}
          />
          <p className="text-gray-400 mt-4">
            &copy; {new Date().getFullYear()} GreyZone Exotics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
