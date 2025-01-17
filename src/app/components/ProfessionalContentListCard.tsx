'use client';
import Image from 'next/image';
import Link from 'next/link';
import { EditMenu } from './(adminMenu)/EditMenu'; // need to add on line 23-24
import type { ProfessionalContent } from '@/app/lib/types';
import { useState, useEffect } from 'react';
import { checkAdmin } from '@/utils/adminCheck';

export const ProfessionalContentListCard = ({
  ...profCont
}: ProfessionalContent) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // on mount we check admin status
  useEffect(() => {
    setIsAdmin(checkAdmin());
  }, []);

  const whichProfContPath = () => {
    switch (profCont.name) {
      case 'לאו':
        return `/images/profContStaticImages/לאו.jpg`;

      case 'aimpoint':
        return `/images/profContStaticImages/aimpoint.jpg`;

      case 'eotech':
        return `/images/profContStaticImages/eotech.jpg`;

      case 'נגב':
        return `/images/profContStaticImages/negev.jpg`;

      case 'מאג':
        return `/images/profContStaticImages/מאג.jpg`;

      case 'מטאדור':
        return `/images/profContStaticImages/מטאדור.jpg`;

      case 'מכפל':
        return `/images/profContStaticImages/מכפל.jpg`;

      case 'פגיון':
        return `/images/profContStaticImages/פגיון.jpg`;

      case 'ציין':
        return `/images/profContStaticImages/ציין.jpg`;

      case 'קליעה כללי':
        return `/images/profContStaticImages/קליעה כללי.jpg`;

      case 'רובאי':
        return `/images/profContStaticImages/רובאי.jpg`;

      case 'חולית':
        return `/images/profContStaticImages/חולית.jpg`;

      case 'מעצורים':
        return `/images/profContStaticImages/מעצורים.jpg`;

      case 'עמעם':
        return `/images/profContStaticImages/עמעם.jpg`;

      case 'זיווד נכון':
        return `/images/profContStaticImages/זיווד.jpg`;

      default:
      case 'חולית':
        return `/images/profContStaticImages/חולית.jpg`;
    }
  };

  const prevImg = whichProfContPath();

  return (
    <div
      className={`w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden 
      ${profCont.visible ? '' : 'filter grayscale'} 
      ${!isAdmin && !profCont.visible ? 'hidden' : 'block'}`}>
      <Link href={`/prof-cont-card/${profCont.id}`}>
        <div className="relative w-full h-80">
          <div className="absolute inset-0 flex items-center justify-center hover:shadow-xl">
            <Image
              src={prevImg}
              alt={profCont.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h2 className="text-3xl font-semibold text-zinc-900 bg-white bg-opacity-80 p-2 rounded-md">
              {`${profCont.name} ${profCont.visible ? '' : '(מוסתר)'}`}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};
