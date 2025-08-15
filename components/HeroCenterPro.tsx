'use client';
import { motion as m, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export type HeroCta = { label: string; href: string };
export type HeroKpi = { label: string };
export type HeroMediaImage = { src: string; alt: string; width?: number; height?: number };
export type HeroCenterProProps = {
  id?: string;
  className?: string;
  title?: string;
  body?: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  kpis?: HeroKpi[]; // Optional; if undefined use defaults, if [] hide
  showMedia?: boolean; // Optional; default true
  mediaImage?: HeroMediaImage; // Optional; overrides default diagram when provided
  showPrimaryCta?: boolean; // Optional; default true
  showSecondaryCta?: boolean; // Optional; default true
};

const DEFAULT_TITLE = `Do more with the team you have.`;
const DEFAULT_BODY = `Launch AI agents that cut busywork, deflect routine demand, and free capacity—delivering measurable impact in eight weeks. Our AI-infused MuleSoft delivery halves cycle time while expanding what your people can actually get done.`;
const DEFAULT_PRIMARY: HeroCta = { label: 'Talk to an Expert', href: '#contact' };
const DEFAULT_SECONDARY: HeroCta = { label: 'Get the 8-Week Agent Launch Plan', href: '#plan' };
const DEFAULT_KPIS: HeroKpi[] = [
  { label: '🤖 AI-assisted throughput up' },
  { label: '⚡ Delivery efficiency ↑ 50%' },
  { label: '🕒 More time for high-value work' },
];

export default function HeroCenterPro(props: HeroCenterProProps) {
  const {
    id,
    className,
    title = DEFAULT_TITLE,
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

  // If kpis is undefined, use defaults. If it's an empty array, render none.
  const kpisToRender: HeroKpi[] = kpis === undefined ? DEFAULT_KPIS : kpis;
  const shouldShowKpis = Array.isArray(kpisToRender) && kpisToRender.length > 0;

  const shouldShowAnyCta = (showPrimaryCta && primaryCta) || (showSecondaryCta && secondaryCta);

  return (
    <m.section
      id={id}
      className={`relative isolate bg-white ${className ?? ''}`}
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
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] text-gi-text tracking-tight text-balance">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gi-gray text-balance">
          {body}
        </p>

        {shouldShowAnyCta && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {showPrimaryCta && primaryCta && (
              <a className="btn-primary" href={primaryCta.href}>{primaryCta.label}</a>
            )}
            {showSecondaryCta && secondaryCta && (
              <a className="btn-secondary" href={secondaryCta.href}>{secondaryCta.label}</a>
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
              ) : (
                <HeroDiagram />
              )}
            </div>
          </div>
        )}
      </div>
    </m.section>
  );
}

function SquiggleUnderlinePink() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[8px] w-full"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="giBlurHero" x="-5%" y="-150%" width="110%" height="400%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
        <linearGradient id="giPinkHero" x1="0" x2="1">
          <stop offset="0" stopColor="#C40084" stopOpacity="0.9" />
          <stop offset="1" stopColor="#C40084" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M0 5 C 10 1, 20 7, 30 5 S 50 1, 60 5 80 7, 100 5"
        stroke="url(#giPinkHero)"
        strokeWidth="1.8"
        fill="none"
        filter="url(#giBlurHero)"
      />
    </svg>
  );
}

function HeroDiagram() {
  return (
    <svg
      viewBox="0 0 640 360"
      width="100%"
      height="100%"
      fill="none"
      stroke="#141415"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Integration + agent flow"
    >
      <defs>
        <linearGradient id="giSweep" x1="0" x2="1">
          <stop offset="0" stopColor="#5AAD5A" stopOpacity="0" />
          <stop offset="1" stopColor="#5AAD5A" stopOpacity=".35" />
        </linearGradient>
      </defs>
      <rect x="24" y="24" width="592" height="312" rx="20" stroke="#E6E6EA" />
      <g transform="translate(72,84)">
        <path d="M0 24c0 6.6 14.3 12 32 12s32-5.4 32-12V0C64 6.6 49.7 12 32 12S0 6.6 0 0v24z" />
        <path d="M0 12c0 6.6 14.3 12 32 12s32-5.4 32-12" />
      </g>
      <g transform="translate(72,160)">
        <path d="M34 8a26 26 0 1 0 26 26" />
        <path d="M60 34c0-14.4-11.6-26-26-26" />
      </g>
      <rect x="72" y="244" width="64" height="52" rx="8" />
      <g transform="translate(300,150)">
        <circle cx="30" cy="30" r="30" stroke="#5AAD5A"/>
        <path d="M30 18l10 16H20l10-16z" fill="#5AAD5A" stroke="none"/>
        <circle cx="30" cy="18" r="3" fill="#5AAD5A"/>
      </g>
      <g transform="translate(492,132)">
        <circle cx="30" cy="20" r="12" />
        <path d="M6 70c4-18 16-28 34-28 18 0 30 10 34 28" />
        <path d="M20 20c0 12 0 18 6 26" />
      </g>
      <g>
        <path d="M168 104h110" /><path d="M168 180h110" /><path d="M168 264h110" />
        <path d="M358 104h110" /><path d="M358 180h110" />
        <path d="M278 104l-8-6v12z" fill="#141415" />
        <path d="M278 180l-8-6v12z" fill="#141415" />
        <path d="M278 264l-8-6v12z" fill="#141415" />
        <path d="M468 104l-8-6v12z" fill="#141415" />
        <path d="M468 180l-8-6v12z" fill="#141415" />
      </g>
      <path d="M108 262 C 220 240, 292 220, 396 232" stroke="url(#giSweep)" strokeWidth="8"/>
    </svg>
  );
}