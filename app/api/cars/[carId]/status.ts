import { NextResponse } from 'next/server';
import { createAuditLog } from '../../audit-logs';
import { prisma } from '@/lib/db';

// Get current status of a car
export async function GET(
  request: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const car = await prisma.car.findUnique({
      where: { id: params.carId },
      select: { status: true }
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: car.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch car status' },
      { status: 500 }
    );
  }
}

// Update status of a car
export async function PATCH(
  request: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const { status } = await request.json();

    // Validate status
    const validStatuses = ['available', 'rented', 'maintenance'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const car = await prisma.car.update({
      where: { id: params.carId },
      data: { status }
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    // Create audit log
    await createAuditLog({
      userId: 'system', // TODO: Get actual user ID from auth
      action: 'UPDATE_STATUS',
      entityType: 'car',
      entityId: params.carId,
      changes: { status }
    });

    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update car status' },
      { status: 500 }
    );
  }
}
