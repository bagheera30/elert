// prisma.config.ts
// import "dotenv/config"; // <-- HAPUS BARIS INI untuk Bun

import type { PrismaConfig } from "prisma"; // Import type PrismaConfig
import { Pool } from 'pg'; // Import Pool dari driver 'pg'
import { PrismaPg } from '@prisma/adapter-pg'; // Import adapter

// Buat instance Pool (ini akan digunakan oleh adapter)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Anda bisa menambahkan opsi lain untuk Pool di sini jika diperlukan
  // misalnya max, min, idleTimeoutMillis, dll.
});

// Buat instance adapter
const adapterInstance = new PrismaPg(pool);

// Gunakan satisfies untuk type-safety
export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // seed: "tsx prisma/seed.ts", // Tambahkan jika Anda menggunakan seeding
  },
  // Konfigurasi datasource untuk CLI dan PrismaClient
  datasource: {
    // Koneksi untuk CLI (seperti migrate, studio) menggunakan adapter atau URL
    // Karena engineType = "client", CLI akan otomatis menggunakan adapter jika tersedia
    // Jika tidak, Anda mungkin tetap perlu menyediakan URL untuk operasi CLI tertentu
    url: process.env.DATABASE_URL, // CLI bisa menggunakan url untuk migrasi
    // adapter: adapterInstance, // Gunakan ini jika CLI secara eksplisit mendukung adapter di config (cek dokumentasi v7 terbaru)
  },
  // Anda bisa menambahkan konfigurasi lain di sini jika diperlukan
  // experimental: { ... },
} satisfies PrismaConfig;
