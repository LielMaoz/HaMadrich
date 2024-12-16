import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types/category';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={category.link}
      className="group block no-underline"
    >
      <div className="
        overflow-hidden 
        rounded-xl 
        bg-white dark:bg-gray-800
        shadow-md 
        transform 
        transition-transform 
        duration-300 
        hover:-translate-y-1 
        hover:shadow-lg
      ">
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-t-xl">
          <Image
            src={category.image}
            alt={category.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <h2 
            className="
              text-xl 
              font-semibold 
              text-text-primary 
              mb-2 
              transition-colors 
              duration-300 
              group-hover:text-transparent 
              group-hover:bg-clip-text 
              group-hover:bg-gradient-to-r 
              group-hover:from-pink-500 
              group-hover:to-yellow-500
            "
          >
            {category.title}
          </h2>
          <p className="text-sm sm:text-base text-text-secondary dark:text-gray-400">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}