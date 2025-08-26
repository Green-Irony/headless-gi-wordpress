import Link from 'next/link';

export type PreFooterProps = {
  id?: string;
  className?: string;
  title?: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label?: string; href?: string };
};

const DEFAULT_TITLE = 'Ready to launch predictable AI outcomes?';
const DEFAULT_BODY = 'Talk to our team or grab the 8-Week Agent Launch Plan to get your first win on the board.';
const DEFAULT_PRIMARY = { label: 'Talk to an Expert', href: '/contact' };
const DEFAULT_SECONDARY = { label: 'Get the 8-Week Plan', href: '/plan' };

export default function PreFooterCTA({ id, className, title = DEFAULT_TITLE, body = DEFAULT_BODY, primaryCta = DEFAULT_PRIMARY, secondaryCta = DEFAULT_SECONDARY }: PreFooterProps) {
  return (
    <section id={id} className={`relative isolate ${className ?? ''}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[620px] w-[620px] rounded-full bg-gi-pink opacity-[0.16] blur-[160px]" />
        <div className="absolute right-[15%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-gi-green opacity-[0.14] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-gi-pink/35 via-gi-green/20 to-gi-pink/35 p-[1px]">
          <div className="rounded-[22px] bg-white px-8 py-10 text-center shadow-gi">
            <h2 className="text-2xl md:text-3xl font-semibold text-gi-text">{title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gi-gray">{body}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {secondaryCta?.label && secondaryCta?.href ? (
                <Link href={secondaryCta.href} className="btn-secondary">{secondaryCta.label}</Link>
              ) : null}
              <Link href={primaryCta.href} className="btn-primary">{primaryCta.label}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 