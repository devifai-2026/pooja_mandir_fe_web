import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../../lib/utils';

interface InfiniteMovingCardsProps {
  /** one set of cards — rendered twice internally for the seamless loop */
  children: ReactNode;
  speed?: 'fast' | 'normal' | 'slow';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  /** gap between cards in px (also used as group trailing pad) */
  gap?: number;
}

/**
 * Aceternity UI "Infinite Moving Cards", adapted for this project:
 * - framer-motion-free CSS keyframe marquee (animate-scroll in tailwind.css)
 * - items passed as children instead of a data array, so any card markup works
 * - React renders the duplicate group (aria-hidden) instead of DOM cloneNode
 * - scrollbars fully hidden; pause on hover keeps cards clickable/hoverable
 */
export function InfiniteMovingCards({
  children,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  className,
  gap = 24,
}: InfiniteMovingCardsProps) {
  const duration = speed === 'fast' ? '25s' : speed === 'slow' ? '55s' : '38s';

  return (
    <div
      className={cn(
        'group/marquee relative overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        '[mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max items-stretch animate-scroll motion-reduce:animate-none',
          pauseOnHover && 'group-hover/marquee:[animation-play-state:paused]',
        )}
        style={
          {
            '--animation-duration': duration,
            '--animation-direction': direction === 'left' ? 'normal' : 'reverse',
          } as CSSProperties
        }
      >
        <div className="flex items-stretch" style={{ gap, paddingRight: gap }}>
          {children}
        </div>
        <div className="flex" style={{ gap, paddingRight: gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
