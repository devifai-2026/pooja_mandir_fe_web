export type SortKey = 'featured' | 'priceLow' | 'priceHigh' | 'rating';

interface ProductsToolbarProps {
  count: number;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
}

export default function ProductsToolbar({ count, sort, onSortChange }: ProductsToolbarProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
      <span className="text-[0.85rem] text-maroon/70">{count} products found</span>
      <div className="flex items-center gap-2.5">
        <label className="text-[0.8rem] font-semibold text-maroon" htmlFor="sort-select">
          Sort by
        </label>
        <select
          id="sort-select"
          className="cursor-pointer rounded-[10px] border-[1.5px] border-gold/35 bg-white/60 px-4 py-2.5 text-[0.85rem] font-semibold text-indigo-deep"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
        >
          <option value="featured">Featured</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
}
