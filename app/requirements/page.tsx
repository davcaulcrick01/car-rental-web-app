'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Map, Star, Camera, Navigation, ChevronRight, Check, AlertTriangle, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

const requirements = [
  "Valid driver's license for at least 5 years",
  "Minimum age of 25 years old",
  "Clean driving record",
  "Proof of insurance",
  "Credit card in renter's name",
  "Security deposit (amount varies by vehicle)",
  "Acceptance of our terms and conditions",
  "International driver's permit (for non-US licenses)",
  "Two forms of valid ID",
  "Proof of address (utility bill or bank statement)",
  "Full coverage insurance or purchase of our insurance package",
]

const additionalInfo = [
  "Higher security deposits may be required for exotic and luxury vehicles",
  "Additional drivers must meet all requirements and be registered",
  "Background and driving record checks will be performed",
  "Reservations may be denied based on driving history"
]

export default function RequirementsPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-8">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Requirements', href: '/requirements' },
        ]} />
        
        <h1 className="text-4xl font-bold text-center mb-12">Rental Requirements</h1>
        
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Basic Requirements */}
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Basic Requirements</h2>
            <ul className="space-y-4">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-4 flex-shrink-0" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
            <ul className="space-y-4">
              {additionalInfo.map((info, index) => (
                <li key={index} className="flex items-center">
                  <AlertTriangle className="text-yellow-500 mr-4 flex-shrink-0" />
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}