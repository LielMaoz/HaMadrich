'use client';

import { useEffect, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import { categories } from '@/data/home-categories';
import { checkToken, checkTokenExpiration } from '@/utils/jwtDecoder';

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
    
    checkTokenStatus();
    const intervalId = setInterval(checkTokenStatus, 3000000);//Check every 5 minutes
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">המדריך</h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            מדריך ירי צמוד אצלך בכיס
          </p>
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
