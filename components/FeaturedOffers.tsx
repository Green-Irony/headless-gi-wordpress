'use client';
import Link from 'next/link';
import { motion as m, useReducedMotion } from 'framer-motion';

export type OfferItem = {
  title: string;
  body: string;
  cta?: { label: string; href: string };
  flag?: string;
  icon?: string;
};
export type FeaturedOffersProps = {
  id?: string;
  className?: string;
  heading?: string;
  items?: OfferItem[];
};

const DEFAULT_HEADING = 'Your first win starts here';
const DEFAULT_ITEMS: OfferItem[] = [
  { title: 'AI & Digital Labor (Agentforce)', body: 'Launch agents with jobs, safe actions, and measurable KPIs.', cta: { label: 'Scope My First Agent', href: '/contact' } },
  { title: 'MuleSoft Integration (AI-led)', body: 'Design the pipelines and events that let AI agents see, decide, and do.', cta: { label: 'Review My Integration Gaps', href: '/contact' }, flag: 'Flagship' },
  { title: 'Salesforce Optimization', body: 'Make Salesforce the control room for both humans and agents.', cta: { label: 'Optimize My Org', href: '/contact' } },
  { title: 'Data & Migrations', body: 'Build the trusted knowledge and real-time context your agents need.', cta: { label: 'Map My Data for AI', href: '/contact' } },
];

export default function FeaturedOffers({ id, className, heading = DEFAULT_HEADING, items = DEFAULT_ITEMS }: FeaturedOffersProps) {
  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 8;

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
        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-gi-pink opacity-[0.14] blur-[140px]" />
        <div className="absolute right-[15%] bottom-[8%] h-[260px] w-[260px] rounded-full bg-gi-green opacity-[0.12] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />

        <h2 className="text-center text-3xl md:text-4xl font-semibold text-gi-text tracking-tight text-balance">
          {heading}
        </h2>

        <m.ul
          className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {items.map((it) => {
            const CardInner = (
              <div className="rounded-[16px] bg-white p-6 shadow-gi transition-transform duration-200 will-change-transform group-hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gi-green/15 ring-1 ring-gi-fog">
                    <span className="h-5 w-5"/>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-gi-text">{it.title}</h3>
                      {it.flag && (
                        <span className="rounded-full bg-gi-pink/10 px-2 py-0.5 text-xs font-medium text-gi-text ring-1 ring-gi-fog">
                          {it.flag}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gi-gray">{it.body}</p>
                    {it.cta && (
                      <div className="mt-6">
                        <Link className="btn-secondary" href={it.cta.href}>
                          {it.cta.label}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );

            return (
              <m.li
                key={it.title}
                className="relative overflow-visible"
                variants={{ hidden: { opacity: 0, y: enterY }, show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } } }}
              >
                <div className="group rounded-2xl bg-gradient-to-r from-gi-pink/35 via-gi-green/20 to-gi-pink/35 p-[1px]">
                  {CardInner}
                </div>
                <div aria-hidden className="pointer-events-none absolute left-3 right-3 -bottom-3 h-6 rounded-b-[18px] bg-gradient-to-r from-gi-pink/30 via-gi-green/20 to-gi-pink/30 blur-[10px] opacity-80 md:opacity-90 [mask-image:linear-gradient(to_bottom,transparent,black_40%)]" />
              </m.li>
            );
          })}
        </m.ul>
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
        <filter id="foBlur" x="-5%" y="-150%" width="110%" height="400%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
        <linearGradient id="foPink" x1="0" x2="1">
          <stop offset="0" stopColor="#C40084" stopOpacity="0.9" />
          <stop offset="1" stopColor="#C40084" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M0 5 C 10 1, 20 7, 30 5 S 50 1, 60 5 80 7, 100 5"
        stroke="url(#foPink)"
        strokeWidth="1.8"
        fill="none"
        filter="url(#foBlur)"
      />
    </svg>
  );
}

function IconAgent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="#141415" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="7" />
      <path d="M12 8l3 5H9l3-5z" fill="#5AAD5A" stroke="none" />
      <circle cx="12" cy="8" r="1.2" fill="#5AAD5A" stroke="none" />
    </svg>
  );
}
function IconIntegration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="#141415" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="6" height="6" rx="1.5" />
      <rect x="15" y="12" width="6" height="6" rx="1.5" />
      <path d="M9 9h2.5a3.5 3.5 0 0 1 3.5 3.5V15" />
    </svg>
  );
}
function IconSalesforce(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="#141415" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="12" r="3.5" />
      <circle cx="16" cy="12" r="3.5" />
      <path d="M6 16.5h12" />
    </svg>
  );
}
function IconData(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props} fill="none" stroke="#141415" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="6.5" rx="6" ry="2.5" />
      <path d="M6 6.5v11c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-11" />
      <path d="M6 12c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" />
    </svg>
  );
}