import Card from '../ui/Card';
import MotifArt from '../art/MotifArt';
import type { Product } from '../../data/products';

export default function ProductCard({ product }: { product: Product }) {
  const isLowStock = product.stock <= 10;

  return (
    <Card>
      <div className="relative overflow-hidden">
        <MotifArt seed={product.id} symbol={product.symbol} height={220} />
        {product.discountPrice && (
          <span className="absolute top-3 left-3 rounded-full bg-[image:var(--gradient-saffron)] px-3 py-1 text-[0.7rem] font-bold text-white">
            Sale
          </span>
        )}
        {isLowStock && (
          <span className="absolute top-3 right-3 rounded-full bg-indigo-deep/75 px-3 py-1 text-[0.7rem] font-semibold text-gold-light">
            Only {product.stock} left
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="mb-1.5 text-[0.7rem] font-bold tracking-[0.06em] text-saffron uppercase">
          {product.category}
        </div>
        <h3 className="font-heading mb-1.5 text-xl text-maroon">{product.name}</h3>
        <p className="mb-3.5 text-[0.85rem] leading-normal text-indigo-deep/70">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-lg font-bold text-gold">
              ₹{(product.discountPrice ?? product.price).toLocaleString('en-IN')}
            </span>
            {product.discountPrice && (
              <span className="text-[0.8rem] text-maroon/50 line-through">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[0.8rem] font-semibold text-gold">★ {product.rating}</span>
        </div>
      </div>
    </Card>
  );
}
