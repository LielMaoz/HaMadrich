import { DrillListCard } from '@/app/components/DrillListCard';
import type { drill as Drill } from '@/app/lib/types'

const RifleTrainingPage = async () => {
   // fetching data for the drills
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  let drillList;

  try {
    const response = await fetch(`${baseUrl}/api/drills`);

    if (!response.ok){
      throw new Error(`Error: ${response.status}`);
    }
    
    const { data }: { data: Drill[] } = await response.json();
    // we need only the assault-rifle drills for this page
    drillList = data.filter((item)=> item.weapon_type === 'assault-rifle');

  } catch (error) {
    console.error('Fetch error:', error)

    return (
      <h1>Fetch error: {error as string}</h1>
    )
  }

  // adding the list of drills to the page
  return (
    <div className='min-h-screen my-4 flex flex-col gap-4'>
      {drillList.map((drill) => (
        <div key={drill.id} className='flex justify-center'>
          <DrillListCard name={drill.training_name} image={'/images/homepage/first-aid.png'} link={''}/>
        </div>  
      ))}
    </div>
  );
};

export default RifleTrainingPage;
