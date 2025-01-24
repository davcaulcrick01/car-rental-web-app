'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { motion } from 'framer-motion'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { FaPlus, FaClock, FaUserClock, FaCar, FaGift, FaCalendarAlt, FaPercentage } from 'react-icons/fa'

interface Promotion {
  id: string
  code: string
  type: 'promo_code' | 'seasonal' | 'automatic'
  discount: number
  startDate: string
  endDate: string
  status: 'active' | 'expired' | 'scheduled'
  usageCount: number
  maxUses?: number
  description?: string
  conditions?: {
    minRentals?: number
    validDays?: string[]
    carCategories?: string[]
    minRentalDuration?: number
    maxDiscount?: number
    stackable?: boolean
  }
}

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'promo_code' | 'seasonal' | 'automatic'>('all')

  useEffect(() => {
    fetchPromotions()
  }, [])

  const fetchPromotions = async () => {
    try {
      const response = await fetch('/api/promotions')
      if (!response.ok) throw new Error('Failed to fetch promotions')
      const data = await response.json()
      setPromotions(data)
    } catch (err) {
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to fetch promotions. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getPromotionIcon = (type: string) => {
    switch (type) {
      case 'promo_code': return <FaPlus className="text-blue-500" />
      case 'seasonal': return <FaClock className="text-green-500" />
      case 'automatic': return <FaUserClock className="text-purple-500" />
      default: return null
    }
  }

  const filteredPromotions = activeFilter === 'all' 
    ? promotions 
    : promotions.filter(p => p.type === activeFilter)

  return (
    <DatabaseErrorBoundary>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Promotions & Discounts</h1>
          <div className="space-x-2">
            <Button onClick={() => window.location.href = '/admin/promotions/new/promo'}>
              <FaPlus className="mr-2" />
              New Promo Code
            </Button>
            <Button onClick={() => window.location.href = '/admin/promotions/new/seasonal'}>
              <FaClock className="mr-2" />
              Seasonal Promotion
            </Button>
            <Button onClick={() => window.location.href = '/admin/promotions/new/automatic'}>
              <FaUserClock className="mr-2" />
              Automatic Rule
            </Button>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          {['all', 'promo_code', 'seasonal', 'automatic'].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter as any)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1).replace('_', ' ')}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div>Loading promotions...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow"
          >
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code/Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conditions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPromotions.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPromotionIcon(promo.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        href={`/admin/promotions/${promo.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {promo.code}
                      </Link>
                      {promo.description && (
                        <p className="text-sm text-gray-500">{promo.description}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{promo.discount}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${promo.status === 'active' ? 'bg-green-100 text-green-800' : 
                          promo.status === 'expired' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {promo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {promo.conditions?.minRentals && <div>Min Rentals: {promo.conditions.minRentals}</div>}
                      {promo.conditions?.validDays && <div>Valid Days: {promo.conditions.validDays.join(', ')}</div>}
                      {promo.conditions?.carCategories && <div>Categories: {promo.conditions.carCategories.join(', ')}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {promo.usageCount}{promo.maxUses ? `/${promo.maxUses}` : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => window.location.href = `/admin/promotions/${promo.id}/edit`}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </DatabaseErrorBoundary>
  )
}
