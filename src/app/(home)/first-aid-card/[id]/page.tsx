'use client';
import { FirstAirdContentCard } from '@/app/components/FirstAidCard';
import { FirstAidContent } from '@/app/lib/types';
import Link from 'next/link';
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
    link1Description: '/',
    link1: '/',
    link2Description: '/',
    link2: '/',
    link3Description: '/',
    link3: '/',
    link4Description: '/',
    link4: '/',
    link5Description: '/',
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

  return (
    <div className="min-h-screen p-6 bg-zinc-100 relative">
      {/* Back Button */}
      <div className="absolute top-6 right-6">
        <Link
          href="/first-aid"
          className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
        >
          → לעזרה ראשונה
        </Link>
      </div>

      {/* Content Wrapper */}
      <div className="mx-auto max-w-5xl">
        {/* First Aid Content Card */}
        <FirstAirdContentCard {...firstAid} />
      </div>
    </div>
  );
};

export default FirstAidContentPage;
