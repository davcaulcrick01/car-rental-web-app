import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { createAuditLog } from './app/api/audit-logs'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuthPage = request.nextUrl.pathname === '/login'
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/protected')

  // Redirect unauthenticated users to login
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from login
  if (token && isAuthPage) {
    const redirectUrl = token.role === 'ADMIN'
      ? '/protected/admin'
      : `/protected/users/${token.userId}`
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/protected/admin')) {
    if (!token || token.role !== 'ADMIN') {
      const redirectUrl = `/protected/users/${token?.userId || ''}`
      return NextResponse.redirect(new URL(redirectUrl, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/protected/:path*']
}