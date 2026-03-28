// src/lib/dbPool.ts
import { Pool } from 'pg';

// Buat dan ekspor instance Pool tunggal
export const dbPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Tambahkan opsi Pool lain jika diperlukan
});