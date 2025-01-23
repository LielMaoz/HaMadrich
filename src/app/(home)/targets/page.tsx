'use client';

import { Suspense, useState, useEffect } from 'react';
import { TargetIcon, Search } from 'lucide-react';
import TargetCard from '@/app/components/TargetCard';
import { Input } from "@/components/ui/input";
import { targets } from '@/data/targets';

/**
 * Targets Component
 * @description A page that displays a searchable and filterable list of targets with download functionality.
 */
export default function Targets() {
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query input
  const [filteredTargets, setFilteredTargets] = useState(targets); // State for filtered targets based on the search query
  const [isSearching, setIsSearching] = useState(false); // State to indicate if a search operation is in progress

  /**
   * Handles filtering of targets based on the search query.
   * Filters are case-insensitive and check name, description, and difficulty fields.
   */
  useEffect(() => {
    setIsSearching(true);
    const timeoutId = setTimeout(() => {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const filtered = targets.filter(target => {
        const normalizedName = target.name.toLowerCase();
        const normalizedDescription = target.description.toLowerCase();
        const normalizedDifficulty = target.difficulty.toLowerCase();
        return (
          normalizedName.includes(normalizedQuery) ||
          normalizedDescription.includes(normalizedQuery) ||
          normalizedDifficulty.includes(normalizedQuery)
        );
      });
      setFilteredTargets(filtered);
      setIsSearching(false);
    }, 300); // Debounce the search operation to improve performance

    return () => clearTimeout(timeoutId); // Cleanup debounce timer on component unmount or search query change
  }, [searchQuery]);

  return (
    <div dir="rtl" className="min-h-screen p-4 bg-gradient-to-b from-zinc-100 to-zinc-200 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-block p-2 mb-4 rounded-full bg-primary/10">
            <TargetIcon className="w-12 h-12 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-zinc-900">מטרות מקצועיות</h1>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-zinc-600">
            שפר את הדיוק שלך עם מגוון מטרות מקצועיות. בחר, הורד, והתאמן בקלות.
          </p>

          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute transform -translate-y-1/2 left-3 top-1/2 text-zinc-400" />
            <Input
              type="search"
              placeholder="חפש מטרות..."
              className="pl-10 pr-4 text-right transition-all duration-200 border-zinc-200 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Targets Display */}
        {isSearching ? (
          // Show skeletons during search
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8">
            {[1, 2, 3, 4].map((index) => (
              <TargetCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredTargets.length === 0 ? (
          // Show a message when no targets match the search query
          <div className="py-12 text-center">
            <p className="text-xl text-zinc-600">לא נמצאו מטרות התואמות לחיפוש שלך</p>
            <button
              className="mt-4 text-primary hover:underline"
              onClick={() => setSearchQuery('')}
            >
              נקה חיפוש
            </button>
          </div>
        ) : (
          // Show the list of filtered targets
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-8">
            {filteredTargets.map((target, index) => (
              <Suspense key={target.id} fallback={<TargetCardSkeleton />}>
                <div
                  className="transition-all duration-300 transform"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.5s ease forwards',
                  }}
                >
                  <TargetCard target={target} />
                </div>
              </Suspense>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * TargetCardSkeleton
 * @description A skeleton placeholder for loading states.
 */
function TargetCardSkeleton() {
  return (
    <div className="overflow-hidden transition-all duration-300 bg-zinc-200 rounded-lg h-[400px] animate-pulse">
      <div className="h-48 rounded-t-lg bg-zinc-300" />
      <div className="p-4">
        <div className="w-3/4 h-6 mb-4 rounded bg-zinc-300" />
        <div className="w-full h-4 mb-2 rounded bg-zinc-300" />
        <div className="w-2/3 h-4 mb-4 rounded bg-zinc-300" />
        <div className="w-1/3 h-6 rounded bg-zinc-300" />
      </div>
    </div>
  );
}
