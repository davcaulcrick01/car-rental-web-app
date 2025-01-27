import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get all notification triggers
export async function GET() {
  try {
    const triggers = await prisma.notificationTrigger.findMany({
      include: {
        template: true,
        conditions: true
      }
    })
    return NextResponse.json(triggers)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notification triggers' },
      { status: 500 }
    )
  }
}

// Create new notification trigger
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const trigger = await prisma.notificationTrigger.create({
      data: {
        name: body.name,
        type: body.type, // RENTAL_OVERDUE, MAINTENANCE_DUE, SIGNUP etc
        description: body.description,
        enabled: body.enabled ?? true,
        conditions: {
          create: body.conditions.map((condition: any) => ({
            field: condition.field,
            operator: condition.operator,
            value: condition.value
          }))
        },
        templateId: body.templateId,
        priority: body.priority || 'NORMAL',
        cooldownMinutes: body.cooldownMinutes || 60,
        metadata: body.metadata || {}
      },
      include: {
        template: true,
        conditions: true
      }
    })

    return NextResponse.json(trigger)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create notification trigger' },
      { status: 500 }
    )
  }
}
