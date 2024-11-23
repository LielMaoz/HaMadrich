import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

// Define the User type for the result rows
interface User {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  permission: 'admin' | 'regular';
}

export async function GET() {
  try {
    // Query to get users from the database
    const result = await pool.query<User>('SELECT * FROM users');
    
    // Return the result as a JSON response
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    // Handle errors and return a 500 status with the error details
    return NextResponse.json(
      { error: 'Database connection failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
