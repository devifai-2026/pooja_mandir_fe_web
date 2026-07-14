import mandalaUrl from '../../assets/mandala.jpg';
import { cn } from '../../lib/utils';

const CX = 500;
const CY = 500;
const GOLD = 'rgba(212, 175, 55, 0.5)';
const GOLD_SOFT = 'rgba(212, 175, 55, 0.35)';

function polar(r: number, angleDeg: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

/** Ring of lens-shaped petals between rInner and rOuter */
function PetalRing({
  count,
  rInner,
  rOuter,
  strokeWidth = 1.4,
  opacity = 1,
}: {
  count: number;
  rInner: number;
  rOuter: number;
  strokeWidth?: number;
  opacity?: number;
}) {
  const bulge = ((rOuter - rInner) / 2) * 0.55;
  const mid = (rInner + rOuter) / 2;
  const d = `M ${CX} ${CY - rInner} Q ${CX + bulge} ${CY - mid} ${CX} ${CY - rOuter} Q ${CX - bulge} ${CY - mid} ${CX} ${CY - rInner} Z`;
  return (
    <g opacity={opacity}>
      {Array.from({ length: count }, (_, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={GOLD}
          strokeWidth={strokeWidth}
          transform={`rotate(${(i / count) * 360} ${CX} ${CY})`}
        />
      ))}
    </g>
  );
}

/** Scalloped ring: consecutive outward-bulging arcs along a circle */
function ScallopRing({
  radius,
  count,
  strokeWidth = 1.2,
  opacity = 1,
}: {
  radius: number;
  count: number;
  strokeWidth?: number;
  opacity?: number;
}) {
  const s = radius * Math.sin(Math.PI / count) * 1.15;
  let d = '';
  for (let i = 0; i <= count; i++) {
    const [x, y] = polar(radius, (i / count) * 360 - 90);
    if (i === 0) d += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
    else d += ` A ${s.toFixed(2)} ${s.toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return <path d={d} fill="none" stroke={GOLD} strokeWidth={strokeWidth} opacity={opacity} />;
}

/** Rosette of small filled dots on a circle */
function DotRosette({
  radius,
  count,
  dotR = 2.6,
  opacity = 1,
}: {
  radius: number;
  count: number;
  dotR?: number;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: count }, (_, i) => {
        const [x, y] = polar(radius, (i / count) * 360 - 90);
        return <circle key={i} cx={x} cy={y} r={dotR} fill={GOLD} stroke="none" />;
      })}
    </g>
  );
}

export function GoldMandalaSvg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1000 1000" aria-hidden="true">
      {/* outer rim */}
      <circle cx={CX} cy={CY} r={492} fill="none" stroke={GOLD} strokeWidth={1.6} />
      <circle cx={CX} cy={CY} r={474} fill="none" stroke={GOLD_SOFT} strokeWidth={1} />
      <ScallopRing radius={452} count={40} opacity={0.9} />

      {/* outer petal band */}
      <PetalRing count={28} rInner={330} rOuter={452} strokeWidth={1.3} opacity={0.85} />
      <circle cx={CX} cy={CY} r={324} fill="none" stroke={GOLD} strokeWidth={1.4} />
      <DotRosette radius={344} count={56} dotR={2.2} opacity={0.7} />

      {/* mid band */}
      <ScallopRing radius={302} count={30} opacity={0.85} />
      <PetalRing count={18} rInner={192} rOuter={300} strokeWidth={1.3} opacity={0.9} />
      <circle cx={CX} cy={CY} r={186} fill="none" stroke={GOLD} strokeWidth={1.3} />
      <DotRosette radius={210} count={36} dotR={2.4} opacity={0.75} />

      {/* inner band */}
      <ScallopRing radius={168} count={22} opacity={0.85} />
      <PetalRing count={12} rInner={72} rOuter={166} strokeWidth={1.4} />
      <circle cx={CX} cy={CY} r={66} fill="none" stroke={GOLD} strokeWidth={1.3} />
      <DotRosette radius={46} count={12} dotR={2.8} opacity={0.9} />
      <circle cx={CX} cy={CY} r={18} fill="none" stroke={GOLD} strokeWidth={1.6} />
      <circle cx={CX} cy={CY} r={5} fill={GOLD} stroke="none" />
    </svg>
  );
}

interface MandalaBackdropProps {
  /** horizontal anchor of the rotating mandala */
  align?: 'center' | 'right';
}

/**
 * Premium CTA backdrop: real mandala photo darkened over the section
 * gradient for texture + a procedurally-drawn gold line-art mandala that
 * slowly rotates (with a smaller counter-rotating layer for depth).
 * Purely decorative; section content must be position:relative z-index >= 1.
 */
export default function MandalaBackdrop({ align = 'center' }: MandalaBackdropProps) {
  const anchor = align === 'right' ? 'left-[78%]' : 'left-1/2';
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* real mandala photo, darkened + blended; object-position targets the
          dense mandala area of the source image (~90% left, ~59% top) */}
      <img
        src={mandalaUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[90%_59%] opacity-[0.38] mix-blend-soft-light [filter:grayscale(0.85)_brightness(0.5)_contrast(1.1)]"
      />
      {/* dark radial overlay keeps foreground text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_50%,rgba(26,15,46,0.18),rgba(26,15,46,0.7)_90%)]" />

      {/* rotating gold line-art mandala */}
      <div
        className={cn(
          'absolute top-1/2 aspect-square w-[min(150vmin,1200px)] -translate-x-1/2 -translate-y-1/2',
          anchor,
        )}
      >
        <GoldMandalaSvg className="animate-spin-slow h-full w-full opacity-55 motion-reduce:animate-none" />
      </div>
      {/* smaller counter-rotating layer for depth */}
      <div
        className={cn(
          'absolute top-1/2 aspect-square w-[min(80vmin,620px)] -translate-x-1/2 -translate-y-1/2',
          anchor,
        )}
      >
        <GoldMandalaSvg className="animate-spin-slow-reverse h-full w-full opacity-30 motion-reduce:animate-none" />
      </div>
    </div>
  );
}
