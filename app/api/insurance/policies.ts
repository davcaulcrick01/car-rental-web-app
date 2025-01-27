import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get all insurance policies
export async function GET() {
  try {
    const policies = await prisma.insurancePolicy.findMany({
      include: {
        car: true
      }
    })
    return NextResponse.json(policies)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch insurance policies' },
      { status: 500 }
    )
  }
}

// Create new insurance policy
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const policy = await prisma.insurancePolicy.create({
      data: {
        carId: body.carId,
        policyNumber: body.policyNumber,
        provider: body.provider,
        coverageType: body.coverageType, // BASIC, STANDARD, PREMIUM
        coverageLimit: body.coverageLimit,
        deductible: body.deductible,
        startDate: new Date(body.startDate),
        expirationDate: new Date(body.expirationDate),
        status: 'ACTIVE',
        monthlyPremium: body.monthlyPremium,
        notes: body.notes
      },
      include: {
        car: true
      }
    })
    return NextResponse.json(policy)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create insurance policy' },
      { status: 500 }
    )
  }
}

// Update insurance policy
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const policy = await prisma.insurancePolicy.update({
      where: {
        id: body.id
      },
      data: {
        provider: body.provider,
        coverageType: body.coverageType,
        coverageLimit: body.coverageLimit,
        deductible: body.deductible,
        expirationDate: new Date(body.expirationDate),
        status: body.status,
        monthlyPremium: body.monthlyPremium,
        notes: body.notes
      }
    })
    return NextResponse.json(policy)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update insurance policy' },
      { status: 500 }
    )
  }
}

// Delete insurance policy
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await prisma.insurancePolicy.delete({
      where: {
        id: id
      }
    })
    return NextResponse.json({ message: 'Insurance policy deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete insurance policy' },
      { status: 500 }
    )
  }
}
