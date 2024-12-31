import Image from 'next/image';
import Link from 'next/link';
import { EditMenu } from './(adminMenu)/EditMenu';
import type { Drill } from '@/app/lib/types';

export const DrillListCard = ({ ...drill }: Drill) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
      <EditMenu className="absolute z-10 w-16 h-16" {...drill} />
      <Link href={`/drill-card/${drill.id}`}>
        <div className="relative w-full h-80">
          <div className="relative w-full h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <Image
              src="/images/homepage/first-aid.png" // CHANGE WHEN WE HAVE PICTURES
              alt={drill.training_name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-3xl font-semibold text-zinc-900 bg-white bg-opacity-80 p-2 rounded-md">
              {drill.training_name}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
};
