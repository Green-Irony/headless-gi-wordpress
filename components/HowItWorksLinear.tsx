'use client';
import { motion as m, useReducedMotion } from 'framer-motion';

export type HowStep = { k: string; title: string; body: string };
export type HowItWorksProps = {
  id?: string;
  className?: string;
  heading?: string;
  subhead?: string;
  steps?: HowStep[];
  cta?: { label: string; href: string };
  leadInBeforeButton?: string;
};

const DEFAULT_HEADING = 'A lean path to your first AI outcome';
const DEFAULT_STEPS: HowStep[] = [
  { k: '01', title: 'Align', body: 'Pick the high-impact workflow and define KPIs—deflection, cycle time, and capacity freed.' },
  { k: '02', title: 'Launch', body: 'AI-infused MuleSoft delivery and agent build; first working agent in ~8 weeks.' },
  { k: '03', title: 'Measure', body: 'Scorecard tracks deflection lift, cycle time reduction, and capacity freed across teams.' },
  { k: '04', title: 'Scale', body: 'Expand to new workflows, add safe actions, and deepen automation with confidence.' },
];
const DEFAULT_CTA = { label: 'Get the 8-Week Agent Launch Plan', href: '/plan' };

export default function HowItWorksLinear({ id, className, heading = DEFAULT_HEADING, subhead, steps = DEFAULT_STEPS, cta = DEFAULT_CTA, leadInBeforeButton }: HowItWorksProps) {
  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 10;

  const count = Math.max(1, Math.min(4, steps.length));
  const gridCols = count === 1 ? 'grid-cols-1' : count === 2 ? 'grid-cols-2' : count === 3 ? 'grid-cols-3' : 'grid-cols-4';

  return (
    <m.section
      id={id}
      className={`relative isolate bg-white ${className ?? ''}`}
      initial={{ opacity: 0, y: enterY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[38%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gi-green opacity-[0.14] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />

        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gi-text tracking-tight text-balance">
          {heading}
        </h2>

        {subhead && (
          <p className="mx-auto mt-4 max-w-3xl text-center text-gi-gray text-balance">
            {subhead}
          </p>
        )}

        <div className="relative mt-12 hidden md:block">
          <div aria-hidden className="absolute left-0 right-0 top-[50px] h-[2px] bg-gradient-to-r from-gi-green/70 via-gi-pink/50 to-gi-green/70" />
          <div aria-hidden className="absolute inset-x-0 top-[42px] h-16">
            {steps.slice(0, count).map((_, idx) => {
              const left = ((idx + 0.5) * 100) / count;
              return (
                <div key={idx} className="absolute h-16 w-16 -translate-x-1/2 rounded-full bg-gi-green/15 blur-[18px]" style={{ left: `${left}%` }} />
              );
            })}
          </div>

          <div className={`grid ${gridCols} gap-6`}>
            {steps.slice(0, count).map((s, idx) => (
              <m.div
                key={s.k}
                className="relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: enterY }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.22, ease: 'easeOut', delay: idx * 0.03 }}
              >
                <div className="relative z-10">
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-gi-fog shadow-gi">
                    <span className="h-5 w-5" />
                  </div>
                  <div className="mt-2 text-xs font-medium text-gi-gray">{s.k}</div>
                </div>

                <div className="mt-4 w-full max-w-[260px]">
                  <div className="rounded-2xl bg-gradient-to-r from-gi-green/35 via-gi-pink/20 to-gi-green/35 p-[1px]">
                    <div className="rounded-[16px] bg-white p-4 shadow-gi transition-transform duration-200 hover:-translate-y-0.5">
                      <div className="text-sm font-semibold text-gi-text">{s.title}</div>
                      <p className="mt-1.5 text-sm text-gi-gray">{s.body}</p>
                    </div>
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none mx-auto -mt-2 h-5 w-4/5 rounded-b-[14px] bg-gradient-to-r from-gi-green/30 via-gi-pink/20 to-gi-green/30 blur-[8px] opacity-90"
                  />
                </div>
              </m.div>
            ))}
          </div>
        </div>

        <div className="relative mt-10 md:hidden">
          <ol className="relative space-y-6">
            <div
              aria-hidden
              className="absolute left-[26px] top-5 bottom-5 w-px bg-gradient-to-b from-gi-green/60 via-gi-pink/40 to-gi-green/60 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
            />
            {steps.slice(0, count).map((s) => (
              <li key={s.k} className="relative pl-16">
                <div className="absolute left-0 top-1">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-gi-fog shadow-gi">
                    <span className="h-5 w-5" />
                  </div>
                </div>
                <div className="rounded-2xl bg-gradient-to-r from-gi-green/35 via-gi-pink/20 to-gi-green/35 p-[1px]">
                  <div className="rounded-[16px] bg-white p-4 shadow-gi">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-gi-green/10 px-2 py-0.5 text-xs font-medium text-gi-text ring-1 ring-gi-fog">
                        {s.k}
                      </span>
                      <h3 className="text-sm font-semibold text-gi-text">{s.title}</h3>
                    </div>
                    <p className="mt-1.5 text-sm text-gi-gray">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {leadInBeforeButton && (
          <p className="mt-8 text-center text-sm text-gi-gray max-w-3xl mx-auto px-6">{leadInBeforeButton}</p>
        )}
        <div className="mt-10 flex justify-center">
          <a className="btn-primary" href={cta.href}>
            {cta.label}
          </a>
        </div>
      </div>
    </m.section>
  );
}

function UnderlineGreen() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[8px] w-full"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="hiwBlur" x="-5%" y="-150%" width="110%" height="400%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
        <linearGradient id="hiwGreen" x1="0" x2="1">
          <stop offset="0" stopColor="#5AAD5A" stopOpacity="0.9" />
          <stop offset="1" stopColor="#5AAD5A" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M0 5 C 10 1, 20 7, 30 5 S 50 1, 60 5 80 7, 100 5"
        stroke="url(#hiwGreen)"
        strokeWidth="1.8"
        fill="none"
        filter="url(#hiwBlur)"
      />
    </svg>
  );
}

function IconAlign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="#141415" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="6" height="6" rx="1.5" />
      <rect x="14" y="12" width="6" height="6" rx="1.5" />
      <path d="M10 9h2a4 4 0 0 1 4 4v1" />
    </svg>
  );
}
function IconLaunch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="#141415" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l5 5-9 9H3v-5l9-9z" />
      <path d="M15 6l3 3" />
    </svg>
  );
}
function IconMeasure(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="#141415" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18V6" />
      <path d="M8 18v-6" />
      <path d="M12 18v-10" />
      <path d="M16 18v-3" />
      <path d="M20 18v-12" />
    </svg>
  );
}
function IconScale(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="#141415" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M6 17l6-11 6 11" />
      <path d="M6 17h12" />
    </svg>
  );
} 