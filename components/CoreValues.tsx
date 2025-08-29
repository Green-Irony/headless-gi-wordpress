'use client';

import React from 'react';
import Image from 'next/image';

export type CoreValueItem = {
  title: string;
  body: string;
};

export type CoreValuesProps = {
  id?: string;
  className?: string;
  heading?: string;
  items: CoreValueItem[];
};

export default function CoreValues({ id, className, heading = 'Our Core Values', items }: CoreValuesProps) {
  const safeItems = Array.isArray(items) ? items.slice(0, 8) : [];
  const iconFor = (title: string): string => {
    const t = (title || '').toLowerCase();
    if (t.includes('ai')) return '/icons/robot.svg';
    if (t.includes('get it') || t.includes('done') || t.includes('ownership') || t.includes('clarity')) return '/icons/check.svg';
    if (t.includes('no bs') || t.includes('honesty') || t.includes('accountability') || t.includes('transparency') || t.includes('straight')) return '/icons/groups.svg';
    if (t.includes('decompress') || t.includes('recharge') || t.includes('burnout')) return '/icons/plane.svg';
    return '/icons/skill.svg';
  };
  return (
    <section id={id} className={`relative isolate ${className ?? ''}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-gi-green opacity-[0.14] blur-[140px]" />
        <div className="absolute left-[20%] top-[20%] h-[280px] w-[280px] rounded-full bg-gi-pink/20 opacity-[0.14] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gi-text tracking-tight text-balance">{heading}</h2>

        <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 items-stretch">
          {safeItems.map((it) => (
            <li key={it.title} className="relative overflow-visible h-full">
              <div className="flex h-full flex-col items-center text-center px-4">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white ring-2 ring-gi-pink/70">
                  <Image src={iconFor(it.title)} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gi-text">{it.title}</h3>
                <p className="mt-2 max-w-xs text-sm md:text-base text-gi-gray">{it.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


