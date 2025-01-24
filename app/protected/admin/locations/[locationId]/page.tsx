'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Button } from '@/components/ui/button'
import { FaCar, FaClock, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

interface Location {
  id: string
  city: string
  address: string
  phone: string
  email: string
  operationalHours: {
    weekday: string
    openTime: string
    closeTime: string
  }[]
  availableCars: number
  totalCars: number
  status: 'active' | 'closed' | 'maintenance'
}

interface LocationDetailProps {
  params: { locationId: string }
}

export default function LocationDetailPage({ params }: LocationDetailProps) {
  const { locationId } = params
  const [location, setLocation] = useState<Location | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchLocationDetails()
  }, [locationId])

  const fetchLocationDetails = async () => {
    try {
      const response = await fetch(`/api/locations/${locationId}`)
      if (!response.ok) throw new Error('Failed to fetch location details')
      const data = await response.json()
      setLocation(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading location details...</div>
  if (error) return <div>Error loading location: {error.message}</div>
  if (!location) return <div>Location not found</div>

  return (
    <DatabaseErrorBoundary>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{location.city} Branch</h1>
          <Button onClick={() => window.location.href = `/admin/locations/${locationId}/edit`}>
            Edit Location
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              Location Details
            </h2>
            <div className="space-y-2">
              <p><strong>Address:</strong> {location.address}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium
                  ${location.status === 'active' ? 'bg-green-100 text-green-800' : 
                    location.status === 'closed' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {location.status}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaPhone className="mr-2 text-blue-500" />
              Contact Information
            </h2>
            <div className="space-y-2">
              <p><strong>Phone:</strong> {location.phone}</p>
              <p><strong>Email:</strong> {location.email}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaClock className="mr-2 text-blue-500" />
              Operating Hours
            </h2>
            <div className="space-y-2">
              {location.operationalHours.map((hours) => (
                <div key={hours.weekday} className="flex justify-between">
                  <span>{hours.weekday}</span>
                  <span>{hours.openTime} - {hours.closeTime}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaCar className="mr-2 text-blue-500" />
              Fleet Status
            </h2>
            <div className="space-y-2">
              <p><strong>Available Cars:</strong> {location.availableCars}</p>
              <p><strong>Total Cars:</strong> {location.totalCars}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(location.availableCars / location.totalCars) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DatabaseErrorBoundary>
  )
}
