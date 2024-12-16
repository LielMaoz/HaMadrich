/**
 * Represents a single training drill
 * Contains all properties needed for displaying and executing a drill
 */
export type Drill = {
  id: number;  // Changed from Number to number
  drill_type: string;
  training_name: string;
  weapon_type: string;
  time_to_shoot: number;
  target_type: string;
  ammo: number;
  distance: number;
  description: string;
  previewImg: string;
  rangeOrder: string;
}