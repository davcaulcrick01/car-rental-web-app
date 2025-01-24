'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { RefreshCw, Database, Archive } from 'lucide-react'

interface SystemStats {
  uptime: string
  cpuUsage: number
  memoryUsage: {
    used: number
    total: number
  }
  dbStatus: 'connected' | 'disconnected'
}

interface DatabaseStats {
  tables: Array<{
    name: string
    rowCount: number
    sizeInMb: number
  }>
  totalSize: number
}

interface CacheStats {
  status: 'active' | 'inactive'
  size: number
  hitRate: number
}

export default function SystemPage() {
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null)
  const [dbStats, setDbStats] = useState<DatabaseStats | null>(null)
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSystemStats()
    fetchDbStats()
    fetchCacheStats()
  }, [])

  const fetchSystemStats = async () => {
    try {
      const response = await fetch('/api/system/stats')
      if (!response.ok) throw new Error('Failed to fetch system stats')
      const data = await response.json()
      setSystemStats(data)
    } catch (error) {
      console.error('Error fetching system stats:', error)
    }
  }

  const fetchDbStats = async () => {
    try {
      const response = await fetch('/api/system/database')
      if (!response.ok) throw new Error('Failed to fetch database stats')
      const data = await response.json()
      setDbStats(data)
    } catch (error) {
      console.error('Error fetching database stats:', error)
    }
  }

  const fetchCacheStats = async () => {
    try {
      const response = await fetch('/api/system/cache')
      if (!response.ok) throw new Error('Failed to fetch cache stats')
      const data = await response.json()
      setCacheStats(data)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCacheClear = async () => {
    try {
      await fetch('/api/system/cache/clear', { method: 'POST' })
      await fetchCacheStats()
    } catch (error) {
      console.error('Error clearing cache:', error)
    }
  }

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">System Overview</h1>
            <Button onClick={() => {
              fetchSystemStats()
              fetchDbStats()
              fetchCacheStats()
            }}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          <Tabs defaultValue="system" className="space-y-4">
            <TabsList>
              <TabsTrigger value="system">System Status</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="cache">Cache</TabsTrigger>
            </TabsList>

            <TabsContent value="system">
              <div className="bg-white rounded-lg shadow p-6">
                {isLoading ? (
                  <div className="text-center py-4">Loading system stats...</div>
                ) : systemStats ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">Uptime</h3>
                      <p className="mt-2 text-lg font-semibold">{systemStats.uptime}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">CPU Usage</h3>
                      <p className="mt-2 text-lg font-semibold">{systemStats.cpuUsage}%</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">Memory Usage</h3>
                      <p className="mt-2 text-lg font-semibold">
                        {systemStats.memoryUsage.used}/{systemStats.memoryUsage.total} GB
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">Database Status</h3>
                      <p className={`mt-2 text-lg font-semibold ${
                        systemStats.dbStatus === 'connected' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {systemStats.dbStatus}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-red-600">Failed to load system stats</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="database">
              <div className="bg-white rounded-lg shadow p-6">
                {isLoading ? (
                  <div className="text-center py-4">Loading database stats...</div>
                ) : dbStats ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold">Database Tables</h2>
                      <p className="text-sm text-gray-600">Total Size: {dbStats.totalSize} MB</p>
                    </div>
                    <div className="divide-y">
                      {dbStats.tables.map(table => (
                        <div key={table.name} className="py-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium">{table.name}</p>
                            <p className="text-sm text-gray-600">{table.rowCount.toLocaleString()} rows</p>
                          </div>
                          <span className="text-sm text-gray-600">{table.sizeInMb} MB</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-red-600">Failed to load database stats</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="cache">
              <div className="bg-white rounded-lg shadow p-6">
                {isLoading ? (
                  <div className="text-center py-4">Loading cache stats...</div>
                ) : cacheStats ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-semibold">Cache Status</h2>
                        <p className="text-sm text-gray-600">
                          Status: {cacheStats.status} | Size: {cacheStats.size} MB | Hit Rate: {cacheStats.hitRate}%
                        </p>
                      </div>
                      <Button onClick={handleCacheClear} variant="outline">
                        Clear Cache
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-red-600">Failed to load cache stats</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DatabaseErrorBoundary>
  )
}
