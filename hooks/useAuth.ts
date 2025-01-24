import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  userId: string
  role: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Memoized checkAuth function to avoid recreating on every render
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/verify-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const data = await res.json()
      
      if (res.ok && data.authenticated) {
        setUser(data.user)
        setError(null)
      } else {
        setUser(null)
        setError(data.message || 'Authentication failed')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setError('Authentication check failed')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      })
      const data = await res.json()

      if (res.ok && data.user) {
        setUser(data.user)
        setError(null)
        router.push('/protected/dashboard')
        return true
      } else {
        setError(data.message || 'Login failed')
        return false
      }
    } catch (error) {
      console.error('Login failed:', error)
      setError('Login request failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      
      if (res.ok) {
        setUser(null)
        setError(null)
        router.push('/auth/login')
      } else {
        const data = await res.json()
        setError(data.message || 'Logout failed')
      }
    } catch (error) {
      console.error('Logout failed:', error)
      setError('Logout request failed')
    } finally {
      setLoading(false)
    }
  }

  const refreshAuth = async () => {
    setLoading(true)
    await checkAuth()
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    refreshAuth,
    isAuthenticated: !!user
  }
}