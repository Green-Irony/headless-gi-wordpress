'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion as m, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export type LeadMagnetProps = {
  id?: string;
  className?: string;
  title?: string;
  body?: string;
  bullets?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const DEFAULT_TITLE = '8‑Week Outcomes Workshop';
const DEFAULT_BODY = 'Define your agent’s job (AJD), map the minimal integrations, and launch a working Agentforce pilot in as little as 3 weeks.';
const DEFAULT_BULLETS = [
  'Agent Job Description — responsibilities, guardrails, KPIs',
  'Week-by-week plan (3–8 weeks) — milestones, owners, quality gates',
  'Integration map & data contracts — systems, events, access',
];
const DEFAULT_PRIMARY = { label: 'Request a Time', href: '/agentforce-job-description' };
const DEFAULT_SECONDARY = { label: 'Talk to an Expert', href: '/contact' };

export default function LeadMagnetCTA({ id, className, title = DEFAULT_TITLE, body = DEFAULT_BODY, bullets = DEFAULT_BULLETS, primaryCta = DEFAULT_PRIMARY, secondaryCta = DEFAULT_SECONDARY }: LeadMagnetProps) {
  const prefersReduced = useReducedMotion();
  const enterY = prefersReduced ? 0 : 10;
  const [open, setOpen] = useState(false);

  // Lock page scroll when modal is open (align with CustomerStoriesProof behavior)
  useEffect(() => {
    if (open) {
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
      };
    }
  }, [open]);

  return (
    <m.section
      id={id}
      className={`relative isolate overflow-visible bg-white ${className ?? ''}`}
      initial={{ opacity: 0, y: enterY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 h-[680px] w-[680px] rounded-full bg-gi-pink opacity-[0.16] blur-[160px]" />
        <div className="absolute right-[12%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-gi-green opacity-[0.14] blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="order-2 md:order-1 md:col-span-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gi-text text-balance">
              {title}
            </h2>

            <p className="mt-4 max-w-xl text-gi-gray">{body}</p>

            <ul className="mt-6 space-y-2 text-sm text-gi-gray">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-gi-green" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primaryCta?.href ? (
                <a className="btn-primary" href={primaryCta.href}>
                  {primaryCta.label}
                </a>
              ) : (
                <button className="btn-primary" onClick={() => setOpen(true)}>
                  {primaryCta.label}
                </button>
              )}
              {/*<a className="btn-secondary" href={secondaryCta.href}>
                {secondaryCta.label}
              </a>*/}
            </div>

            <p className="mt-3 text-xs text-gi-gray">No cost — AJD, week-by-week plan, and an editable scorecard delivered in the next few business days.</p>
          </div>

          <div className="order-1 md:order-2 md:col-span-6">
            <div className="relative mx-auto w-full max-w-[520px]">
              <div aria-hidden className="pointer-events-none absolute inset-x-6 -bottom-4 h-8 rounded-b-[18px] bg-gradient-to-r from-gi-pink/30 via-gi-green/20 to-gi-pink/30 blur-[10px] opacity-90" />
              <div className="rounded-3xl bg-gradient-to-r from-gi-pink/35 via-gi-green/20 to-gi-pink/35 p-[1px]">
                <div className="relative rounded-[22px] bg-white p-4 shadow-gi">
                  <div className="relative rounded-2xl ring-1 ring-gi-fog transition-transform duration-300 will-change-transform hover:-translate-y-0.5 hover:rotate-[0.2deg]">
                    <Image
                      src="/images/8-week-launch-home.webp"
                      width={720}
                      height={460}
                      alt="8‑Week Agent Launch Plan cover"
                      className="block w-full rounded-2xl h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && <LeadMagnetModal onClose={() => setOpen(false)} />}
    </m.section>
  );
}

