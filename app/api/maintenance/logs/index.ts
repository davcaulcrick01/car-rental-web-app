import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get maintenance logs with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const carId = searchParams.get('carId')
    const maintenanceType = searchParams.get('type')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Build where clause based on filters
    const where: any = {}
    
    if (carId) {
      where.carId = carId
    }
    if (maintenanceType) {
      where.type = maintenanceType
    }
    if (startDate || endDate) {
      where.serviceDate = {}
      if (startDate) {
        where.serviceDate.gte = new Date(startDate)
      }
      if (endDate) {
        where.serviceDate.lte = new Date(endDate)
      }
    }

    const logs = await prisma.maintenanceLog.findMany({
      where,
      include: {
        car: true
      },
      orderBy: {
        serviceDate: 'desc'
      }
    })

    return NextResponse.json(logs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch maintenance logs' },
      { status: 500 }
    )
  }
}

// Create new maintenance log
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const log = await prisma.maintenanceLog.create({
      data: {
        carId: body.carId,
        type: body.type, // OIL_CHANGE, INSPECTION, REPAIR, etc
        description: body.description,
        serviceDate: new Date(body.serviceDate),
        cost: body.cost,
        mileage: body.mileage,
        performedBy: body.performedBy,
        notes: body.notes,
        status: body.status || 'COMPLETED'
      },
      include: {
        car: true
      }
    })

    return NextResponse.json(log)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create maintenance log' },
      { status: 500 }
    )
  }
}
