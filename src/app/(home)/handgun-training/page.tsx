import { DrillListCard } from '@/app/components/DrillListCard';
import type { Drill } from '@/app/lib/types';
import Image from 'next/image';

const HandgunTrainingPage = async () => {
  // fetching data for the drills
  const baseUrl = 'http://localhost:3000';
  let drillList;

  try {
    const response = await fetch(`${baseUrl}/api/drills`, {
      next: { revalidate: 86400 }, // Cache data for 1 day
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const { data }: { data: Drill[] } = await response.json();
    // we need only the pistol drills for this page
    drillList = data.filter(
      (item) => item.weapon_type === 'אקדח' && item.drill_type === 'חי'
    );
  } catch (error) {
    console.error('Fetch error:', error);

    return <h1>Fetch error: {error as string}</h1>;
  }

  // adding the list of drills to the page
  return (
    <div
      dir="rtl"
      className="min-h-screen p-4 !pt-14 bg-gradient-to-b from-zinc-100 to-zinc-200 sm:p-6 md:p-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-block p-2 mb-4 rounded-full bg-primary/10">
            <Image
              src="/icons/pistol-icon.png"
              alt="pistol icon"
              width={48}
              height={48}
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-zinc-900">אימון אקדח</h1>
          <p className="max-w-2xl mx-auto mb-8 text-[18px] text-zinc-600">
            לחץ על האימון הרצוי כדי לקבל מידע נוסף אודותיו
          </p>
        </div>
      </div>
      <div className="min-h-screen my-4 mx-1 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:mx-12 2xl:mx-72">
        {drillList.map((drill) => (
          <div key={drill.id} className="flex justify-center">
            <DrillListCard {...drill} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandgunTrainingPage;
