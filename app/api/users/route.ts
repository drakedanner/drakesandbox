import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { address }: { address: string } = await request.json();
    
    const user = await prisma.user.upsert({
      where: { walletAddress: address },
      update: {},
      create: { walletAddress: address },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json({ success: false, error: 'Failed to save user' }, { status: 500 });
  }
}