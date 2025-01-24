'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react'

interface Integration {
  id: string
  name: string
  type: 'payment' | 'api' | 'webhook'
  status: 'active' | 'inactive'
  lastSync?: string
  details: {
    [key: string]: any
  }
}

export default function IntegrationDetailsPage({ params }: { params: { integrationId: string } }) {
  const [integration, setIntegration] = useState<Integration | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchIntegrationDetails()
  }, [])

  const fetchIntegrationDetails = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/integrations/${params.integrationId}`)
      if (!response.ok) throw new Error('Failed to fetch integration details')
      const data = await response.json()
      setIntegration(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusToggle = async () => {
    if (!integration) return
    
    try {
      const response = await fetch(`/api/integrations/${params.integrationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: integration.status === 'active' ? 'inactive' : 'active' })
      })
      
      if (!response.ok) throw new Error('Failed to update status')
      await fetchIntegrationDetails()
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update status'))
    }
  }

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-red-600 text-center py-8">{error.message}</div>
          ) : integration ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl font-semibold">{integration.name}</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Type: {integration.type} | ID: {integration.id}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={handleStatusToggle}
                    className={integration.status === 'active' ? 'text-green-600' : 'text-red-600'}
                  >
                    {integration.status === 'active' ? (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-2" />
                    )}
                    {integration.status === 'active' ? 'Active' : 'Inactive'}
                  </Button>
                  <Button variant="outline">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Integration Details</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  {Object.entries(integration.details).map(([key, value]) => (
                    <div key={key} className="flex py-2">
                      <span className="font-medium w-1/4">{key}:</span>
                      <span className="text-gray-600">{JSON.stringify(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {integration.lastSync && (
                <p className="text-sm text-gray-600 mt-4">
                  Last synchronized: {integration.lastSync}
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-8">Integration not found</div>
          )}
        </motion.div>
      </div>
    </DatabaseErrorBoundary>
  )
}
