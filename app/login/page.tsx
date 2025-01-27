'use client'

import LoginForm from '@/components/auth/LoginForm'
import Header from '@/components/Header'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      const redirectUrl = user.role === 'ADMIN'
        ? '/protected/admin'
        : `/protected/users/${user.userId}`
      router.replace(redirectUrl)
    }
  }, [user, loading, router])

  // Always show the login form and header
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </>
  )
}
