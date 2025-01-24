'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { motion } from 'framer-motion'
import { toast } from '@/components/ui/use-toast'
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

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [expandedCar, setExpandedCar] = useState<string | null>(null)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars')
      if (!response.ok) throw new Error('Failed to fetch cars')
      const data = await response.json()
      setCars(data)
    } catch (err) {
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to fetch cars. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateCarStatus = async (id: string, newStatus: Car['status']) => {
    try {
      const response = await fetch(`/api/cars/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (!response.ok) throw new Error('Failed to update car status')
      
      setCars((prev) =>
        prev.map((car) =>
          car.id === id ? { ...car, status: newStatus } : car
        )
      )

      toast({
        title: "Success",
        description: "Car status updated successfully",
        variant: "default"
      })
    } catch (err) {
      console.error('Error updating car status:', err)
      toast({
        title: "Error",
        description: "Failed to update car status. Please try again.",
        variant: "destructive"
      })
    }
  }

  const toggleCarDetails = (carId: string) => {
    setExpandedCar(expandedCar === carId ? null : carId)
  }

  return (
    <DatabaseErrorBoundary>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Fleet Management</h1>
          <Link 
            href="/admin/cars/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Vehicle
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading fleet data...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">
            Error loading fleet data. Please try again.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mileage & Rate
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cars.map((car) => (
                  <React.Fragment key={car.id}>
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleCarDetails(car.id)}
                    >
                      <td className="px-6 py-4">
                        <Link 
                          href={`/admin/cars/${car.id}`}
                          className="text-blue-600 hover:text-blue-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="font-medium">{car.year} {car.make} {car.model}</div>
                          <div className="text-sm text-gray-500">{car.color} • {car.transmission}</div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                            car.status === 'available' ? 'bg-green-100 text-green-800' :
                            car.status === 'rented' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {car.status}
                          </span>
                          {car.currentLocation && (
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>Last seen: {new Date(car.currentLocation.lastUpdated).toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>{car.mileage.toLocaleString()} miles</div>
                          <div className="font-medium">${car.dailyRate.toFixed(2)}/day</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleUpdateCarStatus(car.id, 'maintenance')
                          }}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          Maintenance
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleUpdateCarStatus(car.id, 'available')
                          }}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Available
                        </button>
                      </td>
                    </motion.tr>
                    {expandedCar === car.id && car.history && (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 bg-gray-50">
                          <div className="space-y-4">
                            <h3 className="font-medium">Vehicle History</h3>
                            <div className="space-y-2">
                              {car.history.map((event, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      event.type === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                                      event.type === 'accident' ? 'bg-red-100 text-red-800' :
                                      'bg-blue-100 text-blue-800'
                                    }`}>
                                      {event.type}
                                    </span>
                                    <span className="ml-2">{event.description}</span>
                                  </div>
                                  <div className="text-gray-500">
                                    <span>{new Date(event.date).toLocaleDateString()}</span>
                                    <span className="ml-4">{event.mileage.toLocaleString()} miles</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </DatabaseErrorBoundary>
  )
}
