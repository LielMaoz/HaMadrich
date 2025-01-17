import { FirstAidListCard } from '@/app/components/FirstAidListCard';
import type { FirstAidContent } from '@/app/lib/types';
import FirstAidContentPage from '../first-aid/page';

const FirstAidContent = async () => {
  // fetching data for the items
  const baseUrl = 'http://localhost:3000';
  let firstAidList: FirstAidContent[];

  try {
    const response = await fetch(`${baseUrl}/api/firstaid`);

    console.log('Data fetched from API with NO cache');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const { data }: { data: FirstAidContent[] } = await response.json();
    firstAidList = data;
  } catch (error) {
    console.error('Fetch error:', error);

    return <h1>Fetch error: {error as string}</h1>;
  }

  // adding the list of first aid to the page
  return (
    <div className="min-h-screen my-4 flex flex-col gap-4">
      {firstAidList.map((firstAid) => (
        <div key={firstAid.id} className="flex justify-center">
          <FirstAidListCard {...firstAid} />
        </div>
      ))}
    </div>
  );
};

export default FirstAidContentPage;
