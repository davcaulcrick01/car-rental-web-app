import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get pricing rule status
export async function GET(
  request: Request,
  { params }: { params: { ruleId: string } }
) {
  try {
    const rule = await prisma.pricingRule.findUnique({
      where: {
        id: params.ruleId
      },
      select: {
        id: true,
        isActive: true,
        surgeMultiplier: true,
        surgeStartTime: true,
        surgeEndTime: true,
        lastUpdated: true
      }
    })

    if (!rule) {
      return NextResponse.json(
        { error: 'Pricing rule not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(rule)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pricing rule status' },
      { status: 500 }
    )
  }
}

// Update pricing rule status
export async function PATCH(
  request: Request,
  { params }: { params: { ruleId: string } }
) {
  try {
    const body = await request.json()
    const rule = await prisma.pricingRule.update({
      where: {
        id: params.ruleId
      },
      data: {
        isActive: body.isActive,
        surgeMultiplier: body.surgeMultiplier,
        surgeStartTime: body.surgeStartTime ? new Date(body.surgeStartTime) : null,
        surgeEndTime: body.surgeEndTime ? new Date(body.surgeEndTime) : null,
        lastUpdated: new Date()
      }
    })

    return NextResponse.json(rule)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update pricing rule status' },
      { status: 500 }
    )
  }
}
