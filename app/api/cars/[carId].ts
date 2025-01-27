import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createAuditLog } from '../audit-logs';

interface Car {
  id?: string;
  make: string;
  model: string;
  year: number;
  category: string;
  dailyRate: number;
  status: 'available' | 'rented' | 'maintenance';
  location: string;
  mileage: number;
  lastMaintenance?: Date;
  features: string[];
  images: string[];
}

export async function GET(
  request: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: params.carId
      }
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch car' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const updates = await request.json();
    const car = await prisma.car.findUnique({
      where: {
        id: params.carId
      }
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    const updatedCar = await prisma.car.update({
      where: {
        id: params.carId
      },
      data: updates
    });

    await createAuditLog({
      userId: 'system', // TODO: Get actual user ID from session
      action: 'UPDATE',
      entityType: 'car',
      entityId: params.carId,
      changes: updates
    });

    return NextResponse.json({ 
      success: true,
      car: updatedCar
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update car' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { carId: string } }
) {
  try {
    const car = await prisma.car.delete({
      where: {
        id: params.carId
      }
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    await createAuditLog({
      userId: 'system', // TODO: Get actual user ID from session
      action: 'DELETE',
      entityType: 'car',
      entityId: params.carId,
      changes: {}
    });

    return NextResponse.json({ 
      success: true,
      car
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete car' },
      { status: 500 }
    );
  }
}
