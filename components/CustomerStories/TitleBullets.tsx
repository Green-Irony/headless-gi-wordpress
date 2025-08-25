import React from 'react';

type BrandColor = 'white' | 'navy' | 'pink' | 'green';

export type TitleBulletsProps = {
  title: string;
  bullets: string[];
  bg?: BrandColor; // background color token -> bg-gi-<bg>
  text?: BrandColor; // text color token -> text-gi-<text>
  center?: boolean;
  body?: string; // optional blurb between title and bullets
  className?: string;
};

export default function TitleBullets({ title, bullets, bg = 'white', text = 'navy', center = false, body, className }: TitleBulletsProps) {
  const bgClass = `bg-gi-${bg}`;
  const textClass = `text-gi-${text}`;
  const align = center ? 'text-center items-center' : 'text-left items-start';
  const container = `relative overflow-hidden ${bgClass} ${textClass} ${className ?? ''}`;

  const safe = Array.isArray(bullets) ? bullets.filter((b) => typeof b === 'string' && b.trim().length > 0) : [];
  if (!title && safe.length === 0) return null;

  return (
    <section className={container}>
      <div className={`mx-auto max-w-7xl px-6 py-12 flex flex-col ${align}`}>
        {title ? (
          <h2 className={`text-[1.85rem] font-extrabold tracking-tight sm:text-[2.1rem] ${center ? 'mx-auto' : ''}`}>{title}</h2>
        ) : null}
        {body ? (
          <p className={`mt-3 ${center ? 'mx-auto text-center' : ''}`}>{body}</p>
        ) : null}

        {safe.length > 0 ? (
          <ul className={`mt-6 w-full ${center ? 'mx-auto' : ''}`}>
            {safe.map((line, i) => (
              <li key={i} className={`relative py-4 ${i !== 0 ? 'border-t border-gi-line/60' : ''}`}>
                <div className={`pl-8 ${center ? 'mx-auto' : ''}`}>
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gi-green/15 text-gi-green ring-1 ring-gi-fog">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  <p className="text-[0.98rem] leading-relaxed">{line}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}


