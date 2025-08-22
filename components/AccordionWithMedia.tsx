import Image from 'next/image';
import React, { useMemo, useState } from 'react';

export type AccordionItem = {
  title: string;
  body?: string;
  content?: React.ReactNode;
};

export default function AccordionWithMedia({
  heading = 'Services',
  items,
  imageSrc,
  imageAlt,
  imageRight = true,
  imageObjectFit = 'cover',
  imageAspectClass = 'aspect-[4/3]',
  imagePadding = false,
  className,
  initialOpenIndex = null,
}: {
  heading?: string;
  items: AccordionItem[];
  imageSrc: string;
  imageAlt: string;
  imageRight?: boolean;
  imageObjectFit?: 'cover' | 'contain';
  imageAspectClass?: string; // Tailwind aspect utility or custom
  imagePadding?: boolean;
  className?: string;
  initialOpenIndex?: number | null;
}) {
  const sanitizedItems: AccordionItem[] = useMemo(() => Array.isArray(items) ? items.filter(Boolean) : [], [items]);
  const [openIndex, setOpenIndex] = useState<number | null>(
    typeof initialOpenIndex === 'number' && initialOpenIndex! >= 0 && initialOpenIndex! < sanitizedItems.length
      ? initialOpenIndex!
      : null,
  );

  function toggleIndex(idx: number) {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  }

  const List = (
    <div className="w-full">
      {heading ? (
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gi-text sm:text-4xl">
          {heading}
        </h2>
      ) : null}

      <ul className="divide-y divide-gi-fog rounded-2xl ring-1 ring-gi-fog">
        {sanitizedItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          const panelId = `acc-panel-${idx}`;
          const buttonId = `acc-button-${idx}`;
          return (
            <li key={item.title} className="bg-white">
              <button
                id={buttonId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => toggleIndex(idx)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-gi-fog/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gi-green"
                type="button"
              >
                <span className="text-base font-semibold text-gi-text sm:text-lg">{item.title}</span>
                <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-gi-fog text-gi-text">
                  {isOpen ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  )}
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`overflow-hidden px-4 transition-[max-height,opacity] duration-200 ease-out ${isOpen ? 'max-h-[420px] opacity-100 py-2 sm:py-3' : 'max-h-0 opacity-0'}`}
              >
                {item.content ? (
                  <div className="pb-4 text-sm leading-6 text-gi-gray sm:text-base">{item.content}</div>
                ) : item.body ? (
                  <p className="pb-4 text-sm leading-6 text-gi-gray sm:text-base">{item.body}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const Media = (
    <div className="w-full">
      <div className={[
        'relative mx-auto',
        imageAspectClass,
        'w-full max-w-xl overflow-hidden rounded-2xl ring-1 ring-gi-fog',
        imagePadding ? 'bg-white p-4' : '',
      ].filter(Boolean).join(' ')}>
        <Image src={imageSrc} alt={imageAlt} fill sizes="(min-width: 1024px) 40rem, 100vw" className={imageObjectFit === 'contain' ? 'object-contain' : 'object-cover'} priority />
      </div>
    </div>
  );

  return (
    <section className={['mx-auto max-w-7xl px-6', className].filter(Boolean).join(' ')}>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
        {imageRight ? (
          <>
            {List}
            {Media}
          </>
        ) : (
          <>
            {Media}
            {List}
          </>
        )}
      </div>
    </section>
  );
}


