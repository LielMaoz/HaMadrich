"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Drill } from '@/types/drill';
import { drills } from '@/data/drills';
import { categoryTitles, filterDrillsByCategory } from '@/utils/drillUtils';
import {DrillCard} from '@/app/components/DrillPage/DrillCard'; 

export default function DrillPage() {
  const searchParams = useSearchParams();
  const category = (searchParams.get("category") as keyof typeof categoryTitles) || "all";
  const [filteredDrills, setFilteredDrills] = useState<Drill[]>([]);

  useEffect(() => {
    setFilteredDrills(filterDrillsByCategory(drills, category));
  }, [category]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-100">
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">
          {categoryTitles[category] || "כל המקצים"}
        </h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
          בחר את המקצה שברצונך לתרגל
        </p>
      </div>

      <div className="flex flex-col items-center w-full">
        {filteredDrills.map((drill) => (
          <Link key={drill.id} href={`/show-drill?drillId=${drill.id}`}>
            <DrillCard drill={drill} />
          </Link>
        ))}
      </div>
    </div>
  );
}


