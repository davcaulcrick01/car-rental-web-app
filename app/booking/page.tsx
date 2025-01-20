'use client'

import { useState } from 'react'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Layout from '@/components/Layout'
import BookingContent from './BookingContent'
import Image from 'next/image'
import { Car } from '@/lib/cars'

interface BookingPageProps {
  selectedCar: Car;
}

export default function BookingPage({ selectedCar }: BookingPageProps) {
  return (
    <Layout>
      <Suspense fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-48 bg-gray-700 rounded"></div>
              <div className="h-24 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      }>
        <BookingContent />
        <Image
          src={`https://car-rental-app-bucket.s3.amazonaws.com/car_images/cars/${selectedCar.category}/${selectedCar.image}`}
          alt={selectedCar.name}
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </Suspense>
    </Layout>
  )
}
