"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Car } from '@/lib/cars'
import BookingContent from './BookingContent'

export default function BookingPage() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)

  return (
    <div>
      <BookingContent />
      {selectedCar && (
        <Image
          src={`https://car-rental-app-bucket.s3.amazonaws.com/car_images/cars/${selectedCar.category}/${selectedCar.image}`}
          alt={selectedCar.name}
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      )}
    </div>
  )
}
