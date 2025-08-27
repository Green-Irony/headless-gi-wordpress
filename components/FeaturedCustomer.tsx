import Image from 'next/image';
import Link from 'next/link';

type FeaturedCustomerProps = {
  title?: string;
  href?: string;
  img?: { src: string; alt?: string };
  excerpt?: string;
  tag?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function FeaturedCustomer(props: FeaturedCustomerProps = {}) {
  const title = props.title ?? 'UNC Charlotte: 24/7 IT Support with AI';
  const href = props.href ?? '/customer-stories/unc-charlotte';
  const img = props.img ?? { src: '/logos/GI-UNCC.webp', alt: 'UNC Charlotte and Green Irony company logos' };
  const excerpt = props.excerpt ?? 'How UNC Charlotte transformed IT support with AI-powered knowledge and Agentforce availability to deliver 24/7 excellence.';
  const tag = props.tag ?? 'Higher Education';
  const ctaLabel = props.ctaLabel ?? 'See a pilot in 3–8 weeks';
  const ctaHref = props.ctaHref ?? '/agentforce-job-description';

  return (
    <article className="overflow-hidden rounded-3xl bg-white ring-1 ring-gi-fog shadow-gi">
      <div className="grid grid-cols-1 gap-0 md:grid-cols-6">
        <div className="relative aspect-[16/9] w-full md:col-span-2 md:aspect-auto md:min-h-[200px]">
          {img?.src ? (
            <Image
              src={img.src}
              alt={img.alt || title}
              fill
              className="object-contain object-center bg-white"
              sizes="(min-width: 1024px) 33vw, 100vw"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gi-fog/40 text-sm text-gi-gray">No image</div>
          )}
        </div>
        <div className="p-6 md:col-span-4 md:p-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-gi-green/20 px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">Featured</span>
            <span className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">Customer Story</span>
            <span className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">{tag}</span>
          </div>
          <h2 className="text-balance text-2xl font-bold leading-snug text-gi-text md:text-3xl">{title}</h2>
          <p className="mt-3 max-w-none text-sm text-gi-gray overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as any}>
            {excerpt}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href={href} className="inline-block"><span className="btn-secondary">Read more</span></Link>
            <Link href={ctaHref} className="inline-block"><span className="btn-primary">{ctaLabel}</span></Link>
          </div>
        </div>
      </div>
    </article>
  );
}


