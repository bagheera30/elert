// src/lib/prisma.ts
import { PrismaPg } from '@prisma/adapter-pg'; // Import adapter
import { PrismaClient } from '@/generated/prisma'; // Import PrismaClient dari path hasil generate
import { dbPool } from '@/lib/dbPool'; // Impor shared Pool instance

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Buat instance adapter menggunakan shared Pool
const adapter = new PrismaPg(dbPool);

// Inisialisasi PrismaClient dengan adapter
export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter, // <-- PASANG ADAPTER DI SINI, ini wajib untuk engineType = "client"
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;