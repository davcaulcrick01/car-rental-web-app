'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Button } from '@/components/ui/button'
import { RefreshCw, Database } from 'lucide-react'

interface DatabaseMetrics {
  name: string
  size: string
  connections: number
  uptime: string
  queries: {
    total: number
    avgResponseTime: number
  }
  tables: Array<{
    name: string
    rows: number
    size: string
    lastUpdated: string
  }>
}

export default function DatabaseStatsPage() {
  const [metrics, setMetrics] = useState<DatabaseMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDatabaseMetrics = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/system/database/metrics')
      if (!response.ok) throw new Error('Failed to fetch database metrics')
      const data = await response.json()
      setMetrics(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch database metrics')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDatabaseMetrics()
  }, [])

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Database Statistics</h1>
            <Button onClick={fetchDatabaseMetrics} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading database metrics...</div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
          ) : metrics ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold">Database Size</h3>
                  </div>
                  <p className="text-2xl font-bold mt-2">{metrics.size}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold">Active Connections</h3>
                  <p className="text-2xl font-bold mt-2">{metrics.connections}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold">Uptime</h3>
                  <p className="text-2xl font-bold mt-2">{metrics.uptime}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h3 className="font-semibold mb-4">Table Statistics</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Table Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Rows
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Size
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Updated
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {metrics.tables.map((table) => (
                          <tr key={table.name}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {table.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {table.rows.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {table.size}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {table.lastUpdated}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Query Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Queries</p>
                    <p className="text-xl font-bold">{metrics.queries.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average Response Time</p>
                    <p className="text-xl font-bold">{metrics.queries.avgResponseTime}ms</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>
      </div>
    </DatabaseErrorBoundary>
  )
}
