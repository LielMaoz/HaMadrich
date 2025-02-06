'use client';
import { ProfessionalContentCard } from '@/app/components/ProfessionalContentCard';
import { ProfessionalContent } from '@/app/lib/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfessionalContentPage = () => {
  const params = useParams();
  const id = params.id;
  const baseUrl = 'http://localhost:3000';
  const [profCont, setProfCont] = useState<ProfessionalContent>({
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
    const fetchProfCont = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/professionalContent?id=${id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const { data }: { data: ProfessionalContent[] } = await response.json();
        console.log(data);
        const specificProfCont: ProfessionalContent | undefined = data[0];
        if (specificProfCont) {
          // can fetch the item
          setProfCont(specificProfCont);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchProfCont();
  }, [id]);

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-100 p-6 relative">
      <Link
        href='/professional-content-list'
        className="absolute top-6 right-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition mb-4"
      >
        → לתוכן מקצועי
      </Link>

      <ProfessionalContentCard {...profCont} />
    </div>
  );
};

export default ProfessionalContentPage;
