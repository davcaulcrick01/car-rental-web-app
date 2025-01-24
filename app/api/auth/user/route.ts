import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null, authenticated: false }, { status: 200 });
  }

  const payload = await verifyToken(token);
  if (payload) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: payload.userId,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          phoneNumber: true,
          address: true,
          profileImage: true,
          isActive: true,
        },
      });

      if (!user) {
        return NextResponse.json({ user: null }, { status: 200 });
      }

      if (!user.isActive) {
        return NextResponse.json({ error: 'User account is inactive' }, { status: 403 });
      }

      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  return NextResponse.json({ user: null }, { status: 200 });
}
