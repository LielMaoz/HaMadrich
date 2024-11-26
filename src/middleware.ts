import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // For verifying JWT

export async function middleware(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  console.log(token);
  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret'); // Secret key for verifying JWT
    const {payload} = await jwtVerify(token, secret); // Verify the JWT

    // If the token is valid, proceed with the request
    const role = payload.role as String|undefined;
    console.log("The role is:.... "+role);//////////////////////////////////////////// delete after review.
    if (role !== 'admin') {
      return new NextResponse('Forbidden: Admins only', { status: 403 });
    }

    return NextResponse.next();
  } catch (error) {
    return new NextResponse('Invalid or expired token', { status: 403 });
  }
}

// Protect all /api/users
export const config = {
  matcher: '/api/users', 
};
