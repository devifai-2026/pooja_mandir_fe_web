import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MandalaBackdrop from '../art/MandalaBackdrop';
import Reveal from '../ui/Reveal';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5000, suffix: '+', label: 'Poojas Performed' },
  { value: 50, suffix: '+', label: 'Monthly Bookings' },
  { value: 10, suffix: '+', label: 'Expert Pandits' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

export default function Statistics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const counters = sectionRef.current.querySelectorAll<HTMLElement>('[data-counter]');
    const blocks = sectionRef.current.querySelectorAll('[data-stat-block]');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
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
      counters.forEach((el, i) => {
        const target = Number(el.dataset.value);
        const suffix = el.dataset.suffix ?? '';
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          delay: i * 0.08,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
        });
      });
      gsap.fromTo(
        blocks,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
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
    // transparent: shares the continuous dark canvas from the LandingPage
    // wrapper so it blends seamlessly with the CtaBanner above (no seam).
    <section className="relative overflow-hidden py-24" ref={sectionRef}>
      <MandalaBackdrop align="right" />
      <div className="container relative z-[1] grid items-center gap-12 min-[861px]:grid-cols-[0.7fr_1.3fr]">
        <div
          className="border-r border-gold/20 pr-10 max-[860px]:border-r-0 max-[860px]:border-b max-[860px]:pr-0 max-[860px]:pb-8 max-[860px]:text-center"
          ref={headingRef}
        >
          <span className="section-eyebrow text-gold-light">Trusted Nationwide</span>
          <Reveal>
            <h2 className="font-heading text-3xl leading-[1.25] text-pearl">
              Numbers that reflect our{' '}
              <span className="bg-[image:var(--gradient-gold)] bg-clip-text text-transparent">
                devotion
              </span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-8 max-[860px]:justify-items-center max-[860px]:text-center">
          {stats.map((stat) => (
            <div key={stat.label} data-stat-block className="will-change-transform">
              <div
                data-counter
                data-value={stat.value}
                data-suffix={stat.suffix}
                className="font-heading bg-[image:var(--gradient-gold)] bg-clip-text text-5xl font-extrabold text-transparent tabular-nums"
              >
                0{stat.suffix}
              </div>
              <div className="mt-2 text-[0.9rem] tracking-[0.05em] text-incense/80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
