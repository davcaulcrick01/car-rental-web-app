'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DatabaseErrorBoundary } from '@/components/database/DatabaseErrorBoundary'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { FaCalendarAlt, FaIdCard, FaCar, FaUserEdit } from 'react-icons/fa'

interface StaffMember {
  id: string
  name: string
  role: 'chauffeur' | 'mechanic' | 'admin' | 'customer_service'
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

export default function StaffProfilePage({ params }: { params: { staffId: string } }) {
  const [staff, setStaff] = useState<StaffMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchStaffMember()
  }, [])

  const fetchStaffMember = async () => {
    try {
      const response = await fetch(`/api/staff/${params.staffId}`)
      if (!response.ok) throw new Error('Failed to fetch staff member')
      const data = await response.json()
      setStaff(data)
    } catch (err) {
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to fetch staff member details",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Staff Profile</h1>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/admin/staff'}
          >
            Back to Staff List
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : staff ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-500">Name</label>
                  <p className="font-medium">{staff.name}</p>
                </div>
                <div>
                  <label className="text-gray-500">Role</label>
                  <p className="font-medium capitalize">{staff.role.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-gray-500">Status</label>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    staff.status === 'active' ? 'bg-green-100 text-green-800' :
                    staff.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    staff.status === 'training' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {staff.status.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <label className="text-gray-500">Hire Date</label>
                  <p className="font-medium">{new Date(staff.hireDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-500">Email</label>
                  <p className="font-medium">{staff.email}</p>
                </div>
                <div>
                  <label className="text-gray-500">Phone</label>
                  <p className="font-medium">{staff.phone}</p>
                </div>
                {staff.emergencyContact && (
                  <div>
                    <label className="text-gray-500">Emergency Contact</label>
                    <p className="font-medium">{staff.emergencyContact.name}</p>
                    <p className="text-sm text-gray-500">
                      {staff.emergencyContact.relationship} - {staff.emergencyContact.phone}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {(staff.licenseNumber || staff.certifications) && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
                <div className="space-y-4">
                  {staff.licenseNumber && (
                    <div>
                      <label className="text-gray-500">License Number</label>
                      <p className="font-medium">{staff.licenseNumber}</p>
                      <p className="text-sm text-gray-500">
                        Expires: {new Date(staff.licenseExpiry!).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {staff.certifications && (
                    <div>
                      <label className="text-gray-500">Certifications</label>
                      <div className="flex flex-wrap gap-2">
                        {staff.certifications.map((cert, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {staff.schedule && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Schedule</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-500">Working Hours</label>
                    <p className="font-medium">{staff.schedule.startTime} - {staff.schedule.endTime}</p>
                  </div>
                  <div>
                    <label className="text-gray-500">Working Days</label>
                    <p className="font-medium">{staff.schedule.days.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="md:col-span-2 flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => window.location.href = `/admin/staff/${staff.id}/edit`}
              >
                <FaUserEdit className="mr-2" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = `/admin/staff/${staff.id}/schedule`}
              >
                <FaCalendarAlt className="mr-2" />
                Manage Schedule
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Staff member not found</p>
          </div>
        )}
      </div>
    </DatabaseErrorBoundary>
  )
}
