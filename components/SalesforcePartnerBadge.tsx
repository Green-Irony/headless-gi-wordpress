import Image from 'next/image';

export type SalesforcePartnerBadgeProps = {
  sinceYear?: number;
  title?: string;
  body?: string;
  badgeSrc?: string;
  className?: string;
};

export default function SalesforcePartnerBadge({
  sinceYear = 2016,
  title,
  body = 'Trusted Salesforce partner delivering outcomes with onshore expertise and AI‑accelerated methods.',
  badgeSrc = '/images/salesforce-partner-badge.png',
  className,
}: SalesforcePartnerBadgeProps) {
  const heading = title ?? `Salesforce Consulting Partner since ${sinceYear}`;

  return (
    <section className={["relative w-full", className].filter(Boolean).join(' ')}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gi-subtle" />
        <div className="absolute left-[-8%] top-[-10%] h-64 w-64 rounded-full bg-gi-green/20 blur-[90px]" />
        <div className="absolute right-[-6%] bottom-[-12%] h-72 w-72 rounded-full bg-gi-pink/20 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <div className="relative">
            <div className="relative inline-flex items-center justify-center rounded-2xl bg-white p-4 ring-1 ring-gi-fog shadow-gi">
              <Image
                src={badgeSrc}
                alt="Salesforce Partner badge"
                width={180}
                height={64}
                className="h-auto w-[400px] object-contain"
                priority
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-3 h-[3px] w-16 bg-gradient-to-r from-gi-green to-gi-pink/70" />
            <h3 className="text-2xl md:text-3xl font-semibold text-gi-text text-balance">{heading}</h3>
            {body ? (
              <p className="mt-3 max-w-2xl text-gi-gray">
                {body}
              </p>
            ) : null}
            <ul className="mt-5 flex flex-wrap gap-2 text-sm text-gi-text/90">
              <li className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-gi-fog">
                <span className="inline-block h-2 w-2 rounded-full bg-gi-green" />
                Enterprise experience since {sinceYear}
              </li>
              <li className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-gi-fog">
                <span className="inline-block h-2 w-2 rounded-full bg-gi-green" />
                AI‑accelerated delivery
              </li>
              <li className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-gi-fog">
                <span className="inline-block h-2 w-2 rounded-full bg-gi-green" />
                Onshore senior team
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
