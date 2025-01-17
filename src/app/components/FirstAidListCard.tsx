'use client';
import Image from 'next/image';
import Link from 'next/link';
import { EditMenu } from './(adminMenu)/EditMenu'; // need to add on line 23-24
import type { FirstAidContent } from '@/app/lib/types';
import { useState, useEffect } from 'react';
import { checkAdmin } from '@/utils/adminCheck';

export const FirstAidListCard = ({ ...firstAid }: FirstAidContent) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // on mount we check admin status
  useEffect(() => {
    setIsAdmin(checkAdmin());
  }, []);

  //need to fix with photos
  const whichProfContPath = () => {
    switch (firstAid.name) {
      case 'אב״כ':
        return `/images/firstAidStaticImages/אב״כ.jpg`;

      case 'החייאה':
        return `/images/firstAidStaticImages/החייאה.jpg`;

      case 'הנחת חוסם עורקים':
        return `/images/firstAidStaticImages/הנחת חוסם עורקים.jpg`;

      case 'הנחת תחבושת אישית':
        return `/images/firstAidStaticImages/הנחת תחבושת אישית.jpg`;

      case 'התמודדות עם תגובות קרב':
        return `/images/firstAidStaticImages/התמודדות עם תגובות קרב.jpg`;

      case 'סכמת טיפול בפצוע':
        return `/images/firstAidStaticImages/סכמת טיפול בפצוע.jpg`;

      case 'עבודה עם מטפל בכיר':
        return `/images/firstAidStaticImages/עבודה עם מטפל בכיר.jpg`;

      case 'פגיעות אקלים והדף':
        return `/images/firstAidStaticImages/פגיעות אקלים והדף.jpg`;

      case 'סוגי פגיעות':
        return `/images/firstAidStaticImages/סוגי פגיעות.jpeg`;

      case 'פתיחת וריד':
        return `/images/firstAidStaticImages/פתיחת וריד.jpg`;

      default:
      case 'חולית':
        return `/images/profContStaticImages/חולית.jpg`;
    }
  };

  const prevImg = whichProfContPath();

  return (
    <div
      className={`w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden 
      ${firstAid.visible ? '' : 'filter grayscale'} 
      ${!isAdmin && !firstAid.visible ? 'hidden' : 'block'}`}>
      <Link href={`/first-aid-card/${firstAid.id}`}>
        <div className="relative w-full h-80">
          <div className="absolute inset-0 flex items-center justify-center hover:shadow-xl">
            <Image
              src={prevImg}
              alt={firstAid.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h2 className="text-3xl font-semibold text-zinc-900 bg-white bg-opacity-80 p-2 rounded-md">
              {`${firstAid.name} ${firstAid.visible ? '' : '(מוסתר)'}`}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};
