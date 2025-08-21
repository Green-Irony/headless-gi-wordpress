import Image from 'next/image';
import React from 'react';

type FeaturedImage = {
  src?: string;
  alt?: string;
} | null;

export default function PageHero({
  title,
  subtitle,
  featuredImage,
}: {
  title: string;
  subtitle?: string;
  featuredImage?: FeaturedImage;
}) {
  const hasImage = Boolean(featuredImage?.src);

  return (
    <section className={
      hasImage
        ? 'relative isolate overflow-hidden'
        : 'relative isolate overflow-hidden bg-white'
    }>
      {hasImage ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={featuredImage!.src as string}
            alt={featuredImage?.alt || title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-white" />
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gi-text sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-lg leading-8 text-gi-gray">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}


