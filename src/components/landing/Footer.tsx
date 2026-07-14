import { Link } from 'react-router-dom';
import { productCategories } from '../../data/products';

const headingClasses =
  'font-body mb-4 text-[0.9rem] font-bold tracking-[0.05em] text-gold-light uppercase';
const linkClasses =
  'inline-block w-fit text-[0.9rem] opacity-70 transition-[opacity,color,transform] duration-200 hover:translate-x-1 hover:text-gold-light hover:opacity-100';

export default function Footer() {
  return (
    <footer className="texture-dark relative py-18 pb-8 text-incense [border-image:linear-gradient(90deg,transparent,rgba(212,175,55,0.5),transparent)_1] border-t border-transparent">
      <div className="container relative z-[1]">
        <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
          <div>
            <div className="font-heading mb-3 bg-[image:var(--gradient-gold)] bg-clip-text text-2xl text-transparent">
              Digital Mandir
            </div>
            <p className="text-[0.85rem] leading-relaxed opacity-60">
              Where ancient spirituality meets modern luxury. Bringing divine grace to your
              doorstep.
            </p>
          </div>
          <div>
            <div className={headingClasses}>Explore</div>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className={linkClasses}>
                Home
              </Link>
              <Link to="/book-pooja" className={linkClasses}>
                Book a Pooja
              </Link>
              <Link to="/products" className={linkClasses}>
                Products
              </Link>
            </div>
          </div>
          <div>
            <div className={headingClasses}>Categories</div>
            <div className="flex flex-col gap-2.5">
              {productCategories.slice(0, 4).map((cat) => (
                <Link to="/products" key={cat} className={linkClasses}>
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className={headingClasses}>Connect</div>
            <div className="flex flex-col gap-2.5 text-[0.9rem] opacity-70">
              <span>hello@digitalmandir.com</span>
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
        <div className="ornament-divider mb-6">
          <span className="ornament-glyph">ॐ</span>
        </div>
        <div className="border-t border-gold/15 pt-6 text-center text-[0.8rem] opacity-50">
          © 2026 Digital Mandir — All Rights Reserved. Built with 🙏 and Technology.
        </div>
      </div>
    </footer>
  );
}
