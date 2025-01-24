'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Button } from '@/components/ui/button'
import { FaPlus, FaCar, FaFileAlt } from 'react-icons/fa'
import { toast } from '@/components/ui/use-toast'

interface InsurancePolicy {
  id: string
  name: string
  description: string
  coverageDetails: {
    collisionDamage: boolean
    theftProtection: boolean
    personalInjury: boolean
    liabilityLimit: number
  }
  dailyRate: number
  status: 'active' | 'inactive'
}

interface DamageLog {
  id: string
  rentalId: string
  carId: string
  dateReported: string
  description: string
  damageType: 'minor' | 'major' | 'total'
  photoUrls: string[]
  claimStatus: 'pending' | 'approved' | 'denied'
  estimatedRepairCost: number
  actualRepairCost?: number
  insuranceCoverage?: string
}

export default function AdminInsurancePage() {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([])
  const [damageLogs, setDamageLogs] = useState<DamageLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [activeView, setActiveView] = useState<'policies' | 'damages'>('policies')

  useEffect(() => {
    fetchPoliciesAndLogs()
  }, [])

  const fetchPoliciesAndLogs = async () => {
    try {
      const [policiesRes, logsRes] = await Promise.all([
        fetch('/api/insurance/policies'),
        fetch('/api/insurance/damage-logs')
      ])
      
      if (!policiesRes.ok || !logsRes.ok) throw new Error('Failed to fetch insurance data')
      
      const [policiesData, logsData] = await Promise.all([
        policiesRes.json(),
        logsRes.json()
      ])

      setPolicies(policiesData)
      setDamageLogs(logsData)
    } catch (err) {
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to fetch insurance data. Please try again.",
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
            <h1 className="text-2xl font-bold">Insurance Management</h1>
            <p className="text-gray-600 mt-1">Manage insurance policies and damage claims</p>
          </div>
          <div className="space-x-2">
            <Button onClick={() => window.location.href = '/admin/insurance/policies/new'}>
              <FaPlus className="mr-2" />
              New Policy
            </Button>
            <Button onClick={() => window.location.href = '/admin/insurance/damages/new'}>
              <FaCar className="mr-2" />
              Log Damage
            </Button>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          <Button
            variant={activeView === 'policies' ? 'default' : 'outline'}
            onClick={() => setActiveView('policies')}
          >
            <FaFileAlt className="mr-2" />
            Insurance Policies
          </Button>
          <Button
            variant={activeView === 'damages' ? 'default' : 'outline'}
            onClick={() => setActiveView('damages')}
          >
            <FaCar className="mr-2" />
            Damage Logs
          </Button>
        </div>

        {isLoading ? (
          <div>Loading insurance data...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow"
          >
            {activeView === 'policies' ? (
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {policies.map((policy) => (
                    <tr key={policy.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{policy.name}</td>
                      <td className="px-6 py-4">
                        <ul className="list-disc list-inside">
                          {policy.coverageDetails.collisionDamage && <li>Collision</li>}
                          {policy.coverageDetails.theftProtection && <li>Theft</li>}
                          {policy.coverageDetails.personalInjury && <li>Personal Injury</li>}
                        </ul>
                      </td>
                      <td className="px-6 py-4">${policy.dailyRate}/day</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          policy.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {policy.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="outline" onClick={() => window.location.href = `/admin/insurance/policies/${policy.id}`}>
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Damage Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repair Cost</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {damageLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{new Date(log.dateReported).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{log.carId}</td>
                      <td className="px-6 py-4 capitalize">{log.damageType}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          log.claimStatus === 'approved' ? 'bg-green-100 text-green-800' :
                          log.claimStatus === 'denied' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {log.claimStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">${log.estimatedRepairCost}</td>
                      <td className="px-6 py-4">
                        <Button variant="outline" onClick={() => window.location.href = `/admin/insurance/damages/${log.id}`}>
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        )}
      </div>
    </DatabaseErrorBoundary>
  )
}
