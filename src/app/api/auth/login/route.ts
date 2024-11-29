import { NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose'; 
import pool from '@/app/lib/db';



// This endpoint authenticates the user and generates a JWT token
export async function POST(req: Request) {
  const { email, password }: { email: string; password: string } = await req.json();

  // Fetch user from the database
  const res = await pool.query('select * from users where email=$1',[email]);
  const user = res.rows[0];

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Compare provided password with the stored hashed password
  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Create JWT token with user id and role 
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret'); // Make sure to set JWT_SECRET in .env file
  const jwt = await new SignJWT(
    {
      sub: user.email, // The unique user email
      role: user.permission, // User's role (admin, regular)
    })
    .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm
    .setIssuedAt() // Automatically sets the timestamp of the JWT creation 
    .setExpirationTime('2h') // Set expiration time
    .sign(secret); // Sign the token with a secret key

    

  // Return JWT token in the response
  return NextResponse.json({ token: jwt });
}
