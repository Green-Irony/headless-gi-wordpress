'use client';

import React from 'react';
import { AnimatePresence, motion as m, useReducedMotion } from 'framer-motion';

export type TextTransitionProps = {
  texts: string[];
  /** Seconds between each transition */
  intervalSec?: number;
  /** Animation style */
  variant?: 'fade' | 'slide' | 'scale';
  /** Optional section-level className to further customize layout */
  className?: string;
  /** Optional id for anchoring */
  id?: string;
  /** Heading element to render (for semantics). Defaults to h2 to avoid multiple h1s. */
  as?: 'h1' | 'h2' | 'h3';
};

/**
 * Animated text rotator that cycles through up to 4 lines.
 * - Uses framer-motion for smooth in/out transitions
 * - Respects reduced motion preferences
 */
export default function TextTransition({
  texts,
  intervalSec = 3,
  variant = 'slide',
  className,
  id,
  as = 'h2',
}: TextTransitionProps) {
  const prefersReducedMotion = useReducedMotion();
  const prefersReduced = !!prefersReducedMotion;
  const safeTexts = Array.isArray(texts) ? texts.filter(Boolean).slice(0, 4) : [];
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    if (safeTexts.length <= 1) return;
    const ms = Math.max(0.5, intervalSec) * 1000;
    const t = setInterval(() => setIdx((i) => (i + 1) % safeTexts.length), ms);
    return () => clearInterval(t);
  }, [intervalSec, safeTexts.length]);

  if (safeTexts.length === 0) return null;

  const variants = getVariants(variant, prefersReduced);

  const HeadingTag = as as any;

  return (
    <m.section
      id={id}
      className={`relative isolate ${className ?? ''}`}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      aria-live="polite"
      aria-atomic
    >
      {/* Glow layer (mirrors HeroCenterPro) */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-[8%] top-[-120px] h-[460px] w-[460px] rounded-full bg-gi-green opacity-[0.18] blur-[140px]
                     md:left-[10%] md:top-[-140px] md:opacity-[0.2]"/>
        <div className="absolute right-[-120px] bottom-[-160px] h-[420px] w-[420px] rounded-full bg-gi-green/20 blur-[140px]" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 py-8 text-center">
        <div className="relative inline-block overflow-hidden align-baseline">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={`${idx}-${safeTexts[idx]}`}
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
              transition={variants.transition}
              className="block"
            >
              <HeadingTag className="text-5xl md:text-7xl font-bold leading-[1.05] text-gi-text tracking-tight text-balance">
                {safeTexts[idx]}
              </HeadingTag>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </m.section>
  );
}

function getVariants(
  variant: 'fade' | 'slide' | 'scale',
  prefersReduced: boolean
): {
  initial: any;
  animate: any;
  exit: any;
  transition: any;
} {
  if (prefersReduced) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
      transition: { duration: 0 },
    };
  }

  switch (variant) {
    case 'fade':
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.35, ease: 'easeOut' },
      };
    case 'scale':
      return {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.02 },
        transition: { duration: 0.3, ease: 'easeOut' },
      };
    case 'slide':
    default:
      return {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.28, ease: 'easeOut' },
      };
  }
}


