'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { MapPin } from 'lucide-react'

interface CarHistory {
  date: string
  type: 'maintenance' | 'accident' | 'rental'
  description: string
  mileage: number
}

interface Car {
  id: string
  make: string
  model: string
  year: number
  color: string
  transmission: string
  status: 'available' | 'rented' | 'maintenance'
  locationId: string
  dailyRate: number
  history: CarHistory[]
  currentLocation?: {
    latitude: number
    longitude: number
    lastUpdated: string
  }
  mileage: number
}

interface CarDetailPageProps {
  params: {
    carId: string
  }
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  const [car, setCar] = useState<Car | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchCarDetails()
  }, [])

  const fetchCarDetails = async () => {
    try {
      const response = await fetch(`/api/cars/${params.carId}`)
      if (!response.ok) throw new Error('Failed to fetch car details')
      const data = await response.json()
      setCar(data)
    } catch (err) {
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to fetch car details",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (newStatus: Car['status']) => {
    try {
      const response = await fetch(`/api/cars/${params.carId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (!response.ok) throw new Error('Failed to update car status')
      
      setCar(prev => prev ? { ...prev, status: newStatus } : null)
      toast({
        title: "Success",
        description: "Car status updated successfully"
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update car status",
        variant: "destructive"
      })
    }
  }

  if (isLoading) {
    return <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  }

  if (error || !car) return notFound()

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              {car.year} {car.make} {car.model}
            </h1>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/admin/cars'}
            >
              Back to Fleet
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-500">Color</label>
                  <p className="font-medium">{car.color}</p>
                </div>
                <div>
                  <label className="text-gray-500">Transmission</label>
                  <p className="font-medium">{car.transmission}</p>
                </div>
                <div>
                  <label className="text-gray-500">Daily Rate</label>
                  <p className="font-medium">${car.dailyRate.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-gray-500">Mileage</label>
                  <p className="font-medium">{car.mileage.toLocaleString()} miles</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Status & Location</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-500">Current Status</label>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    car.status === 'available' ? 'bg-green-100 text-green-800' :
                    car.status === 'rented' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {car.status}
                  </span>
                </div>
                {car.currentLocation && (
                  <div>
                    <label className="text-gray-500">Last Known Location</label>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        Last updated: {new Date(car.currentLocation.lastUpdated).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleUpdateStatus('available')}
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    Mark Available
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleUpdateStatus('maintenance')}
                    className="bg-yellow-600 text-white hover:bg-yellow-700"
                  >
                    Send to Maintenance
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Vehicle History</h2>
            <div className="space-y-4">
              {car.history.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{event.type}</p>
                    <p className="text-sm text-gray-500">{event.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">{event.mileage.toLocaleString()} miles</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DatabaseErrorBoundary>
  )
}
