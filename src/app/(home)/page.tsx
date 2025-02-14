'use client';

import { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import { categories } from '@/data/home-categories';
import { checkToken, checkTokenExpiration } from '@/utils/jwtDecoder';
import NextImage from 'next/image';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for a token and update login state
    const checkTokenStatus = () => {
      const tokenExists = checkToken();
      if (tokenExists && !checkTokenExpiration()){
        setIsLoggedIn(true);
      } else{
        setIsLoggedIn(false);
      }
    };
    
    checkTokenStatus(); //Initial check
    
    const intervalId = setInterval(checkTokenStatus, 3000000); //Periodic checks every 5 minutes
    
    // Listen for changes in localStorage
    const handleStorageChange = () => checkTokenStatus();
    window.addEventListener('storage', handleStorageChange);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
        <div className="flex justify-center mb-4">
          <NextImage
            src="/images/home-page-logo.png"
            alt="Logo"
            width={360}
            height={360}
            quality={100}
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              category={category}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
