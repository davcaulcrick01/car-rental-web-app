"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Header from '@/components/Header'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      // Add your login logic here
      console.log('Logging in with:', { email, password })
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  const handleDummyOAuthSignIn = (provider: string) => {
    console.log(`Signing in with ${provider} (dummy)`)
    router.push('/') // Simulate OAuth login success and redirect
  }

  return (
    <>
      <Header /> {/* Adding the Header at the top */}
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GreyZone%20Exotics-01-yBPXfYu8PidVXbuFuq8IHycSxvWbHq.png"
            alt="GreyZone Exotics Logo"
            width={200}
            height={100}
            className="mx-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <Link href="/signup" className="font-medium text-blue-500 hover:text-blue-400">
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <div className="mb-4 p-2 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email address
                  </Label>
                </div>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </Label>
                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="font-medium text-blue-500 hover:text-blue-400"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-700 text-white pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" className="bg-gray-700" />
                  <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </Label>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <Button onClick={() => handleDummyOAuthSignIn('Google')} className="w-full bg-red-600 hover:bg-red-700">
                Sign in with Google (Dummy)
              </Button>
              <Button onClick={() => handleDummyOAuthSignIn('Apple')} className="mt-4 w-full bg-black hover:bg-gray-800">
                Sign in with Apple (Dummy)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
