'use client';
import { motion as m, useReducedMotion } from 'framer-motion';
import LogoStripMono from './LogoStripMono';

export default function TrustStrip() {
  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 8;

  const captions = [
    { name: 'Spirit Airlines', blurb: 'Event-driven ops at scale' },
    { name: 'Higher-ed / Agentforce exemplar', blurb: '24/7 deflection and intelligence' },
    { name: 'Customer X', blurb: 'Capacity freed across support and operations' },
  ];

  return (
    <m.section
      className=""
      initial={{ opacity: 0, y: enterY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <div className="relative isolate mx-auto max-w-7xl overflow-visible px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />

        <h2 className="text-center text-3xl font-semibold tracking-tight text-gi-text md:text-4xl text-balance">
          Trusted by organizations that run on real-time outcomes
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-gi-gray text-balance">
          From Spirit Airlines’ event‑driven operations to higher ed’s 24/7 support and SMB growth wins, AI‑native integration delivers at scale.
        </p>

        <div className="relative mt-14 overflow-visible">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2
                       h-[440px] w-[440px] rounded-full bg-gi-pink opacity-[0.20] blur-[120px]
                       sm:h-[520px] sm:w-[520px] md:opacity-[0.22]"
          />
          <div className="relative z-10">
            <LogoStripMono />
          </div>
        </div>

        <m.ul
          className="mx-auto mt-8 grid max-w-5xl grid-cols-1 justify-items-center gap-3 text-center text-sm md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {captions.map((c) => (
            <m.li
              key={c.name}
              className="flex flex-col"
              variants={{
                hidden: { opacity: 0, y: enterY },
                show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
              }}
            >
              <span className="font-semibold text-gi-text">{c.name}</span>
              <span className="text-gi-gray">— {c.blurb}</span>
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
        <filter id="giBlurGreen" x="-5%" y="-150%" width="110%" height="400%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
        <linearGradient id="giGreen" x1="0" x2="1">
          <stop offset="0" stopColor="#5AAD5A" stopOpacity="0.9" />
          <stop offset="1" stopColor="#5AAD5A" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M0 5 C 10 1, 20 7, 30 5 S 50 1, 60 5 80 7, 100 5"
        stroke="url(#giGreen)"
        strokeWidth="1.8"
        fill="none"
        filter="url(#giBlurGreen)"
      />
    </svg>
  );
} 