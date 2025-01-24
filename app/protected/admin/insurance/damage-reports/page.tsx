'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

interface DamageReport {
  id: string
  carId: string
  dateReported: string
  damageType: string
  description: string
  estimatedRepairCost: number
  claimStatus: 'pending' | 'approved' | 'denied'
  photos: string[]
  repairStatus: 'awaiting_assessment' | 'in_progress' | 'completed'
  assignedMechanic?: string
  completionDate?: string
}

export default function DamageReportsPage() {
  const [damageReports, setDamageReports] = useState<DamageReport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchDamageReports()
  }, [])

  const fetchDamageReports = async () => {
    try {
      const response = await fetch('/api/insurance/damage-reports')
      if (!response.ok) throw new Error('Failed to fetch damage reports')
      const data = await response.json()
      setDamageReports(data)
    } catch (err) {
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to fetch damage reports",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DatabaseErrorBoundary>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Vehicle Damage Reports</h1>
            <p className="text-gray-600 mt-1">Track and manage vehicle damage cases</p>
          </div>
          <Button onClick={() => window.location.href = '/admin/insurance/damage-reports/new'}>
            Report New Damage
          </Button>
        </div>

        {isLoading ? (
          <div>Loading damage reports...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow"
          >
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Damage Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repair Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {damageReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{new Date(report.dateReported).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{report.carId}</td>
                    <td className="px-6 py-4 capitalize">{report.damageType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        report.repairStatus === 'completed' ? 'bg-green-100 text-green-800' :
                        report.repairStatus === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.repairStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        report.claimStatus === 'approved' ? 'bg-green-100 text-green-800' :
                        report.claimStatus === 'denied' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.claimStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">${report.estimatedRepairCost}</td>
                    <td className="px-6 py-4">
                      <Button 
                        variant="outline" 
                        onClick={() => window.location.href = `/admin/insurance/damage-reports/${report.id}`}
                      >
                        View Details
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
