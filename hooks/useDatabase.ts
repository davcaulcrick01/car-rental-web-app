import { useState, useEffect } from 'react'
import { User as UserType } from '@/types'

// Define type for API response user data
type UserResponse = Omit<UserType, 'password' | 'role' | 'createdAt'> & {
  createdAt: string
}

export function useDatabase() {
  const [data, setData] = useState<UserResponse[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        const res = await fetch('/api/test-db', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' // Include cookies for auth
        })
        const result = await res.json()

        if (!isMounted) return

        if (res.ok && result.success) {
          // Transform dates to strings before setting state
          const formattedData = result.data.map((user: UserResponse) => ({
            ...user,
            createdAt: new Date(user.createdAt).toISOString()
          }))
          setData(formattedData)
        } else {
          throw new Error(result.error || 'Error fetching data')
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  return { data, loading, error }
}
