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

export interface ProfessionalContent {
  id: number;
  name: string;
  description: string;
  prvImg: string;
  link1Description: string;
  link1: string;
  link2Description: string;
  link2: string;
  link3Description: string;
  link3: string;
  link4Description: string;
  link4: string;
  link5Description: string;
  link5: string;
  visible: boolean;
}
