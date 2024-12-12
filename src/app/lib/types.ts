export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  permission: 'admin' | 'regular'; // Default value is "regular"
}

// Define the structure of the decoded JWT
export interface DecodedJWT {
  sub: string;
  role: string;
  username: string;
}
