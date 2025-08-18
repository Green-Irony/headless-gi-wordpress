import Image from 'next/image';
import Link from 'next/link';

type Post = any;

export default function FeaturedPost({ post }: { post: Post }) {
  if (!post) return null;
  const title: string = post?.title || '';
  const wpUri: string = post?.uri || '';
  const slug: string = post?.slug || '';
  const href: string = wpUri && !wpUri.startsWith('?p=') ? wpUri : (slug ? `/blog/${slug}/` : '#');
  const date: string = post?.date || '';
  const img = post?.featuredImage?.node;
  const categories: Array<{ name: string; slug: string }> = post?.categories?.nodes || [];

  return (
    <article className="overflow-hidden rounded-3xl bg-white ring-1 ring-gi-fog shadow-gi">
      <Link href={href} className="block">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-5">
          <div className="relative aspect-[16/9] w-full md:col-span-2 md:aspect-auto md:min-h-[240px]">
            {img?.sourceUrl ? (
              <Image
                src={img.sourceUrl}
                alt={img.altText || title}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gi-fog/40 text-sm text-gi-gray">No image</div>
            )}
          </div>
          <div className="p-6 md:col-span-3 md:p-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-gi-green/20 px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">Featured</span>
              {categories.slice(0, 3).map((c) => (
                <span key={c.slug} className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">
                  {c.name}
                </span>
              ))}
            </div>
            <h2 className="text-balance text-2xl font-bold leading-snug text-gi-text md:text-3xl">{title}</h2>
            {date ? (
              <time className="mt-1 block text-xs text-gi-gray" dateTime={date}>
                {new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            ) : null}
            {post?.excerpt ? (
              <div className="prose prose-sm mt-3 max-w-none text-gi-gray" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            ) : null}
            <div className="mt-5">
              <span className="btn-secondary">Read more</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}


