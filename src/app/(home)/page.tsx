import CategoryCard from '../components/CategoryCard';

export default function Home() {
  const categories = [
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

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">המדריך</h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            הדרך שלך להתמקצע בירי. הכלים והמשאבים המובילים לאימונים ולמידה
            מקצועית.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}