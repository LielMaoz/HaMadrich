import { SignJWT } from 'jose';

// Create JWT token with user id and role
  export async function createJwtToken(
    userData: { id: number, permission: string, first_name: string, last_name: string }
  ){
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_secret'
  ); // Make sure to set JWT_SECRET in .env file

  const jwt = await new SignJWT({
    sub: userData.id.toString(), // The primary key is ID
    role: userData.permission, // User's role (admin, regular)
    username: `${userData.first_name} ${userData.last_name}`, // Combine first and last name
  })
    .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm
    .setIssuedAt() // Automatically sets the timestamp of the JWT creation
    .setExpirationTime('2h') // Set expiration time
    .sign(secret); // Sign the token with a secret key

    return jwt;
}