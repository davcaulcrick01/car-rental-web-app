// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword } from '@/lib/auth';
import { createAuditLog } from '@/lib/auditlogger';

// Force this route to run on the Node.js runtime
export const config = {
  runtime: 'nodejs',
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Fetch user from the database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.warn(`Failed login attempt for non-existent email: ${email}`);
      // Log failed login attempt
      await createAuditLog({
        userId: 'anonymous',
        action: 'LOGIN_ATTEMPT',
        entityType: 'AUTH',
        entityId: email,
        changes: { status: 'FAILED', reason: 'User not found' },
      });
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      console.warn(`Failed login attempt for user: ${email}`);
      // Log failed login attempt
      await createAuditLog({
        userId: user.id.toString(),
        action: 'LOGIN_ATTEMPT',
        entityType: 'AUTH',
        entityId: email,
        changes: { status: 'FAILED', reason: 'Invalid credentials' },
      });
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Log successful login
    await createAuditLog({
      userId: user.id,
      action: 'LOGIN',
      entityType: 'AUTH',
      entityId: user.id,
      changes: { status: 'SUCCESS' },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });

    // Return user data for NextAuth session
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          userId: user.id, // Add userId to match the expected format
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Error during login' },
      { status: 500 }
    );
  }
}
