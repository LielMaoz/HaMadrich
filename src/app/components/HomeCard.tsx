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
    <Link href={link}>
      <div className="block border-solid border-2 border-green-950 rounded-lg text-center no-underline truncate transition-shadow duration-300 hover:shadow-2xl">
        <h2 className="m-0 py-3 text-2xl text-white bg-green-950">{name}</h2>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={300}
          height={200}
          className="object-cover"
        ></Image>
      </div>
    </Link>
  );
}

export default HomeCard;
