import Image from 'next/image';
import Link from 'next/link';

type CardProps = {
  name: string;
  link: string;
  imageSrc: string;
  imageAlt: string;
};

function HomeCard({ name, link, imageSrc, imageAlt }: CardProps) {
  return (
    <Link href={link} className="block no-underline">
      <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <h2 className="m-0 py-4 px-3 text-xl font-semibold text-center text-green-950">{name}</h2>
      </div>
    </Link>
  );
}

export default HomeCard;

