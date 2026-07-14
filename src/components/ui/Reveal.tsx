import { useLayoutEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** delay in seconds before the masked slide-up starts */
  delay?: number;
}

/**
 * Masked title reveal: outer element is an overflow-hidden mask, the inner
 * element slides up from yPercent 110 to 0 when scrolled into view.
 * GSAP-only — safe to nest inside Framer-animated ancestors (different nodes).
 */
export default function Reveal({ children, className, style, delay = 0 }: RevealProps) {
  const maskRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!maskRef.current || !innerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          delay,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: maskRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, maskRef);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={maskRef} className={className} style={{ overflow: 'hidden', ...style }}>
      <div ref={innerRef} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}
