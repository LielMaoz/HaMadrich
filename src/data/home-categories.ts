export type CategoryProps = {
  title: string; // Category title
  image: string; // Path to category image
  link: string; // Destination URL
  description: string; // Category description
};

export const categories: CategoryProps[] = [
  {
    title: 'תרגילים יבשים',
    image: '/imagesHomePage/dry_drill_exercises.png',
    link: '/drills?category=dryFire',
    description: 'שלוט בטכניקות בסיסיות עם אימונים טקטיים באש יבשה',
  },
  {
    title: 'אימון אקדח',
    image: '/imagesHomePage/handgun_training.png',
    link: '/drills?category=handgun',
    description: 'השג שליטה מדויקת באקדח באמצעות הדרכת מומחים',
  },
  {
    title: 'אימון נשק ארוך',
    image: '/imagesHomePage/rifle_training.png',
    link: '/drills?category=longGun',
    description: 'התמקצע בפעולות רובה מתקדמות ודיוק לטווח ארוך',
  },
  {
    title: 'תוכן מקצועי',
    image: '/imagesHomePage/professional_content.png',
    link: '/drills?category=professionalContent',
    description: 'גישה למומחיות טקטית עילית ואסטרטגיות מתקדמות',
  },
  {
    title: 'עזרה ראשונה',
    image: '/imagesHomePage/first_aid.png',
    link: '/drills?category=firstAid',
    description: 'פיתוח מוכנות רפואית קרבית למצבים קריטיים',
  },
  {
    title: 'מטרות',
    image: '/imagesHomePage/targets.png',
    link: '/drills?category=targets',
    description: 'שפר את הדיוק עם מערכות יעד מדויקות וניתוח',
  },
];

export default categories;
