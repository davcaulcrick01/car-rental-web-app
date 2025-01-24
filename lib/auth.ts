import { compare, hash } from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { prisma } from './db'
import { cookies } from 'next/headers'

// Hash password with bcrypt
export async function hashPassword(password: string) {
  if (!password) throw new Error('Password is required')
  return await hash(password, 12)
}

// Verify password against hashed version
export async function verifyPassword(password: string, hashedPassword: string) {
  if (!password || !hashedPassword) throw new Error('Password and hash required')
  return await compare(password, hashedPassword)
}

// Create JWT token with user info
export async function createToken(userId: string, role: string) {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not configured')
  if (!userId || !role) throw new Error('User ID and role required')

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret)

  // Set HTTP-only cookie
  const cookieStore = await cookies()
  cookieStore.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 1 day
  })

  return token
}

// Verify and decode JWT token
export async function verifyToken(token: string) {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not configured')
  if (!token) return null

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    
    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string }
    })

    if (!user || !user.isActive) return null

    return payload as {
      userId: string
      role: string 
    }
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}