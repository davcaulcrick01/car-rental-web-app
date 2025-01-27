import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Get database statistics and health information
export async function GET() {
  try {
    // Get table statistics
    const tableStats = await Promise.all([
      prisma.car.count(),
      prisma.rental.count(), 
      prisma.customer.count(),
      prisma.staff.count(),
      prisma.location.count(),
      prisma.pricingRule.count()
    ])

    // Get latest records to check last updated timestamps
    const latestRecords = await Promise.all([
      prisma.rental.findFirst({ orderBy: { lastUpdated: 'desc' } }),
      prisma.car.findFirst({ orderBy: { lastUpdated: 'desc' } }),
      prisma.staff.findFirst({ orderBy: { lastUpdated: 'desc' } })
    ])

    const dbStats = {
      tableCounts: {
        cars: tableStats[0],
        rentals: tableStats[1],
        customers: tableStats[2],
        staff: tableStats[3],
        locations: tableStats[4],
        pricingRules: tableStats[5]
      },
      lastUpdated: {
        rentals: latestRecords[0]?.lastUpdated || null,
        cars: latestRecords[1]?.lastUpdated || null,
        staff: latestRecords[2]?.lastUpdated || null
      },
      status: 'healthy',
      timestamp: new Date()
    }

    return NextResponse.json(dbStats)
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch database statistics',
        status: 'error',
        timestamp: new Date()
      },
      { status: 500 }
    )
  }
}
