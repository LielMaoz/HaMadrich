
/**
 * Represents a category on the homepage
 * Defines the consistent structure for all website categories
 */
export type categoriesPromps = {
    title: string;      // Category title
    image: string;      // Path to category image
    link: string;       // Destination URL
    description: string;// Category description
  }
  
  /**
 * Contains all categories displayed on the homepage
 * Categories can be added or modified here and will automatically update in the UI
 */
  export const categories: catagoriesPromps [] = [
    { 
      title: 'תרגילים יבשים', 
      image: '/imagesHomePage/dry-fire-exercises.png',
      link: '/drills?category=dryFire',
      description: 'שלוט בטכניקות בסיסיות עם אימונים טקטיים באש יבשה'
    },
    { 
      title: 'אימון אקדח', 
      image: '/imagesHomePage/handgun-training.png',
      link: '/drills?category=handgun',
      description: 'השג שליטה מדויקת באקדח באמצעות הדרכת מומחים'
    },
    { 
      title: 'אימון נשק ארוך', 
      image: '/imagesHomePage/long-gun-training.png',
      link: '/drills?category=longGun',
      description: 'התמקצע בפעולות רובה מתקדמות ודיוק לטווח ארוך'
    },
    { 
      title: 'תוכן מקצועי', 
      image: '/imagesHomePage/professional-content.png',
      link: '/drills?category=professionalContent',
      description: 'גישה למומחיות טקטית עילית ואסטרטגיות מתקדמות'
    },
    { 
      title: 'עזרה ראשונה', 
      image: '/imagesHomePage/first-aid.png',
      link: '/drills?category=firstAid',
      description: 'פיתוח מוכנות רפואית קרבית למצבים קריטיים'
    },
    { 
      title: 'מטרות', 
      image: '/imagesHomePage/targets.png',
      link: '/drills?category=targets',
      description: 'שפר את הדיוק עם מערכות יעד מדויקות וניתוח'
    }
  ];
  
  export default categories