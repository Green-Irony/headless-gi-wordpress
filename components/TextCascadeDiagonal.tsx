'use client';

import React from 'react';
import { motion as m, useReducedMotion } from 'framer-motion';

export type TextCascadeDiagonalProps = {
  texts: string[];
  /** Seconds between each line reveal */
  intervalSec?: number;
  /** Heading element to render for each line */
  as?: 'h1' | 'h2' | 'h3';
  /** Horizontal offset in px between lines (positive shifts right) */
  offsetX?: number;
  /** Vertical offset in px between lines (negative shifts upward for diagonal) */
  offsetY?: number;
  /** Optional wrapper className */
  className?: string;
  id?: string;
  /** If true, renders inline (no section/glow wrapper) suitable for embedding inside a hero */
  inline?: boolean;
  /** Loop the animation by restarting after the specified seconds. Default 4s. Set 0 to disable. */
  loopAfterSec?: number;
};

/**
 * Cascading hero-style text that reveals lines one-by-one and finishes with
 * a subtle diagonal alignment across lines. Up to 4 lines are rendered.
 */
export default function TextCascadeDiagonal({
  texts,
  intervalSec = 0.6,
  as = 'h2',
  offsetX = 10,
  offsetY = -6,
  className,
  id,
  inline = false,
  loopAfterSec = 4,
}: TextCascadeDiagonalProps) {
  const prefersReduced = !!useReducedMotion();
  const safeTexts = Array.isArray(texts) ? texts.filter(Boolean).slice(0, 4) : [];
  const HeadingTag = as as any;
  const [cycle, setCycle] = React.useState(0);
  const loop = !prefersReduced && loopAfterSec > 0;

  if (safeTexts.length === 0) return null;

  React.useEffect(() => {
    if (!loop) return;
    const ms = Math.max(0.5, loopAfterSec) * 1000;
    const t = setInterval(() => setCycle((c) => c + 1), ms);
    return () => clearInterval(t);
  }, [loop, loopAfterSec]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: Math.max(0.1, intervalSec) },
    },
  } as const;

  const lineVariants = {
    hidden: (i: number) => ({ opacity: prefersReduced ? 1 : 0, x: 0, y: prefersReduced ? 0 : 14 }),
    show: (i: number) => ({
      opacity: 1,
      x: i * offsetX,
      y: i * offsetY,
      transition: prefersReduced ? { duration: 0 } : { duration: 0.32 },
    }),
  } as const;

  if (inline) {
    return (
      <div id={id} className={className ?? ''}>
        <m.div
          key={cycle}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={loop ? { amount: 0.2 } : { once: true, amount: 0.2 }}
        >
          {safeTexts.map((line, i) => (
            <m.div key={`${i}-${line}`} custom={i} variants={lineVariants} className="block">
              <HeadingTag className="text-5xl md:text-7xl font-bold leading-[1.05] text-gi-text tracking-tight text-balance">
                {line}
              </HeadingTag>
            </m.div>
          ))}
        </m.div>
      </div>
    );
  }

  return (
    <m.section
      id={id}
      className={`relative isolate ${className ?? ''}`}
      initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-[8%] top-[-120px] h-[460px] w-[460px] rounded-full bg-gi-green opacity-[0.18] blur-[140px]
                     md:left-[10%] md:top-[-140px] md:opacity-[0.2]"/>
        <div className="absolute right-[-120px] bottom-[-160px] h-[420px] w-[420px] rounded-full bg-gi-green/20 blur-[140px]" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 py-8 text-center">
        <m.div
          key={cycle}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={loop ? { amount: 0.2 } : { once: true, amount: 0.2 }}
        >
          {safeTexts.map((line, i) => (
            <m.div key={`${i}-${line}`} custom={i} variants={lineVariants} className="block">
              <HeadingTag className="text-5xl md:text-7xl font-bold leading-[1.05] text-gi-text tracking-tight text-balance">
                {line}
              </HeadingTag>
            </m.div>
          ))}
        </m.div>
      </div>
    </m.section>
  );
}


