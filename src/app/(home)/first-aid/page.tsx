import { FirstAidListCard } from '@/app/components/FirstAidListCard'; // Ensure correct naming convention
import type { FirstAidContent } from '@/app/lib/types';
import Link from 'next/link';

const FirstAidContentPage = async () => {
  // fetching data for the items
  const baseUrl = 'http://localhost:3000';
  let firstAidContentList: FirstAidContent[];

  try {
    const response = await fetch(`${baseUrl}/api/firstAid`);

    console.log('Data fetched from API with NO cache');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const { data }: { data: FirstAidContent[] } = await response.json();
    firstAidContentList = data;
  } catch (error) {
    console.error('Fetch error:', error);

    return <h1>Fetch error: {error as string}</h1>;
  }

  // adding the list of first aid to the page
  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="flex justify-start mb-4">
        <Link href="/" className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
          → לדף הבית
        </Link>
      </div>

    <div className="my-4 flex flex-col gap-4">
      {firstAidContentList.map((firstAid) => (
        <div key={firstAid.id} className="flex justify-center">
          <FirstAidListCard {...firstAid} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default FirstAidContentPage;
