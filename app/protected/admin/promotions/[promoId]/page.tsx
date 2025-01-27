'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { motion } from 'framer-motion'
import { FaSave, FaTrash, FaClock, FaUsers, FaPercent } from 'react-icons/fa'
import { Select } from '@/components/ui/select'

interface Promotion {
  id: string
  code: string
  type: 'promo_code' | 'seasonal' | 'automatic'
  discount: number
  startDate: string
  endDate: string
  status: 'active' | 'expired' | 'scheduled'
  usageCount: number
  maxUses?: number
  description?: string
  conditions?: {
    minRentals?: number
    validDays?: string[]
    carCategories?: string[]
  }
}

interface PromoDetailProps {
  params: { promoId: string }
}

export default function PromotionDetailPage({ params }: PromoDetailProps) {
  const { promoId } = params
  const [promotion, setPromotion] = useState<Promotion | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})

  useEffect(() => {
    fetchPromotion()
  }, [promoId])

  const fetchPromotion = async () => {
    try {
      const response = await fetch(`/api/promotions/${promoId}`)
      if (!response.ok) throw new Error('Failed to fetch promotion')
      const data = await response.json()
      setPromotion(data)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch promotion details",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const validatePromotion = () => {
    const errors: {[key: string]: string} = {}
    
    if (!promotion?.code) {
      errors.code = 'Promotion code is required'
    }
    if (!promotion?.discount || promotion.discount <= 0 || promotion.discount > 100) {
      errors.discount = 'Discount must be between 1 and 100'
    }
    if (!promotion?.startDate) {
      errors.startDate = 'Start date is required'
    }
    if (!promotion?.endDate) {
      errors.endDate = 'End date is required'
    }
    if (promotion?.startDate && promotion?.endDate && 
        new Date(promotion.startDate) >= new Date(promotion.endDate)) {
      errors.endDate = 'End date must be after start date'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = async () => {
    if (!promotion || !validatePromotion()) return
    
    setSaving(true)
    try {
      const response = await fetch(`/api/promotions/${promoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(promotion)
      })
      if (!response.ok) throw new Error('Failed to update promotion')
      toast({
        title: "Success",
        description: "Promotion updated successfully"
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update promotion",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this promotion?')) return
    
    try {
      const response = await fetch(`/api/promotions/${promoId}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete promotion')
      toast({
        title: "Success",
        description: "Promotion deleted successfully"
      })
      window.location.href = '/admin/promotions'
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete promotion",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  if (!promotion) {
    return <div className="p-6">Promotion not found</div>
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Promotion</h1>
        <div className="space-x-2">
          <Button onClick={handleSave} disabled={saving}>
            <FaSave className="mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button variant="destructive">
            <FaTrash className="mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Promotion Code</label>
            <Input 
              value={promotion.code}
              onChange={e => setPromotion({...promotion, code: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Discount (%)</label>
            <Input 
              type="number"
              value={promotion.discount}
              onChange={e => setPromotion({...promotion, discount: Number(e.target.value)})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Input 
              value={promotion.description || ''}
              onChange={e => setPromotion({...promotion, description: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <Input 
              type="date"
              value={promotion.startDate.split('T')[0]}
              onChange={e => setPromotion({...promotion, startDate: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Input 
              type="date"
              value={promotion.endDate.split('T')[0]}
              onChange={e => setPromotion({...promotion, endDate: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Maximum Uses</label>
            <Input 
              type="number"
              value={promotion.maxUses || ''}
              onChange={e => setPromotion({...promotion, maxUses: Number(e.target.value)})}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Usage Statistics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Total Uses</div>
            <div className="text-2xl font-bold">{promotion.usageCount}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Status</div>
            <div className="text-2xl font-bold capitalize">{promotion.status}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Remaining Uses</div>
            <div className="text-2xl font-bold">
              {promotion.maxUses ? promotion.maxUses - promotion.usageCount : 'Unlimited'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
