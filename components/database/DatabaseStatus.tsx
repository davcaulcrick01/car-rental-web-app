'use client'

import { useEffect, useState } from 'react'

export default function DatabaseStatus() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch('/api/test-db', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json()
        
        if (res.ok && data.success) {
          setStatus('connected')
        } else {
          setStatus('error')
          setError(data.error || 'Failed to connect to database')
        }
      } catch (err) {
        setStatus('error')
        setError(err instanceof Error ? err.message : 'Failed to check database connection')
      }
    }

    checkConnection()

    // Set up polling every 30 seconds to check connection
    const interval = setInterval(checkConnection, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-lg p-4 border">
      {status === 'loading' && (
        <p className="text-gray-500 flex items-center gap-2">
          <span className="animate-spin">⚡</span>
          Checking database connection...
        </p>
      )}
      {status === 'connected' && (
        <p className="text-green-500 flex items-center gap-2">
          <span>✅</span>
          Connected to database
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-500 flex items-center gap-2">
          <span>❌</span>
          Database error: {error}
        </p>
      )}
    </div>
  )
}
