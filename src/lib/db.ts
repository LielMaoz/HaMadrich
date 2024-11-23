import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Optional: Log when connected
pool.on('connect', () => {
  console.log('Connected to the database');
});

// Optional: Handle errors globally
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
