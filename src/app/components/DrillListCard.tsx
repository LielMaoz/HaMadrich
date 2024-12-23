import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type listProps = {
  name: string
  image: string
  link: string
}

export const DrillListCard = ({name, image, link}: listProps) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={link}>
        <div className="relative w-full h-80">

          <div className="relative w-full h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-3xl font-semibold text-zinc-900 bg-white bg-opacity-80 p-2 rounded-md">
              {name}
            </h2>
          </div>

        </div>
      </Link>
    </div>  
  );
};
