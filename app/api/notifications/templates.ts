import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get all notification templates
export async function GET() {
  try {
    const templates = await prisma.notificationTemplate.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return NextResponse.json(templates)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notification templates' },
      { status: 500 }
    )
  }
}

// Create new notification template
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const template = await prisma.notificationTemplate.create({
      data: {
        name: body.name,
        type: body.type, // EMAIL or SMS
        subject: body.subject,
        content: body.content,
        variables: body.variables,
        isActive: body.isActive ?? true
      }
    })
    return NextResponse.json(template)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create notification template' },
      { status: 500 }
    )
  }
}

// Update notification template
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const template = await prisma.notificationTemplate.update({
      where: {
        id: body.id
      },
      data: {
        name: body.name,
        type: body.type,
        subject: body.subject,
        content: body.content,
        variables: body.variables,
        isActive: body.isActive
      }
    })
    return NextResponse.json(template)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update notification template' },
      { status: 500 }
    )
  }
}
