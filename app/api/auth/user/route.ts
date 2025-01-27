import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json({ user: null, authenticated: false }, { status: 200 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
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

    return NextResponse.json({ 
      user: {
        ...user,
        userId: user.id // Add userId for consistency with useAuth hook
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
