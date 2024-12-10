import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MouseEventHandler } from "react";

type CardProps = {
  name: string;
  link: string;
  imageSrc: string;
  imageAlt: string;
  del: MouseEventHandler<HTMLButtonElement> | undefined;
  move: MouseEventHandler<HTMLButtonElement> | undefined;
  editMode?: boolean;
}

function DrillListCard({ name, link, imageSrc, imageAlt, del, move, editMode = false}: CardProps) {
  return (
    <div className="flex flex-row">

      {editMode && // Delete button
        <Button className="h-auto relative" onClick={del} variant="destructive">
          <Image src={"/delete.svg"} alt={"delete"} fill className="object-contain"/>
        </Button>
      }

      <Link href={link}>
        <div className="block border-solid border-2 border-green-950 rounded-lg text-center no-underline truncate transition-shadow duration-300 hover:shadow-2xl">
          <h2 className="m-0 py-3 text-2xl text-white bg-green-950">{name}</h2>
          <Image src={imageSrc} alt={imageAlt} width={300} height={200} className="object-cover"></Image>
        </div>
      </Link>

      {editMode && // change place button
        <Button onClick={move} className="h-auto relative">
          <Image src={"/move.svg"} alt={"delete"} fill className="object-contain"/>
        </Button>
      }

    </div>
  );    
}

export default DrillListCard
