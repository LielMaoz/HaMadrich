import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const DrillListCard = () => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-80">

        <div className="w-full h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
          <Image
            src='/images/homepage/first-aid.png'
            alt='pic'
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-3xl font-semibold text-zinc-900 bg-white bg-opacity-80 p-2 rounded-md">
            Targets
          </h2>
        </div>

      </div>
    </div>
  );
};
