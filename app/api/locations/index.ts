import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get all locations
export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      include: {
        cars: true,
        staff: true
      }
    })
    return NextResponse.json(locations)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    )
  }
}

// Create new location
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const location = await prisma.location.create({
      data: {
        name: body.name,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        phoneNumber: body.phoneNumber,
        email: body.email,
        openingHours: body.openingHours,
        isActive: body.isActive ?? true,
        notes: body.notes
      },
      include: {
        cars: true,
        staff: true
      }
    })

    // Create audit log for the new location
    await prisma.auditLog.create({
      data: {
        user_id: body.userId,
        action: 'CREATE_LOCATION',
        entity_type: 'LOCATION',
        entity_id: location.id,
        changes: body
      }
    })

    return NextResponse.json(location)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create location' },
      { status: 500 }
    )
  }
}
