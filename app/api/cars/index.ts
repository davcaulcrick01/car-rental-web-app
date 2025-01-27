import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const cars = await prisma.car.findMany()
    return NextResponse.json(cars)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const car = await prisma.car.create({
      data: {
        make: body.make,
        model: body.model,
        year: body.year,
        licensePlate: body.licensePlate,
        available: true
      }
    })
    return NextResponse.json(car)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create car' },
      { status: 500 }
    )
  }
}
