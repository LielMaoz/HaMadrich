import { decodeJWT } from "@/utils/jwtDecoder"

// Function to check if a JWT token exists in localStorage
export const checkAdmin = (): boolean => {
  // if no token then the user isnt am admin
  const token = localStorage.getItem('jwtToken');
  if (!token) return false;
  
  // check if user admin
  const decoded = decodeJWT();
  return decoded?.role === 'admin'
};
