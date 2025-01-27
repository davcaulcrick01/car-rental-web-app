import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get all pricing rules
export async function GET() {
  try {
    const rules = await prisma.pricingRule.findMany({
      orderBy: {
        lastUpdated: 'desc'
      }
    })
    return NextResponse.json(rules)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pricing rules' },
      { status: 500 }
    )
  }
}

// Create new pricing rule
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const rule = await prisma.pricingRule.create({
      data: {
        name: body.name,
        description: body.description,
        type: body.type, // SEASONAL, DYNAMIC, SPECIAL_EVENT
        baseRate: body.baseRate,
        surgeMultiplier: body.surgeMultiplier,
        surgeStartTime: body.surgeStartTime ? new Date(body.surgeStartTime) : null,
        surgeEndTime: body.surgeEndTime ? new Date(body.surgeEndTime) : null,
        seasonStartDate: body.seasonStartDate ? new Date(body.seasonStartDate) : null,
        seasonEndDate: body.seasonEndDate ? new Date(body.seasonEndDate) : null,
        conditions: body.conditions, // JSON object with specific conditions
        isActive: body.isActive ?? true,
        lastUpdated: new Date()
      }
    })

    return NextResponse.json(rule)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create pricing rule' },
      { status: 500 }
    )
  }
}

// Bulk update pricing rules
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { rules } = body

    const updates = await Promise.all(
      rules.map((rule: any) =>
        prisma.pricingRule.update({
          where: { id: rule.id },
          data: {
            ...rule,
            lastUpdated: new Date()
          }
        })
      )
    )

    return NextResponse.json(updates)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update pricing rules' },
      { status: 500 }
    )
  }
}
