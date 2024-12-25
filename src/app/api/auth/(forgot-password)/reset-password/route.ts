import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import bcrypt from 'bcrypt';
import pool from '@/app/lib/db';

export async function POST(req: Request) {
  const { jwt, newPassword }: { jwt: string; newPassword: string } =
    await req.json();
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    // Decode and verify the JWT
    const { payload } = await jwtVerify(jwt, secret);

    // Hash the new password and update it in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password=$1 WHERE email=$2', [
      hashedPassword,
      payload.email as string,
    ]);

    return NextResponse.json({ message: 'Password reset successfully!' });
  } catch {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 400 }
    );
  }
}
