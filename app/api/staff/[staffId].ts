import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get staff member details
export async function GET(
  request: Request,
  { params }: { params: { staffId: string } }
) {
  try {
    const staff = await prisma.staff.findUnique({
      where: {
        id: params.staffId
      },
      include: {
        schedule: true,
        location: true
      }
    })

    if (!staff) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(staff)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch staff details' },
      { status: 500 }
    )
  }
}

// Update staff member
export async function PATCH(
  request: Request,
  { params }: { params: { staffId: string } }
) {
  try {
    const body = await request.json()
    const staff = await prisma.staff.update({
      where: {
        id: params.staffId
      },
      data: {
        role: body.role,
        isActive: body.isActive,
        schedule: {
          upsert: body.schedule?.map((shift: any) => ({
            where: { id: shift.id || '' },
            update: {
              dayOfWeek: shift.dayOfWeek,
              startTime: shift.startTime,
              endTime: shift.endTime
            },
            create: {
              dayOfWeek: shift.dayOfWeek,
              startTime: shift.startTime,
              endTime: shift.endTime
            }
          }))
        },
        locationId: body.locationId,
        lastUpdated: new Date()
      },
      include: {
        schedule: true,
        location: true
      }
    })

    return NextResponse.json(staff)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update staff member' },
      { status: 500 }
    )
  }
}

// Delete staff member
export async function DELETE(
  request: Request,
  { params }: { params: { staffId: string } }
) {
  try {
    await prisma.staff.delete({
      where: {
        id: params.staffId
      }
    })

    return NextResponse.json(
      { message: 'Staff member deleted successfully' }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete staff member' },
      { status: 500 }
    )
  }
}
