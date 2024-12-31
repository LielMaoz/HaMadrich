import { DrillListCard } from '@/app/components/DrillListCard';
import type { Drill } from '@/app/lib/types';

const RifleTrainingPage = async () => {
  // fetching data for the drills
  const baseUrl = 'http://localhost:3000';
  let drillList;

  try {
    const response = await fetch(`${baseUrl}/api/drills`);

    console.log('Data fetched from API with NO cache');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const { data }: { data: Drill[] } = await response.json();
    // we need only the assault-rifle drills for this page
    drillList = data.filter(
      (item) => item.weapon_type === 'נשק ארוך' && item.drill_type === 'חי'
    );
  } catch (error) {
    console.error('Fetch error:', error);

    return <h1>Fetch error: {error as string}</h1>;
  }

  // adding the list of drills to the page
  return (
    <div className="min-h-screen my-4 flex flex-col gap-4">
      {drillList.map((drill) => (
        <div key={drill.id} className="flex justify-center">
          <DrillListCard {...drill} />
        </div>
      ))}
    </div>
  );
};

export default RifleTrainingPage;
