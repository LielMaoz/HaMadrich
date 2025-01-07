'use client';
import { DrillCard } from '@/app/components/DrillCard';
import { Drill } from '@/app/lib/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    return;
  }

  return <DrillCard {...drill} />;
};

export default DrillCardPage;
