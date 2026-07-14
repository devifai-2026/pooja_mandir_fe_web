import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClasses = (active: boolean) =>
    cn(
      'text-[0.9rem] font-medium text-pearl/85 transition-colors duration-200 hover:text-gold-light',
      active && 'text-gold-light',
    );

  return (
    <nav
      className={cn(
        'fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6',
        'transition-[background-color,box-shadow,padding] duration-300',
        scrolled
          ? 'bg-indigo-deep/85 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-2xl'
          : 'py-5',
      )}
    >
      <Link
        to="/"
        className="font-heading bg-[image:var(--gradient-gold)] bg-clip-text text-[1.4rem] font-bold text-transparent"
      >
        Digital Mandir
      </Link>
      <div className="hidden items-center gap-8 md:flex">
        <Link to="/" className={linkClasses(location.pathname === '/')}>
          Home
        </Link>
        <Link to="/products" className={linkClasses(location.pathname === '/products')}>
          Products
        </Link>
        <Link to="/book-pooja">
          <Button variant="primary" className="px-6 py-2.5 text-[0.85rem]">
            Book a Pooja
          </Button>
        </Link>
      </div>
    </nav>
  );
}
