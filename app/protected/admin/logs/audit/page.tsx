'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface AuditLog {
  id: string
  timestamp: string
  action: 'role_change' | 'permission_change' | 'data_access' | 'privacy_request'
  userId: string
  details: {
    type: string
    before?: string
    after?: string
    reason?: string
    requestType?: string
  }
  performedBy: string
}

export default function AdminAuditLogsPage() {
  const [activeTab, setActiveTab] = useState('user-roles')
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAuditLogs()
  }, [activeTab])

  const fetchAuditLogs = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/audit-logs?type=${activeTab}`)
      if (!response.ok) throw new Error('Failed to fetch audit logs')
      const data = await response.json()
      setAuditLogs(data)
    } catch (error) {
      console.error('Error fetching audit logs:', error)
    } finally {
      setIsLoading(false)
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
          <div>
            <h1 className="text-2xl font-bold">Audit Logs</h1>
            <p className="text-gray-600">Track system changes and compliance activities</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="user-roles">User Roles & Permissions</TabsTrigger>
              <TabsTrigger value="compliance">Compliance & Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="user-roles">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : (
                    auditLogs
                      .filter(log => ['role_change', 'permission_change'].includes(log.action))
                      .map(log => (
                        <div key={log.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">
                                {log.action === 'role_change' ? 'Role Change' : 'Permission Change'}
                              </p>
                              <p className="text-sm text-gray-600">
                                User ID: {log.userId} | Changed by: {log.performedBy}
                              </p>
                              <p className="text-sm text-gray-600">
                                From: {log.details.before} → To: {log.details.after}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">{log.timestamp}</p>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : (
                    auditLogs
                      .filter(log => ['data_access', 'privacy_request'].includes(log.action))
                      .map(log => (
                        <div key={log.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">
                                {log.action === 'data_access' ? 'Data Access' : 'Privacy Request'}
                              </p>
                              <p className="text-sm text-gray-600">
                                Type: {log.details.type}
                                {log.details.requestType && ` | Request: ${log.details.requestType}`}
                              </p>
                              <p className="text-sm text-gray-600">
                                Performed by: {log.performedBy}
                              </p>
                              {log.details.reason && (
                                <p className="text-sm text-gray-600">
                                  Reason: {log.details.reason}
                                </p>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{log.timestamp}</p>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DatabaseErrorBoundary>
  )
}
