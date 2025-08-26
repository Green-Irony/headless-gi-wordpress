import Image from 'next/image';
import Link from 'next/link';

export type CombinedItem = {
  id: string;
  type: 'post' | 'story';
  title: string;
  href: string;
  date: string; // ISO
  image?: { src: string; alt?: string } | null;
  tags?: string[];
  searchText?: string;
};

export default function CombinedTile({ item }: { item: CombinedItem }) {
  const badgeLabel = item.type === 'post' ? 'Blog Post' : 'Customer Story';
  const badgeClass = item.type === 'post' ? 'bg-gi-green/15 text-gi-green' : 'bg-gi-pink/15 text-gi-pink';

  return (
    <article className="group overflow-hidden rounded-2xl bg-white ring-1 ring-gi-fog transition-shadow hover:shadow-gi">
      <Link href={item.href} className="block">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
          {item.image?.src ? (
            <Image
              src={item.image.src}
              alt={item.image.alt || item.title}
              fill
              className={item.type === 'story' ? 'object-contain object-center p-6' : 'object-cover object-center transition-transform duration-200 group-hover:scale-[1.03]'}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gi-fog/40 text-sm text-gi-gray">No image</div>
          )}
          <span className={`absolute left-3 top-3 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-gi-fog ${badgeClass}`}>{badgeLabel}</span>
        </div>
        <div className="p-4">
          <time className="block text-xs text-gi-gray" dateTime={item.date}>
            {item.date ? new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          </time>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold text-gi-text">{item.title}</h3>
          {Array.isArray(item.tags) && item.tags.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {item.tags.slice(0, 4).map((t) => (
                <span key={t} className="inline-flex items-center rounded-full bg-gi-green/10 px-2 py-0.5 text-[11px] text-gi-text ring-1 ring-gi-fog">{t}</span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}


