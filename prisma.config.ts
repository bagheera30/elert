// prisma/prisma.config.ts
import { defineConfig, env } from "prisma/config"; // Import defineConfig dan env dari prisma/config

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // seed: "tsx prisma/seed.ts", // Tambahkan jika Anda menggunakan seeding
  },
  // Konfigurasi datasource untuk CLI (migrate, studio, etc.)
  // Gunakan env() untuk type safety dan enforce existence
  datasource: {
    url: env("DATABASE_URL"), // <-- Gunakan env() dari prisma/config
    // shadowDatabaseUrl: env("SHADOW_DATABASE_URL"), // Tambahkan jika menggunakan shadow database
  },
  // experimental: { ... }, // Tambahkan fitur eksperimental di sini jika diperlukan
});