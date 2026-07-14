import { useMemo, useState } from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductGrid from '../components/products/ProductGrid';
import ProductsToolbar, { type SortKey } from '../components/products/ProductsToolbar';
import { productCategories, products } from '../data/products';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState<SortKey>('featured');

  const filtered = useMemo(() => {
    let list =
      activeCategory === 'All' ? [...products] : products.filter((p) => p.category === activeCategory);

    list = [...list];
    if (sort === 'priceLow') list.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    if (sort === 'priceHigh') list.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'featured') list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    return list;
  }, [activeCategory, sort]);

  return (
    <>
      <Navbar />
      <div className="texture-dark pt-40 pb-16">
        <div className="container relative z-[1] text-center">
          <span className="section-eyebrow text-gold-light">Blessed &amp; Delivered</span>
          <h1 className="section-title">Sacred Essentials</h1>
          <p className="section-subtitle mb-0! text-incense/85">
            Explore our curated collection of authentic spiritual products, blessed and delivered
            to your doorstep.
          </p>
        </div>
      </div>
      <div className="section container">
        <CategoryFilter
          categories={productCategories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
        <ProductsToolbar count={filtered.length} sort={sort} onSortChange={setSort} />
        <ProductGrid products={filtered} />
      </div>
      <Footer />
    </>
  );
}
