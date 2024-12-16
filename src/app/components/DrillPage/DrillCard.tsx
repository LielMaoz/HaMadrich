import Image from "next/image";
import { Drill } from '@/types/drill';

interface DrillCardProps {
  drill: Drill;
}

export const DrillCard = ({ drill }: DrillCardProps) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl mb-8">
      <div className="relative w-full h-auto">
        <Image
          src={drill.previewImg}
          alt={drill.training_name}
          width={600}
          height={400}
          className="object-contain"
        />
      </div>
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-zinc-900">
          {drill.training_name}
        </h2>
      </div>
    </div>
  );
};