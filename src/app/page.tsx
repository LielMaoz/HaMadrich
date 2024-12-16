/**
 * Homepage Component
 * Main entry point for the application
 * Assembles all components and displays the category grid
 * Features:
 * - Responsive grid layout (1 column on mobile, 2 columns on larger screens)
 * - Centered content with max-width container
 * - Consistent spacing and padding
 */
"use client"

import { categories } from '@/utils/homeData';
import CategoryCard from '@/app/components/HomePage/CategoryCard';
import Hero from '@/app/components//HomePage/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Hero 
          title="המדריך"
          description="הדרך שלך להתמקצע בירי. הכלים והמשאבים המובילים לאימונים ולמידה מקצועית"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
