import React from 'react';

type ChecklistCardProps = {
  heading: string;
  items: string[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
};

function getGridColsClass(columns: number | undefined): string {
  switch (columns) {
    case 1:
      return 'md:grid-cols-1';
    case 2:
      return 'md:grid-cols-2';
    case 4:
      return 'md:grid-cols-4';
    case 3:
    default:
      return 'md:grid-cols-3';
  }
}

export default function ChecklistCard({ heading, items, columns = 3, className = '' }: ChecklistCardProps) {
  const gridColsClass = getGridColsClass(columns);
  return (
    <section className={`mx-auto max-w-7xl px-6 py-10 ${className}`.trim()}>
      <div className="relative overflow-hidden rounded-xl border border-gi-fog bg-white shadow-gi">
        <div aria-hidden className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-gi-pink to-gi-green/80" />
        <div className="p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gi-text">{heading}</h3>
          <ul className={`mt-4 grid gap-3 ${gridColsClass}`}>
            {items.map((text, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gi-green/15 text-gi-green ring-1 ring-gi-fog">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </span>
                <span className="text-sm text-gi-text/90">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


