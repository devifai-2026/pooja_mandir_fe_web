import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '../ui/Reveal';
import { InfiniteMovingCards } from '../ui/aceternity/infinite-moving-cards';
import { reviews } from '../../data/reviews';

gsap.registerPlugin(ScrollTrigger);

export default function ReviewsCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !revealRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { y: 50, opacity: 0 },
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
    <section className="section container relative" id="reviews" ref={sectionRef}>
      <span className="section-eyebrow w-full justify-center">Real Stories</span>
      <Reveal>
        <h2 className="section-title">Devotee Voices</h2>
      </Reveal>
      <p className="section-subtitle">Real experiences from our community of devotees.</p>

      <div ref={revealRef}>
        <InfiniteMovingCards speed="slow" pauseOnHover direction="left" className="py-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex w-[360px] shrink-0 flex-col rounded-2xl border border-gold/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,240,232,0.85))] p-8 shadow-[0_20px_44px_rgba(128,0,32,0.1),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl"
            >
              <span
                className="font-heading -mb-4 text-[4.5rem] leading-none text-gold/35 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <div className="mb-4 text-[1.05rem] tracking-[0.08em] text-gold">
                {'★'.repeat(review.rating)}
                <span className="text-gold/30">{'★'.repeat(5 - review.rating)}</span>
              </div>
              <p className="font-heading mb-6 flex-1 text-[1.05rem] leading-[1.55] text-indigo-deep italic">
                {review.reviewText}
              </p>
              <div className="mt-auto flex items-center gap-3 border-t border-gold/15 pt-5">
                <img
                  src={review.clientPhoto}
                  alt={review.clientName}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-gold ring-offset-2 ring-offset-pearl"
                />
                <div>
                  <div className="font-body font-bold text-maroon">{review.clientName}</div>
                  <div className="text-[0.8rem] text-indigo-deep/55">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </InfiniteMovingCards>
      </div>
    </section>
  );
}
