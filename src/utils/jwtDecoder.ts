import { DecodedJWT } from '@/app/lib/types';
import { jwtDecode } from 'jwt-decode';

// Function to decode the JWT and return the expected type
export const decodeJWT = (): DecodedJWT | null => {
  const token = localStorage.getItem('jwtToken');

  if (!token) return null;

  try {
    return jwtDecode<DecodedJWT>(token); // Decode and cast the token to the DecodedJWT type
  } catch (error) {
    return null; // Return null in case of any error
  }
};
