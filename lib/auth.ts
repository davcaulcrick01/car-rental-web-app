import { compare, hash } from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { prisma } from './db'
import { cookies } from 'next/headers'

export async function hashPassword(password: string) {
  return await hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword)
}

export async function createToken(userId: string, role: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(secret)
  return token
}

export async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)
    return payload as {
      userId: string
      role: string
    }
  } catch {
    return null
  }
}