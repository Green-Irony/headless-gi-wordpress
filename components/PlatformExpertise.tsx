'use client';
import { motion as m, useReducedMotion } from 'framer-motion';
import React from 'react';

type CloudItem = {
  name: string;
  logoSrc: string;
  alt: string;
  logoClass?: string;
};

const CLOUDS: CloudItem[] = [
  { name: 'Sales Cloud', logoSrc: '/logos/salesforce/sales-cloud.png', alt: 'Sales Cloud' },
  { name: 'Service Cloud', logoSrc: '/logos/salesforce/service-cloud.png', alt: 'Service Cloud' },
  { name: 'Agentforce', logoSrc: '/icons/agent_astro.svg', alt: 'Agentforce' },
  { name: 'MuleSoft', logoSrc: '/icons/mulesoft.svg', alt: 'MuleSoft' },
  { name: 'Experience Cloud', logoSrc: '/logos/salesforce/experience-cloud.webp', alt: 'Experience Cloud' },
  { name: 'Revenue Cloud', logoSrc: '/logos/salesforce/sales-cloud.png', alt: 'Revenue Cloud' }, // placeholder
  { name: 'Data Cloud', logoSrc: '/icons/data_cloud.svg', alt: 'Data Cloud', logoClass: 'scale-110 md:scale-125 origin-center' },
];

export default function PlatformExpertise({ id, className }: { id?: string; className?: string }) {
  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 10;

  return (
    <m.section
      id={id}
      className={`relative isolate overflow-hidden ${className ?? ''}`}
      initial={{ opacity: 0, y: enterY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      {/* Blue gradient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E8F1FF] via-[#F3F7FF] to-white" />
        <div className="absolute left-[10%] top-[20%] h-[360px] w-[360px] rounded-full bg-blue-300/30 blur-[120px]" />
        <div className="absolute right-[8%] bottom-[12%] h-[420px] w-[420px] rounded-full bg-sky-400/30 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gi-text tracking-tight">Platform Expertise</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gi-gray">
          Salesforce clouds and ecosystem products we deliver with AI‑first execution.
        </p>

        <m.ul
          className="mx-auto mt-12 max-w-5xl flex flex-wrap justify-center gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {CLOUDS.map((cloud, idx) => (
            <m.li
              key={cloud.name}
              className="relative overflow-visible basis-1/2 sm:basis-1/3 md:basis-1/4"
              variants={{ hidden: { opacity: 0, y: enterY }, show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } } }}
            >
              <div className="group rounded-2xl bg-white/70 ring-1 ring-gi-fog backdrop-blur shadow-gi p-4">
                <div className="flex flex-col items-center gap-3">
                  <m.img
                    src={cloud.logoSrc}
                    alt={cloud.alt}
                    className={`h-10 w-auto md:h-12 drop-shadow-sm ${cloud.logoClass ?? ''}`}
                    initial={false}
                    animate={prefersReduced ? {} : { y: [0, -6, 0, 6, 0] }}
                    transition={{ duration: 6 + (idx % 3), repeat: Infinity, ease: 'easeInOut' }}
                    loading="lazy"
                  />
                  <div className="text-center">
                    <div className="text-sm font-medium text-gi-text">{cloud.name}</div>
                  </div>
                </div>
              </div>
            </m.li>
          ))}
        </m.ul>
      </div>
    </m.section>
  );
}


