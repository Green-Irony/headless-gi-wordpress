import Link from 'next/link';
import React from 'react';

export default function ArticleFooter({
  tags,
}: {
  tags?: Array<{ name: string; slug: string }>;
}) {
  const hasTags = Array.isArray(tags) && tags.length > 0;
  return (
    <footer className="mx-auto max-w-3xl px-6 pb-12">
      {hasTags ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {tags!.map((t) => (
            <Link key={t.slug} href={`/tag/${t.slug}/`} className="inline-flex items-center rounded-full bg-white px-2 py-1 text-xs text-gi-text ring-1 ring-gi-fog">
              #{t.name}
            </Link>
          ))}
        </div>
      ) : null}
      <div className="mt-10">
        <Link href="/insights/" className="btn-secondary">← Back to Insights</Link>
      </div>
    </footer>
  );
}


