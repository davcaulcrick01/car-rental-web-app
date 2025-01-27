import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Get total revenue from all completed rentals
    const revenue = await prisma.rental.aggregate({
      where: {
        status: 'COMPLETED'
      },
      _sum: {
        totalPrice: true
      }
    });

    // Get total number of cars
    const totalCars = await prisma.car.count();

    // Get number of active rentals
    const activeRentals = await prisma.rental.count({
      where: {
        status: 'ACTIVE'
      }
    });

    // Get number of available cars (not currently rented)
    const availableCars = await prisma.car.count({
      where: {
        rentals: {
          none: {
            status: 'ACTIVE'
          }
        }
      }
    });

    return NextResponse.json({
      revenue: revenue._sum.totalPrice || 0,
      totalCars,
      activeRentals,
      availableCars,
      utilization: totalCars ? ((totalCars - availableCars) / totalCars * 100).toFixed(1) : 0
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
