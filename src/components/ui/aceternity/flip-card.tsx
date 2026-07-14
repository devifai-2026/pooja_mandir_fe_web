import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

/**
 * true when the device supports real hover with a fine pointer (desktop).
 * Used to gate the 3D flip so touch devices keep static cards.
 */
export function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return canHover;
}

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

/**
 * Aceternity-style 3D hover flip card: perspective wrapper, inner node
 * rotates Y 180deg on hover with preserve-3d; both faces are absolutely
 * positioned with backface-visibility hidden.
 *
 * Transforms live entirely on this component's inner nodes so outer
 * wrappers stay free for GSAP scroll reveals (no shared-node conflicts).
 */
export function FlipCard({ front, back, className }: FlipCardProps) {
  return (
    <div className={cn('group/flip h-full w-full [perspective:1400px]', className)}>
      <div
        className={cn(
          'relative h-full w-full transition-transform duration-700',
          'ease-[cubic-bezier(0.4,0.2,0.2,1)] [transform-style:preserve-3d]',
          'group-hover/flip:[transform:rotateY(180deg)]',
          'motion-reduce:transition-none motion-reduce:group-hover/flip:transform-none',
        )}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[18px] [backface-visibility:hidden]">
          {front}
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-[18px] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}
