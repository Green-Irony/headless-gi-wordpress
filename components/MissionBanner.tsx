import Link from 'next/link';
import React from 'react';

type MissionBannerProps = {
  eyebrow?: string;
  headline: string;
  highlight?: { text: string } | null;
  promises?: string[];
  primaryCta?: { label: string; href: string } | null;
  secondaryCta?: { label: string; href: string } | null;
  badge?: string | null;
  background?: { pattern?: 'grid' | 'curves' | 'dots' | 'none'; intensity?: 0 | 1 | 2 } | null;
  align?: 'center' | 'left';
  className?: string;
};

export default function MissionBanner({
  eyebrow = 'Mission',
  headline,
  highlight = null,
  promises = [],
  primaryCta = null,
  secondaryCta = null,
  badge = 'AI‑Native',
  background = { pattern: 'curves', intensity: 1 },
  align = 'center',
  className,
}: MissionBannerProps) {
  const alignmentClasses = align === 'left' ? 'text-left items-start' : 'text-center items-center';
  const containerJustify = align === 'left' ? 'justify-start' : 'justify-center';

  function renderHeadlineWithHighlight(text: string, highlightText?: string | null) {
    if (!highlightText) return <>{text}</>;
    const idx = text.indexOf(highlightText);
    if (idx === -1) return <>{text}</>;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + highlightText.length);
    const after = text.slice(idx + highlightText.length);
    return (
      <>
        {before}
        <span className="rounded-md bg-gi-green/15 px-1">{match}</span>
        {after}
      </>
    );
  }

  const intensity = Math.max(0, Math.min(2, background?.intensity ?? 1));
  const pattern = background?.pattern ?? 'curves';

  return (
    <section className={[
      'relative overflow-hidden bg-white py-20 sm:py-28 lg:py-36',
      className || '',
    ].join(' ')} role="region" aria-label={eyebrow || 'Mission banner'}>
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gi-green/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-gi-green/5 to-transparent" />
      </div>

      {/* Background pattern */}
      {pattern !== 'none' ? (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-[-120px] top-[-60px] h-[360px] w-[460px]"
          viewBox="0 0 460 360"
          fill="none"
        >
          {pattern === 'curves' && (
            <>
              <path d="M0 60 Q 120 0 240 60 T 460 60" stroke="#E6F4EA" strokeWidth={2 + intensity} />
              <path d="M0 140 Q 120 80 240 140 T 460 140" stroke="#E6F4EA" strokeWidth={2 + intensity} />
              <path d="M0 220 Q 120 160 240 220 T 460 220" stroke="#E6F4EA" strokeWidth={2 + intensity} />
            </>
          )}
          {pattern === 'grid' && (
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 46} x2={i * 46} y1="0" y2="360" stroke="#EEF2F7" strokeWidth={1 + intensity * 0.5} />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`h-${i}`} y1={i * 45} y2={i * 45} x1="0" x2="460" stroke="#EEF2F7" strokeWidth={1 + intensity * 0.5} />
              ))}
            </>
          )}
          {pattern === 'dots' && (
            <>
              {Array.from({ length: 80 }).map((_, i) => (
                <circle key={i} cx={(i * 37) % 460} cy={((i * 19) % 320) + 20} r={1.6 + intensity * 0.4} fill="#E6F4EA" />
              ))}
            </>
          )}
        </svg>
      ) : null}

      {badge ? (
        <span className="absolute right-6 top-6 inline-flex items-center rounded-full bg-gi-green/15 px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">
          {badge}
        </span>
      ) : null}

      <div className={`relative mx-auto max-w-7xl px-6 flex flex-col ${alignmentClasses}`}>
        {eyebrow ? (
          <span className="inline-flex items-center self-start rounded-full bg-gi-green/15 px-3 py-1 text-xs font-semibold text-gi-text ring-1 ring-gi-fog shadow-gi">
            {eyebrow}
          </span>
        ) : null}

        <h2 className={`mt-3 max-w-5xl text-3xl font-extrabold tracking-tight text-gi-text sm:text-4xl lg:text-5xl ${align === 'left' ? '' : 'mx-auto'}`}>
          {renderHeadlineWithHighlight(headline, highlight?.text || null)}
        </h2>

        {promises && promises.length > 0 ? (
          <div className={`mt-6 flex flex-wrap gap-2 ${containerJustify}`}>
            {promises.slice(0, 5).map((p) => (
              <span key={p} className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm text-gi-text ring-1 ring-gi-fog">
                {p}
              </span>
            ))}
          </div>
        ) : null}

        {(primaryCta || secondaryCta) ? (
          <div className={`mt-8 flex gap-3 ${containerJustify}`}>
            {primaryCta ? (
              <Link href={primaryCta.href} className="btn-primary">{primaryCta.label}</Link>
            ) : null}
            {secondaryCta ? (
              <Link href={secondaryCta.href} className="btn-secondary">{secondaryCta.label}</Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}


