'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Car } from '@/lib/cars'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { AnimatedCard, AnimatedSection } from './ui/animated'

interface VehicleShowcaseProps {
  vehicles: Car[];
}

export default function VehicleShowcase({ vehicles }: VehicleShowcaseProps) {
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
    <AnimatedSection 
      className="relative overflow-hidden py-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div 
        className="flex gap-6"
        animate={{ x: `-${currentIndex * 33.33}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {vehicles.map((vehicle, index) => (
          <AnimatedCard key={vehicle.id} delay={index * 2}>
            <div className="flex-shrink-0 w-full md:w-1/3">
              <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:shadow-2xl">
                <div className="relative h-64">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/public/images/cars/${vehicle.category}/${vehicle.image}`}
                    alt={vehicle.name}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-green-400 text-lg">${vehicle.price}/day</span>
                    <span className="text-gray-400">{vehicle.category}</span>
                  </div>
                  <Link href={`/booking?car=${vehicle.id}`}>
                    <Button className="w-full transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </motion.div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.max(0, vehicles.length - 2) }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-blue-500 scale-110' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </AnimatedSection>
  );
}