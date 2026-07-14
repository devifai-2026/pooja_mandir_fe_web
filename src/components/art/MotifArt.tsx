import { useMemo } from 'react';

const GRADIENTS = [
  ['#800020', '#C41E3A', '#3a0a17'],
  ['#1A0F2E', '#800020', '#3a1650'],
  ['#C41E3A', '#FF6B00', '#7a1015'],
  ['#1A0F2E', '#4a1942', '#0d0818'],
  ['#800020', '#FF6B00', '#3a0a17'],
  ['#3a1650', '#800020', '#1A0F2E'],
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

interface MotifArtProps {
  seed: string;
  symbol?: string;
  height?: number | string;
}

export default function MotifArt({ seed, symbol = 'ॐ', height = 200 }: MotifArtProps) {
  const hash = hashString(seed);
  const [c1, c2, c3] = GRADIENTS[hash % GRADIENTS.length];

  const sparkles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const s = hashString(`${seed}-spark-${i}`);
        return {
          top: `${(s % 90) + 5}%`,
          left: `${((s >> 4) % 90) + 5}%`,
          size: 2 + (s % 3),
          opacity: 0.2 + ((s >> 8) % 50) / 100,
        };
      }),
    [seed],
  );

  // deterministic petal count + rotation offset per card for variety
  const petals = 10 + (hash % 6); // 10-15
  const rotOffset = hash % 360;
  const gradAngle = 100 + (hash % 80);

  return (
    <div
      className="group/motif relative isolate flex w-full items-center justify-center overflow-hidden"
      style={{
        height,
        background: `linear-gradient(${gradAngle}deg, ${c1}, ${c2} 55%, ${c3})`,
      }}
    >
      {/* grain */}
      <div className="bg-grain pointer-events-none absolute inset-0 z-0 opacity-35 mix-blend-overlay" />

      {/* mandala line-art: scale-on-hover lives on the wrapper div, the
          per-card rotation offset stays inline on the svg (separate nodes) */}
      <div className="absolute z-0 flex h-[130%] w-[130%] items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/motif:scale-[1.06]">
        <svg
          className="h-full w-full"
          viewBox="0 0 200 200"
          style={{ transform: `rotate(${rotOffset}deg)` }}
        >
          <g opacity="0.35">
            <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.6" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" />
            <circle cx="100" cy="100" r="46" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.6" />
          </g>
          <g opacity="0.4">
            {Array.from({ length: petals }, (_, i) => {
              const angle = (i / petals) * 360;
              return (
                <path
                  key={i}
                  d="M100,30 Q112,60 100,88 Q88,60 100,30 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="0.7"
                  transform={`rotate(${angle} 100 100)`}
                />
              );
            })}
          </g>
          <g opacity="0.55">
            {Array.from({ length: 16 }, (_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const r = 18;
              return (
                <circle
                  key={i}
                  cx={100 + Math.cos(angle) * r}
                  cy={100 + Math.sin(angle) * r}
                  r="1.6"
                  fill="rgba(255,255,255,0.6)"
                />
              );
            })}
          </g>
        </svg>
      </div>

      <div
        className="absolute z-0 rounded-full border-[1.5px] border-white/25"
        style={{ width: '72%', aspectRatio: '1', opacity: 0.5 }}
      />
      <div
        className="absolute z-0 rounded-full border-[1.5px] border-white/25"
        style={{ width: '96%', aspectRatio: '1', opacity: 0.28 }}
      />

      {sparkles.map((s, i) => (
        <span
          key={i}
          className="absolute z-[1] rounded-full bg-white/60 shadow-[0_0_6px_rgba(255,255,255,0.5)]"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity }}
        />
      ))}

      {/* diagonal shimmer sweep on hover */}
      <div className="pointer-events-none absolute -inset-[20%] z-[1] translate-x-[-120%] bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.22)_50%,transparent_60%)] group-hover/motif:animate-sweep motion-reduce:animate-none" />

      <span
        className="font-devanagari relative z-[2] text-white/95 transition-transform duration-500 [text-shadow:0_4px_24px_rgba(0,0,0,0.35)] group-hover/motif:scale-[1.08]"
        style={{ fontSize: typeof height === 'number' ? height * 0.34 : '3.4rem' }}
      >
        {symbol}
      </span>
    </div>
  );
}
