import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCenterPro from '../components/HeroCenterPro';
import AccordionWithMedia from '../components/AccordionWithMedia';
import OriginStoryShowcase from '../components/OriginStoryShowcase';
import MissionBanner from '../components/MissionBanner';
import HowWeWorkSerpentine from '../components/HowWeWorkSerpentine';
import { useQuery } from '@apollo/client';
import FaqSimple from '../components/FaqSimple';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function AboutPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const pageTitle = 'About Green Irony | AI-Native Consulting & Digital Labor';
  const metaDescription = 'Learn how Green Irony rebuilt consulting around agentic AI to deliver faster, smarter, and more affordable outcomes—combining integration-first foundations with senior expertise.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>
        <HeroCenterPro
          title="We’ve always moved fast. Now we move twice as fast."
          body="Trusted since 2016 for enterprise‑grade Salesforce and MuleSoft delivery. Today, we’re AI‑native—cutting timelines in half while keeping US‑based quality and predictability."
          primaryCta={{ label: 'Start Your First Win', href: '/contact' }}
          secondaryCta={{ label: 'Explore Careers', href: '/careers' }}
          kpis={[{ label: '⚡ Faster delivery' }, { label: '⬇️ Deflection up' }, { label: '🧠 Capacity unlocked' }]}
          showMedia={false}
        />

        {/* Origin Story */}
        <section className="mx-auto max-w-7xl px-0 py-12">
          <OriginStoryShowcase
            title="Our Origin Story"
            lead="We started as senior Salesforce and integration architects who cared about outcomes over headcount. As platforms grew more powerful and projects more complex, we rebuilt our delivery engine around AI. What used to take months to scope and stabilize now turns into predictable wins in weeks—thanks to senior-led architecture, integration-first execution, and AI accelerating every step from discovery to build."
            milestones={[
              {
                k: '2016',
                label: 'Roots',
                title: 'Built on Salesforce',
                body: 'Early implementations focused on quality, adoption, and scale.',
                impacts: ['Solutions that match business processes'],
              },
              {
                k: '2018',
                label: 'Roots',
                title: 'Integration becomes the backbone',
                body: 'MuleSoft unlocks composable, event-driven delivery.',
                impacts: ['Event-driven foundations'],
              },
              {
                k: '2024',
                label: 'Pivot',
                title: 'Reimagined as AI-native',
                body: 'Every phase—discovery, design, delivery—moves 2× faster.',
                impacts: ['Agent job design', 'Safe actions'],
              },
              {
                k: 'Now',
                label: 'Today',
                title: 'Wins in weeks',
                body: 'Go live in as little as 3 weeks for new integrations and agents—without sacrificing reliability.',
                impacts: ['½ delivery time', 'Deflection ↑', 'Capacity ↑'],
              },
            ]}
            poster={{ imageSrc: '/images/accordion-sample.svg', imageAlt: 'Origin story visual', badge: 'AI‑Native' }}
            showCredibilityRow={false}
            initialMilestone={'Now'}
            imageLeft={false}
          />
        </section>

        {/* Mission */}
        <MissionBanner
          eyebrow="Our Company Mission"
          headline="Help organizations realize transformative value by embedding AI into every stage of their integration and Salesforce journey—so teams move faster, decisions get smarter, and outcomes are predictable."
          highlight={null}
          promises={[
            'Eight-week first wins',
            'Integration before intelligence',
            'Safe actions, measurable outcomes',
          ]}
          //primaryCta={{ label: 'Plan my first win', href: '/contact' }}
          //secondaryCta={{ label: 'See how we deliver', href: '/services' }}
          badge="AI‑Native"
          background={{ pattern: 'curves', intensity: 1 }}
          align="center"
        />

        {/* Differentiators */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <div className="mt-6">
            <AccordionWithMedia
              heading="What makes us different"
              imageSrc="/images/accordion-sample.svg"
              imageAlt="Illustration of Green Irony services"
              imageRight={false}
              items={[
                {
                  title: 'AI-Native from Day One',
                  body:
                    "Agents aren’t bolt-ons—they’re embedded in scoping, execution, and iteration. That means faster pilots, safer actions, and clearer expansion paths.",
                },
                {
                  title: 'Integration as the Engine',
                  body:
                    'We don’t add AI on top of broken systems. We connect the right data and events first so agents can see, decide, and act with real impact.',
                },
                {
                  title: 'Senior-Led, Amplified by AI',
                  body:
                    'Experienced architects guide every engagement, using AI to accelerate delivery—delivering the leverage of a larger team without dilution.',
                },
                {
                  title: 'Outcome Orientation',
                  body:
                    'Every project starts with the business result (speed, deflection, capacity) and works backward to the technical design.',
                },
                {
                  title: 'Lean Partner Mentality',
                  body:
                    'We act as embedded extensions, especially for resource-constrained SMBs and nimble enterprise initiatives—prioritizing high-leverage wins over bloated roadmaps.',
                },
              ]}
            />
          </div>
        </section>

        {/* How we work */}
        <HowWeWorkSerpentine
          title="How We Work"
          subhead="Align → Prove → Scale"
          steps={[
            { k: '01', title: 'Align', caption: 'Focused working sessions to lock goals, constraints, and success metrics.' },
            { k: '02', title: 'Blueprint', caption: 'Senior architects design the composable foundation and delivery plan.' },
            { k: '03', title: 'Build', caption: 'AI-accelerated sprints deliver working software faster, with quality gates baked in.' },
            { k: '04', title: 'Prove', caption: 'UAT and cutover plans ensure smooth go-lives and measurable outcomes.' },
            { k: '05', title: 'Scale', caption: 'Reuse patterns, expand safely, and continue improving with clear KPIs.' },
          ]}
          variant="serpentine"
          showNumbers
          progressIndex={null}
        />

        <FaqSimple />

        {/* Closing CTA */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-2xl border border-gi-fog bg-white p-8 text-center shadow-gi">
            <h2 className="text-2xl font-semibold text-gi-text">Ready to move twice as fast—without the tradeoffs?</h2>
            <div className="mt-6 flex justify-center gap-3">
              <a className="btn-primary" href="/contact">Start Your First Win</a>
              <a className="btn-secondary" href="/careers">Explore Careers</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Page;

export async function getStaticProps(context: any) {
  return getNextStaticProps(context, { Page, revalidate: 60 });
}

(Page as any).queries = [
  { query: SITE_DATA_QUERY },
  { query: HEADER_MENU_QUERY },
] as any; 