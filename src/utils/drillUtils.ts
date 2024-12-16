/**
 * This module handles drill categorization and filtering.
 * 
 * - `categoryTitles`: Maps category keys to descriptive Hebrew titles.
 * - `filterDrillsByCategory`: Filters a list of drills based on the selected category.
 */

import { Drill } from '@/types/drill';

export const categoryTitles: { [key: string]: string } = {
  longGun: "אימון נשק ארוך",
  handgun: "אימון אקדח",
  dryFire: "תרגילים יבשים",
  firstAid: "עזרה ראשונה",
  professionalContent: "תוכן מקצועי",
  targets: "מטרות"
};

export const filterDrillsByCategory = (
  drills: Drill[], 
  category: keyof typeof categoryTitles | 'all'
): Drill[] => {
  switch (category) {
    case "longGun":
      return drills.filter(
        (drill) => drill.weapon_type === "נשק ארוך" && drill.drill_type === "חי"
      );
    case "handgun":
      return drills.filter(
        (drill) => drill.weapon_type === "אקדח" && drill.drill_type === "חי"
      );
    case "dryFire":
      return drills.filter((drill) => drill.drill_type === "יבש");
    case "firstAid":
      console.log("תוכן רפואי");
      return drills; // Placeholder: replace with actual filtering logic
    case "professionalContent":
      console.log("תוכן מקצועי");
      return drills; // Placeholder: replace with actual filtering logic
    case "targets":
      console.log("מטרות");
      return drills; // Placeholder: replace with actual filtering logic
    default:
      return drills;
  }
};