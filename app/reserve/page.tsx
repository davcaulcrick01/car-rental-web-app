'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { AlertTriangle, Check, CreditCard } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import cars from '@/lib/cars'
import { loadStripe } from '@stripe/stripe-js'

// Type assertion to handle undefined case
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function ReservePage() {
  const [selectedCar, setSelectedCar] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [pickupTime, setPickupTime] = useState("")
  const [returnTime, setReturnTime] = useState("")
  const [selectedCarDetails, setSelectedCarDetails] = useState<any>(null)
  const [totalDays, setTotalDays] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  // Calculate rental duration and price when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      setTotalDays(days)
      
      if (selectedCarDetails) {
        const basePrice = selectedCarDetails.price * days
        // Apply 3-day special if applicable
        const finalPrice = days >= 3 ? selectedCarDetails.threeDaySpecial : basePrice
        setTotalPrice(finalPrice)
      }
    }
  }, [startDate, endDate, selectedCarDetails])

  // Update selected car details
  useEffect(() => {
    if (selectedCar) {
      const car = cars.find(c => c.id.toString() === selectedCar)
      setSelectedCarDetails(car)
    }
  }, [selectedCar])

  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minute = i % 2 === 0 ? '00' : '30'
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${hour12}:${minute} ${ampm}`
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      // Create a payment session with your backend
      const response = await fetch('/api/create-payment-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carDetails: selectedCarDetails,
          totalAmount: totalPrice,
          startDate,
          endDate,
          pickupTime,
          returnTime,
        }),
      })

      const session = await response.json()

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        console.error(result.error)
      }
    } catch (error) {
      console.error('Payment failed:', error)
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Reserve', href: '/reserve' },
          ]} />
          
          <h1 className="text-4xl font-bold text-center mb-8">Reserve Your Dream Car</h1>
          
          <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-2">First Name</div>
                    <Input id="firstName" className="bg-gray-700 text-white" required />
                  </div>
                  <div>
                    <div className="mb-2">Last Name</div>
                    <Input id="lastName" className="bg-gray-700 text-white" required />
                  </div>
                  <div>
                    <div className="mb-2">Email</div>
                    <Input id="email" type="email" className="bg-gray-700 text-white" required />
                  </div>
                  <div>
                    <div className="mb-2">Phone</div>
                    <Input id="phone" type="tel" className="bg-gray-700 text-white" required />
                  </div>
                </div>
              </div>

              {/* Car Selection */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Select Your Car</h2>
                <Select onValueChange={setSelectedCar} required>
                  <SelectTrigger className="bg-white text-gray-900 border-gray-300">
                    <SelectValue placeholder="Choose a car" />
                  </SelectTrigger>
                  <SelectContent 
                    className="bg-white text-gray-900 border border-gray-300 shadow-lg" 
                    position="popper"
                    sideOffset={5}
                  >
                    {cars.map((car) => (
                      <SelectItem 
                        key={car.id} 
                        value={car.id.toString()}
                        className="hover:bg-blue-50 cursor-pointer py-2"
                      >
                        {car.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rental Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Rental Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-2">Pick-up Date</div>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      className="bg-gray-700 rounded-md border-0 [&_button:hover]:bg-gray-600 [&_button]:transition-colors [&_.rdp-day_focus]:bg-green-600 [&_.rdp-day_focus]:text-white"
                      required
                    />
                    <div className="mb-2">Pick-up Time</div>
                    <Select onValueChange={setPickupTime} required>
                      <SelectTrigger className="bg-gray-700">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 max-h-[200px] overflow-y-auto">
                        {timeSlots.map((time) => (
                          <SelectItem 
                            key={time} 
                            value={time}
                            className="text-white hover:bg-gray-700"
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="mb-2">Return Date</div>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      className="bg-gray-700 rounded-md border-0 [&_button:hover]:bg-gray-600 [&_button]:transition-colors [&_.rdp-day_focus]:bg-green-600 [&_.rdp-day_focus]:text-white"
                      required
                    />
                    <div className="mb-2">Return Time</div>
                    <Select onValueChange={setReturnTime} required>
                      <SelectTrigger className="bg-gray-700">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 max-h-[200px] overflow-y-auto">
                        {timeSlots.map((time) => (
                          <SelectItem 
                            key={time} 
                            value={time}
                            className="text-white hover:bg-gray-700"
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {selectedCarDetails && (
                <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Rental Summary</h3>
                  <div className="space-y-2">
                    <p>Selected Car: {selectedCarDetails.name}</p>
                    <p>Daily Rate: ${selectedCarDetails.price}</p>
                    <p>Number of Days: {totalDays}</p>
                    <p>Total Price: ${totalPrice}</p>
                    {totalDays >= 3 && (
                      <p className="text-green-400">3-Day Special Applied!</p>
                    )}
                  </div>
                </div>
              )}

              {/* Deposit Information */}
              <div className="bg-red-900 p-4 rounded-lg flex items-start space-x-3">
                <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" />
                <p className="text-lg text-red-300">
                  <span className="font-semibold">Security Deposit Required:</span> A refundable deposit of $500 is required at the time of booking.
                </p>
              </div>

              {/* Payment Buttons */}
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold transition-colors duration-300">
                Proceed to Payment
              </Button>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-300">
                <span>Pay with Stripe</span>
                <Check size={20} />
              </Button>

              <Button className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-300">
                <span>Pay with Apple Pay</span>
                <CreditCard size={20} />
              </Button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Why Choose Our Luxury Car Rental?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>24/7 Roadside Assistance</li>
              <li>Flexible Pick-up and Drop-off Locations</li>
              <li>No Hidden Fees</li>
              <li>Thoroughly Sanitized Vehicles</li>
              <li>Experienced and Professional Staff</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}