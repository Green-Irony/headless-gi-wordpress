'use client';
import { motion as m, useReducedMotion, type Variants } from 'framer-motion';
import React from 'react';

type CloudItem = {
  name: string;
  logoSrc: string;
  alt: string;
  logoClass?: string;
};

const CLOUDS: CloudItem[] = [
  { name: 'MuleSoft', logoSrc: '/logos/salesforce/icons/icon-mulesoft.svg', alt: 'MuleSoft' },
  { name: 'Agentforce', logoSrc: '/logos/salesforce/icons/icon-agentforce.svg', alt: 'Agentforce' },
  { name: 'Data Cloud', logoSrc: '/logos/salesforce/icons/icon-data-cloud.svg', alt: 'Data Cloud', logoClass: 'scale-110 md:scale-125 origin-center' },
  { name: 'Sales Cloud', logoSrc: '/logos/salesforce/icons/icon-sales.svg', alt: 'Sales Cloud' },
  { name: 'Service Cloud', logoSrc: '/logos/salesforce/icons/icon-service.svg', alt: 'Service Cloud' },
  { name: 'CPQ & Revenue Cloud', logoSrc: '/logos/salesforce/icons/icon-cpq.png', alt: 'Revenue Cloud' }, // placeholder
  { name: 'Experience Cloud', logoSrc: '/logos/salesforce/icons/icon-exp.webp', alt: 'Experience Cloud' },
];

export default function PlatformExpertise({ id, className }: { id?: string; className?: string }) {
  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 10;
  const listVariants: Variants = {
    hidden: {},
    show: prefersReduced ? {} : { transition: { staggerChildren: 0.2 } },
  };
  const itemVariants: Variants = prefersReduced
    ? { hidden: { opacity: 1, y: 0, scale: 1 }, show: { opacity: 1, y: 0, scale: 1 } }
    : {
        hidden: { opacity: 0, y: 12, scale: 0.96 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: 'spring' as const, stiffness: 720, damping: 18, mass: 0.7 },
        },
      };

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

      <div className="w-full px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gi-text tracking-tight">Platform Expertise</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gi-gray">
          Salesforce clouds and ecosystem products we deliver with AI‑first execution.
        </p>

        <m.ul
          className="mx-auto mt-12 flex w-full flex-wrap justify-center gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={listVariants}
        >
          {CLOUDS.map((cloud, idx) => (
            <m.li
              key={cloud.name}
              className="relative w-[180px] overflow-visible"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white ring-1 ring-gi-fog shadow-gi">
                  <m.img
                    src={cloud.logoSrc}
                    alt={cloud.alt}
                    className={`h-10 w-auto md:h-12 ${cloud.logoClass ?? ''}`}
                    initial={false}
                    animate={prefersReduced ? {} : { y: [0, -6, 0, 6, 0] }}
                    transition={{ duration: 6 + (idx % 3), repeat: Infinity, ease: 'easeInOut' }}
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 text-center text-sm font-medium text-gi-text">{cloud.name}</div>
              </div>
            </m.li>
          ))}
        </m.ul>
      </div>
    </m.section>
  );
}


