import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  try {
    return NextResponse.next()
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ 
      error: 'Internal Server Error' 
    }, { status: 500 })
  }
}

export const config = {
  matcher: '/api/:path*',
}