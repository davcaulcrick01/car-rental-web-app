'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { FaCalendarAlt, FaIdCard, FaCar } from 'react-icons/fa'

interface StaffMember {
  id: string
  name: string
  role: 'chauffeur' | 'mechanic' | 'cleaner' | 'reservation_specialist' | 'customer_service' | 'legal' | 'admin'
  email: string
  phone: string
  licenseNumber?: string
  licenseExpiry?: string
  assignedVehicleId?: string
  status: 'active' | 'inactive' | 'on_leave' | 'training'
  schedule?: {
    startTime: string
    endTime: string
    days: string[]
  }
  certifications?: string[]
  performanceRating?: number
  hireDate: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

export default function StaffManagementPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [activeFilter, setActiveFilter] = useState<StaffMember['role'] | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchStaffMembers()
  }, [])

  const fetchStaffMembers = async () => {
    try {
      const response = await fetch('/api/staff')
      if (!response.ok) throw new Error('Failed to fetch staff members')
      const data = await response.json()
      setStaff(data)
    } catch (err) {
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to fetch staff members",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredStaff = staff
    .filter(member => activeFilter === 'all' || member.role === activeFilter)
    .filter(member => 
      searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const roleFilters: (StaffMember['role'] | 'all')[] = [
    'all',
    'chauffeur',
    'mechanic',
    'cleaner',
    'reservation_specialist',
    'customer_service',
    'legal',
    'admin'
  ]

  return (
    <DatabaseErrorBoundary>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Employee Management</h1>
            <p className="text-gray-600 mt-1">Manage all staff members, schedules, and performance</p>
          </div>
          <div className="space-x-2">
            <Button onClick={() => window.location.href = '/admin/staff/schedule'}>
              <FaCalendarAlt className="mr-2" />
              Schedule
            </Button>
            <Button onClick={() => window.location.href = '/admin/staff/certifications'}>
              <FaIdCard className="mr-2" />
              Certifications
            </Button>
            <Button onClick={() => window.location.href = '/admin/staff/vehicles'}>
              <FaCar className="mr-2" />
              Vehicle Assignment
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {roleFilters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter)}
                className="text-sm"
              >
                {filter.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search employees..."
            className="px-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">Since {new Date(member.hireDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 capitalize">
                      <div>{member.role.replace('_', ' ')}</div>
                      {member.performanceRating && (
                        <div className="text-sm text-gray-500">Rating: {member.performanceRating}/5</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>{member.email}</div>
                      <div className="text-sm text-gray-500">{member.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      {member.role === 'chauffeur' && member.licenseNumber && (
                        <div>
                          <div>License: {member.licenseNumber}</div>
                          <div className="text-sm text-gray-500">
                            Expires: {new Date(member.licenseExpiry!).toLocaleDateString()}
                          </div>
                        </div>
                      )}
                      {member.certifications && member.certifications.length > 0 && (
                        <div className="text-sm text-gray-500">
                          Certs: {member.certifications.join(', ')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {member.schedule && (
                        <div>
                          <div>{member.schedule.startTime} - {member.schedule.endTime}</div>
                          <div className="text-sm text-gray-500">{member.schedule.days.join(', ')}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        member.status === 'active' ? 'bg-green-100 text-green-800' :
                        member.status === 'inactive' ? 'bg-red-100 text-red-800' :
                        member.status === 'training' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {member.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => window.location.href = `/admin/staff/${member.id}`}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.location.href = `/admin/staff/${member.id}/schedule`}
                        >
                          Schedule
                        </Button>
                      </div>
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
