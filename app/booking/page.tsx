"use client"

import { useState, Suspense } from 'react'
import Image from 'next/image'
import { Car } from '@/lib/cars'
import BookingContent from './BookingContent'
import Loading from './loading'

function BookingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BookingPageContent />
    </Suspense>
  );
}

function BookingPageContent() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)

  return (
    <div>
      <BookingContent selectedCar={selectedCar} />
      {selectedCar && (
        <Image
          src={selectedCar.images[0]}
          alt={selectedCar.name}
          width={600}
          height={400}
          className="object-cover"
        />
      )}
    </div>
  )
}

export default BookingPage;
