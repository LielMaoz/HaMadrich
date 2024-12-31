'use client';
import { DrillCard } from '@/app/components/DrillCard';
import { Drill } from '@/app/lib/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DrillCardPreview = () => {
  const params = useParams();
  const id = params.id;
  const baseUrl = 'http://localhost:3000';
  const [drill, setDrill] = useState<Drill>({
    id: 0,
    training_name: 'PAY ATTENTION NOT FETCHING DATA',
    drill_type: 'string',
    weapon_type: 'string',
    time_to_shoot: 0,
    target_type: 'string',
    ammo: 0,
    distance: 0,
    description: 'string',
    preview_img: '/',
    range_img: '/',
    visible: false,
  });

  useEffect(() => {
    const fetchDrill = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/drills?id=${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const { data }: { data: Drill[] } = await response.json();
        const specificDrill: Drill | undefined = data.find(
          (item) => item.id === Number(id)
        );
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

  return <DrillCard {...drill} />;
};

export default DrillCardPreview;
