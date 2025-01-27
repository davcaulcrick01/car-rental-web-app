'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'

interface User {
  userId: string
  id: string
  email: string
  name?: string
  role: 'ADMIN' | 'USER'
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { data: session, status } = useSession()

  const checkAuth = useCallback(async () => {
    if (status === 'loading') {
      setLoading(true)
      return
    }

    try {
      if (status === 'unauthenticated') {
        setUser(null)
        setLoading(false)
        return
      }

      if (session?.user) {
        const userData = {
          userId: session.user.id,
          id: session.user.id,
          email: session.user.email!,
          name: session.user.name!,
          role: session.user.role as 'ADMIN' | 'USER'
        }
        setUser(userData)

        // Redirect based on role
        const redirectUrl = userData.role === 'ADMIN'
          ? '/protected/admin'
          : `/protected/users/${userData.userId}`
        router.push(redirectUrl)
      }
    } catch (err) {
      console.error('Auth check failed:', err)
      setError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }, [status, session, router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError(result.error)
        return false
      }

      // Wait briefly for session to update
      await new Promise(resolve => setTimeout(resolve, 500))

      // Get fresh session data
      const session = await fetch('/api/auth/session')
      const data = await session.json()

      if (!data?.user) {
        setError('Failed to get user session')
        return false
      }

      // Set user data
      const userData = {
        id: data.user.id,
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role
      }
      setUser(userData)

      // Force immediate redirect
      const redirectUrl = userData.role === 'ADMIN'
        ? '/protected/admin'
        : `/protected/users/${userData.userId}`
      
      // Use window.location for hard redirect
      window.location.href = redirectUrl

      return true
    } catch (error) {
      console.error('Login failed:', error)
      setError('Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await signOut({ redirect: false })
      setUser(null)
      router.replace('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      setError('Logout request failed')
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading: status === 'loading' || loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  }
}