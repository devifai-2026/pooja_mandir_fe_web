import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import MotifArt from '../art/MotifArt';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { FlipCard, useCanHover } from '../ui/aceternity/flip-card';
import { poojaTypes, type PoojaType } from '../../data/poojas';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

type SortKey = 'popular' | 'priceLow' | 'priceHigh';

const priceClasses = 'font-heading text-xl font-bold text-gold';
const priceUnitClasses = 'font-body text-[0.75rem] font-normal text-maroon/70';
const linkClasses = 'text-[0.85rem] font-semibold text-saffron transition-opacity hover:opacity-70';

/** static card body (featured card + touch-device fallback) */
function StaticPoojaCard({ pooja }: { pooja: PoojaType }) {
  return (
    <Card>
      <MotifArt seed={pooja.id} symbol={pooja.symbol} height={180} />
      <div className="p-6">
        <h3 className="font-heading mb-2 text-2xl text-maroon">{pooja.name}</h3>
        <p className="mb-4 text-[0.9rem] leading-normal text-indigo-deep/75">{pooja.description}</p>
        <div className="flex items-center justify-between">
          <span className={priceClasses}>
            ₹{pooja.basePrice.toLocaleString('en-IN')}
            <span className={priceUnitClasses}> onwards</span>
          </span>
          <Link to="/book-pooja" className={linkClasses}>
            Book Now →
          </Link>
        </div>
      </div>
    </Card>
  );
}

/** desktop-only 3D flip card: front = art + name + price, back = details */
function FlippablePoojaCard({ pooja }: { pooja: PoojaType }) {
  return (
    <FlipCard
      className="h-[330px]"
      front={
        <div className="flex h-full cursor-pointer flex-col border border-gold/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,240,232,0.85))] backdrop-blur-xl">
          <MotifArt seed={pooja.id} symbol={pooja.symbol} height={190} />
          <div className="flex flex-1 flex-col justify-center gap-1.5 px-6 py-4">
            <h3 className="font-heading text-2xl text-maroon">{pooja.name}</h3>
            <div className="flex items-center justify-between">
              <span className={priceClasses}>
                ₹{pooja.basePrice.toLocaleString('en-IN')}
                <span className={priceUnitClasses}> onwards</span>
              </span>
              <span className="text-[0.7rem] font-semibold tracking-[0.08em] text-maroon/45 uppercase">
                Hover ↻
              </span>
            </div>
          </div>
        </div>
      }
      back={
        <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[image:var(--gradient-temple)] p-7">
          <div className="bg-grain pointer-events-none absolute inset-0 opacity-35 mix-blend-overlay" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(212,175,55,0.18),transparent_65%)]" />
          <div className="relative">
            <span className="font-devanagari mb-2 block text-[1.6rem] text-gold-light/80">
              {pooja.symbol}
            </span>
            <h3 className="font-heading mb-3 text-[1.35rem] text-pearl">{pooja.name}</h3>
            <p className="text-[0.88rem] leading-relaxed text-incense/85">{pooja.description}</p>
          </div>
          <div className="relative flex flex-col gap-4">
            <div className="flex items-center justify-between text-[0.85rem]">
              <span className="rounded-full border border-gold/35 px-3 py-1 text-incense/90">
                ⏱ {pooja.duration}
              </span>
              <span className="font-heading text-xl font-bold text-gold-light">
                ₹{pooja.basePrice.toLocaleString('en-IN')}
                <span className="font-body text-[0.7rem] font-normal text-incense/70"> onwards</span>
              </span>
            </div>
            <Link to="/book-pooja" className="w-full">
              <Button variant="primary" className="w-full py-3 text-[0.9rem]">
                Book Now →
              </Button>
            </Link>
          </div>
        </div>
      }
    />
  );
}

export default function PoojaGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [sort, setSort] = useState<SortKey>('popular');
  const canHover = useCanHover();

  const sorted = useMemo(() => {
    const list = [...poojaTypes];
    if (sort === 'priceLow') list.sort((a, b) => a.basePrice - b.basePrice);
    if (sort === 'priceHigh') list.sort((a, b) => b.basePrice - a.basePrice);
    return list.slice(0, 7);
  }, [sort]);

  const [featured, ...rest] = sorted;

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('[data-pooja-card]');
    const ctx = gsap.context(() => {
      // cinematic clip-path reveal + rise; clipPath cleared after play so
      // hover shadows aren't clipped afterwards
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, clipPath: 'inset(15% 8% 60% 8% round 18px)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0% round 18px)',
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [sort, canHover]);

  const sortButton = (key: SortKey, label: string) => (
    <button
      className={cn(
        'cursor-pointer rounded-full border-[1.5px] border-gold/35 bg-transparent px-5 py-2 text-[0.8rem] font-semibold text-maroon',
        'transition-all duration-300 hover:-translate-y-0.5 hover:border-gold',
        sort === key && 'border-gold bg-[image:var(--gradient-gold)] text-indigo-deep',
      )}
      onClick={() => setSort(key)}
    >
      {label}
    </button>
  );

  return (
    <section className="section texture-light" id="poojas" ref={sectionRef}>
      <div className="container">
        <div className="relative z-[1] mb-12 flex flex-wrap items-end justify-between gap-8 max-sm:flex-col max-sm:items-start">
          <div>
            <span className="section-eyebrow">Curated Rituals</span>
            <Reveal>
              <h2 className="font-heading mb-3 bg-[image:var(--gradient-sunset)] bg-clip-text text-4xl text-transparent">
                Sacred Poojas
              </h2>
            </Reveal>
            <p className="max-w-[480px] text-lg text-maroon/75">
              Choose from our curated rituals, each performed by experienced pandits with
              authentic Vedic tradition.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {sortButton('popular', 'Most Popular')}
            {sortButton('priceLow', 'Price: Low to High')}
            {sortButton('priceHigh', 'Price: High to Low')}
          </div>
        </div>

        <div
          className="relative z-[1] grid grid-cols-3 gap-8 max-[960px]:grid-cols-2 max-[640px]:grid-cols-1"
          ref={gridRef}
        >
          {featured && (
            <motion.div
              data-pooja-card
              className="col-span-2 row-span-2 will-change-transform max-[960px]:row-span-1 max-[640px]:col-span-1"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="flex h-full flex-col">
                <div className="min-h-[240px] flex-1">
                  <MotifArt seed={featured.id} symbol={featured.symbol} height="100%" />
                </div>
                <div className="p-8">
                  <span className="mb-2.5 inline-block text-[0.7rem] font-bold tracking-[0.06em] text-saffron uppercase">
                    Most Booked
                  </span>
                  <h3 className="font-heading mb-2.5 text-3xl text-maroon">{featured.name}</h3>
                  <p className="mb-5 max-w-[460px] text-[1rem] leading-relaxed text-indigo-deep/75">
                    {featured.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={priceClasses}>
                      ₹{featured.basePrice.toLocaleString('en-IN')}
                      <span className={priceUnitClasses}> onwards</span>
                    </span>
                    <Link to="/book-pooja" className={linkClasses}>
                      Book Now →
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {rest.map((pooja) => (
            <div key={pooja.id} data-pooja-card className="will-change-transform">
              {canHover ? <FlippablePoojaCard pooja={pooja} /> : <StaticPoojaCard pooja={pooja} />}
            </div>
          ))}
        </div>

        <div className="relative z-[1] mt-12 text-center">
          <Link to="/book-pooja">
            <Button variant="secondary">View All Poojas</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
