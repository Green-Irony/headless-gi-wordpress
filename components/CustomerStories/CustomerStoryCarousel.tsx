import React from 'react';
import CustomerStoryCard from '../CustomerStoryCard';

export default function CustomerStoryCarousel({ stories }: { stories: any[] }) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  function scrollByDelta(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = dir * Math.max(320, el.clientWidth * 0.8);
    el.scrollBy({ left: delta, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gi-text">All Customer Stories</h3>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous" onClick={() => scrollByDelta(-1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-gi-fog bg-white text-gi-text hover:bg-gi-subtle">
            <span className="sr-only">Previous</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button type="button" aria-label="Next" onClick={() => scrollByDelta(1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-gi-fog bg-white text-gi-text hover:bg-gi-subtle">
            <span className="sr-only">Next</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory overflow-x-auto gap-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {stories.map((s: any) => (
          <div key={s.slug} className="snap-start shrink-0 basis-[85%] sm:basis-[60%] lg:basis-[33%]">
            <div className="h-full">
              <CustomerStoryCard story={s} compactImage />
            </div>
          </div>
        ))}
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}


