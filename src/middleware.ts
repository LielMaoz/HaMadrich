import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // For verifying JWT

export async function middleware(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'default_secret'
    ); // Secret key for verifying JWT
    const { payload } = await jwtVerify(token, secret); // Verify the JWT

    // If the token is valid, proceed with the request
    const role = payload.role as string | undefined;
    if (role !== 'admin') {
      return new NextResponse('Forbidden: Admins only', { status: 403 });
    }

    return NextResponse.next();
  } catch (error) {
    return new NextResponse(`Invalid or expired token: ${error}`, {
      status: 403,
    });
  }
}

// Protect /api/users
export const config = {
  matcher: ['/api/users', '/api/drills/edit'],
};
