export type CategoryProps = {
  title: string; // Category title
  image: string; // Path to category image
  link: string; // Destination URL
  description: string; // Category description
};

export const categories: CategoryProps[] = [
  {
    title: 'תרגילים יבשים',
    image: '/images/homepage/dry-drill-exercises.png',
    link: '/dry-drill-exercises',
    description: 'שלוט בטכניקות בסיסיות עם אימונים טקטיים באש יבשה',
  },
  {
    title: 'אימון אקדח',
    image: '/images/homepage/handgun-training.png',
    link: '/handgun-training',
    description: 'השג שליטה מדויקת באקדח באמצעות הדרכת מומחים',
  },
  {
    title: 'אימון נשק ארוך',
    image: '/images/homepage/rifle-training.png',
    link: '/rifle-training',
    description: 'התמקצע בפעולות רובה מתקדמות ודיוק לטווח ארוך',
  },
  {
    title: 'תוכן מקצועי',
    image: '/images/homepage/professional-content.png',
    link: '/professional-content',
    description: 'גישה למומחיות טקטית עילית ואסטרטגיות מתקדמות',
  },
  {
    title: 'עזרה ראשונה',
    image: '/images/homepage/first-aid.png',
    link: '/first-aid',
    description: 'פיתוח מוכנות רפואית קרבית למצבים קריטיים',
  },
  {
    title: 'מטרות',
    image: '/images/homepage/targets.png',
    link: '/targets',
    description: 'שפר את הדיוק עם מערכות יעד מדויקות וניתוח',
  },
];

export default categories;
