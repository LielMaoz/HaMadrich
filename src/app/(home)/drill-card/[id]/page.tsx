'use client';
import { DrillCard } from '@/app/components/DrillCard';
import { Drill } from '@/app/lib/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const DrillCardPage = () => {
  const params = useParams();
  const id = params.id;
  const baseUrl = 'http://localhost:3000';
  const [drill, setDrill] = useState<Drill | null>(null);

  useEffect(() => {
    const fetchDrill = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/drills?id=${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const { data }: { data: Drill[] } = await response.json();
        const specificDrill: Drill | undefined = data[0];
        if (specificDrill) {
          // can fetch the drill
          setDrill(specificDrill);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchDrill();
  }, [id]);

  if (!drill) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100 p-6 relative">
      <Link
        href='/dry-drill-exercises'
        className="absolute top-6 right-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition mb-4"
      >
        → לעמוד הקודם
      </Link>

      <div className="mt-[-50px] mb-0">
        <DrillCard {...drill} />
      </div>
    </div>
  );
};


export default DrillCardPage;
