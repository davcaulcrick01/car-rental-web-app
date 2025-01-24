import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    // Get token from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    // Return early if no token found
    if (!token) {
      return NextResponse.json({ user: null, authenticated: false }, { status: 200 })
    }

    // Verify token and get payload
    const payload = await verifyToken(token)
    
    if (!payload) {
      return NextResponse.json({ 
        user: null, 
        authenticated: false,
        message: 'Invalid or expired token'
      }, { status: 200 })
    }

    // Return user data if token is valid
    return NextResponse.json({ 
      user: { 
        userId: payload.userId, 
        role: payload.role 
      },
      authenticated: true
    }, { status: 200 })

  } catch (error) {
    // Handle any errors during verification
    console.error('Token verification error:', error)
    return NextResponse.json({ 
      user: null,
      authenticated: false, 
      error: 'Error verifying authentication'
    }, { status: 500 })
  }
}
