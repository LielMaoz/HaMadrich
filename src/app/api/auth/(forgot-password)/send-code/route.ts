import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import nodemailer from 'nodemailer';
import pool from '@/app/lib/db';

export async function POST(req: Request) {
  const { email }: { email: string } = await req.json();

  // Check if the user exists in the database
  const userExists = await pool.query('SELECT id FROM users WHERE email=$1', [
    email,
  ]);

  if (!userExists.rows[0]) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Generate a 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Create a JWT with the email and code
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new SignJWT({ email, code })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('5m')
    .sign(secret);

  // Configure the Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send an email with the reset code
  await transporter.sendMail({
    from: `"Hamadrich" <process.env.EMAIL_USER>`,
    to: email,
    subject: 'קוד לאיפוס סיסמה',
    html: `
    <div style="direction: rtl;">
      <p>שלום,</p>
      <p>הקוד לאיפוס הסיסמה שלך הוא: <strong>${code}</strong></p>
      <p>בברכה,</p>
      <p>צוות המדריך</p>
    </div>
  `,
  });

  return NextResponse.json({ jwt });
}
