import { ProfessionalContentListCard } from '@/app/components/ProfessionalContentListCard';
import type { ProfessionalContent } from '@/app/lib/types';
import Link from 'next/link';

const ProfessionalContentPage = async () => {
  // fetching data for the items
  const baseUrl = 'http://localhost:3000';
  let professionalContentList: ProfessionalContent[];

  try {
    const response = await fetch(`${baseUrl}/api/professionalContent`);

    console.log('Data fetched from API with NO cache');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const { data }: { data: ProfessionalContent[] } = await response.json();
    professionalContentList = data;
  } catch (error) {
    console.error('Fetch error:', error);

    return <h1>Fetch error: {error as string}</h1>;
  }

  // adding the list of drills to the page
  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="flex justify-start mb-4">
        <Link href="/" className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">
          → לדף הבית
        </Link>
      </div>

    <div className="my-4 flex flex-col gap-4">
      {professionalContentList.map((profCont) => (
        <div key={profCont.id} className="flex justify-center">
          <ProfessionalContentListCard {...profCont} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProfessionalContentPage;
