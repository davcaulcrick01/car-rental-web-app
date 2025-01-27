'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle } from './ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

interface ExtendRentalModalProps {
  isOpen: boolean
  onClose: () => void
  handleSubmit: (days: number) => Promise<void>
  currentEndDate: Date
}

export default function ExtendRentalModal({
  isOpen,
  onClose,
  handleSubmit,
  currentEndDate,
}: ExtendRentalModalProps) {
  const [daysToExtend, setDaysToExtend] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true)
      await handleSubmit(daysToExtend)
      onClose()
    } catch (error) {
      console.error('Error extending rental:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const newEndDate = new Date(currentEndDate)
  newEndDate.setDate(newEndDate.getDate() + daysToExtend)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Extend Rental Period</DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Current End Date: {currentEndDate.toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setDaysToExtend(Math.max(1, daysToExtend - 1))}
              >
                -
              </Button>
              <span className="text-lg font-medium">{daysToExtend} days</span>
              <Button
                variant="outline"
                onClick={() => setDaysToExtend(daysToExtend + 1)}
              >
                +
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              New End Date: {newEndDate.toLocaleDateString()}
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Extending...' : 'Confirm Extension'}
              </Button>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
