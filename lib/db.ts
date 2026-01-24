import { drizzle } from 'drizzle-orm/d1';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '@/db/schema';

// Helper type to define the DB instance type based on the environment
export type DB = any;

let db: DB;

if (process.env.NODE_ENV === 'development') {
    // In development loop, use local SQLite file
    // Check if we are running in a context where D1 is not available (like local next dev)
    if (!process.env.DB) {
        console.log("🛠️ Using local SQLite database (better-sqlite3)");
        const sqlite = new Database('local.db');
        db = drizzleSqlite(sqlite, { schema });
    } else {
        console.log("🌩️ Using Cloudflare D1 database (Dev environment)");
        db = drizzle(process.env.DB as D1Database, { schema });
    }
} else {
    // In production (Cloudflare Pages), use D1
    db = drizzle(process.env.DB as D1Database, { schema });
}

export { db };
