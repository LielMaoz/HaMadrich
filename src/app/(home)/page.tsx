import CategoryCard from '../components/CategoryCard';
import { categories } from '@/data/home-categories';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">המדריך</h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            מדריך ירי צמוד אצלך בכיס
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
