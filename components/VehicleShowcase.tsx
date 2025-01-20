'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const vehicles = [
  { id: 1, name: "Lamborghini Huracan", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&h=400&q=80", price: 2500, threeDaySpecial: 6000, logo: "/placeholder.svg?height=50&width=50", type: "Supercar" },
  { id: 2, name: "Ferrari 488 GTB", image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&h=400&q=80", price: 2200, threeDaySpecial: 5500, logo: "/placeholder.svg?height=50&width=50", type: "Supercar" },
  { id: 3, name: "Rolls-Royce Phantom", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&h=400&q=80", price: 3000, threeDaySpecial: 7500, logo: "/placeholder.svg?height=50&width=50", type: "Luxury" },
  { id: 4, name: "Porsche 911 GT3", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&h=400&q=80", price: 1800, threeDaySpecial: 4500, logo: "/placeholder.svg?height=50&width=50", type: "Sports" },
  { id: 5, name: "McLaren 720S", image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&h=400&q=80", price: 2800, threeDaySpecial: 7000, logo: "/placeholder.svg?height=50&width=50", type: "Supercar" },
  { id: 6, name: "Aston Martin DB11", image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&h=400&q=80", price: 2300, threeDaySpecial: 5750, logo: "/placeholder.svg?height=50&width=50", type: "Grand Tourer" },
]

export default function Component() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto scroll effect
  useEffect(() => {
    if (isHovering) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(0, vehicles.length - 2));
    }, 3000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovering, vehicles.length]);

  const visibleVehicles = vehicles.slice(currentIndex, currentIndex + 3)

  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Luxury Fleet</h2>
        <div className="relative">
          <div className="flex overflow-hidden">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="w-1/3 flex-shrink-0 transition-all duration-500 ease-in-out px-2"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <div 
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-[440px] transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="relative h-48">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-2 left-2">
                      <Image
                        src={vehicle.logo}
                        alt={`${vehicle.name} logo`}
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                      <span className="text-xs font-semibold">{vehicle.type}</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between h-[248px]">
                    <div>
                      <h3 className="text-lg font-bold mb-2">{vehicle.name}</h3>
                      <p className="text-2xl font-bold text-blue-400">${vehicle.price} <span className="text-sm text-gray-400">per day</span></p>
                      <p className="text-sm text-green-400 mt-1">3 Day Special: ${vehicle.threeDaySpecial}</p>
                    </div>
                    <div>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm uppercase font-semibold px-4 py-2 rounded-full transition duration-300 ease-in-out">
                        Book Now
                      </Button>
                      <p className="mt-2 text-xs text-gray-400 text-center">Refundable deposit required</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          {Array.from({ length: Math.ceil(vehicles.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 3)}
              className={`h-2 w-2 rounded-full mx-1 transition-all duration-300 ${
                Math.floor(currentIndex / 3) === index ? 'bg-white w-4' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button className="bg-white text-gray-900 hover:bg-gray-200 text-lg font-semibold px-8 py-3 rounded-full transition-all duration-300">
            View All Vehicles
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
}