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

  return (
    <div
      className={`w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden 
      ${profCont.visible ? '' : 'filter grayscale'} 
      ${!isAdmin && !profCont.visible ? 'hidden' : 'block'}`}>
      <Link href={`/prof-cont-card/${profCont.id}`}>
        <div className="relative w-full h-80">
          <div className="relative w-full h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <Image
              src={profCont.prvImg}
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
