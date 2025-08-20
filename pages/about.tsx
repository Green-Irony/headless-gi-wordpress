import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCenterPro from '../components/HeroCenterPro';
import AccordionWithMedia from '../components/AccordionWithMedia';
import OriginStoryShowcase from '../components/OriginStoryShowcase';
import MissionBanner from '../components/MissionBanner';
import HowWeWorkSerpentine from '../components/HowWeWorkSerpentine';
import { useQuery } from '@apollo/client';
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
          body="Trusted since 2018 for enterprise‑grade Salesforce and MuleSoft delivery. Today, AI‑native—cutting timelines in half while keeping US‑based quality and predictability."
          primaryCta={{ label: 'Meet the Team', href: '#team' }}
          secondaryCta={{ label: 'Start Your First Win', href: '/contact' }}
          kpis={[{ label: '⚡ Faster delivery' }, { label: '⬇️ Deflection up' }, { label: '🧠 Capacity unlocked' }]}
          showMedia={false}
        />

        {/* Origin Story */}
        <section className="mx-auto max-w-7xl px-0 py-12">
          <OriginStoryShowcase
            title="Our Origin Story"
            lead="Founded on the lessons of large-scale integration and delivery, Green Irony evolved from traditional consulting into an AI-native delivery engine. What used to take months to scope, integrate, and stabilize is now compressed into predictable eight-week first wins—thanks to agentic automation, senior-led architecture, and integration-first execution. The same operational rigor that powered major event-driven initiatives (like at Spirit Airlines) is now available without enterprise bloat."
            milestones={[
              {
                k: '2016',
                label: 'Roots',
                title: 'Built on Salesforce',
                body: 'Salesforce delivery at scale.',
                impacts: ['Solutions that match business processes'],
              },
              {
                k: '2018',
                label: 'Roots',
                title: 'Integration builds the backbone of a business',
                body: 'MuleSoft connects the enterprise at the middleware.',
                impacts: ['Event-driven foundations'],
              },
              {
                k: '2024',
                label: 'Pivot',
                title: 'Reimagined as AI-native',
                body: 'Agents embedded in delivery to compress time-to-value.',
                impacts: ['Agent job design', 'Safe actions'],
              },
              {
                k: 'Now',
                label: 'Today',
                title: 'Eight-week first wins',
                body: 'Predictable outcomes: speed, deflection, capacity unlocked.',
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
          headline="To make enterprise-grade AI and integration accessible to organizations of all sizes by delivering predictable, scalable business outcomes through agent-native digital labor."
          highlight={{ text: 'accessible to organizations of all sizes' }}
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

        {/* Team snapshot */}
        <section id="team" className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">Team / Credibility Snapshot</h2>
          <p className="mt-3 max-w-4xl text-gi-gray">(Placeholder — replace with real names/photos/bios)</p>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            <li className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi"><strong>Founder / CEO:</strong> [Name] — Engineer turned operator with deep experience in middleware, Salesforce/MuleSoft integration, and architecting AI-native firms.</li>
            <li className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi"><strong>Principal Architect:</strong> [Name] — Builds scalable, event-driven systems that power agentic workflows.</li>
            <li className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi"><strong>AI Delivery Lead:</strong> [Name] — Designs job descriptions for agents and operationalizes safe actions.</li>
            <li className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi"><strong>Customer Success / Ops:</strong> [Name] — Bridges outcomes back into the business to ensure adoption and scale.</li>
          </ul>
          <p className="mt-4 text-sm text-gi-gray">Optional badges/credentials to display: Salesforce partner expertise, MuleSoft delivery track record, case study logos, certifications.</p>
        </section>

        {/* How we work */}
        <HowWeWorkSerpentine
          title="How We Work"
          subhead="Align → Prove → Scale"
          steps={[
            { k: '01', title: 'Align', caption: 'Choose the first win and KPIs' },
            { k: '02', title: 'Blueprint', caption: 'Minimal integrations for agent action' },
            { k: '03', title: 'Build', caption: 'Pilot with safe actions' },
            { k: '04', title: 'Prove', caption: 'Measure speed, deflection, capacity' },
            { k: '05', title: 'Scale', caption: 'Adopt and expand predictably' },
          ]}
          variant="serpentine"
          showNumbers
          progressIndex={null}
        />

        {/* FAQ */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">FAQ</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-medium text-gi-text">What does “AI-native” mean?</h3>
              <p className="mt-1 text-sm text-gi-gray">Agents are part of the delivery system, not a feature added later. Their jobs, data access, and actions are designed from the start.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-medium text-gi-text">How quickly can we see results?</h3>
              <p className="mt-1 text-sm text-gi-gray">Most first wins are scoped and delivered in approximately eight weeks.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-medium text-gi-text">Do you work with small teams?</h3>
              <p className="mt-1 text-sm text-gi-gray">Yes. Our model amplifies small teams through digital labor—delivering enterprise-grade outcomes without enterprise overhead.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-medium text-gi-text">What industries do you serve?</h3>
              <p className="mt-1 text-sm text-gi-gray">Travel, higher education, SMBs, and any organization relying on Salesforce/MuleSoft to run critical workflows.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi md:col-span-2">
              <h3 className="font-medium text-gi-text">How do you ensure AI actions are safe?</h3>
              <p className="mt-1 text-sm text-gi-gray">Through scoped agent job definitions, guardrails, approval flows, and observability baked into every action path.</p>
            </div>
          </div>
        </section>

        {/* Careers */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">Careers / Join Us</h2>
          <h3 className="mt-2 text-lg font-semibold text-gi-text">Build the future of consulting</h3>
          <p className="mt-2 max-w-4xl text-gi-gray">Join a flat, AI-native team that values speed, experimentation, and measurable impact. Work on integration-first architectures, agentic delivery, and real customer outcomes.</p>
          <div className="mt-4"><a className="btn-secondary" href="#contact">View Open Roles / Get in Touch</a></div>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-2xl border border-gi-fog bg-white p-8 text-center shadow-gi">
            <h2 className="text-2xl font-semibold text-gi-text">Ready to prove your first win?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-gi-gray">From integration to agent to outcome—we’ll map your eight-week path.</p>
            <div className="mt-6"><a className="btn-primary" href="#contact">Start Your First Win</a></div>
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