// Targets Data
export type TargetProps = {
  id: string;
  name: string;
  description: string;
  pdfUrl: string;
  difficulty: 'קל' | 'בינוני' | 'מתקדם';
};

export const targets: TargetProps[] = [
  {
    id: '1',
    name: 'איפוסון משולש',
    description:
      'מטרה קלה לכיוון נשק, מאפשרת איפוס מהיר ומדויק באמצעות שלוש נקודות התייחסות. מיועדת לשיפור דיוק הירי בטווחים שונים.',
    pdfUrl: '/images/targetsImages/triangular-zeroing-target.jpg',
    difficulty: 'קל',
  },
  {
    id: '2',
    name: 'איפוסון סטנדרט',
    description:
      'מטרת איפוס קלאסית המשמשת לכיוון כוונות אופטיות. מספקת נקודות ייחוס ברורות לאיפוס מדויק של הנשק בטווח סטנדרטי.',
    pdfUrl: '/images/targetsImages/standard-zeroing-target.jpg',
    difficulty: 'קל',
  },
  {
    id: '3',
    name: 'מטרה הישגית',
    description:
      '.מטרה מאתגרת המיועדת למדידת ושיפור מיומנויות ירי. כוללת אזורי ניקוד מדורגים לבחינת דיוק וביצועים. משמשת לוידוא איפוס בטווח של 50 מ׳',
    pdfUrl: '/images/targetsImages/achievement-target.jpg',
    difficulty: 'קל',
  },
  {
    id: '4',
    name: 'מטרת אויב 1',
    description:
      'מטרה המדמה דמות אויב בסיסית. מיועדת לאימון זיהוי מטרות ותרגול תגובות מהירות בתרחישים שונים.',
    pdfUrl: '/images/targetsImages/enemy-target-1.jpg',
    difficulty: 'קל',
  },
  {
    id: '5',
    name: 'מטרת אויב 2',
    description:
      'גרסה מתקדמת של מטרת האויב, מציגה תרחיש מורכב יותר. מתאימה לאימון החלטות ירי בסיטואציות מאתגרות.',
    pdfUrl: '/images/targetsImages/enemy-target-2.jpg',
    difficulty: 'בינוני',
  },
  {
    id: '6',
    name: 'מטרת אויב 3',
    description:
      'מטרת אויב מתקדמת המציגה תרחיש מורכב. מיועדת לאימון קבלת החלטות מהירה ודיוק ירי בתנאי לחץ.',
    pdfUrl: '/images/targetsImages/enemy-target-3.jpg',
    difficulty: 'מתקדם',
  },
  {
    id: '7',
    name: 'מטרת אויב 4',
    description:
      'המטרה המתקדמת ביותר בסדרת מטרות האויב. מדמה תרחיש קרבי מורכב ומאתגר במיוחד לשיפור מיומנויות הירי.',
    pdfUrl: '/images/targetsImages/enemy-target-4.jpg',
    difficulty: 'מתקדם',
  },
  {
    id: '8',
    name: 'מטרת אויב/ידיד',
    description:
      'מטרה המשלבת דמויות של אויב וידיד. מיועדת לאימון זיהוי מטרות מהיר והחלטות ירי/אי-ירי בתרחישים מורכבים.',
    pdfUrl: '/images/targetsImages/friend-or-foe-target.jpg',
    difficulty: 'מתקדם',
  },
  {
    id: '9',
    name: 'מטרת אייל',
    description:
      'מטרה המדמה צורת אייל, מיועדת לאימון ציידים או לשיפור דיוק בירי למטרות בעלות צורה לא סימטרית.',
    pdfUrl: '/images/targetsImages/deer-target.jpg',
    difficulty: 'בינוני',
  },
  {
    id: '10',
    name: 'מטרת גוף יום',
    description:
      'מטרה המדמה גוף אדם בתנאי אור יום. מיועדת לאימון ירי מדויק לאזורים קריטיים בגוף בתנאי ראות טובים.',
    pdfUrl: '/images/targetsImages/daytime-body-target.jpg',
    difficulty: 'בינוני',
  },
  {
    id: '11',
    name: 'מטרת גוף לילה',
    description:
      'גרסת לילה של מטרת הגוף, מותאמת לאימון ירי בתנאי תאורה נמוכה. לא כוללת אלמנטים זוהרים או מחזירי אור.',
    pdfUrl: '/images/targetsImages/nighttime-body-target.jpg',
    difficulty: 'מתקדם',
  },
  {
    id: '12',
    name: 'מטרת גוף',
    description:
      'מטרה סטנדרטית בצורת גוף אדם, מיועדת לאימון ירי מדויק לאזורים שונים בגוף. מתאימה למגוון תרחישי אימון.',
    pdfUrl: '/images/targetsImages/body-target.jpg',
    difficulty: 'בינוני',
  },
  {
    id: '13',
    name: 'מטרת דוב',
    description:
      'מטרה בצורת דוב, מיועדת לאימון ציידים או לשיפור דיוק בירי למטרות גדולות ובעלות צורה ייחודית.',
    pdfUrl: '/images/targetsImages/bear-target.jpg',
    difficulty: 'בינוני',
  },
  {
    id: '14',
    name: 'מטרת מעויינים',
    description:
      'מטרה עם תבנית מעוינים, מיועדת לאימון דיוק ירי מתקדם. מאפשרת בחינת פיזור ודיוק בטווחים שונים. מטרה להדגמת הסטיות הבליסטיות כתלות במרחק מהמטרה.',
    pdfUrl: '/images/targetsImages/diamond-pattern-target.jpg',
    difficulty: 'מתקדם',
  },
  {
    id: '15',
    name: 'מטרת רמזור',
    description:
      'מטרה בעלת שלושה אזורים צבעוניים, מדמה רמזור. משמשת לאימון תגובות מהירות וקבלת החלטות על פי צבעים.',
    pdfUrl: '/images/targetsImages/traffic-light-target.jpg',
    difficulty: 'בינוני',
  },
  {
    id: '16',
    name: 'מטרת שדון',
    description: 'מקבילה למטרת גוף, נקראת גם מטרה ג׳',
    pdfUrl: '/images/targetsImages/goblin-target.jpg',
    difficulty: 'קל',
  },
];
