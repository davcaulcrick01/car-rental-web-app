"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Header from '@/components/Header'
// Prisma client is not needed in the frontend component

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    try {
      const formData = new FormData(event.target as HTMLFormElement)
      const userData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: password
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        router.push('/login')
      } else {
        const data = await response.json()
        setPasswordError(data.error || 'Failed to create account')
      }
    } catch (error) {
      console.error('Error creating account:', error)
      setPasswordError('Failed to create account')
    }
  }

  const handleDummyOAuthSignIn = (provider: string) => {
    console.log(`Signing in with ${provider} (dummy)`)
    router.push('/') // Simulate redirect after OAuth sign-in
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col justify-start pt-32 pb-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="relative w-48 h-48 mx-auto mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GreyZone%20Exotics-01-yBPXfYu8PidVXbuFuq8IHycSxvWbHq.png"
              alt="GreyZone Exotics Logo"
              fill
              className="object-contain animate-pulse"
            />
          </div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <Link href="/login" className="font-medium text-blue-500 hover:text-blue-400 transition-colors duration-200">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800/50 backdrop-blur-lg py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="block text-sm font-medium text-gray-300">
                  Full Name
                </div>
                <div className="mt-1">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="bg-gray-700/50 text-white border-gray-600 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <div className="block text-sm font-medium text-gray-300">
                  Email address
                </div>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="bg-gray-700/50 text-white border-gray-600 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <div className="block text-sm font-medium text-gray-300">
                  Password
                </div>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className="bg-gray-700/50 text-white pr-10 border-gray-600 focus:border-blue-500 transition-colors duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-200" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-200" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </div>
                <div className="mt-1 relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className="bg-gray-700/50 text-white pr-10 border-gray-600 focus:border-blue-500 transition-colors duration-200"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-200" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors duration-200" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-2 text-sm text-red-500 animate-pulse">{passwordError}</p>
                )}
              </div>

              <div className="flex items-center">
                <Checkbox id="terms" className="bg-gray-700/50 border-gray-600" required />
                <div className="ml-2 block text-sm text-gray-300">
                  I agree to the{' '}
                  <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-200">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors duration-200">
                    Privacy Policy
                  </a>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02]">
                  Sign up
                </Button>
              </div>
            </form>

            <div className="mt-6 space-y-4">
              <Button 
                onClick={() => handleDummyOAuthSignIn('Google')} 
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Sign up with Google
              </Button>
              <Button 
                onClick={() => handleDummyOAuthSignIn('Apple')} 
                className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Sign up with Apple
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
