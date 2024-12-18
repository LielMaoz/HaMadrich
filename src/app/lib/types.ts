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
  name:string;
  drillType:string;
  weaponType:string;
  time:string; //string for now to check
  target:string;
  ammo:number;
  distance:number;
  description:string;
  priviewImg:string;
  rangeImg:string;
}