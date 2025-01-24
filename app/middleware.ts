import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const protectedPaths = ['/protected/admin', '/protected/dashboard']

  if (protectedPaths.some(path => pathname.startsWith(path))) {
    const token = req.cookies.get('token')?.value
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }

    const payload = await verifyToken(token)
    if (!payload) {
      const url = req.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}
