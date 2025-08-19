'use client';
import { motion as m, useReducedMotion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

export type WheelDeliverable = {
  title: string;
  body: string;
};

export type DeliverablesWheelProps = {
  id?: string;
  className?: string;
  heading?: string;
  subhead?: string;
  items: WheelDeliverable[]; // 3–6
};

const DEFAULT_HEADING = 'What we deliver';

/**
 * Simple, responsive "ferris wheel" layout.
 * - Mobile: single-column stacked cards
 * - md+: 3-column grid: left and right cabins alternate around a central mast with a vertical line and dots
 *   This avoids trigonometry/position math and stays stable for 3–6 items.
 */
export default function DeliverablesWheel({ id, className, heading = DEFAULT_HEADING, subhead, items }: DeliverablesWheelProps) {
  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 8;
  const safe = Array.isArray(items) ? items.slice(0, 6) : [];
  const desktopListRef = useRef<HTMLDivElement | null>(null);
  const [cardMinHeight, setCardMinHeight] = useState<number | undefined>(undefined);

  // Equalize card heights so every row has the same height.
  useEffect(() => {
    const container = desktopListRef.current;
    if (!container) return;

    const measure = () => {
      const cards = Array.from(container.querySelectorAll<HTMLElement>('.dw-card'));
      if (cards.length === 0) return;
      cards.forEach((c) => (c.style.minHeight = ''));
      const max = Math.max(...cards.map((c) => c.getBoundingClientRect().height));
      setCardMinHeight(Math.ceil(max));
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(container);
    container.querySelectorAll('.dw-card').forEach((el) => ro.observe(el));
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
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-gi-green/30 opacity-[0.10] blur-[140px]" />
        <div className="absolute left-[25%] top-[20%] h-[280px] w-[280px] rounded-full bg-gi-pink/30 opacity-[0.08] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gi-text tracking-tight text-balance">{heading}</h2>
        {subhead && <p className="mx-auto mt-4 max-w-3xl text-center text-gi-gray text-balance">{subhead}</p>}

        {/* Mobile: list */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:hidden" role="list">
          {safe.map((d) => (
            <div key={d.title} className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi" role="listitem">
              <h3 className="text-base font-semibold text-gi-text">{d.title}</h3>
              <p className="mt-2 text-sm text-gi-gray">{d.body}</p>
            </div>
          ))}
        </div>

        {/* Desktop: alternating cabins around a central mast */}
        <div ref={desktopListRef} className="relative mx-auto hidden md:block mt-8" role="list">
          {/* Vertical line through the middle */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block">
            <div className="mx-auto h-full w-px bg-gi-fog" />
          </div>

          {(() => {
            const leftItems = safe.filter((_, i) => i % 2 === 0);
            const rightItems = safe.filter((_, i) => i % 2 === 1);
            const rows = Math.max(leftItems.length, rightItems.length);
            const Row = ({ left, right, keyIdx }: { left?: WheelDeliverable; right?: WheelDeliverable; keyIdx: number }) => (
              <div key={keyIdx} className="grid grid-cols-[1fr_56px_1fr] items-stretch my-4">
                <div>
                  {left && (
                    <m.div
                      className="dw-card rounded-xl bg-white p-5 shadow-gi ring-1 ring-gi-fog/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gi-green"
                      role="listitem"
                      tabIndex={0}
                      initial={{ opacity: 0, y: enterY }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      style={cardMinHeight ? { minHeight: cardMinHeight } : undefined}
                    >
                      <h3 className="text-[0.95rem] font-semibold text-gi-text">{left.title}</h3>
                      <p className="mt-1 text-sm text-gi-gray">{left.body}</p>
                    </m.div>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-gi-green ring-2 ring-white shadow" />
                </div>

                <div>
                  {right && (
                    <m.div
                      className="dw-card rounded-xl bg-white p-5 shadow-gi ring-1 ring-gi-fog/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gi-green"
                      role="listitem"
                      tabIndex={0}
                      initial={{ opacity: 0, y: enterY }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      style={cardMinHeight ? { minHeight: cardMinHeight } : undefined}
                    >
                      <h3 className="text-[0.95rem] font-semibold text-gi-text">{right.title}</h3>
                      <p className="mt-1 text-sm text-gi-gray">{right.body}</p>
                    </m.div>
                  )}
                </div>
              </div>
            );

            return new Array(rows).fill(null).map((_, i) => (
              <Row keyIdx={i} left={leftItems[i]} right={rightItems[i]} key={i} />
            ));
          })()}
        </div>
      </div>
    </m.section>
  );
}


