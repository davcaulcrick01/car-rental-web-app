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
  title: string;
  description?: string;
}

export default function VehicleShowcase({ vehicles, title, description }: VehicleShowcaseProps) {
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
    <AnimatedSection>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          {description && <p className="text-gray-400">{description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <AnimatedCard key={vehicle.id} delay={index * 0.1}>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    width={600}
                    height={400}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-green-400 text-lg">${vehicle.price}/day</span>
                    <span className="text-gray-400">{vehicle.category}</span>
                  </div>
                  <Link href={`/booking?car=${vehicle.id}`}>
                    <Button className="w-full">Book Now</Button>
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}