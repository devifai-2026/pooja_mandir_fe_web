import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Reveal from '../ui/Reveal';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '🙏',
    title: 'Verified Pandits',
    desc: 'Every ritual performed by experienced, Vedic-trained pandits you can trust.',
  },
  {
    icon: '📿',
    title: 'Authentic Rituals',
    desc: 'Traditional procedures followed precisely, honoring ancient scriptures.',
  },
  {
    icon: '🚚',
    title: 'Doorstep Delivery',
    desc: 'Sacred essentials shipped safely and blessed before they reach you.',
  },
  {
    icon: '💬',
    title: 'Dedicated Support',
    desc: 'Our team guides you through booking, payments, and every ritual detail.',
  },
];

const trustPoints = [
  '10,000+ rituals performed',
  'Verified Vedic pandits',
  'Live telecast of every pooja',
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;
    const items = gridRef.current.querySelectorAll('[data-why-item]');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
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
      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section texture-light pt-32 max-md:pt-24" ref={sectionRef}>
      <div className="container">
        <div className="relative z-[1] grid items-center gap-16 min-[901px]:grid-cols-[1fr_1fr]">
          <div className="max-[900px]:max-w-[560px]" ref={headingRef}>
            <span className="section-eyebrow">Why Digital Mandir</span>
            <Reveal>
              <h2 className="font-heading mb-5 text-4xl leading-[1.15] text-maroon">
                Devotion, delivered with{' '}
                <span className="bg-[image:var(--gradient-sunset)] bg-clip-text text-transparent">
                  uncompromising care
                </span>
              </h2>
            </Reveal>
            <p className="max-w-[480px] text-lg leading-[1.65] text-indigo-deep/70">
              We blend ancient ritual authenticity with the convenience of modern technology —
              every step, from booking to blessing, handled with reverence.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-[image:var(--gradient-gold)] text-[0.8rem] text-indigo-deep shadow-[0_8px_18px_rgba(212,175,55,0.3)]">
                    ✦
                  </span>
                  <span className="font-body text-[0.98rem] font-medium text-indigo-deep/80">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
            ref={gridRef}
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                data-why-item
                className={i % 2 === 1 ? 'will-change-transform min-[901px]:mt-7' : 'will-change-transform'}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <Card className="h-full px-6 py-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-[1.5rem] shadow-[0_12px_28px_rgba(212,175,55,0.35)]">
                    {f.icon}
                  </div>
                  <h3 className="font-heading mb-2.5 text-xl text-maroon">{f.title}</h3>
                  <p className="text-[0.9rem] leading-normal text-indigo-deep/70">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
