'use client';
import { motion as m, useReducedMotion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

export type PillarItem = { title: string; body: string; icon?: string; accentStrength?: number };
export type ValuePillarsProps = {
  id?: string;
  className?: string;
  heading?: string;
  subhead?: string;
  items?: PillarItem[];
};

const DEFAULT_HEADING = 'From promise to predictable impact';
const DEFAULT_SUBHEAD = 'Most AI pilots stall because agents can’t see context, act safely, or scale. We combine integration-first architecture, AI-native agent design, and senior delivery to give you outcomes you can plan around.';
const DEFAULT_ITEMS: PillarItem[] = [
  { title: 'Deflection that scales', body: 'Automate routine requests with agents that surface answers and take safe actions—reducing load on your live teams.' },
  { title: 'Speed to value', body: 'AI-infused MuleSoft delivery cuts cycle time in half; your first working agent in eight weeks.' },
  { title: 'Capacity unlocked', body: 'Free your experts for strategic work while agents handle structured, repeatable demand.' },
];

export default function ValuePillars({ id, className, heading = DEFAULT_HEADING, subhead = DEFAULT_SUBHEAD, items = DEFAULT_ITEMS }: ValuePillarsProps) {
  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 8;
  const listRef = useRef<HTMLUListElement | null>(null);
  const [cardMinHeight, setCardMinHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const measure = () => {
      const cards = Array.from(container.querySelectorAll<HTMLElement>('.vp-card'));
      if (cards.length === 0) return;
      // Reset any previous minHeight to measure natural content heights
      cards.forEach((c) => (c.style.minHeight = ''));
      const max = Math.max(...cards.map((c) => c.getBoundingClientRect().height));
      setCardMinHeight(Math.ceil(max));
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(container);
    // also observe each card content for changes
    container.querySelectorAll('.vp-card').forEach((el) => ro.observe(el));

    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, [items]);

  return (
    <m.section
      id={id}
      className={`relative isolate ${className ?? ''}`}
      initial={{ opacity: 0, y: enterY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-gi-green opacity-[0.14] blur-[140px]" />
        <div className="absolute left-[20%] top-[20%] h-[280px] w-[280px] rounded-full bg-gi-pink/20 opacity-[0.14] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />

        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gi-text tracking-tight text-balance">
          {heading}
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-center text-gi-gray text-balance">
          {subhead}
        </p>

        <m.ul
          ref={listRef}
          className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3 items-stretch"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {items.map(({ title, body }) => (
            <m.li
              key={title}
              className="relative overflow-visible h-full"
              variants={{
                hidden: { opacity: 0, y: enterY },
                show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
              }}
            >
              <div className="h-full rounded-2xl bg-gradient-to-r from-gi-green/35 via-gi-pink/20 to-gi-green/35 p-[1px]">
                <div className="vp-card flex h-full flex-col rounded-[16px] bg-white p-6 shadow-gi transition-transform duration-200 will-change-transform group-hover:-translate-y-0.5" style={cardMinHeight ? { minHeight: cardMinHeight } : undefined}>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gi-green/15 ring-1 ring-gi-fog">
                    <span className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-gi-text">{title}</h3>
                  <p className="mt-2 text-sm text-gi-gray">{body}</p>
                  <div className="mt-auto" />
                </div>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute left-3 right-3 -bottom-3 h-6 rounded-b-[18px]
                           bg-gradient-to-r from-gi-green/30 via-gi-pink/20 to-gi-green/30
                           blur-[10px] opacity-80 md:opacity-90
                           [mask-image:linear-gradient(to_bottom,transparent,black_40%)]"
              />
            </m.li>
          ))}
        </m.ul>
      </div>
    </m.section>
  );
}

function SquiggleUnderlineGreen() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[8px] w-full"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="vpBlur" x="-5%" y="-150%" width="110%" height="400%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
        <linearGradient id="vpGreen" x1="0" x2="1">
          <stop offset="0" stopColor="#5AAD5A" stopOpacity="0.9" />
          <stop offset="1" stopColor="#5AAD5A" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M0 5 C 10 1, 20 7, 30 5 S 50 1, 60 5 80 7, 100 5"
        stroke="url(#vpGreen)"
        strokeWidth="1.8"
        fill="none"
        filter="url(#vpBlur)"
      />
    </svg>
  );
}

function IconDeflect() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#141415" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 3" />
    </svg>
  );
}
function IconSpeed() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#141415" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      <path d="M12 12l7-7" />
    </svg>
  );
}
function IconCapacity() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#141415" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <path d="M2 21c1.5-3 4-5 7-5" />
      <circle cx="17" cy="10" r="3" />
      <path d="M12 21c1.5-3 4-5 7-5" />
    </svg>
  );
}