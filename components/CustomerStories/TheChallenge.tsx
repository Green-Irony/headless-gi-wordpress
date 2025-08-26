import React from 'react';

type TheChallengeProps = {
  title?: string;
  body: string;
  promises?: string[] | null;
  background?: { pattern?: 'grid' | 'curves' | 'dots' | 'none'; intensity?: 0 | 1 | 2 } | null;
  align?: 'center' | 'left';
  className?: string;
};

export default function TheChallenge({
  title = 'THE CHALLENGE',
  body,
  promises = [],
  background = { pattern: 'curves', intensity: 1 },
  align = 'center',
  className,
}: TheChallengeProps) {
  const alignmentClasses = align === 'left' ? 'text-left items-start' : 'text-center items-center';
  const containerJustify = align === 'left' ? 'justify-start' : 'justify-center';

  function renderText(text: string) { return <>{text}</>; }

  const intensity = Math.max(0, Math.min(2, background?.intensity ?? 1));
  const pattern = background?.pattern ?? 'curves';

  return (
    <section className={[
      'relative overflow-hidden bg-white py-20 sm:py-28',
      className || '',
    ].join(' ')} role="region" aria-label={title || 'Challenge banner'}>
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

      {/* No badge in this variant */}

      <div className={`relative mx-auto max-w-7xl px-6 flex flex-col ${alignmentClasses}`}>
        {title ? (
          <h2 className={`text-[1.65rem] font-semibold tracking-tight text-gi-text mb-8 sm:text-[1.85rem] ${align === 'left' ? 'self-start' : 'mx-auto'}`}>
            {title}
          </h2>
        ) : null}

        <p className={`mt-3 max-w-5xl text-gi-gray ${align === 'left' ? 'self-start' : 'mx-auto'} text-[1.1rem] sm:text-[1.15rem] lg:text-[1.2rem]`}>
          {renderText(body)}
        </p>

        {promises && promises.length > 0 ? (
          <div className={`mt-6 flex flex-wrap gap-2 ${containerJustify} ${align === 'left' ? 'self-start' : ''}`}>
            {promises.slice(0, 5).map((p) => (
              <span key={p} className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm text-gi-text ring-1 ring-gi-fog">
                {p}
              </span>
            ))}
          </div>
        ) : null}

        {/* No CTAs in this variant */}
      </div>
    </section>
  );
}


