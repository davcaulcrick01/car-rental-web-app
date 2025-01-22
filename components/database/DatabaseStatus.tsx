'use client'

import { useEffect, useState } from 'react'

export default function DatabaseStatus() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function checkConnection() {
      try {
        const res = await fetch('/api/test-db')
        const data = await res.json()
        
        if (res.ok) {
          setStatus('connected')
        } else {
          setStatus('error')
          setError(data.error)
        }
      } catch (error) {
        setStatus('error')
        setError('Failed to check database connection')
      }
    }

    checkConnection()
  }, [])

  return (
    <div>
      {status === 'loading' && <p>Checking database connection...</p>}
      {status === 'connected' && <p>Connected to database ✅</p>}
      {status === 'error' && (
        <p className="text-red-500">
          Database error: {error}
        </p>
      )}
    </div>
  )
}