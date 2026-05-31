import pkg from 'pg';
const { Pool } = pkg;

const globalWithDb = globalThis;

if (!globalWithDb._pgPool) {
  globalWithDb._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
}

const db = globalWithDb._pgPool;

export default db;
