import { motion } from 'framer-motion';
import type { Product } from '../../data/products';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <div className="py-20 text-center text-maroon/60">No products found in this category.</div>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{
            opacity: 0,
            y: 24,
            clipPath: 'inset(15% 8% 60% 8% round 18px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0% round 18px)',
            // clear the clip after the reveal so hover shadows aren't clipped
            transitionEnd: { clipPath: 'none' },
          }}
          transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
