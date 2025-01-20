'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Layout from '@/components/Layout'
import BookingContent from './BookingContent'

export default function BookingPage() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-48 bg-gray-700 rounded"></div>
              <div className="h-24 bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      }>
        <BookingContent />
      </Suspense>
    </Layout>
  )
}
