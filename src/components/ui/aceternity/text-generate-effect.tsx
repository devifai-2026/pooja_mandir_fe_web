import { useEffect } from 'react';
import { motion, stagger, useAnimate, useInView } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

/**
 * Aceternity UI "Text Generate Effect" (MIT), adapted:
 * - imports from "framer-motion" (not "motion/react")
 * - fires when scrolled into view (once) instead of on mount, since it is
 *   used below the fold
 * - inline-block words use margin for spacing (trailing spaces collapse
 *   inside inline-block)
 */
export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true, margin: '-10% 0px' });
  const wordsArray = words.split(' ');

  useEffect(() => {
    if (!inView) return;
    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
      },
      {
        duration,
        delay: stagger(0.12),
      },
    );
  }, [inView, animate, duration, filter]);

  return (
    <div ref={scope} className={cn(className)}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className="mr-[0.28em] inline-block opacity-0 last:mr-0"
          style={{ filter: filter ? 'blur(10px)' : 'none' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
