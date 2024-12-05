export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  permission: 'admin' | 'regular'; // Default value is "regular"
}

export interface UserAuthData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
