import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Post = any;

export default function PostTile({ post }: { post: Post }) {
  const title: string = post?.title || '';
  const wpUri: string = post?.uri || '';
  const slug: string = post?.slug || '';
  const href: string = wpUri && !wpUri.startsWith('?p=') ? wpUri : (slug ? `/blog/${slug}/` : '#');
  const date: string = post?.date || '';
  const img = post?.featuredImage?.node;

  return (
    <article className="group overflow-hidden rounded-2xl bg-white ring-1 ring-gi-fog transition-shadow hover:shadow-gi">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {img?.sourceUrl ? (
            <Image
              src={img.sourceUrl}
              alt={img.altText || title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gi-fog/40 text-sm text-gi-gray">No image</div>
          )}
        </div>
        <div className="p-4">
          <time className="block text-xs text-gi-gray" dateTime={date}>
            {date ? new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          </time>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold text-gi-text">{title}</h3>
        </div>
      </Link>
    </article>
  );
}


