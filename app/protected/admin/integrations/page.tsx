'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { CreditCard, Globe, Webhook, Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react'

interface ExternalService {
  id: string
  name: string
  type: 'payment' | 'api' | 'webhook'
  status: 'active' | 'inactive'
  lastSync?: string
  url?: string
  event?: string
  category?: 'payment' | 'crm' | 'analytics' | 'other'
  details?: Record<string, any>
}

export default function AdminIntegrationsPage() {
  const [activeTab, setActiveTab] = useState('payment')
  const [services, setServices] = useState<ExternalService[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchExternalServices()
  }, [])

  const fetchExternalServices = async () => {
    try {
      const response = await fetch('/api/external-services')
      if (!response.ok) {
        throw new Error('Failed to fetch external services')
      }
      const data = await response.json()
      setServices(data)
      setIsLoading(false)
    } catch (err) {
      setError(err as Error)
      setIsLoading(false)
    }
  }

  const handleServiceAction = async (serviceId: string, action: 'edit' | 'delete' | 'toggle') => {
    try {
      const response = await fetch(`/api/external-services/${serviceId}/${action}`, {
        method: action === 'delete' ? 'DELETE' : 'PATCH'
      })
      if (!response.ok) throw new Error(`Failed to ${action} service`)
      await fetchExternalServices()
    } catch (err) {
      setError(err as Error)
    }
  }

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="payment">Payment Services</TabsTrigger>
            <TabsTrigger value="api">External APIs</TabsTrigger>
            <TabsTrigger value="webhook">Webhooks</TabsTrigger>
          </TabsList>

          {['payment', 'api', 'webhook'].map((type) => (
            <TabsContent key={type} value={type}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {type === 'payment' ? 'Payment Services' : type === 'api' ? 'External APIs' : 'Webhooks'}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Manage your {type === 'payment' ? 'payment integrations' : type === 'api' ? 'API connections' : 'webhook endpoints'}
                    </p>
                  </div>
                  <Button onClick={() => window.location.href = `/admin/integrations/new/${type}`}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add {type === 'payment' ? 'Service' : type === 'api' ? 'API' : 'Webhook'}
                  </Button>
                </div>

                <div className="space-y-4">
                  {services
                    .filter(service => service.type === type)
                    .map(service => (
                      <div key={service.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium break-all">{service.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Status: {service.status}
                              {service.category && ` | Category: ${service.category}`}
                              {service.event && ` | Event: ${service.event}`}
                            </p>
                            {service.lastSync && (
                              <p className="text-sm text-gray-600">
                                Last synced: {service.lastSync}
                              </p>
                            )}
                            {service.url && (
                              <p className="text-sm text-gray-600 break-all">
                                URL: {service.url}
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleServiceAction(service.id, 'toggle')}
                            >
                              {service.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleServiceAction(service.id, 'edit')}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600"
                              onClick={() => handleServiceAction(service.id, 'delete')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DatabaseErrorBoundary>
  )
}
