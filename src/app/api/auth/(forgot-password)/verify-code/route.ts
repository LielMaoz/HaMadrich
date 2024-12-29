import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function POST(req: Request) {
  const { jwt, code }: { jwt: string; code: string } = await req.json();
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    // Decode and verify the JWT
    const { payload } = await jwtVerify(jwt, secret);

    if (payload.code !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Code verified successfully' });
  } catch {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 400 }
    );
  }
}
