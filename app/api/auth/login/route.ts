import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyPassword, createToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { toast } from "@/components/ui/use-toast"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ 
        success: false,
        error: 'Email and password are required'
      }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return NextResponse.json({ 
    success: false,
    error: 'Invalid email format' 
  }, { status: 400 });
}

const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid email or password' 
      }, { status: 401 })
    }

    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid email or password' 
      }, { status: 401 })
    }

    const token = await createToken(user.id.toString(), user.role)
    
    // Record login session
    await prisma.loginSession.create({
      data: {
        userId: user.id,
        loginTime: new Date(),
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })

    const response = NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax'
    })

    // Show success toast
    toast({
      title: "Login Successful",
      description: `Welcome back ${user.name || user.email}!`,
      variant: "default",
    })

    console.log(`User ${user.email} logged in successfully`);
return response;

  } catch (error) {
    console.error('Login error:', error)
    
    // Show error toast
    toast({
      title: "Login Failed",
      description: "An error occurred during login. Please try again.",
      variant: "destructive",
    })

    return NextResponse.json({ 
      success: false,
      error: 'Error during login'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
