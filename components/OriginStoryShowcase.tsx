import Image from 'next/image';
import React, { useMemo, useState } from 'react';

export type OriginMilestone = {
  k: string; // e.g., '2016', '2025', 'Now'
  label: string; // Roots, Pivot, Today
  title: string;
  body: string;
  impacts?: string[];
};

export default function OriginStoryShowcase({
  title,
  lead,
  milestones,
  poster,
  credibility,
  showCredibilityRow = false,
  initialMilestone,
  imageLeft = false,
  className,
  showTopAccent = true,
}: {
  title: string;
  lead: string;
  milestones: OriginMilestone[];
  poster: { imageSrc?: string; imageAlt?: string; badge?: string };
  credibility?: Array<{ src: string; alt: string }>;
  showCredibilityRow?: boolean;
  initialMilestone?: string;
  imageLeft?: boolean;
  className?: string;
  showTopAccent?: boolean;
}) {
  const items = useMemo(() => (Array.isArray(milestones) ? milestones : []), [milestones]);
  const initialIdx = Math.max(
    0,
    Math.min(
      items.length - 1,
      Math.max(0, items.findIndex((m) => (initialMilestone ? m.k === initialMilestone : m.k.toLowerCase() === 'now')))
    )
  );
  const [activeIdx, setActiveIdx] = useState<number>(initialIdx >= 0 ? initialIdx : 0);

  function onSelect(idx: number) {
    setActiveIdx(idx);
  }

  const MilestoneList = (
    <div className="w-full">
      {showTopAccent ? <div className="mb-6 h-px w-16 bg-gi-line" /> : null}
      <h2 className="text-2xl font-semibold text-gi-text">{title}</h2>
      <p className="mt-3 max-w-3xl text-gi-gray">{lead}</p>

      <div className="mt-6 grid grid-cols-[12px_1fr] gap-x-4">
        {/* Rail */}
        <div className="relative">
          <div className="absolute left-[5px] top-2 bottom-2 w-[2px] bg-gi-fog" aria-hidden="true" />
        </div>

        {/* Items */}
        <div role="radiogroup" aria-label="Origin milestones" className="flex flex-col gap-3">
          {items.map((m, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div key={m.k} className="relative">
                {/* Rail node */}
                <div className="absolute -left-4 top-3 h-2 w-2 rounded-full bg-gi-green ring-2 ring-white" aria-hidden="true" />

                <button
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => onSelect(idx)}
                  className={`w-full rounded-xl border text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gi-green ${
                    isActive ? 'border-gi-green/50 bg-gi-green/5' : 'border-gi-fog bg-white hover:bg-gi-fog/40'
                  }`}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-3 p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-gi-green/15 px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">
                          {m.k} · {m.label}
                        </span>
                        {isActive ? (
                          <span className="text-xs text-gi-gray">Selected</span>
                        ) : null}
                      </div>
                      <h3 className="mt-2 text-base font-semibold text-gi-text sm:text-lg">{m.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-gi-gray sm:text-base">{m.body}</p>
                      <div className={`mt-2 flex flex-wrap gap-2 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                        {(m.impacts || []).map((im) => (
                          <span key={im} className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs text-gi-text ring-1 ring-gi-fog">
                            {im}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const Poster = (
    <div className="hidden w-full lg:block">
      <div className="relative mx-auto max-w-xl">
        {/* Layered cards */}
        <div className="pointer-events-none absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-2xl bg-white ring-1 ring-gi-fog" />
        <div className="pointer-events-none absolute inset-0 -z-20 translate-x-6 translate-y-6 rounded-2xl bg-white ring-1 ring-gi-fog" />

        <div className="group relative rounded-2xl bg-white ring-1 ring-gi-fog transition-transform [transform-style:preserve-3d] hover:-rotate-1 hover:scale-[1.01]">
          {poster?.badge ? (
            <span className="absolute right-3 top-3 z-10 inline-flex items-center rounded-full bg-gi-green/15 px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">
              {poster.badge}
            </span>
          ) : null}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            {poster?.imageSrc ? (
              <Image src={poster.imageSrc} alt={poster.imageAlt || ''} fill className="object-cover" sizes="(min-width: 1024px) 40rem, 100vw" />
            ) : (
              <div className="flex h-full items-center justify-center bg-gi-fog/40 text-sm text-gi-gray">Poster</div>
            )}
          </div>
        </div>
      </div>

      {showCredibilityRow && (credibility || [])?.length > 0 ? (
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {(credibility || []).map((c) => (
            <span key={c.src} className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs text-gi-gray ring-1 ring-gi-fog">
              <Image src={c.src} alt={c.alt} width={80} height={20} />
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={['mx-auto max-w-7xl px-6', className].filter(Boolean).join(' ')}>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        {imageLeft ? (
          <>
            {Poster}
            {MilestoneList}
          </>
        ) : (
          <>
            {MilestoneList}
            {Poster}
          </>
        )}
      </div>
    </div>
  );
}


