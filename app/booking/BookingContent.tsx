'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import cars, { Car } from '@/lib/cars'

export default function BookingContent() {
  const searchParams = useSearchParams()
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const carParam = searchParams.get('car')
    if (carParam) {
      const carId = parseInt(carParam, 10)
      const car = cars.find((c) => c.id === carId)
      if (car) {
        setSelectedCar(car)
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Add your booking logic here
      console.log('Booking:', { selectedCar, startDate, endDate })
    } catch (error) {
      console.error('Booking failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!selectedCar) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-400">
          No vehicle selected. Please select a vehicle from our fleet.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Book Your Vehicle</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Car Details */}
        <div>
          <div className="relative h-64 rounded-lg overflow-hidden mb-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/public/images/cars/${selectedCar.category}/${selectedCar.image}`}
              alt={selectedCar.name}
              fill
              className="object-cover"
            />
            <div>
              <span className="text-gray-400">Engine:</span>
              <p>{selectedCar.engine}</p>
            </div>
            <div>
              <span className="text-gray-400">Transmission:</span>
              <p>{selectedCar.transmission}</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || new Date().toISOString().split('T')[0]}
              required
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Book Now'}
          </Button>
        </form>
      </div>
    </div>
  )
} 