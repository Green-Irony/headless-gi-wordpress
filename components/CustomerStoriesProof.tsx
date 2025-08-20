'use client';
import { useState } from 'react';
import { motion as m, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export type StoryItem = {
  brand: string;
  title: string;
  blurb: string;
  kpis: string[];
  posterUrl: string;
  videoId: string;
};
export type CustomerStoriesProps = {
  id?: string;
  className?: string;
  heading?: string;
  items?: StoryItem[];
  cta?: { label: string; href: string };
};

const DEFAULT_HEADING = 'Proof that scales';
const DEFAULT_ITEMS: StoryItem[] = [
  { brand: 'Spirit Airlines', title: 'Event-driven integration powering operational agentic workflows', blurb: 'How event-driven MuleSoft work enabled real-time ops and agent actions.', kpis: ['⚡ Delivery cycle time ↓ 50%', '⬇️ Deflection rate up', '🧠 Capacity freed'], posterUrl: '/logos/spirit.svg', videoId: 'SPIRIT_VIDEO_ID' },
  { brand: 'UNC Charlotte', title: '24/7 deflection and capacity reallocated to strategic advising', blurb: 'Persistent agents improve student engagement and reduce live load.', kpis: ['⬇️ Deflection rate up', '⚡ Faster time-to-value', '🧠 Capacity freed'], posterUrl: '/logos/unc-charlotte.svg', videoId: 'UNC_VIDEO_ID' },
];
const DEFAULT_CTA = { label: 'Start Your Success Plan', href: '/contact' };

export default function CustomerStoriesProof({ id, className, heading = DEFAULT_HEADING, items = DEFAULT_ITEMS, cta = DEFAULT_CTA }: CustomerStoriesProps) {
  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 8;
  const [openId, setOpenId] = useState<string | null>(null);

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
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 h-[560px] w-[560px] rounded-full bg-gi-green opacity-[0.12] blur-[140px]" />
        <div className="absolute right-[12%] top-[24%] h-[260px] w-[260px] rounded-full bg-gi-pink/20 opacity-[0.12] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />

        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gi-text tracking-tight text-balance">
          {heading}
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-center text-gi-gray text-balance">
          Case stories built around outcomes, not features. Watch how event-driven MuleSoft work powered real-time operations and enabled persistent agents that deflect demand and free capacity.
        </p>

        <m.ul
          className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {items.map((it) => (
            <m.li
              key={it.brand}
              className="relative overflow-visible"
              variants={{
                hidden: { opacity: 0, y: enterY },
                show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
              }}
            >
              <div className="group rounded-2xl bg-gradient-to-r from-gi-green/35 via-gi-pink/20 to-gi-green/35 p-[1px]">
                <div className="rounded-[16px] bg-white p-5 shadow-gi">
                  <button
                    onClick={() => setOpenId(it.videoId)}
                    className="relative block w-full overflow-hidden rounded-xl ring-1 ring-gi-fog focus:outline-none focus-visible:ring-2 focus-visible:ring-gi-green aspect-video flex items-center justify-center bg-white"
                    aria-label={`Play video: ${it.brand}`}
                  >
                    <Image
                      width={192}
                      height={112}
                      src={it.posterUrl}
                      alt={`${it.brand} video poster`}
                      className="h-auto w-auto max-h-[60%] max-w-[70%] object-contain"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent" />
                    <div className="absolute left-4 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-medium text-gi-text ring-1 ring-gi-fog backdrop-blur">
                      {it.brand}
                    </div>
                    <div className="absolute left-4 bottom-3 flex flex-wrap gap-2">
                      {it.kpis.slice(0, 2).map((k) => (
                        <span key={k} className="rounded-full bg-white/85 px-2 py-0.5 text-xs font-medium text-gi-text ring-1 ring-gi-fog backdrop-blur">
                          {k}
                        </span>
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 ring-1 ring-gi-fog backdrop-blur transition group-hover:scale-[1.04]">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M10 8l6 4-6 4z" fill="currentColor" stroke="none" />
                        </svg>
                      </span>
                    </div>
                  </button>

                  <div className="mt-4">
                    <div className="text-base font-semibold text-gi-text">{it.title}</div>
                    <p className="mt-1 text-sm text-gi-gray">{it.blurb}</p>
                    <div className="mt-4">
                      <a className="btn-secondary" href={cta.href}>{cta.label}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute left-3 right-3 -bottom-3 h-6 rounded-b-[18px]
                           bg-gradient-to-r from-gi-green/30 via-gi-pink/20 to-gi-green/30 blur-[10px] opacity-80 md:opacity-90
                           [mask-image:linear-gradient(to_bottom,transparent,black_40%)]"
              />
            </m.li>
          ))}
        </m.ul>

        <div className="mt-10 flex justify-center">
          <a className="btn-primary" href={cta.href}>{cta.label}</a>
        </div>
      </div>

      {openId && (
        <VideoLightbox videoId={openId} onClose={() => setOpenId(null)} />
      )}
    </m.section>
  );
}

function VideoLightbox({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-10 right-0 rounded-md bg-white/90 px-3 py-1 text-sm font-medium text-gi-text ring-1 ring-gi-fog backdrop-blur hover:bg-white"
        >
          Close
        </button>
        <div className="aspect-video overflow-hidden rounded-xl ring-1 ring-gi-fog shadow-gi">
          <iframe
            src={src}
            title="Customer story video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
} 