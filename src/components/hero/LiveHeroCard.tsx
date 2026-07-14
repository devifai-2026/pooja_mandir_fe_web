import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import mandalaUrl from '../../assets/mandala.jpg';
import { GoldMandalaSvg } from '../art/MandalaBackdrop';

/** Event this card promotes — countdown ticks to this moment (IST). */
const EVENT_DATE = new Date('2026-07-19T09:00:00+05:30');

function formatRemaining(ms: number): string {
  if (ms <= 0) return 'LIVE';
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(sec).padStart(2, '0')}s`;
}

function useCountdown(target: Date): string {
  const [label, setLabel] = useState(() => formatRemaining(target.getTime() - Date.now()));
  useEffect(() => {
    const tick = () => setLabel(formatRemaining(target.getTime() - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return label;
}

/**
 * The "LIVE" hero card: rich CSS ritual scene (temple gradient + blended
 * mandala photo + glowing gold line-art mandala + diya glow) with LIVE /
 * rating chips, event details, a real ticking countdown, and a gentle
 * Framer float. All Framer transforms live on this component's own nodes —
 * outer hero GSAP wrappers stay separate.
 */
export default function LiveHeroCard() {
  const remaining = useCountdown(EVENT_DATE);

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="w-full max-w-[420px]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/30 shadow-[0_40px_80px_rgba(10,5,20,0.55),0_0_0_1px_rgba(212,175,55,0.15)]">
        {/* --- scene layers --- */}
        <div className="absolute inset-0 bg-[linear-gradient(165deg,#800020,#1a0f2e_75%)]" />
        <img
          src={mandalaUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[90%_59%] opacity-45 mix-blend-soft-light [filter:grayscale(0.4)_brightness(0.65)_contrast(1.1)]"
        />
        {/* diya glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_72%,rgba(255,150,40,0.4),transparent_65%),radial-gradient(ellipse_40%_30%_at_50%_78%,rgba(255,210,110,0.35),transparent_60%)]" />
        {/* glowing gold mandala motif */}
        <div className="absolute top-[38%] left-1/2 aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2 [filter:drop-shadow(0_0_18px_rgba(255,200,80,0.35))]">
          <GoldMandalaSvg className="animate-spin-slow h-full w-full opacity-70 motion-reduce:animate-none" />
        </div>
        <span className="font-devanagari absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5.5rem] text-gold-light/95 [text-shadow:0_0_40px_rgba(255,200,80,0.65)]">
          ॐ
        </span>
        {/* grain + readability gradient */}
        <div className="bg-grain pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(180deg,transparent,rgba(10,5,20,0.92))]" />

        {/* --- top chips --- */}
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-temple-red/95 py-1.5 pr-3.5 pl-3 text-[0.7rem] font-bold tracking-[0.08em] text-white shadow-[0_6px_18px_rgba(196,30,58,0.5)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          LIVE NOW
        </div>
        <div className="absolute top-4 right-4 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-right backdrop-blur-md">
          <span className="block text-[0.55rem] font-semibold tracking-[0.12em] text-incense/85 uppercase">
            Devotee Rating
          </span>
          <span className="text-[0.8rem] font-bold text-gold-light">4.9/5.0 ★</span>
        </div>

        {/* --- bottom overlay --- */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-14 w-[52px] shrink-0 flex-col items-center justify-center rounded-xl border border-gold/40 bg-white/10 backdrop-blur-md">
              <span className="text-[0.6rem] font-bold tracking-[0.14em] text-gold-light">JUL</span>
              <span className="font-heading text-[1.35rem] leading-none font-extrabold text-white">19</span>
            </div>
            <h3 className="font-heading text-[1.05rem] leading-snug font-bold text-white">
              11,000 Chandra Moola Mantra Japa &amp; Havan
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span
              className="rounded-full border border-gold/40 bg-indigo-deep/70 px-3.5 py-1.5 font-mono text-[0.78rem] font-semibold tracking-wide text-gold-light tabular-nums backdrop-blur-md"
              data-countdown
            >
              {remaining}
            </span>
            <span className="flex items-center gap-1.5 text-[0.8rem] font-medium text-incense/90">
              <span aria-hidden="true">🛕</span> Someshwar
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
