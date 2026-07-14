import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import MandalaBackdrop from '../art/MandalaBackdrop';
import { TextGenerateEffect } from '../ui/aceternity/text-generate-effect';

gsap.registerPlugin(ScrollTrigger);

export default function CtaBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !innerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        },
      );
      // slow parallax drift on the glow layer only (its own node — GSAP
      // never shares a node with the Framer button hovers below)
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          backgroundPosition: '60% 40%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // transparent: sits on the shared dark canvas provided by the parent
    // wrapper in LandingPage, blending seamlessly with the ProductTeaser above.
    <section
      className="relative overflow-hidden px-6 pt-16 pb-32 max-sm:pb-22"
      ref={sectionRef}
    >
      {/* radial glow drift layer */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-[10%] z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,179,0,0.28), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.14), transparent 45%), radial-gradient(circle at 50% 100%, rgba(196,30,58,0.25), transparent 50%)',
          backgroundSize: '140% 140%',
          backgroundPosition: '40% 60%',
        }}
      />
      {/* darkened mandala photo + rotating gold line-art mandala */}
      <MandalaBackdrop />
      <span className="corner-frame tl" />
      <span className="corner-frame br" />

      <div className="relative z-[1] mx-auto max-w-[720px] text-center" ref={innerRef}>
        <span className="section-eyebrow text-gold-light">Begin Your Ritual</span>
        <TextGenerateEffect
          words="Let Divine Grace Find Its Way to You"
          className="font-heading mb-4 text-4xl font-bold text-white"
        />
        <p className="mb-9 text-lg leading-relaxed text-white/85">
          Book a pooja in minutes, or explore sacred essentials curated for your home altar —
          every ritual performed with devotion, every product blessed before it ships.
        </p>
        <div className="flex flex-wrap justify-center gap-5">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/book-pooja">
              <Button variant="primary">Book a Pooja</Button>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/products">
              <Button variant="secondary" className="border-gold-light text-gold-light">
                Explore Products
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="ornament-divider mt-10">
          <span className="ornament-glyph">ॐ</span>
        </div>
      </div>
    </section>
  );
}
