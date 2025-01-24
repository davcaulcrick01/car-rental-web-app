import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Initialize PrismaClient as a global variable to avoid multiple instances
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a single PrismaClient instance and reuse it
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export async function GET(request: Request) {
  try {
    // Check database connection with a simple query
    await prisma.$connect();
    
    // First check if the User table exists by querying information schema
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'User'
      );
    `;

    if (!tableExists[0].exists) {
      return NextResponse.json({
        success: false,
        error: 'The table `public.User` does not exist in the current database. Please run database migrations first.'
      }, {
        status: 500
      });
    }

    await prisma.user.count();

    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful'
    }, {
      status: 200
    });

  } catch (error: unknown) {
    // Ensure error is logged as an object to avoid null payload
    console.error('Database connection error:', { error: error instanceof Error ? error.message : String(error) });
    
    if (error instanceof Error && error.message.includes('prisma generate')) {
      return NextResponse.json({
        success: false,
        error: 'Database client not initialized. Please run "prisma generate" first.'
      }, {
        status: 500
      });
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to database'
    }, {
      status: 500
    });
  } finally {
    await prisma.$disconnect();
  }
}
