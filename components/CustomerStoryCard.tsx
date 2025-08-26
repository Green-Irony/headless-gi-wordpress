import Image from 'next/image';
import Link from 'next/link';
import { CustomerStory } from '../lib/customerStories';

export default function CustomerStoryCard({ story }: { story: CustomerStory }) {
  const href = `/customer-stories/${story.slug}`;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-gi ring-1 ring-gi-fog">
      <Link href={href} className="block">
        <div className="relative aspect-[16/9] w-full bg-white">
          {story.image?.src ? (
            <Image
              src={story.image.src}
              alt={story.image.alt || story.title}
              fill
              className="object-contain object-center"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gi-fog/40 text-sm text-gi-gray">No image</div>
          )}
        </div>
        <div className="p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-gi-gray">{story.brand}</div>
          <h3 className="mt-2 text-lg font-semibold text-gi-text">{story.title}</h3>
          {story.excerpt ? <p className="mt-2 line-clamp-3 text-sm text-gi-gray">{story.excerpt}</p> : null}
          {Array.isArray(story.tags) && story.tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {story.tags.slice(0, 4).map((t) => (
                <span key={t} className="rounded-full bg-gi-green/15 px-2 py-0.5 text-xs text-gi-text ring-1 ring-gi-fog">{t}</span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </article>
  );
}


