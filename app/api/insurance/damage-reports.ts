import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get all damage reports
export async function GET() {
  try {
    const damageReports = await prisma.damageReport.findMany({
      include: {
        car: true,
        insuranceClaim: true,
        photos: true
      }
    })
    return NextResponse.json(damageReports)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch damage reports' },
      { status: 500 }
    )
  }
}

// Create new damage report
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const damageReport = await prisma.damageReport.create({
      data: {
        carId: body.carId,
        rentalId: body.rentalId,
        dateOfIncident: new Date(body.dateOfIncident),
        locationOfIncident: body.locationOfIncident,
        driverStatement: body.driverStatement,
        damageDescription: body.damageDescription,
        weatherConditions: body.weatherConditions,
        policeReportFiled: body.policeReportFiled,
        policeReportNumber: body.policeReportNumber,
        insuranceClaim: {
          create: {
            claimNumber: body.insuranceClaimNumber,
            status: 'PENDING',
            estimatedDamage: body.estimatedDamage,
            deductibleAmount: body.deductibleAmount,
            insuranceProvider: body.insuranceProvider,
            adjusterName: body.adjusterName,
            adjusterContact: body.adjusterContact
          }
        },
        photos: {
          create: body.photos.map((photo: any) => ({
            url: photo.url,
            caption: photo.caption,
            dateUploaded: new Date()
          }))
        }
      },
      include: {
        car: true,
        insuranceClaim: true,
        photos: true
      }
    })

    // Create audit log for the damage report
    await prisma.auditLog.create({
      data: {
        user_id: body.userId,
        action: 'CREATE_DAMAGE_REPORT',
        entity_type: 'DAMAGE_REPORT',
        entity_id: damageReport.id.toString(),
        changes: body
      }
    })

    return NextResponse.json(damageReport)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create damage report' },
      { status: 500 }
    )
  }
}
