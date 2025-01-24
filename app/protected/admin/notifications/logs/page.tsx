'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'

interface NotificationEvent {
  id: string
  type: string
  status: string
  recipient: string
  timestamp: string
  details: string
}

interface ErrorLog {
  id: string
  error: string
  timestamp: string
  context: string
}

export default function NotificationLogsPage() {
  const [activeTab, setActiveTab] = useState('history')
  const [notificationHistory, setNotificationHistory] = useState<NotificationEvent[]>([])
  const [errorLogs, setErrorLogs] = useState<ErrorLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="history">Notification History</TabsTrigger>
                <TabsTrigger value="errors">Error Logs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="history">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {isLoading ? (
                    <div className="text-center py-8">Loading history...</div>
                  ) : error ? (
                    <div className="text-red-500 text-center py-8">
                      Error loading history. Please try again.
                    </div>
                  ) : notificationHistory.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No notification history found
                    </div>
                  ) : (
                    notificationHistory.map(event => (
                      <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{event.type}</p>
                            <p className="text-sm text-gray-600">To: {event.recipient}</p>
                            <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.status === 'sent' ? 'bg-green-100 text-green-800' :
                              event.status === 'failed' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {event.status}
                            </span>
                            <p className="text-sm text-gray-500 mt-2">
                              {new Date(event.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="errors">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {isLoading ? (
                    <div className="text-center py-8">Loading error logs...</div>
                  ) : error ? (
                    <div className="text-red-500 text-center py-8">
                      Error loading logs. Please try again.
                    </div>
                  ) : errorLogs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No error logs found
                    </div>
                  ) : (
                    errorLogs.map(log => (
                      <div key={log.id} className="p-4 bg-red-50 rounded-lg">
                        <p className="font-medium text-red-800">{log.error}</p>
                        <p className="text-sm text-gray-600 mt-1">{log.context}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DatabaseErrorBoundary>
  )
}
