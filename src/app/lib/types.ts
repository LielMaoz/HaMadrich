export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  permission?: 'admin' | 'regular'; // Default value is "regular"
}

// Define the structure of the decoded JWT
export interface DecodedJWT {
  sub: string;
  role: string;
  name: string;
  exp: number;  // Expiration time
}

//Define the structure of the drill(AKA trainings table)
export interface Drill {
  id: number;
  training_name: string;
  drill_type: string;
  weapon_type: string;
  time_to_shoot: number; //string for now to check
  target_type: string;
  ammo: number;
  distance: number;
  description: string;
  preview_img: string;
  range_img: string;
  visible: boolean;
}
