/*import HomeCard from './components/HomeCard';*/
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const categories = [
    { 
      title: 'תרגילים יבשים', 
      image: '/imagesHomePage/dry_drill_exercises.png',
      link: '/dry_drill_exercises',
      description: 'שלוט בטכניקות בסיסיות עם אימונים טקטיים באש יבשה'
    },
    { 
      title: 'אימון אקדח', 
      image: '/imagesHomePage/handgun_training.png',
      link: '/handgun_training',
      description: 'השג שליטה מדויקת באקדח באמצעות הדרכת מומחים'
    },
    { 
      title: 'אימון נשק ארוך', 
      image: '/imagesHomePage/rifle_training.png',
      link: '/rifle_training',
      description: 'התמקצע בפעולות רובה מתקדמות ודיוק לטווח ארוך'
    },
    { 
      title: 'תוכן מקצועי', 
      image: '/imagesHomePage/professional_content.png',
      link: '/professional_content',
      description: 'גישה למומחיות טקטית עילית ואסטרטגיות מתקדמות'
    },
    { 
      title: 'עזרה ראשונה', 
      image: '/imagesHomePage/first_aid.png',
      link: '/first_aid',
      description: 'פיתוח מוכנות רפואית קרבית למצבים קריטיים'
    },
    { 
      title: 'מטרות', 
      image: '/imagesHomePage/targets.png',
      link: '/targets',
      description: 'שפר את הדיוק עם מערכות יעד מדויקות וניתוח'
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            המדריך
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              הדרך שלך להתמקצע בירי. הכלים והמשאבים המובילים לאימונים ולמידה מקצועית 
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Link 
              href={category.link} 
              key={index}
              className="group block no-underline"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl font-semibold text-zinc-900 mb-2">
                    {category.title}
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

/*
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 pb-20 gap-8 sm:p-8 md:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-800">המדריך</h1>
        <p className="text-base sm:text-lg text-gray-600"> הדרך שלך להתמקצע בירי. כלים והמשאבים המובילים לאימונים ולמידה מקצועית</p>
      </header>

      <main className="w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <HomeCard
            name="תרגילים יבשים"
            link="/dry_drill_exercises"
            imageSrc="/imagesHomePage/dry_drill_exercises.png"
            imageAlt="Dry Drill Exercises"
            className="p-4 bg-white shadow-lg transform hover:scale-105 transition-all"
          />
          <HomeCard
            name="תוכן מקצועי"
            link="/professional_content"
            imageSrc="/imagesHomePage/professional_content.png"
            imageAlt="Professional Content"
            className="p-4 bg-white shadow-lg transform hover:scale-105 transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <HomeCard
            name="אימון נשק ארוך"
            link="/rifle_training"
            imageSrc="/imagesHomePage/rifle_training.png"
            imageAlt="Rifle Training"
            className="p-4 bg-white shadow-lg transform hover:scale-105 transition-all"
          />
          <HomeCard
            name="אימון אקדח"
            link="/handgun_training"
            imageSrc="/imagesHomePage/handgun_training.png"
            imageAlt="Handgun Training"
            className="p-4 bg-white shadow-lg transform hover:scale-105 transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <HomeCard
            name="עזרה ראשונה"
            link="/first_aid_teamwork"
            imageSrc="/imagesHomePage/first_aid_teamwork.png"
            imageAlt="First Aid and Teamwork"
            className="p-4 bg-white shadow-lg transform hover:scale-105 transition-all"
          />
          <HomeCard
            name="מטרות"
            link="/targets"
            imageSrc="/imagesHomePage/targets.png"
            imageAlt="Targets"
            className="p-4 bg-white shadow-lg transform hover:scale-105 transition-all"
          />
        </div>
      </main>

    </div>
  );
}
  */

