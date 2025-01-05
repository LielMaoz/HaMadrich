export type CategoryProps = {
  title: string; // Category title
  image: string; // Path to category image
  link: string; // Destination URL
  description: string; // Category description
};

export const categories: CategoryProps[] = [
  {
    title: 'אימון נשק ארוך',
    image: '/images/homepage/rifle-training.png',
    link: '/rifle-training',
    description: 'התמקצע בירי לטווחים משתנים',
  },
  {
    title: 'אימון אקדח',
    image: '/images/homepage/handgun-training.png',
    link: '/handgun-training',
    description: 'השג שליטה מדויקת באקדח כנשק משני',
  },
  {
    title: 'תרגילים יבשים',
    image: '/images/homepage/dry-drill-exercises.png',
    link: '/dry-drill-exercises',
    description: 'בצע תרגולים יבשים ושפר את לוחמת הפרט שלך',
  },
  {
    title: 'תוכן מקצועי',
    image: '/images/homepage/professional-content.png',
    link: '/professional-content-list',
    description: 'כל התוכן המקצועי כדי להכיר את האמלח שלך',
  },
  {
    title: 'עזרה ראשונה',
    image: '/images/homepage/first-aid.png',
    link: '/first-aid',
    description: 'תרגל רפואת חירום כדי לשמור על חבריך',
  },
  {
    title: 'מטרות',
    image: '/images/homepage/targets.png',
    link: '/targets',
    description: 'הורד מטרות להדפסה עצמית',
  },
];

export default categories;
