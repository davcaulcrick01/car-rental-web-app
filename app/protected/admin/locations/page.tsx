'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Button } from '@/components/ui/button'
import { FaPlus, FaCar, FaClock, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

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

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations')
      if (!response.ok) throw new Error('Failed to fetch locations')
      const data = await response.json()
      setLocations(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DatabaseErrorBoundary>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Locations</h1>
          <Button onClick={() => window.location.href = '/admin/locations/new'}>
            <FaPlus className="mr-2" />
            Add New Location
          </Button>
        </div>

        {isLoading ? (
          <div>Loading locations...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {locations.map((location) => (
              <div key={location.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <Link 
                    href={`/admin/locations/${location.id}`}
                    className="text-xl font-semibold text-blue-600 hover:text-blue-800"
                  >
                    {location.city}
                  </Link>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium
                    ${location.status === 'active' ? 'bg-green-100 text-green-800' : 
                      location.status === 'closed' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {location.status}
                  </span>
                </div>

                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    {location.address}
                  </p>
                  <p className="flex items-center">
                    <FaPhone className="mr-2" />
                    {location.phone}
                  </p>
                  <p className="flex items-center">
                    <FaCar className="mr-2" />
                    Available Cars: {location.availableCars}/{location.totalCars}
                  </p>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <div className="text-sm">
                      {location.operationalHours[0].openTime} - {location.operationalHours[0].closeTime}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/admin/locations/${location.id}/edit`}
                  >
                    Edit Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = `/admin/locations/${location.id}/inventory`}
                  >
                    Manage Inventory
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </DatabaseErrorBoundary>
  )
}
