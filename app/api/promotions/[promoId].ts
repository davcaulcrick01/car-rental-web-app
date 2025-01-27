import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get promotion details
export async function GET(
  request: Request,
  { params }: { params: { promoId: string } }
) {
  try {
    const promotion = await prisma.promotion.findUnique({
      where: {
        id: params.promoId
      }
    })

    if (!promotion) {
      return NextResponse.json(
        { error: 'Promotion not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(promotion)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch promotion details' },
      { status: 500 }
    )
  }
}

// Update promotion
export async function PATCH(
  request: Request,
  { params }: { params: { promoId: string } }
) {
  try {
    const body = await request.json()
    const promotion = await prisma.promotion.update({
      where: {
        id: params.promoId
      },
      data: {
        code: body.code,
        description: body.description,
        discountType: body.discountType,
        discountValue: body.discountValue,
        startDate: body.startDate ? new Date(body.startDate) : undefined,
        endDate: body.endDate ? new Date(body.endDate) : undefined,
        isActive: body.isActive,
        maxUses: body.maxUses,
        minRentalDays: body.minRentalDays,
        termsAndConditions: body.termsAndConditions
      }
    })

    return NextResponse.json(promotion)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update promotion' },
      { status: 500 }
    )
  }
}

// Delete promotion
export async function DELETE(
  request: Request,
  { params }: { params: { promoId: string } }
) {
  try {
    await prisma.promotion.delete({
      where: {
        id: params.promoId
      }
    })

    return NextResponse.json({ message: 'Promotion deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete promotion' },
      { status: 500 }
    )
  }
}
