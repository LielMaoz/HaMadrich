'use client';
import { ProfessionalContentCard } from '@/app/components/ProfessionalContentCard';
import { ProfessionalContent } from '@/app/lib/types';
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

  return <ProfessionalContentCard {...profCont} />;
};

export default ProfessionalContentPage;
