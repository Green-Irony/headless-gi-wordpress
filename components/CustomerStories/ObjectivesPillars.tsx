import React, { useEffect, useRef, useState } from 'react';
import { motion as m, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export type ObjectivesItem = {
  title: string;
  body?: string;
  iconNode?: React.ReactNode;
  iconSrc?: string;
  iconAlt?: string;
};

export type ObjectivesPillarsProps = {
  title?: string; // heading
  body?: string; // subhead
  bullets?: string[]; // quick mapping to items (title-only)
  items?: ObjectivesItem[]; // richer items if provided
  className?: string;
};

export default function ObjectivesPillars({ title = 'Objectives', body, bullets, items, className }: ObjectivesPillarsProps) {

  const hasBody = typeof body === 'string' && body.trim().length > 0;
  const computedItems: ObjectivesItem[] = Array.isArray(items) && items.length > 0
    ? items
    : (Array.isArray(bullets) ? bullets.filter((b) => typeof b === 'string' && b.trim().length > 0).map((b) => ({ title: 'Objective', body: b })) : []);
  const hasItems = computedItems.length > 0;

  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 8;
  const listRef = useRef<HTMLDivElement | null>(null);
  const [cardMinHeight, setCardMinHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const measure = () => {
      const cards = Array.from(container.querySelectorAll<HTMLElement>('.obj-card'));
      if (cards.length === 0) return;
      cards.forEach((c) => (c.style.minHeight = ''));
      const max = Math.max(...cards.map((c) => c.getBoundingClientRect().height));
      setCardMinHeight(Math.ceil(max));
    };
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(container);
    container.querySelectorAll('.obj-card').forEach((el) => ro.observe(el));
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, [computedItems.length]);

  if (!hasBody && !hasItems) return null;

  return (
    <m.section
      className={`relative isolate mb-24 ${className ?? ''}`}
      initial={{ opacity: 0, y: enterY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      {/* Decorative background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-gi-green opacity-[0.14] blur-[140px]" />
        <div className="absolute left-[20%] top-[20%] h-[280px] w-[280px] rounded-full bg-gi-pink/20 opacity-[0.14] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />
        {title ? (
          <h2 className="text-center text-3xl md:text-4xl font-semibold text-gi-text tracking-tight text-balance">{title}</h2>
        ) : null}
        {hasBody ? (
          <p className="mx-auto mt-4 max-w-3xl text-center text-gi-gray text-balance">{body}</p>
        ) : null}

        {hasItems ? (
          <m.ul
            ref={listRef as any}
            className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3 items-stretch"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {computedItems.map(({ title: t, body: b, iconNode, iconSrc, iconAlt }, i) => (
              <m.li
                key={`${t}-${i}`}
                className="relative overflow-visible h-full"
                variants={{ hidden: { opacity: 0, y: enterY }, show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } } }}
              >
                <div className="flex h-full flex-col items-center text-center px-4">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white ring-2 ring-gi-pink/70">
                    {iconSrc ? (
                      <Image src={iconSrc} alt={iconAlt ?? ''} width={28} height={28} className="h-7 w-7 object-contain" />
                    ) : iconNode && React.isValidElement(iconNode) ? (
                      <span className="text-gi-pink">
                        {React.cloneElement(iconNode as any, { className: 'h-7 w-7 text-gi-pink' })}
                      </span>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#C40084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gi-text">{t}</h3>
                  {b ? <p className="mt-2 max-w-xs text-sm md:text-base text-gi-gray">{b}</p> : null}
                </div>
              </m.li>
            ))}
          </m.ul>
        ) : null}
      </div>
    </m.section>
  );
}


