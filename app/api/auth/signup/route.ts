import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, createToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, name, phoneNumber, address } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password are required.',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format.',
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email },
      });
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        {
          success: false,
          error: 'Database error while checking existing user.',
        },
        { status: 503 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'User already exists.',
        },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);

    let user;
    try {
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || null,
          phoneNumber: phoneNumber || null,
          address: address || null,
          isActive: true,
          lastLogin: new Date(),
        },
      });
    } catch (dbError) {
      console.error('Database error during user creation:', dbError);
      return NextResponse.json(
        {
          success: false,
          error: 'Error creating user in the database.',
        },
        { status: 503 }
      );
    }

    // Generate an authentication token
    let token;
    try {
      token = await createToken(user.id.toString(), user.role);
    } catch (tokenError) {
      console.error('Error generating token:', tokenError);
      return NextResponse.json(
        {
          success: false,
          error: 'Error generating authentication token.',
        },
        { status: 500 }
      );
    }

    // Send the response with the token as a cookie
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Unexpected error during signup:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Unexpected error occurred during signup.',
      },
      { status: 500 }
    );
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
