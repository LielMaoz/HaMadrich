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
export interface drill{
  id:number;
  training_name:string;
  drill_type:string;
  weapon_type:string;
  time_to_shoot:string; //string for now to check
  target:string;
  ammo:number;
  distance:number;
  description:string;
  preview_img:string;
  range_img:string;
}
