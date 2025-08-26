import React from 'react';
import Image from 'next/image';

export type SolutionBullet = { title?: string; body: string };

type BrandColor = 'white' | 'navy' | 'pink' | 'green';

export type SolutionProps = {
  title?: string; // default 'Solution'
  subhead?: string; // optional eyebrow/subheader
  image?: { src: string; alt?: string } | null;
  imageSide?: 'left' | 'right';
  bullets?: SolutionBullet[];
  bg?: BrandColor;
  textPrimary?: BrandColor; // applied to overall text color
  textSecondary?: BrandColor; // applied to subhead
  bodyBefore?: string;
  bodyAfter?: string;
  className?: string;
};

export default function Solution({ title = 'Solution', subhead, image, imageSide = 'right', bullets = [], bg = 'green', textPrimary = 'white', textSecondary = 'navy', bodyBefore, bodyAfter, className }: SolutionProps) {
  const hasBullets = Array.isArray(bullets) && bullets.length > 0;
  const mediaFirst = imageSide === 'left';
  const bgClass = `bg-gi-${bg}`;
  const textPrimaryClass = `text-gi-${textPrimary}`;
  const textSecondaryClass = `text-gi-${textSecondary}`;
  // Bullet dot background uses system color classes; fall back to Tailwind core for white
  const dotClass = textPrimary === 'white'
    ? 'bg-white'
    : textPrimary === 'navy'
      ? 'bg-gi-navy'
      : textPrimary === 'pink'
        ? 'bg-gi-pink'
        : 'bg-gi-green';

  return (
    <section className={`relative overflow-hidden ${bgClass} ${textPrimaryClass} ${className ?? ''}`}> 
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-12">
        {/* Content */}
        <div className={`${mediaFirst ? 'md:order-2' : 'md:order-1'} md:col-span-6`}>
          <h2 className="text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.4rem]">{title}{subhead ? ':' : ''} {subhead ? <span className={`font-semibold ${textSecondaryClass} text-[1.75rem]`}><br/>{subhead}</span> : null}</h2>
          {bodyBefore ? (
            <p className="mt-4 max-w-2xl opacity-95">{bodyBefore}</p>
          ) : null}
          <div className="mt-5 space-y-4">
            {hasBullets ? (
              <ul className="space-y-4">
                {bullets.map((b, i) => (
                  <li key={i} className="pl-6">
                    <div className="relative">
                      <span className={`absolute -left-6 top-1.5 h-2 w-2 rounded-full ${dotClass}`} />
                      {b.title ? <span className="font-semibold">{b.title}: </span> : null}
                      <span className="">{b.body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {bodyAfter ? (
            <p className="mt-6 max-w-2xl opacity-95">{bodyAfter}</p>
          ) : null}
        </div>

        {/* Image */}
        <div className={`${mediaFirst ? 'md:order-1' : 'md:order-2'} md:col-span-6`}>
          {image?.src ? (
            <div className="relative mx-auto w-full max-w-xl h-[220px] sm:h-[260px] lg:h-[320px] overflow-hidden flex items-center justify-center">
              <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 rounded-[24%_56%_40%_50%/50%_42%_58%_45%] bg-white/10" />
              <Image src={image.src} alt={image.alt || ''} fill className="object-contain" sizes="(min-width: 1024px) 40vw, 80vw" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}


