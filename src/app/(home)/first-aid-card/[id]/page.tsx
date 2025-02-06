'use client';
import { FirstAirdContentCard } from '@/app/components/FirstAidCard';
import { FirstAidContent } from '@/app/lib/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const FirstAidContentPage = () => {
  const params = useParams();
  const id = params.id;
  const baseUrl = 'http://localhost:3000';
  const [firstAid, setFirstAid] = useState<FirstAidContent>({
    id: 11111,
    name: '',
    description: '',
    prvImg: '/',
    link1description: '/',
    link1: '/',
    link2description: '/',
    link2: '/',
    link3description: '/',
    link3: '/',
    link4description: '/',
    link4: '/',
    link5description: '/',
    link5: '/',
    visible: true,
  });

  useEffect(() => {
    const fetchFirstAid = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/firstAid?id=${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const { data }: { data: FirstAidContent[] } = await response.json();
        console.log(data);
        const specificFirstAid: FirstAidContent | undefined = data[0];
        if (specificFirstAid) {
          // can fetch the item
          setFirstAid(specificFirstAid);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchFirstAid();
  }, [id]);

  return <FirstAirdContentCard {...firstAid} />;
};

export default FirstAidContentPage;
