'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Bell, Mail, MessageSquare, Plus, Edit2, Trash2 } from 'lucide-react'

interface NotificationTemplate {
  id: string
  name: string
  type: 'email' | 'sms' | 'in_app'
  subject: string
  body: string
  triggers: string[]
  variables: string[]
}

interface NotificationTrigger {
  id: string
  name: string
  event: string
  conditions: {
    field: string
    operator: string
    value: string
  }[]
  templateId: string
  isActive: boolean
}

export default function AdminNotificationsPage() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([])
  const [triggers, setTriggers] = useState<NotificationTrigger[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [editingTemplate, setEditingTemplate] = useState<NotificationTemplate | null>(null)
  const [editingTrigger, setEditingTrigger] = useState<NotificationTrigger | null>(null)

  useEffect(() => {
    fetchTemplatesAndTriggers()
  }, [])

  const fetchTemplatesAndTriggers = async () => {
    try {
      const [templatesRes, triggersRes] = await Promise.all([
        fetch('/api/notification-templates'),
        fetch('/api/notification-triggers')
      ])
      
      if (!templatesRes.ok || !triggersRes.ok) {
        throw new Error('Failed to fetch notification settings')
      }

      const templatesData = await templatesRes.json()
      const triggersData = await triggersRes.json()

      setTemplates(templatesData)
      setTriggers(triggersData)
    } catch (err) {
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to fetch notification settings",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveTemplate = async (template: NotificationTemplate) => {
    try {
      const response = await fetch(`/api/notification-templates/${template.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(template)
      })

      if (!response.ok) throw new Error('Failed to save template')

      setTemplates(prev => prev.map(t => t.id === template.id ? template : t))
      toast({
        title: "Success",
        description: "Template saved successfully"
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive"
      })
    }
  }

  const handleSaveTrigger = async (trigger: NotificationTrigger) => {
    try {
      const response = await fetch(`/api/notification-triggers/${trigger.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trigger)
      })

      if (!response.ok) throw new Error('Failed to save trigger')

      setTriggers(prev => prev.map(t => t.id === trigger.id ? trigger : t))
      toast({
        title: "Success",
        description: "Trigger saved successfully"
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save trigger",
        variant: "destructive"
      })
    }
  }

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Notification Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <h2 className="text-xl font-semibold">Notification Templates</h2>
              </div>
              <Button onClick={() => setEditingTemplate({
                id: '',
                name: '',
                type: 'email',
                subject: '',
                body: '',
                triggers: [],
                variables: []
              })}>
                <Plus className="w-4 h-4 mr-2" />
                New Template
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {templates.map(template => (
                  <div key={template.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{template.type}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingTemplate(template)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => {/* Handle delete */}}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                <h2 className="text-xl font-semibold">Notification Triggers</h2>
              </div>
              <Button onClick={() => setEditingTrigger({
                id: '',
                name: '',
                event: '',
                conditions: [],
                templateId: '',
                isActive: true
              })}>
                <Plus className="w-4 h-4 mr-2" />
                New Trigger
              </Button>
            </div>

            <div className="space-y-4">
              {triggers.map(trigger => (
                <div key={trigger.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{trigger.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Event: {trigger.event}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingTrigger(trigger)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                        onClick={() => {/* Handle delete */}}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DatabaseErrorBoundary>
  )
}
