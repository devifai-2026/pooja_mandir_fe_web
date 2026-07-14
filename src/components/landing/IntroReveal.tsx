import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Full-screen intro curtain: temple gradient with ॐ + wordmark, lifts away
 * upward ~1.3s after load with a premium ease, then unmounts entirely.
 * Plays on every landing-page load.
 */
export default function IntroReveal() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1350);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[image:var(--gradient-temple)]"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="bg-grain pointer-events-none absolute inset-0 opacity-35 mix-blend-overlay" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_50%,rgba(212,175,55,0.16),transparent_65%)]" />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative flex flex-col items-center gap-4"
          >
            <span className="font-devanagari text-[4rem] leading-none text-gold-light [text-shadow:0_0_40px_rgba(255,200,80,0.5)]">
              ॐ
            </span>
            <span className="font-heading bg-[image:var(--gradient-gold)] bg-clip-text text-[2rem] font-bold text-transparent">
              Digital Mandir
            </span>
            <span className="ornament-divider w-40">
              <span className="ornament-glyph text-[0.8rem]">✦</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
