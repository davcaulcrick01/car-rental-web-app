import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  try {
    // Define protected routes - exclude auth routes since they handle their own auth
    const protectedRoutes = ['/protected/users/', '/api/'];
    const publicRoutes = ['/api/auth/'];
    
    const isProtected = protectedRoutes.some(route => request.url.includes(route)) && 
                       !publicRoutes.some(route => request.url.includes(route));

    // Allow login and signup routes to bypass authentication
    if (isProtected && !request.url.includes('/login') && !request.url.includes('/signup')) {
      const authHeader = request.headers.get('authorization');
      const token = authHeader?.split(' ')[1];

      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secret);
        const decoded = payload as { userId: number; role: string };

        // Optionally attach user info to headers for downstream usage
        const newHeaders = new Headers(request.headers);
        newHeaders.set('x-user-id', decoded.userId.toString());
        newHeaders.set('x-user-role', decoded.role);

        return NextResponse.next({
          request: {
            headers: newHeaders,
          },
        });
      } catch (error) {
        console.error('JWT verification failed:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const config = {
  matcher: ['/api/:path*', '/protected/users/:path*'],
};
