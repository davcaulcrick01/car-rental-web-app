'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Button } from '@/components/ui/button'
import { FaCalendarAlt, FaMapMarkerAlt, FaChartLine, FaPlus } from 'react-icons/fa'
import { toast } from '@/components/ui/use-toast'

interface PricingRule {
  id: string
  name: string
  type: 'seasonal' | 'location' | 'demand' | 'base'
  adjustment: number
  startDate?: string
  endDate?: string
  locationId?: string
  carCategories?: string[]
  conditions?: {
    minUtilization?: number
    maxUtilization?: number
    daysInAdvance?: number
    minDuration?: number
    maxDuration?: number
    weekdays?: string[]
  }
  status: 'active' | 'scheduled' | 'expired'
  priority: number
}

export default function AdminPricingPage() {
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'seasonal' | 'location' | 'demand' | 'base'>('all')

  useEffect(() => {
    fetchPricingRules()
  }, [])

  const fetchPricingRules = async () => {
    try {
      const response = await fetch('/api/pricing/rules')
      if (!response.ok) throw new Error('Failed to fetch pricing rules')
      const data = await response.json()
      setPricingRules(data.sort((a: PricingRule, b: PricingRule) => b.priority - a.priority))
    } catch (err) {
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to fetch pricing rules. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (ruleId: string, newStatus: 'active' | 'expired') => {
    try {
      const response = await fetch(`/api/pricing/rules/${ruleId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (!response.ok) throw new Error('Failed to update rule status')
      
      setPricingRules(rules => 
        rules.map(rule => 
          rule.id === ruleId ? { ...rule, status: newStatus } : rule
        )
      )

      toast({
        title: "Success",
        description: "Rule status updated successfully",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update rule status",
        variant: "destructive"
      })
    }
  }

  const filteredRules = activeFilter === 'all' 
    ? pricingRules 
    : pricingRules.filter(rule => rule.type === activeFilter)

  return (
    <DatabaseErrorBoundary>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dynamic/Seasonal Pricing Management</h1>
            <p className="text-gray-600 mt-1">Manage base rates, seasonal adjustments and dynamic pricing rules</p>
          </div>
          <div className="space-x-2">
            <Button onClick={() => window.location.href = '/admin/pricing/new/base'}>
              <FaPlus className="mr-2" />
              Base Rate
            </Button>
            <Button onClick={() => window.location.href = '/admin/pricing/new/seasonal'}>
              <FaCalendarAlt className="mr-2" />
              Seasonal Rate
            </Button>
            <Button onClick={() => window.location.href = '/admin/pricing/new/location'}>
              <FaMapMarkerAlt className="mr-2" />
              Location Rate
            </Button>
            <Button onClick={() => window.location.href = '/admin/pricing/new/demand'}>
              <FaChartLine className="mr-2" />
              Dynamic Rule
            </Button>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          {['all', 'base', 'seasonal', 'location', 'demand'].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter as any)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div>Loading pricing rules...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow"
          >
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adjustment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conditions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{rule.priority}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{rule.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{rule.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rule.type === 'base' ? (
                        `$${rule.adjustment}`
                      ) : (
                        `${rule.adjustment > 0 ? '+' : ''}${rule.adjustment}%`
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rule.startDate && rule.endDate ? (
                        `${new Date(rule.startDate).toLocaleDateString()} - ${new Date(rule.endDate).toLocaleDateString()}`
                      ) : 'Always Active'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${rule.status === 'active' ? 'bg-green-100 text-green-800' : 
                          rule.status === 'expired' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {rule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {rule.carCategories?.length && <div>Categories: {rule.carCategories.join(', ')}</div>}
                      {rule.conditions?.minUtilization && <div>Min Utilization: {rule.conditions.minUtilization}%</div>}
                      {rule.conditions?.maxUtilization && <div>Max Utilization: {rule.conditions.maxUtilization}%</div>}
                      {rule.conditions?.daysInAdvance && <div>Days in Advance: {rule.conditions.daysInAdvance}</div>}
                      {rule.conditions?.minDuration && <div>Min Duration: {rule.conditions.minDuration} days</div>}
                      {rule.conditions?.weekdays && <div>Days: {rule.conditions.weekdays.join(', ')}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={() => window.location.href = `/admin/pricing/${rule.id}/edit`}
                      >
                        Edit
                      </Button>
                      {rule.status === 'active' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleStatusChange(rule.id, 'expired')}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          variant="outline" 
                          size="sm"
                          className="text-green-600 hover:text-green-800"
                          onClick={() => handleStatusChange(rule.id, 'active')}
                        >
                          Activate
                        </Button>
                      )}
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
