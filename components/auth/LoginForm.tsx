'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  // Form state
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(false)
  
  const router = useRouter()
  const { login, error: authError, loading: isLoading } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address')
      return
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return
    }

    const success = await login(email, password)
    if (success) {
      router.push('/protected/dashboard')
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', {
        callbackUrl: '/protected/dashboard',
      })
    } catch (error) {
      console.error('Google sign in error:', error)
    }
  }

  const handleAppleSignIn = () => {
    // Implement Apple Sign In 
    console.log('Apple sign in clicked')
  }

  if (!mounted) {
    return null
  }

  return (
    <div suppressHydrationWarning className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-5 bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-gray-600/50 hover:border-gray-500/50 transition-all duration-300">
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/car_images/images/logos/GreyZone-Exotics-01.png`}
            alt="GreyZone Exotics Logo"
            width={160}
            height={80}
            className="mx-auto hover:scale-105 transition-transform duration-300"
            priority
          />
          <h2 className="mt-4 text-center text-xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            New to GreyZone Exotics?{' '}
            <Link href="/signup" className="font-medium text-blue-500 hover:text-blue-400 transition-colors duration-200 underline">
              Create an account
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-3">
            <div>
              <div className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </div>
              <div className="mt-1">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError(null)
                  }}
                  required
                  placeholder="your@email.com"
                  className="bg-gray-700/50 text-white border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
                {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
              </div>
            </div>

            <div>
              <div className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </div>
              <div className="mt-1 relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setPasswordError(null)
                  }}
                  required
                  placeholder="••••••••"
                  className="bg-gray-700/50 text-white pr-10 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
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
                {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300 cursor-pointer">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" className="text-blue-500 hover:text-blue-400 transition-colors duration-200 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-2">
              <p className="text-red-500 text-sm">{authError}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm transition-all duration-200"
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} className="mr-2" />
            Continue with Google
          </Button>

          <Button
            type="button"
            onClick={handleAppleSignIn}
            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 border border-gray-700 rounded-lg shadow-sm transition-all duration-200"
          >
            <Image src="/apple.svg" alt="Apple" width={20} height={20} className="mr-2" />
            Continue with Apple
          </Button>
        </div>
      </div>
    </div>
  )
}
