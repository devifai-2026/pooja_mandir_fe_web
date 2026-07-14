import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import MotifArt from '../art/MotifArt';
import Reveal from '../ui/Reveal';
import { InfiniteMovingCards } from '../ui/aceternity/infinite-moving-cards';
import { products } from '../../data/products';

gsap.registerPlugin(ScrollTrigger);

const teaserProducts = products.slice(0, 8);

export default function ProductTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      );
      gsap.fromTo(
        stripRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // transparent: sits on the shared dark canvas provided by the parent
    // wrapper in LandingPage, so it blends seamlessly with the CtaBanner below.
    <section
      className="relative overflow-hidden pt-28 pb-16 max-md:pt-20"
      id="products"
      ref={sectionRef}
    >
      <div className="container relative z-[1]">
        {/* full-width centered intro so the marquee below can span edge-to-edge */}
        <div className="mx-auto mb-12 max-w-[640px] text-center" ref={introRef}>
          <span className="section-eyebrow justify-center text-gold-light">Bring Home the Sacred</span>
          <Reveal>
            <h2 className="font-heading mb-4 bg-[image:var(--gradient-gold)] bg-clip-text text-4xl text-transparent">
              Sacred Essentials
            </h2>
          </Reveal>
          <p className="font-body mx-auto mb-6 max-w-[520px] text-lg leading-relaxed text-incense/85">
            Hand-picked spiritual products — from rudraksha to idols — blessed and delivered to
            your doorstep.
          </p>
          <div className="flex flex-col items-center gap-3">
            <Link to="/products">
              <Button variant="secondary" className="border-gold-light text-gold-light">
                View All Products
              </Button>
            </Link>
            <p className="font-body flex items-center gap-2 text-[0.9rem] font-medium text-incense/70">
              <span className="text-gold-light">✦</span>
              Blessed before dispatch · Free shipping over ₹999
            </p>
          </div>
        </div>
      </div>

      {/* Full-bleed marquee — spans the whole viewport so many more cards are
          visible at once. Aceternity InfiniteMovingCards: auto-scroll, no
          scrollbar, pause on hover keeps every card hoverable/clickable. */}
      <div ref={stripRef} className="relative z-[1]">
        <InfiniteMovingCards speed="normal" pauseOnHover className="py-4">
          {teaserProducts.map((product) => (
            <motion.div
              key={product.id}
              className="h-full w-[230px] shrink-0 will-change-transform"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="flex h-full flex-col">
                <MotifArt seed={product.id} symbol={product.symbol} height={180} />
                <div className="flex flex-1 flex-col p-4">
                  {/* fixed min-height so 1- and 2-line names align; price pinned to bottom */}
                  <div className="font-body mb-1.5 line-clamp-2 min-h-[2.6em] text-[0.95rem] leading-[1.3] font-semibold text-indigo-deep">
                    {product.name}
                  </div>
                  <div className="mt-auto flex items-baseline gap-2">
                    <span className="font-bold text-gold">
                      ₹{(product.discountPrice ?? product.price).toLocaleString('en-IN')}
                    </span>
                    {product.discountPrice && (
                      <span className="text-[0.8rem] text-maroon/50 line-through">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </InfiniteMovingCards>
      </div>
    </section>
  );
}
