import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Create response with success message
    const response = NextResponse.json({ 
      success: true,
      message: 'Successfully logged out'
    })

    // Clear the authentication token cookie
    response.cookies.set('token', '', {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0, // Expire immediately
      sameSite: 'lax'
    })

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Error during logout'
    }, { status: 500 })
  }
}
