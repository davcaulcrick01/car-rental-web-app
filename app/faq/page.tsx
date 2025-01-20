'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import Header from '@/components/Header'
import Breadcrumbs from '@/components/Breadcrumbs'
import Footer from '@/components/Footer'
import { fleetCategories } from '@/lib/constants'  // Updated import path

// FAQ items
const faqItems = [
  {
    question: "What are your rental requirements?",
    answer: "To rent a vehicle, you must be at least 25 years old, have a valid driver's license, provide proof of insurance, and have a valid credit card in your name."
  },
  {
    question: "Do you offer chauffeur services?",
    answer: "Yes, we offer professional chauffeur services for all our vehicles. Our chauffeurs are highly trained and experienced in providing luxury transportation services."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 48 hours or more before the rental start time receive a full refund. Cancellations within 48 hours may be subject to a cancellation fee."
  },
  {
    question: "Do you offer insurance coverage?",
    answer: "Yes, we offer various insurance coverage options. Basic insurance is included in the rental price, and additional coverage options are available."
  },
  {
    question: "What is the fuel policy?",
    answer: "All vehicles are provided with a full tank of fuel and should be returned with a full tank. If not returned full, a refueling fee will be charged."
  }
]

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "FAQ", href: "/faq" },
          ]}
        />

        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="font-semibold">{item.question}</span>
                <span className="transform transition-transform duration-200">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 bg-gray-800">
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}