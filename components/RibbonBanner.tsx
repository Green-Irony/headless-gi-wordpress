'use client';

import React from 'react';

export default function RibbonBanner({ title }: { title: string }) {
  return (
    <section className="relative isolate mt-16">
      {/* Full-width ribbon background */}
      <div className="w-full bg-gradient-to-r from-gi-green/20 via-gi-pink/15 to-gi-green/20 border-y border-gi-line py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl md:text-5xl font-semibold tracking-wider uppercase text-gi-text">
            {title}
          </h2>
        </div>
      </div>

      {/* Soft glow accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-80px] top-1/2 -translate-y-1/2 h-[280px] w-[280px] rounded-full bg-gi-green/25 blur-[100px]" />
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 h-[280px] w-[280px] rounded-full bg-gi-pink/25 blur-[100px]" />
      </div>
    </section>
  );
}