function LeadMagnetCoverSVG() {
  return (
    <svg
      viewBox="0 0 720 460"
      className="block w-full rounded-2xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lgBg" x1="0" x2="1">
          <stop offset="0" stopColor="#C40084" stopOpacity="0.18" />
          <stop offset="1" stopColor="#5AAD5A" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="sweep" x1="0" x2="1">
          <stop offset="0" stopColor="#5AAD5A" stopOpacity="0" />
          <stop offset="1" stopColor="#5AAD5A" stopOpacity=".45" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="720" height="460" rx="18" fill="white" stroke="#E6E6EA" />
      <rect x="0" y="0" width="720" height="460" rx="18" fill="url(#lgBg)" />
      <g stroke="#E6E6EA">
        <path d="M40 120h640M40 220h640M40 320h640" />
        <path d="M200 60v340M360 60v340M520 60v340" />
      </g>

      <g transform="translate(40,60)">
        <rect x="0" y="0" width="290" height="36" rx="8" fill="white" stroke="#E6E6EA" />
        <text x="14" y="24" fontFamily="system-ui, -apple-system, Segoe UI, Inter, Arial" fontSize="16" fill="#141415" fontWeight="600">
          Green Irony
        </text>

        <text x="0" y="110" fontFamily="system-ui, -apple-system, Segoe UI, Inter, Arial" fontSize="36" fontWeight="700" fill="#141415">
          Your 8-Week Agent
        </text>
        <text x="0" y="150" fontFamily="system-ui, -apple-system, Segoe UI, Inter, Arial" fontSize="36" fontWeight="700" fill="#141415">
          Launch Plan
        </text>

        <text x="0" y="190" fontFamily="system-ui, -apple-system, Segoe UI, Inter, Arial" fontSize="16" fill="#4B4B50">
          The practical playbook to get measurable AI outcomes fast.
        </text>
      </g>

      <g transform="translate(380,120)" fill="none" stroke="#141415" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="0" y="0" width="280" height="220" rx="16" stroke="#E6E6EA" />
        <rect x="22" y="40" width="60" height="44" rx="8" />
        <circle cx="142" cy="62" r="22" stroke="#5AAD5A" />
        <path d="M142 50l8 12h-16l8-12z" fill="#5AAD5A" stroke="none" />
        <circle cx="142" cy="50" r="2.4" fill="#5AAD5A" stroke="none" />
        <rect x="202" y="48" width="40" height="28" rx="6" />
        <path d="M82 62h38M164 62h38" />
        <path d="M52 122h168M52 152h168M52 182h168" stroke="url(#sweep)" strokeWidth="6" />
      </g>
    </svg>
  );
}

function UnderlinePink() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[8px] w-full"
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="lmBlur" x="-5%" y="-150%" width="110%" height="400%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        </filter>
        <linearGradient id="lmPink" x1="0" x2="1">
          <stop offset="0" stopColor="#C40084" stopOpacity="0.9" />
          <stop offset="1" stopColor="#C40084" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path
        d="M0 5 C 10 1, 20 7, 30 5 S 50 1, 60 5 80 7, 100 5"
        stroke="url(#lmPink)"
        strokeWidth="1.8"
        fill="none"
        filter="url(#lmBlur)"
      />
    </svg>
  );
}

function LeadMagnetModal({ onClose }: { onClose: () => void }) {
  // Mount guard for SSR/Next to ensure document is available before portal
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null as any;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-gi ring-1 ring-gi-fog"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-md bg-white px-2 py-1 text-xs font-medium text-gi-text ring-1 ring-gi-fog hover:bg-gi-fog/60"
        >
          Close
        </button>

        <h3 className="text-lg font-semibold text-gi-text">Get the 8-Week Agent Launch Plan</h3>
        <p className="mt-2 text-sm text-gi-gray">
          Enter your email and we&rsquo;ll send the PDF, plus the editable KPI scorecard.
        </p>

        <form className="mt-6 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gi-text">Work email</label>
            <input type="email" required className="mt-1 w-full rounded-md border border-gi-fog bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-gi-green" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gi-text">First name</label>
            <input type="text" className="mt-1 w-full rounded-md border border-gi-fog bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-gi-green" />
          </div>
          <div className="pt-2">
            <button type="submit" className="btn-primary w-full">Email me the plan</button>
          </div>
        </form>

        <p className="mt-3 text-[11px] text-gi-gray">
          By submitting, you agree to receive the guide and occasional updates. You can unsubscribe at any time.
        </p>
      </div>
    </div>,
    document.body
  );
}