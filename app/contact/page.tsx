import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin } from 'lucide-react'
import Header from '@/components/Header'

export default function ContactPage() {
  return (
    <>
      <Header /> {/* Adding the Header component here */}
      <div className="bg-gray-900 text-white min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <Input id="name" type="text" placeholder="Your Name" className="w-full bg-gray-800 text-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <Input id="email" type="email" placeholder="your@email.com" className="w-full bg-gray-800 text-white" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <Textarea id="message" placeholder="Your message" className="w-full bg-gray-800 text-white" rows={4} />
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Send Message</Button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="text-blue-500 mr-4" size={24} />
                  <span>+1 (800) LUXURY-CARS</span>
                </div>
                <div className="flex items-center">
                  <Mail className="text-blue-500 mr-4" size={24} />
                  <span>info@luxurycarrentals.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-blue-500 mr-4" size={24} />
                  <span>123 Luxury Lane, Beverly Hills, CA 90210</span>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <p>Monday - Friday: 9am - 6pm</p>
                <p>Saturday: 10am - 4pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
