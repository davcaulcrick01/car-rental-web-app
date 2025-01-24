import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    const users = await prisma.user.findMany();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error accessing database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

console.log('DATABASE_URL:', process.env.DATABASE_URL);

test();
