import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get all damage logs
export async function GET(request: Request) {
  try {
    const damageRecords = await prisma.damageReport.findMany({
      include: {
        car: true
      }
    })
    return NextResponse.json(damageRecords)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch damage logs' },
      { status: 500 }
    )
  }
}

// Create new damage log
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const damageLog = await prisma.damageReport.create({
      data: {
        carId: body.carId,
        rentalId: body.rentalId,
        dateOfIncident: new Date(body.dateOfIncident),
        locationOfIncident: body.locationOfIncident,
        driverStatement: body.driverStatement,
        damageDescription: body.damageDescription,
        weatherConditions: body.weatherConditions,
        policeReportFiled: body.policeReportFiled,
        policeReportNumber: body.policeReportNumber
      }
    })

    // Create audit log entry
    await prisma.auditLog.create({
      data: {
        user_id: body.userId, // ID of user creating the log
        action: 'CREATE_DAMAGE_REPORT',
        entity_type: 'DAMAGE_REPORT',
        entity_id: damageLog.id.toString(),
        changes: body
      }
    })

    return NextResponse.json(damageLog)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create damage report' },
      { status: 500 }
    )
  }
}
