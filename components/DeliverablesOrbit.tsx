'use client';
import { motion as m, useReducedMotion } from 'framer-motion';
import React from 'react';

export type Deliverable = {
  title: string;
  body: string;
};

export type DeliverablesOrbitProps = {
  id?: string;
  className?: string;
  heading?: string;
  subhead?: string;
  items: Deliverable[]; // 3–6
  /** Optional short label shown inside the center badge. Defaults to "Deliverables". */
  centerLabel?: string;
  /** Rotate the layout; -90 starts at top. Use to avoid overlapping the heading. */
  startAngleDeg?: number;
  /** Extra outward offsets per quadrant (px). */
  quadrantOffsets?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Ring appearance: 'solid' or 'dashed' */
  ringStyle?: 'solid' | 'dashed';
};

const DEFAULT_HEADING = 'What we deliver';

/**
 * Orbit-style layout for 3–6 deliverables.
 * - Desktop: items are distributed around a circular orbit with a subtle glow and motion.
 * - Mobile/Tablet: items fall back to a clean two-column/grid list.
 * This aims to feel distinct from our existing card grids.
 */
export default function DeliverablesOrbit({ id, className, heading = DEFAULT_HEADING, subhead, items, centerLabel = 'Deliverables', startAngleDeg = -75, quadrantOffsets, ringStyle = 'dashed' }: DeliverablesOrbitProps) {
  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 10;

  const safe = Array.isArray(items) ? items.slice(0, 6) : [];

  // Geometry for orbit layout
  const count = Math.max(3, Math.min(6, safe.length || 3));
  const radiusOuter =
    count === 3 ? 208 :
    count === 4 ? 226 :
    count === 5 ? 252 : 258; // px, slightly larger for 5
  const minCardGapToRing = 24; // px space between ring and nearest card edge
  const centerSize = 132; // diameter of the center badge
  const containerSize = radiusOuter * 2 + 100; // square container for the orbit
  const ringRadius = radiusOuter - minCardGapToRing; // keep ring safely inside

  return (
    <m.section
      id={id}
      className={`relative isolate ${className ?? ''}`}
      initial={{ opacity: 0, y: enterY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-gi-green/30 opacity-[0.12] blur-[140px]" />
        <div className="absolute left-[25%] top-[20%] h-[280px] w-[280px] rounded-full bg-gi-pink/30 opacity-[0.10] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gi-text tracking-tight text-balance">{heading}</h2>
        {subhead && (
          <p className="mx-auto mt-4 max-w-3xl text-center text-gi-gray text-balance">{subhead}</p>
        )}

        {/* Mobile / small screens: grid list */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:hidden" role="list">
          {safe.map(({ title, body }) => (
            <div key={title} className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi" role="listitem">
              <h3 className="text-base font-semibold text-gi-text">{title}</h3>
              <p className="mt-2 text-sm text-gi-gray">{body}</p>
            </div>
          ))}
        </div>

        {/* Desktop orbit */}
        <div className="relative mx-auto hidden md:block mt-6" style={{ width: containerSize, height: containerSize }} role="list">
          {/* Orbit ring */}
          <div
            aria-hidden
            className={`absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full ${ringStyle === 'dashed' ? 'border border-dashed border-gi-fog/60' : 'border border-gi-fog/70'}`}
            style={{ width: ringRadius * 2, height: ringRadius * 2 }}
          />

          {/* Center badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center justify-center rounded-full bg-white text-gi-text shadow-gi ring-1 ring-gi-fog" style={{ width: centerSize, height: centerSize }}>
              <div className="text-center">
                <div className="text-xs uppercase tracking-wide text-gi-gray">Focus:</div>
                <div className="mt-1 text-base font-semibold">{centerLabel}</div>
              </div>
            </div>
          </div>

          {/* Items around the orbit */}
          {safe.map((it, idx) => {
            const n = safe.length;
            // Distribute around full circle, starting from configurable angle
            const angleDeg = (idx / n) * 360 + startAngleDeg;
            const angle = (angleDeg * Math.PI) / 180;
            const x = Math.cos(angle) * radiusOuter;
            const y = Math.sin(angle) * radiusOuter;

            // Offset cards slightly away from the orbit so they do not collide with the ring
            const baseAway = 40; // px additional away from center along radial direction
            const qo = quadrantOffsets || { top: 12, right: 6, bottom: 16, left: 6 };
            const qExtra = Math.abs(Math.sin(angle)) > Math.abs(Math.cos(angle))
              ? (Math.sin(angle) < 0 ? (qo.top ?? 0) : (qo.bottom ?? 0))
              : (Math.cos(angle) < 0 ? (qo.left ?? 0) : (qo.right ?? 0));
            const away = baseAway + qExtra;
            const cardX = Math.cos(angle) * away;
            const cardY = Math.sin(angle) * away;

            // Card alignment by quadrant
            const isLeft = Math.cos(angle) < 0;
            const isTop = Math.sin(angle) < 0;

            const align = `${isLeft ? 'items-end text-right' : 'items-start text-left'}`;

            return (
              <m.div
                key={it.title}
                className={`absolute flex max-w-[260px] ${align}`}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.22, ease: 'easeOut', delay: idx * 0.04 }}
                style={{
                  left: `calc(50% + ${x + cardX}px)`,
                  top: `calc(50% + ${y + cardY}px)`,
                  // Anchor the orbit point to the outer edge of the element so it never overlaps the center
                  transform: `translate(${isLeft ? '-100%' : '0%'}, -50%)`,
                }}
              >
                {/* Connector dot */}
                <div className={`relative ${isLeft ? 'order-2 ml-3' : 'order-1 mr-3'}`}>
                  <div className="h-3 w-3 rounded-full bg-gi-green ring-2 ring-white shadow" />
                  {/* radial connector line */}
                  <div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 -z-10 origin-left"
                    style={{
                      width: 18,
                      height: 1,
                      backgroundColor: 'rgba(0,0,0,0.08)',
                      transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`,
                    }}
                  />
                </div>

                {/* Card */}
                <div className={`order-${isLeft ? '1' : '2'} rounded-xl bg-white p-4 shadow-gi ring-1 ring-gi-fog/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gi-green`} style={{ width: 260 }} role="listitem" tabIndex={0}>
                  <h3 className="text-[0.95rem] font-semibold text-gi-text">{it.title}</h3>
                  <p className="mt-1 text-sm text-gi-gray">{it.body}</p>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </m.section>
  );
}


