'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

interface MaintenanceLog {
  id: string
  vehicleId: string
  type: 'repair' | 'inspection' | 'service'
  description: string
  date: string
  cost: number
  status: 'scheduled' | 'in-progress' | 'completed'
  technician: string
}

export default function AdminMaintenancePage() {
  const [maintenanceLogs, setMaintenanceLogs] = useState<MaintenanceLog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMaintenanceLogs()
  }, [])

  const fetchMaintenanceLogs = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/maintenance/logs')
      if (!response.ok) throw new Error('Failed to fetch maintenance logs')
      const data = await response.json()
      setMaintenanceLogs(data)
    } catch (error) {
      console.error('Error fetching maintenance logs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Maintenance Management</h1>
          <Button onClick={() => fetchMaintenanceLogs()}>Refresh</Button>
        </div>

        <Tabs defaultValue="scheduled">
          <TabsList>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {['scheduled', 'in-progress', 'completed'].map((status) => (
            <TabsContent key={status} value={status}>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  maintenanceLogs
                    .filter(log => log.status === status)
                    .map(log => (
                      <div key={log.id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{log.type.charAt(0).toUpperCase() + log.type.slice(1)}</h3>
                            <p className="text-sm text-gray-600">{log.description}</p>
                            <p className="text-sm text-gray-500">Vehicle ID: {log.vehicleId}</p>
                            <p className="text-sm text-gray-500">Technician: {log.technician}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{new Date(log.date).toLocaleDateString()}</p>
                            <p className="font-medium">${log.cost.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                )}
                {!isLoading && maintenanceLogs.filter(log => log.status === status).length === 0 && (
                  <p className="text-center text-gray-500">No {status} maintenance tasks found.</p>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DatabaseErrorBoundary>
  )
}
