import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AlertData } from '@/lib/types';

// GET: Ambil alert untuk OBS
export async function GET() {
    try {
        const alert = await prisma.alert.findFirst({
            where: { isRead: false },
            orderBy: { createdAt: 'asc' },
        });

        if (!alert) {
            return NextResponse.json({ alert: null }, {
                headers: { 'Cache-Control': 'no-store' }
            });
        }

        await prisma.alert.update({
            where: { id: alert.id },
            data: { isRead: true },
        });

        const formattedAlert: AlertData = {
            type: alert.type as AlertData['type'],
            username: alert.username,
            message: alert.message || '',
            amount: alert.amount || undefined,
            image: alert.image || undefined,
        };

        return NextResponse.json({ alert: formattedAlert }, {
            headers: { 'Cache-Control': 'no-store' }
        });
    } catch (error) {
        console.error('GET Alert Error:', error);
        return NextResponse.json({ alert: null, error: 'Failed to fetch alert' }, { status: 500 });
    }
}

// POST: Trigger alert baru
export async function POST(request: NextRequest) {
    try {
        const body: AlertData = await request.json();

        if (!body.type || !body.username) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        const authHeader = request.headers.get('authorization');
        const secretKey = process.env.API_SECRET_KEY;

        if (secretKey && authHeader !== `Bearer ${secretKey}`) {
            // Uncomment untuk aktivasi keamanan
            // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await prisma.alert.create({
            data: {
                type: body.type,
                username: body.username,
                message: body.message,
                amount: body.amount,
                image: body.image,
                isRead: false,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('POST Alert Error:', error);
        return NextResponse.json({ error: 'Failed to create alert' }, { status: 500 });
    }
}

// DELETE: Hapus semua alert
export async function DELETE() {
    try {
        await prisma.alert.deleteMany({});
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete alerts' }, { status: 500 });
    }
}