import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
//import { SignJWT } from 'jose';
import pool from '@/app/lib/db';
import { createJwtToken } from '../token';
import { User } from '@/app/lib/types';

// This endpoint authenticates the user and generates a JWT token
export async function POST(req: Request) {
  const { email, password }: { email: string; password: string } =
    await req.json();

  // Fetch user from the database
  const res = await pool.query('select * from users where email=$1', [email]);
  const user = res.rows[0];

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Compare provided password with the stored hashed password
  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const userData: User = {
    id: user.id,
    email: user.email,
    permission: user.permission,
    firstName: user.first_name,
    lastName: user.last_name,
  };
  
  const jwt = await createJwtToken( userData );

  // Return JWT token in the response
  return NextResponse.json({ token: jwt });
}
