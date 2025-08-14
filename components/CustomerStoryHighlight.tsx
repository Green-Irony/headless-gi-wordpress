import Image from 'next/image';

export type CustomerStoryHighlightProps = {
  customer: string;
  logoSrc?: string;
  headline?: string;
  quote?: string;
  body?: string;
  cta?: { label: string; href: string };
  className?: string;
};

export default function CustomerStoryHighlight({ customer, logoSrc, headline = 'Customer story', quote, body, cta, className }: CustomerStoryHighlightProps) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-8 ${className ?? ''}`}>
      <div className="relative overflow-hidden rounded-2xl border border-gi-fog bg-white shadow-gi">
        <div className="absolute inset-0 bg-gradient-to-br from-gi-pink/5 via-transparent to-gi-green/5" />
        <div className="relative grid items-stretch gap-6 p-6 md:grid-cols-[minmax(180px,280px),1fr] md:gap-8 md:p-8">
          <div className="flex items-center justify-center md:items-stretch">
            {logoSrc ? (
              <div className="relative h-[180px] w-full max-w-[260px] md:h-full md:min-h-[260px] md:max-w-[280px] rounded-xl bg-white ring-1 ring-gi-fog">
                <Image src={logoSrc} alt={`${customer} logo`} fill className="object-contain p-4" sizes="(min-width: 768px) 280px, 60vw" />
              </div>
            ) : (
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gi-green/15 ring-1 ring-gi-fog">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6h12v12H6z"/></svg>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gi-gray">{headline}</h3>
              <span className="h-px w-8 bg-gi-line" />
              <p className="text-sm font-medium text-gi-text">{customer}</p>
            </div>

            {quote && (
              <blockquote className="mt-3 text-balance text-lg font-medium leading-snug text-gi-text">
                “{quote}”
              </blockquote>
            )}

            {body && <p className="mt-3 max-w-3xl text-sm text-gi-gray">{body}</p>}

            {cta && (
              <div className="mt-5">
                <a href={cta.href} className="btn-secondary text-sm">{cta.label}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
