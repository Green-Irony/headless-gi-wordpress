import ServiceHero from './ServiceHero';
import WhyUsBanner from './WhyUsBanner';
import DeliverablesWheel from './DeliverablesWheel';
import PageBody from './PageBody';
import Image from 'next/image';
import { CustomerStory, StorySection } from '../lib/customerStories';
import TheChallenge from './CustomerStories/TheChallenge';
import ObjectivesPillars from './CustomerStories/ObjectivesPillars';
import Solution from './CustomerStories/Solution';
import TitleBullets from './CustomerStories/TitleBullets';

export default function CustomerStoryRenderer({ story }: { story: CustomerStory }) {
  return (
    <>
      {story.hero ? (
        <ServiceHero
          title={story.hero.title}
          subhead={story.hero.subhead}
          image={story.hero.image}
          primaryCta={story.hero.primaryCta}
          secondaryCta={story.hero.secondaryCta}
        />
      ) : null}

      {(story.sections || []).map((s: StorySection, idx: number) => {
        if (s.type === 'richText') {
          return (
            <section key={idx} className="">
              <PageBody html={s.html} />
            </section>
          );
        }
        if ((s as any).type === 'challengeSolution') {
          return (
            <section key={idx} className="mx-auto max-w-7xl px-6 py-10">
              <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="text-sm font-semibold text-gi-text">Challenge</div>
                  <p className="mt-1 text-sm text-gi-gray">{(s as any).challenge}</p>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gi-text">Solution</div>
                  <p className="mt-1 text-sm text-gi-gray">{(s as any).solution}</p>
                </div>
              </div>
            </section>
          );
        }
        if (s.type === 'challenge') {
          const promises = Array.isArray(s.promises) ? s.promises.filter((p) => typeof p === 'string').slice(0, 5) : [];
          return (
            <TheChallenge
              key={idx}
              title="THE CHALLENGE"
              body={s.title || 'What stood in the way'}
              promises={promises}
              background={{ pattern: 'curves', intensity: 1 }}
              align={s.align || 'center'}
              className="my-6"
            />
          );
        }
        if (s.type === 'objectives') {
          const richItems = Array.isArray(s.items)
            ? s.items.map((it: any) => (typeof it === 'string' ? { title: it, body: it } : it))
            : undefined;
          return (
            <ObjectivesPillars key={idx} title="Objectives" body={s.body} items={richItems} />
          );
        }
        if (s.type === 'solutionSteps') {
          return (
            <section key={idx} className="mx-auto max-w-7xl px-6 py-10">
              <h2 className="text-2xl font-semibold text-gi-text">The Solution</h2>
              <div className="mx-auto mt-2 h-[3px] w-16 bg-gradient-to-r from-gi-green to-gi-pink/70" />
              <div className="mt-6 grid items-stretch gap-6 md:grid-cols-3">
                {s.steps.map((step, i) => (
                  <div key={i} className="group relative h-full rounded-2xl bg-white p-5 shadow-gi ring-1 ring-gi-fog">
                    <div aria-hidden className="absolute left-0 top-5 h-6 w-[3px] rounded-r-full bg-gradient-to-b from-gi-green to-gi-pink/70" />
                    <div aria-hidden className="absolute left-0 top-[36px] h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-gi-pink/80" />
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gi-green/15 ring-1 ring-gi-fog">
                        {step.icon ? <img src={step.icon} alt="" className="h-4 w-4" /> : (
                          <svg viewBox='0 0 24 24' className='h-4 w-4' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M20 6L9 17l-5-5' /></svg>
                        )}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-gi-text">{step.title}</div>
                        <p className="mt-2 text-sm leading-relaxed text-gi-gray">{step.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }
        if (s.type === 'architectureHighlights') {
          return (
            <section key={idx} className="mx-auto max-w-7xl px-6 py-10">
              <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
              <h2 className="text-2xl font-semibold text-gi-text">Architecture Highlights</h2>
              <ul className="mt-3 grid list-disc gap-2 pl-5 text-gi-gray">
                {s.items.map((it, i) => (
                  <li key={i} className="text-sm">{it}</li>
                ))}
              </ul>
            </section>
          );
        }
        if (s.type === 'kpis') {
          return (
            <section key={idx} className="mx-auto max-w-7xl px-6 py-10">
              <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
              <h2 className="text-2xl font-semibold text-gi-text">Outcomes</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {s.items.map((kpi, i) => (
                  <div key={i} className="rounded-xl border border-gi-fog bg-white p-4 shadow-gi">
                    <div className="text-sm font-semibold text-gi-text">{kpi.label}</div>
                    {kpi.value ? <div className="text-lg text-gi-gray">{kpi.value}</div> : null}
                  </div>
                ))}
              </div>
            </section>
          );
        }
        if (s.type === 'results') {
          return (
            <TitleBullets key={idx} title={s.title || 'The Results'} body={s.body} bullets={s.items} bg={s.bg || 'white'} text={s.text || 'navy'} />
          );
        }
        if (s.type === 'testimonial') {
          return (
            <section key={idx} className="mx-auto max-w-3xl px-6 py-10">
              <blockquote className="border-l-2 border-gi-fog pl-4 text-lg italic text-gi-text">“{s.quote}”</blockquote>
              <div className="mt-3 flex items-center gap-3 text-sm text-gi-gray">
                {s.portraitSrc ? (
                  <Image src={s.portraitSrc} alt={s.author} width={36} height={36} className="rounded-full" />
                ) : null}
                <div>
                  <div className="font-semibold text-gi-text">{s.author}</div>
                  {s.role ? <div>{s.role}</div> : null}
                </div>
                {s.logoSrc ? (
                  <div className="ml-auto h-6 w-24 relative">
                    <Image src={s.logoSrc} alt="" fill className="object-contain" />
                  </div>
                ) : null}
              </div>
            </section>
          );
        }
        if (s.type === 'whyUs') {
          return (
            <WhyUsBanner key={idx} title={s.title || 'Why Us'} bullets={s.bullets || []} className="my-6" />
          );
        }
        if (s.type === 'deliverables') {
          return (
            <DeliverablesWheel key={idx} heading={s.heading || 'What we delivered'} items={s.items} />
          );
        }
        if (s.type === 'solution') {
          return (
            <Solution
              key={idx}
              title={s.title || 'Solution'}
              subhead={s.subhead}
              image={s.image}
              imageSide={s.imageSide || 'right'}
              bullets={s.bullets}
              bg={s.bg || 'green'}
              textPrimary={s.textPrimary || 'white'}
              textSecondary={s.textSecondary || 'navy'}
              bodyBefore={s.bodyBefore}
              bodyAfter={s.bodyAfter}
            />
          );
        }
        if (s.type === 'media') {
          return (
            <section key={idx} className="mx-auto max-w-5xl px-6 py-10">
              {s.kind === 'image' && s.src ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-gi-fog bg-white">
                  <Image src={s.src} alt={s.alt || ''} fill className="object-contain" />
                </div>
              ) : null}
              {s.kind === 'video' && s.src ? (
                <video controls className="w-full rounded-xl ring-1 ring-gi-fog bg-black">
                  <source src={s.src} />
                </video>
              ) : null}
              {s.kind === 'embed' && s.embedHtml ? (
                <div className="rounded-xl ring-1 ring-gi-fog bg-white p-2" dangerouslySetInnerHTML={{ __html: s.embedHtml }} />
              ) : null}
            </section>
          );
        }
        if (s.type === 'ctaBanner') {
          return (
            <section key={idx} className="mx-auto max-w-7xl px-6 py-10">
              <div className="rounded-2xl bg-white p-6 shadow-gi ring-1 ring-gi-fog">
                <h3 className="text-xl font-semibold text-gi-text">{s.title}</h3>
                {s.body ? <p className="mt-2 text-gi-gray">{s.body}</p> : null}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {s.primaryCta ? <a href={s.primaryCta.href} className="btn-primary">{s.primaryCta.label}</a> : null}
                  {s.secondaryCta ? <a href={s.secondaryCta.href} className="btn-secondary">{s.secondaryCta.label}</a> : null}
                </div>
              </div>
            </section>
          );
        }
        if (s.type === 'faq') {
          return (
            <section key={idx} className="mx-auto max-w-3xl px-6 py-10">
              <h2 className="text-2xl font-semibold text-gi-text">FAQs</h2>
              <div className="mt-4 divide-y divide-gi-fog rounded-2xl bg-white shadow-gi ring-1 ring-gi-fog">
                {s.items.map((qa, i) => (
                  <div key={i} className="p-5">
                    <div className="font-semibold text-gi-text">{qa.q}</div>
                    <div className="mt-1 text-sm text-gi-gray">{qa.a}</div>
                  </div>
                ))}
              </div>
            </section>
          );
        }
        if (s.type === 'relatedLinks') {
          return (
            <section key={idx} className="mx-auto max-w-3xl px-6 py-10">
              <h2 className="text-2xl font-semibold text-gi-text">Related</h2>
              <ul className="mt-3 list-disc pl-5">
                {s.items.map((it, i) => (
                  <li key={i}><a className="text-gi-green hover:underline" href={it.href}>{it.label}</a></li>
                ))}
              </ul>
            </section>
          );
        }
        return null;
      })}
    </>
  );
}


