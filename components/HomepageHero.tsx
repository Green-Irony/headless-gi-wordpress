'use client';

import { motion as m, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import TextCascadeDiagonal from './TextCascadeDiagonal';

export type HomepageHeroCta = { label: string; href: string };
export type HomepageHeroKpi = { label: string };
export type HomepageHeroMediaImage = { src: string; alt: string; width?: number; height?: number };

export type HomepageHeroProps = {
  id?: string;
  className?: string;
  titleLines?: string[]; // replaces title with cascading lines
  body?: string;
  primaryCta?: HomepageHeroCta;
  secondaryCta?: HomepageHeroCta;
  kpis?: HomepageHeroKpi[]; // Optional; if undefined use defaults, if [] hide
  showMedia?: boolean; // Optional; default true
  mediaImage?: HomepageHeroMediaImage; // Optional; overrides default diagram when provided
  showPrimaryCta?: boolean; // Optional; default true
  showSecondaryCta?: boolean; // Optional; default true
};

const DEFAULT_TITLE_LINES = [
  '2× Faster Delivery.',
  'Offshore Economics.',
  'Onshore Expertise.',
];
const DEFAULT_BODY = `Launch your first AI-powered MuleSoft or Salesforce outcome in 8 weeks. Our AI-accelerated delivery cuts timelines in half—without sacrificing quality or price—so your team achieves more, faster.`;
const DEFAULT_PRIMARY: HomepageHeroCta = { label: 'Talk to an Expert', href: '/contact' };
const DEFAULT_SECONDARY: HomepageHeroCta = { label: 'Get the 8-Week Agent Launch Plan', href: '/plan' };
const DEFAULT_KPIS: HomepageHeroKpi[] = [
  { label: '🤖 AI-assisted throughput up' },
  { label: '⚡ Delivery efficiency ↑ 50%' },
  { label: '🕒 More time for high-value work' },
];

export default function HomepageHero(props: HomepageHeroProps) {
  const {
    id,
    className,
    titleLines = DEFAULT_TITLE_LINES,
    body = DEFAULT_BODY,
    primaryCta = DEFAULT_PRIMARY,
    secondaryCta = DEFAULT_SECONDARY,
    kpis,
    showMedia = true,
    mediaImage,
    showPrimaryCta = true,
    showSecondaryCta = true,
  } = props;

  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 8;

  const kpisToRender: HomepageHeroKpi[] = kpis === undefined ? DEFAULT_KPIS : kpis;
  const shouldShowKpis = Array.isArray(kpisToRender) && kpisToRender.length > 0;
  const shouldShowAnyCta = (showPrimaryCta && primaryCta) || (showSecondaryCta && secondaryCta);

  return (
    <m.section
      id={id}
      className={`relative isolate ${className ?? ''}`}
      initial={{ opacity: 0, y: enterY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      {/* Glow layer */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute left-[8%] top-[-120px] h-[600px] w-[600px] rounded-full bg-gi-green opacity-[0.22] blur-[140px]
                     md:left-[10%] md:top-[-140px] md:opacity-[0.24]"/>
        <div className="absolute right-[-120px] bottom-[-160px] h-[520px] w-[520px] rounded-full bg-gi-green/20 blur-[140px]" />
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 py-28 text-center">
        <TextCascadeDiagonal inline texts={titleLines} as="h1" />

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gi-gray text-balance">
          {body}
        </p>

        {shouldShowAnyCta && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {showSecondaryCta && secondaryCta && (
              <a className="btn-secondary" href={secondaryCta.href}>{secondaryCta.label}</a>
            )}
            {showPrimaryCta && primaryCta && (
              <a className="btn-primary" href={primaryCta.href}>{primaryCta.label}</a>
            )}
          </div>
        )}

        {shouldShowKpis && (
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {kpisToRender.map((kpi, idx) => (
              <div className="kpi-chip" key={`${kpi.label}-${idx}`}><span className="kpi-bar" /><span className="kpi-val">{kpi.label}</span></div>
            ))}
          </div>
        )}

        {showMedia && (
          <div className="mt-12 flex justify-center">
            <div className="relative w-full max-w-[640px] rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
              {mediaImage ? (
                <Image
                  src={mediaImage.src}
                  alt={mediaImage.alt}
                  width={mediaImage.width ?? 960}
                  height={mediaImage.height ?? 540}
                  className="h-auto w-full rounded-md"
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </m.section>
  );
}


