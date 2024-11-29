import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/app/lib/auth';
import pool from '@/app/lib/db';

interface User {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  permission: 'admin' | 'regular'; // Default value is "regular"
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, first_name, last_name } = await req.json();

    // Validate input
    if (!email || !password || !first_name || !last_name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if ((existingUser.rowCount as number) > 0) {
      return NextResponse.json(
        { error: 'Email already exists. Please use a different one.' },
        { status: 409 }
      );
    }

    // Hash the password
    const passwordHash = await hashPassword(password);

    // Insert user into database
    const query = `
      INSERT INTO users (email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING email, first_name, last_name;
    `;
    const user = await pool.query<User>(query, [
      email,
      passwordHash,
      first_name,
      last_name,
    ]);

    // Respond with the created user
    return NextResponse.json({ user: user.rows[0] }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
