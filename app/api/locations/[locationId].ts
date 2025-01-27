import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get location details
export async function GET(
  request: Request,
  { params }: { params: { locationId: string } }
) {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: params.locationId
      },
      include: {
        cars: true,
        staff: true,
        operatingHours: true
      }
    })

    if (!location) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(location)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch location details' },
      { status: 500 }
    )
  }
}

// Update location details
export async function PATCH(
  request: Request,
  { params }: { params: { locationId: string } }
) {
  try {
    const body = await request.json()
    const location = await prisma.location.update({
      where: {
        id: params.locationId
      },
      data: {
        name: body.name,
        address: body.address,
        city: body.city,
        state: body.state,
        zipCode: body.zipCode,
        phoneNumber: body.phoneNumber,
        email: body.email,
        isActive: body.isActive,
        operatingHours: {
          upsert: {
            create: body.operatingHours,
            update: body.operatingHours
          }
        }
      },
      include: {
        cars: true,
        staff: true,
        operatingHours: true
      }
    })

    // Create audit log for the update
    await prisma.auditLog.create({
      data: {
        user_id: body.userId,
        action: 'UPDATE_LOCATION',
        entity_type: 'LOCATION',
        entity_id: location.id,
        changes: body
      }
    })

    return NextResponse.json(location)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update location' },
      { status: 500 }
    )
  }
}

// Delete location
export async function DELETE(
  request: Request,
  { params }: { params: { locationId: string } }
) {
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: params.locationId
      }
    })

    if (!location) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      )
    }

    // Delete location and related data
    await prisma.$transaction([
      prisma.operatingHours.deleteMany({
        where: { locationId: params.locationId }
      }),
      prisma.location.delete({
        where: { id: params.locationId }
      })
    ])

    return NextResponse.json({
      message: 'Location deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete location' },
      { status: 500 }
    )
  }
}
