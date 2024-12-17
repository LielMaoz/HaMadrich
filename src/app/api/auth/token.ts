import { User } from '@/app/lib/types';
import { SignJWT } from 'jose';

// Create JWT token with user id and role
export async function createJwtToken(user: User) {
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_secret'
  ); // Make sure to set JWT_SECRET in .env file

  if (user.id === undefined) {
    throw new Error('User ID is required');
  }

  const jwt = await new SignJWT({
    sub: user.id.toString(), // The primary key is ID
    role: user.permission, // User's role (admin, regular)
    name: `${user.firstName} ${user.lastName}`, // Combine first and last name
  })
    .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm
    .setIssuedAt() // Automatically sets the timestamp of the JWT creation
    .setExpirationTime('2h') // Set expiration time
    .sign(secret); // Sign the token with a secret key

  return jwt;
}
