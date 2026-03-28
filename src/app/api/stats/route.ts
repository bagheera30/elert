
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const total = await prisma.alert.count();
    const unread = await prisma.alert.count({ where: { isRead: false } });
    const today = await prisma.alert.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });

    return NextResponse.json({ total, unread, today });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 });
  }
}