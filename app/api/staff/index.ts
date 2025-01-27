import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const staff = await prisma.staff.findMany()
    return NextResponse.json(staff)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const staff = await prisma.staff.create({
      data: {
        name: body.name,
        email: body.email,
        role: body.role
      }
    })
    return NextResponse.json(staff)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create staff member' },
      { status: 500 }
    )
  }
}
