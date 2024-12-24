import Image from "next/image";
import Link from "next/link";
import { EditMenu } from "./EditMenu";

type listPromps = {
  name: string
  image: string
  link: string
}

export const DrillListCard = ({name, image, link}: listPromps) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
      <EditMenu className="absolute z-10 w-16 h-16" />
      <Link href={link}>
        <div className="relative w-full h-80">

          <div className="relative w-full h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
