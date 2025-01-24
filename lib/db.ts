import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'], // Enable logging for debugging
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

// Connect to the database
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((error: Error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
