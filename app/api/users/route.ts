import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export async function POST(request: Request) {
  console.log('API route called');
  try {
    if (!prisma) {
      throw new Error('Prisma client is not initialized');
    }

    const { address } = await request.json();
    console.log('Received address:', address);

    const user = await prisma.user.upsert({
      where: { walletAddress: address },
      update: {},
      create: { walletAddress: address },
    });

    console.log('User saved:', user);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ success: false, error: 'Failed to save user', details: error.message }, { status: 500 });
  }
}