import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '../ui/Reveal';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    glyph: '🪔',
    title: 'Choose a Pooja',
    desc: 'Browse authentic rituals — from Ganesha to Navagraha — and pick the one that fits your intention.',
  },
  {
    num: '02',
    glyph: '📅',
    title: 'Book & Pay',
    desc: 'Select your date, time, and participants. Secure checkout confirms your slot instantly.',
  },
  {
    num: '03',
    glyph: '🙏',
    title: 'We Perform It',
    desc: 'A verified pandit conducts the ritual with full Vedic tradition — you receive updates every step.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !stepsRef.current) return;
    const rows = stepsRef.current.querySelectorAll('[data-step]');
    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        const fromX = row.getAttribute('data-dir') === 'right' ? 60 : -60;
        gsap.fromTo(
          row,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section texture-light" ref={sectionRef}>
      <div className="container">
        <div className="mx-auto mb-20 max-w-[640px] text-center max-md:mb-14">
          <span className="section-eyebrow">Simple, Sacred, Seamless</span>
          <Reveal>
            <h2 className="section-title">How It Works</h2>
          </Reveal>
          <p className="section-subtitle mb-0!">From intention to blessing in three simple steps.</p>
        </div>

        <div className="relative z-[1] mx-auto flex max-w-[1040px] flex-col gap-16 max-md:gap-12" ref={stepsRef}>
          {steps.map((s, i) => {
            const iconOnRight = i % 2 === 1; // step 2 → icon on right
            return (
              <div
                key={s.num}
                data-step
                data-dir={iconOnRight ? 'right' : 'left'}
                className="relative grid grid-cols-2 items-center gap-10 will-change-transform max-md:grid-cols-1 max-md:gap-6 max-md:text-center"
              >
                {/* faint curved connector to next row (desktop only) */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-16 left-1/2 h-16 w-px -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,rgba(212,175,55,0.5)_0_5px,transparent_5px_11px)] max-md:hidden"
                  />
                )}

                {/* visual / medallion side */}
                <div
                  className={
                    'flex items-center justify-center max-md:order-1 ' +
                    (iconOnRight ? 'order-2 justify-start' : 'order-1 justify-end')
                  }
                >
                  <div className="relative flex items-center justify-center">
                    <span className="font-heading pointer-events-none absolute -z-0 text-[8rem] leading-none font-black text-gold/15 select-none max-md:text-[6rem]">
                      {s.num}
                    </span>
                    <div className="relative z-[1] flex h-28 w-28 items-center justify-center rounded-full border-[1.5px] border-gold/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,240,232,0.9))] text-[2.6rem] shadow-[0_24px_48px_rgba(128,0,32,0.14),0_0_0_10px_rgba(212,175,55,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] max-md:h-24 max-md:w-24 max-md:text-[2.2rem]">
                      {s.glyph}
                    </div>
                  </div>
                </div>

                {/* text side */}
                <div
                  className={
                    'max-md:order-2 max-md:items-center ' +
                    (iconOnRight ? 'order-1 text-right max-md:text-center' : 'order-2 text-left max-md:text-center')
                  }
                >
                  <span className="font-heading mb-2 block text-[0.8rem] font-bold tracking-[0.14em] text-saffron">
                    STEP {s.num}
                  </span>
                  <h3 className="font-heading mb-3 text-2xl text-maroon">{s.title}</h3>
                  <p
                    className={
                      'max-w-[380px] text-[0.95rem] leading-[1.6] text-indigo-deep/70 max-md:mx-auto ' +
                      (iconOnRight ? 'ml-auto' : '')
                    }
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
