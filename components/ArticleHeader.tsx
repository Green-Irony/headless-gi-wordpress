import Image from 'next/image';
import React from 'react';

export default function ArticleHeader({
  title,
  date,
  author,
  featuredImage,
  categories,
}: {
  title: string;
  date?: string;
  author?: string;
  featuredImage?: { src?: string; alt?: string } | null;
  categories?: Array<{ name: string; slug: string }>;
}) {
  const dt = date ? new Date(date) : null;

  return (
    <header className="mx-auto max-w-3xl px-6 pt-8">
      {featuredImage?.src ? (
        <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl ring-1 ring-gi-fog">
          <Image src={featuredImage.src} alt={featuredImage.alt || title} fill className="object-cover" sizes="(min-width: 1024px) 48rem, 100vw" />
        </div>
      ) : null}

      <div className="mb-3 flex flex-wrap gap-2">
        {(categories || []).slice(0, 3).map((c) => (
          <span key={c.slug} className="inline-flex items-center rounded-full bg-gi-green/15 px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">
            {c.name}
          </span>
        ))}
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-gi-text sm:text-4xl">{title}</h1>
      <div className="mt-3 text-sm text-gi-gray">
        {author ? <span>{author}</span> : null}
        {dt ? <span> • {dt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span> : null}
      </div>
    </header>
  );
}


