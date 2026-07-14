import { cn } from '../../lib/utils';

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

const chipClasses = (isActive: boolean) =>
  cn(
    'cursor-pointer rounded-full border-[1.5px] border-gold/35 bg-transparent px-[22px] py-2.5',
    'text-[0.85rem] font-semibold text-maroon transition-all duration-300',
    'hover:-translate-y-0.5 hover:border-gold',
    isActive && 'border-gold bg-[image:var(--gradient-gold)] text-indigo-deep',
  );

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="mb-12 flex flex-wrap justify-center gap-3">
      <button className={chipClasses(active === 'All')} onClick={() => onChange('All')}>
        All
      </button>
      {categories.map((cat) => (
        <button key={cat} className={chipClasses(active === cat)} onClick={() => onChange(cat)}>
          {cat}
        </button>
      ))}
    </div>
  );
}
