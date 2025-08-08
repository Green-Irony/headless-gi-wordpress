'use client';
import Link from 'next/link';

export default function PlaceholderPage({
  title,
  subtitle = 'This page is a placeholder. Content is coming soon.',
  ctaHref = '/',
  ctaLabel = 'Back to Home',
}: {
  title: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="relative isolate">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 h-[560px] w-[560px] rounded-full bg-gi-green opacity-[0.12] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-8 h-px w-16 bg-gi-line" />
        <h1 className="text-3xl md:text-4xl font-semibold text-gi-text tracking-tight">{title}</h1>
        <p className="mt-3 max-w-2xl text-gi-gray">{subtitle}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={ctaHref} className="btn-primary">{ctaLabel}</Link>
          <Link href="/contact" className="btn-secondary">Talk to an Expert</Link>
        </div>
      </div>
    </section>
  );
} 