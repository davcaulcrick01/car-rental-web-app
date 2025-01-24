'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'

interface AnalyticsSummary {
  revenue: {
    total: number
    change: number
  }
  activeRentals: number
  fleetUtilization: {
    percentage: number 
    change: number
  }
  newCustomers: number
}

export default function AdminReportsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary>({
    revenue: { total: 0, change: 0 },
    activeRentals: 0,
    fleetUtilization: { percentage: 0, change: 0 },
    newCustomers: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics/summary')
      if (!response.ok) throw new Error('Failed to fetch analytics')
      const data = await response.json()
      setAnalytics(data)
      setIsLoading(false)
    } catch (err) {
      setError(err as Error)
      setIsLoading(false)
    }
  }

  return (
    <DatabaseErrorBoundary>
      <div className="p-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6"
        >
          Analytics Dashboard
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-600">Total Revenue</h3>
            <p className="text-2xl font-bold">
              ${analytics.revenue.total.toLocaleString()}
            </p>
            <span className={`text-sm ${analytics.revenue.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {analytics.revenue.change >= 0 ? '+' : ''}{analytics.revenue.change}% from last month
            </span>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-600">Active Rentals</h3>
            <p className="text-2xl font-bold">{analytics.activeRentals}</p>
            <span className="text-gray-500 text-sm">Currently ongoing</span>
          </div>

          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-600">Fleet Utilization</h3>
            <p className="text-2xl font-bold">{analytics.fleetUtilization.percentage}%</p>
            <span className={`text-sm ${analytics.fleetUtilization.change >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
              {analytics.fleetUtilization.change >= 0 ? '+' : ''}{analytics.fleetUtilization.change}% from last week
            </span>
          </div>

          <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-600">New Customers</h3>
            <p className="text-2xl font-bold">{analytics.newCustomers}</p>
            <span className="text-green-500 text-sm">This month</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold mb-4">Revenue Trends</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              {isLoading ? (
                <div className="animate-pulse">Loading revenue data...</div>
              ) : error ? (
                <div className="text-red-500">Error loading revenue chart</div>
              ) : (
                <div className="w-full h-full">
                  {/* Revenue chart component will go here */}
                  <p className="text-gray-500">Revenue Chart Placeholder</p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold mb-4">Popular Vehicles</h2>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              {isLoading ? (
                <div className="animate-pulse">Loading vehicle data...</div>
              ) : error ? (
                <div className="text-red-500">Error loading vehicle stats</div>
              ) : (
                <div className="w-full h-full">
                  {/* Vehicle popularity chart component will go here */}
                  <p className="text-gray-500">Vehicle Stats Placeholder</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </DatabaseErrorBoundary>
  )
}
