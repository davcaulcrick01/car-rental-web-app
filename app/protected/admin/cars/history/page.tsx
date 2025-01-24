'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { toast } from '@/components/ui/use-toast'

interface CarHistory {
  date: string
  type: 'maintenance' | 'accident' | 'rental' 
  description: string
  mileage: number
  carId: string
  car: {
    make: string
    model: string
    year: number
  }
}

export default function CarHistoryPage() {
  const [history, setHistory] = useState<CarHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/cars/history')
      if (!response.ok) throw new Error('Failed to fetch history')
      const data = await response.json()
      setHistory(data)
    } catch (err) {
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to fetch vehicle history",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Fleet History</h1>

        {isLoading ? (
          <div className="text-center py-8">Loading history...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">
            Error loading history. Please try again.
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="divide-y divide-gray-200">
              {history.map((event, index) => (
                <div key={index} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {event.car.year} {event.car.make} {event.car.model}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {event.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.type === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                        event.type === 'accident' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {event.type}
                      </span>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {event.mileage.toLocaleString()} miles
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DatabaseErrorBoundary>
  )
}
