import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '../ui/Reveal';
import { InfiniteMovingCards } from '../ui/aceternity/infinite-moving-cards';
import { shorts } from '../../data/shorts';

gsap.registerPlugin(ScrollTrigger);

function formatViews(views: number): string {
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
  return `${views} views`;
}

export default function ShortsCarousel() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeShort = shorts.find((s) => s.id === activeId);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stripRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        stripRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section container" id="shorts" ref={sectionRef}>
      <span className="section-eyebrow w-full justify-center">Watch &amp; Learn</span>
      <Reveal>
        <h2 className="section-title">Spiritual Shorts</h2>
      </Reveal>
      <p className="section-subtitle">
        Quick, powerful moments of devotion — mantras, rituals, and wisdom in under a minute.
      </p>

      {/* Aceternity InfiniteMovingCards marquee — no scrollbar, pause on hover */}
      <div ref={stripRef}>
        <InfiniteMovingCards speed="normal" pauseOnHover gap={20} className="py-3">
          {shorts.map((short) => (
            <div
              key={short.id}
              onClick={() => setActiveId(short.id)}
              className="group/short relative aspect-[9/16] w-[200px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border-[1.5px] border-transparent bg-indigo-deep shadow-[0_16px_32px_rgba(128,0,32,0.12)] transition-[transform,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_24px_48px_rgba(128,0,32,0.22)]"
            >
              <img
                src={short.thumbnail}
                alt={short.title}
                className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/short:scale-110"
              />
              <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold/90 text-[1.2rem] text-indigo-deep opacity-0 transition-opacity duration-300 group-hover/short:opacity-100">
                ▶
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.75))] p-3.5">
                <div className="text-[0.8rem] leading-tight font-semibold text-white">
                  {short.title}
                </div>
                <div className="mt-1 text-[0.7rem] text-gold-light">
                  {formatViews(short.views)} · {short.duration}
                </div>
              </div>
            </div>
          ))}
        </InfiniteMovingCards>
      </div>

      <AnimatePresence>
        {activeShort && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-indigo-deep/90 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
          >
            <motion.div
              className="relative aspect-[9/16] w-[min(360px,90vw)]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-10 right-0 cursor-pointer border-none bg-transparent text-2xl text-pearl"
                onClick={() => setActiveId(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="h-full w-full overflow-hidden rounded-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${activeShort.youtubeId}?autoplay=1`}
                  title={activeShort.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="h-full w-full border-none"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
