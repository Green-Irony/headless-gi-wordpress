import Head from 'next/head';
import { useRouter } from 'next/router';
import { buildCanonicalUrl } from '../lib/seo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCenterPro from '../components/HeroCenterPro';
import AccordionWithMedia from '../components/AccordionWithMedia';
import CoreValues from '../components/CoreValues';
import PlatformExpertise from '../components/PlatformExpertise';
import MissionBanner from '../components/MissionBanner';
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

  const router = useRouter();
  const canonicalUrl = buildCanonicalUrl(router?.asPath || '/');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
        {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>
        <HeroCenterPro
          title="We’ve always moved fast. Now we move twice as fast."
          body="Trusted since 2016 for enterprise‑grade Salesforce and MuleSoft delivery. Today, we’re AI‑native—cutting timelines in half while keeping US‑based quality and predictability."
          primaryCta={{ label: 'Start Your First Win', href: '/contact/' }}
          secondaryCta={{ label: 'Explore Careers', href: '/careers/' }}
          //kpis={[{ label: '⚡ Faster delivery' }, { label: '⬇️ Deflection up' }, { label: '🧠 Capacity unlocked' }]}
          kpis={[]}
          showMedia={false}
        />

        {/* Origin Story removed per feedback */}

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
          //primaryCta={{ label: 'Plan my first win', href: '/contact/' }}
          //secondaryCta={{ label: 'See how we deliver', href: '/services' }}
          badge="AI‑Native"
          background={{ pattern: 'curves', intensity: 1 }}
          align="center"
        />

        {/* Core Values */}
        <CoreValues
          heading="Our Core Values"
          items={[
            { title: 'AI First', body: "AI isn’t a side tool — it’s the foundation of how we work. There’s nothing in the history of technology that makes pigs fly like AI. At Green Irony, being great at your job means knowing how to use AI to deliver faster, smarter, and better outcomes. Every role is about directing digital labor to multiply your impact." },
            { title: 'Get It Done', body: 'Clarity + ownership = results. If you’re unclear on what needs to happen, ask questions, get aligned, and then make it happen. We value people who own their work, push through obstacles, and deliver outcomes — not excuses. Speed matters, but so does finishing strong.' },
            { title: 'No BS', body: 'Straight talk. Real accountability. We believe in honesty, transparency, and cutting through noise. That means no politics, no fluff, and no hiding problems. Respectful candor helps us move faster and trust each other more.' },
            { title: 'Decompress', body: 'Work smart, recharge hard. We don’t glorify burnout. We work efficiently so we can save our energy for the moments that truly demand it. Decompression fuels creativity, resilience, and long-term performance. We want you at your best — not burned out.' },
          ]}
        />

        {/* Differentiators */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <div className="mt-6">
            <AccordionWithMedia
              heading="What makes us different"
              imageSrc="/images/expert-AI.webp"
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

        {/* How we work removed per feedback */}

        <PlatformExpertise />
        <FaqSimple />

        {/* Closing CTA */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-2xl border border-gi-fog bg-white p-8 text-center shadow-gi">
            <h2 className="text-2xl font-semibold text-gi-text">Ready to move twice as fast—without the tradeoffs?</h2>
            <div className="mt-6 flex justify-center gap-3">
              <a className="btn-primary" href="/contact/">Start Your First Win</a>
              <a className="btn-secondary" href="/careers/">Explore Careers</a>
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