import { DecodedJWT } from '@/app/lib/types';
import { jwtDecode } from 'jwt-decode';

// Function to decode the JWT and return the expected type
export const decodeJWT = (): DecodedJWT | null => {
  const token = localStorage.getItem('jwtToken');

  if (!token) return null;

  try {
    return jwtDecode<DecodedJWT>(token); // Decode and cast the token to the DecodedJWT type
  } catch {
    return null; // Return null in case of any error
  }
};

// Function to check if a JWT token exists in localStorage
export const checkToken = (): boolean => {
  return !!localStorage.getItem('jwtToken');
};

// Function to check if the token has expired
export const checkTokenExpiration = (): boolean => {
  try {
    const decoded = decodeJWT();  
    if (!decoded || !decoded.exp) {
      return true; //If no expiration details are found
    }

    const expiration = decoded.exp * 1000;
    return Date.now() > expiration; //If the time set as valid has passed
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return true; //If there is an error, consider the token as expired
  }
};
