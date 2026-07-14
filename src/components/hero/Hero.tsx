import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import ThreeBackground from './ThreeBackground';
import AnnouncementTicker from './AnnouncementTicker';
import LiveHeroCard from './LiveHeroCard';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const MANTRA =
  'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् · ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि ';

/** faint swirling Sanskrit ring behind the headline */
function MantraSwirl() {
  return (
    <div
      className="pointer-events-none absolute top-1/2 left-[10%] z-0 aspect-square w-[720px] -translate-y-1/2 opacity-[0.07]"
      aria-hidden="true"
    >
      <svg className="animate-spin-slow h-full w-full motion-reduce:animate-none" viewBox="0 0 600 600">
        <defs>
          <path
            id="mantra-circle-outer"
            d="M300,300 m-252,0 a252,252 0 1,1 504,0 a252,252 0 1,1 -504,0"
          />
          <path
            id="mantra-circle-inner"
            d="M300,300 m-168,0 a168,168 0 1,1 336,0 a168,168 0 1,1 -336,0"
          />
        </defs>
        <circle cx="300" cy="300" r="296" fill="none" stroke="#F5F0E8" strokeWidth="1" />
        <circle cx="300" cy="300" r="210" fill="none" stroke="#F5F0E8" strokeWidth="0.8" />
        <text fontSize="30" fill="#F5F0E8" className="font-devanagari">
          <textPath href="#mantra-circle-outer">{MANTRA}</textPath>
        </text>
        <text fontSize="22" fill="#F5F0E8" className="font-devanagari">
          <textPath href="#mantra-circle-inner">{MANTRA}</textPath>
        </text>
      </svg>
    </div>
  );
}

const heroStats = [
  { value: 500, suffix: '+', label: 'Rituals Performed', decimals: 0 },
  { value: 50, suffix: '+', label: 'Temples', decimals: 0 },
  { value: 200000, suffix: '+', label: 'Devotees Served', decimals: 0 },
  { value: 4.9, suffix: '', label: 'Devotee Rating', decimals: 1 },
];

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !heroRef.current || !bgRef.current) return;
    const ctx = gsap.context(() => {
      // scroll parallax: GSAP owns these wrapper nodes only — Framer
      // animates separate inner nodes (mount fades, card float)
      gsap.to(contentRef.current, {
        y: 180,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
      gsap.to(bgRef.current, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // stat counters
      if (statsRef.current) {
        statsRef.current.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
          const target = Number(el.dataset.value);
          const suffix = el.dataset.suffix ?? '';
          const decimals = Number(el.dataset.decimals ?? 0);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2.2,
            delay: 0.9,
            ease: 'power1.out',
            onUpdate: () => {
              const v = decimals
                ? obj.val.toFixed(decimals)
                : Math.round(obj.val).toLocaleString('en-IN');
              el.textContent = `${v}${suffix}`;
            },
          });
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[image:var(--gradient-temple)]"
    >
      {/* ambient Three.js diya particles behind both columns */}
      <div ref={bgRef} className="absolute inset-0 opacity-70">
        <ThreeBackground />
      </div>

      {/* layered radial vignette + grain */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 30% 20%, rgba(255,107,0,0.12), transparent 60%), radial-gradient(ellipse 60% 50% at 85% 80%, rgba(212,175,55,0.14), transparent 60%), radial-gradient(ellipse 100% 55% at 50% 100%, rgba(26,15,46,0.9), transparent 72%)',
        }}
      />
      <div className="bg-grain pointer-events-none absolute inset-0 z-0 opacity-35 mix-blend-overlay" />

      <AnnouncementTicker />

      <span className="pointer-events-none absolute top-[124px] left-8 z-[2] h-14 w-14 border-t-[1.5px] border-l-[1.5px] border-gold-light opacity-55 max-md:hidden" />
      <span className="pointer-events-none absolute right-8 bottom-16 z-[2] h-14 w-14 border-r-[1.5px] border-b-[1.5px] border-gold-light opacity-55 max-md:hidden" />

      {/* GSAP-scrubbed wrapper */}
      <div ref={contentRef} className="relative z-[1] flex flex-1 flex-col justify-center">
        <div className="container flex flex-1 flex-col justify-center pt-36 pb-16 lg:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[55fr_45fr]">
            {/* LEFT — headline block */}
            <div className="relative">
              <MantraSwirl />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative z-[1] max-lg:text-center"
              >
                <span className="font-devanagari mb-4 block text-[1.1rem] tracking-[0.08em] text-gold-light/90">
                  ॐ नमः शिवाय
                </span>
                <h1 className="font-heading mb-6 text-[clamp(2.6rem,5.2vw,4.3rem)] leading-[1.06] font-extrabold tracking-[-0.01em] text-pearl">
                  Sacred Rituals.
                  <br />
                  <span className="animate-sheen bg-[linear-gradient(110deg,#D4AF37,#FFD700,#FFF7D1,#FFD700,#D4AF37)] bg-[length:200%_auto] bg-clip-text text-transparent motion-reduce:animate-none">
                    Divine Blessings.
                  </span>
                  <br />
                  Your Sankalpa.
                </h1>
                <p className="mb-9 max-w-[480px] text-[1.05rem] leading-relaxed text-incense/85 max-lg:mx-auto">
                  Connecting devotees to authentic poojas, sevas, and the sacred traditions of
                  Sanatana Dharma — performed in your name at India&rsquo;s most powerful temples.
                </p>
                <div className="flex flex-wrap items-center gap-4 max-lg:justify-center">
                  <Link to="/book-pooja">
                    <Button variant="primary">Book a Pooja →</Button>
                  </Link>
                  <a href="#shorts">
                    <Button
                      variant="secondary"
                      className="border-pearl/40 text-pearl enabled:hover:border-gold-light enabled:hover:bg-white/5"
                    >
                      ▶ Watch How It Works
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — live event card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
              className="flex justify-center lg:justify-end"
            >
              <LiveHeroCard />
            </motion.div>
          </div>

          {/* stats pill row */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
            className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
          >
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-center gap-2.5 rounded-full border border-gold/25 bg-white/5 px-4 py-3.5 backdrop-blur-md transition-colors duration-300 hover:border-gold/50 max-lg:flex-col max-lg:gap-0.5 max-lg:rounded-2xl"
              >
                <span
                  data-counter
                  data-value={s.value}
                  data-suffix={s.suffix}
                  data-decimals={s.decimals}
                  className="font-heading text-[1.25rem] font-extrabold text-gold-light tabular-nums"
                >
                  0{s.suffix}
                </span>
                <span className="text-[0.78rem] font-medium text-incense/85">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="animate-bob absolute bottom-6 left-1/2 z-[1] text-[0.75rem] tracking-[0.1em] text-gold opacity-70 max-lg:hidden motion-reduce:animate-none">
        SCROLL TO EXPLORE ↓
      </div>
    </section>
  );
}
