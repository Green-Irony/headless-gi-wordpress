import Image from 'next/image';

export type ServiceHeroProps = {
  title: string;
  subhead?: string;
  image?: { src: string; alt?: string; width?: number; height?: number };
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
};

export default function ServiceHero({ title, subhead, image, primaryCta, secondaryCta, className }: ServiceHeroProps) {
  return (
    <section className={`relative isolate ${className ?? ''}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[14%] top-[18%] h-[280px] w-[280px] rounded-full bg-gi-green/20 opacity-[0.18] blur-[120px]" />
        <div className="absolute right-[10%] bottom-[10%] h-[320px] w-[320px] rounded-full bg-gi-pink/20 opacity-[0.16] blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mx-auto mb-5 h-[3px] w-16 bg-gradient-to-r from-gi-green to-gi-pink/70" />

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gi-text text-balance">{title}</h1>
            {subhead && (
              <p className="mt-4 max-w-xl text-gi-gray text-balance">{subhead}</p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {primaryCta && (
                  <a href={primaryCta.href} className="btn-primary">
                    {primaryCta.label}
                  </a>
                )}
                {secondaryCta && (
                  <a href={secondaryCta.href} className="btn-secondary">
                    {secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="md:col-span-6">
            <div className="relative mx-auto w-full max-w-[560px]">
              <div aria-hidden className="pointer-events-none absolute inset-x-8 -bottom-4 h-8 rounded-b-[18px] bg-gradient-to-r from-gi-green/30 via-gi-pink/20 to-gi-green/30 blur-[10px] opacity-90" />
              <div className="relative">
                {image?.src ? (
                  <Image
                    src={image.src}
                    alt={image.alt ?? ''}
                    width={image.width ?? 960}
                    height={image.height ?? 720}
                    className="block w-full h-auto"
                    priority
                  />
                ) : (
                  <div className="aspect-[4/3] w-full rounded-2xl bg-gi-fog" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
