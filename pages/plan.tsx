import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomepageHero from '../components/HomepageHero';
import ValuePillars from '../components/ValuePillars';
import HowItWorksLinear from '../components/HowItWorksLinear';
import AccordionWithMedia from '../components/AccordionWithMedia';
import LeadMagnetCTA from '../components/LeadMagnetCTA';
import PreFooterCTA from '../components/PreFooterCTA';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function PlanPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const pageTitle = 'Your 8‑Week Agent Launch Plan';
  const metaDescription = 'A practical, step‑by‑step guide to scope, build, and launch your first AI agent in ~8 weeks—with clear deliverables, safe actions, and measurable outcomes.';

  return (
    <>
      <Head>
        <title>{siteTitle ? `${siteTitle} — ${pageTitle}` : pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        <HomepageHero
          id="plan-hero"
          titleLines={[
            'Your 8‑Week',
            'Agent Launch Plan',
          ]}
          body="Pick the right use case, design the minimal integrations, launch a working agent, and measure outcomes—fast. Senior‑led, AI‑accelerated delivery so you move twice as fast without sacrificing quality."
          primaryCta={{ label: 'Talk to an Expert', href: '/contact' }}
          secondaryCta={{ label: 'Download the Plan', href: '#download' }}
          kpis={[{ label: '⚡ Half the cycle time' }, { label: '🤖 Working agent in ~8 weeks' }, { label: '📈 Deflection, speed, capacity' }]}
          showMedia={false}
        />

        {/* Week‑by‑Week Milestones */}
        <HowItWorksLinear
          id="timeline"
          heading="Week‑by‑week milestones"
          steps={[
            { k: 'Wk 0‑1', title: 'Align', body: 'Pick the workflow with the highest ROI. Define KPIs: deflection, cycle time, capacity freed.' },
            { k: 'Wk 2‑3', title: 'Blueprint', body: 'Minimal integrations and safe actions required for a working pilot. Knowledge/data checklist.' },
            { k: 'Wk 4‑6', title: 'Build', body: 'AI‑accelerated MuleSoft integration + agent job design. Guardrails, approvals, and observability.' },
            { k: 'Wk 7‑8', title: 'Prove & Scale', body: 'Pilot launch, KPI scorecard, adoption loop, and a concrete expansion plan.' },
          ]}
          cta={{ label: 'Start my 8‑week path', href: '/contact' }}
        />

        {/* What you get */}
        <AccordionWithMedia
          heading="What you get in 8 weeks"
          imageSrc="/images/delivery-worker-with-iconic-boxes.webp"
          imageAlt="Eight‑week plan visual"
          imageRight={true}
          imageObjectFit="contain"
          imageAspectClass="aspect-[4/3]"
          imagePadding={true}
          initialOpenIndex={0}
          items={[
            { title: 'Use‑case selection & KPI scorecard', body: 'A crisp problem statement with measurable outcomes and owners.' },
            { title: 'Minimal integration blueprint', body: 'API‑led/event‑driven map so agents can see, decide, and do. No wasted build.' },
            { title: 'Agent job & action design', body: 'Clear responsibilities, safe actions, approvals, guardrails, and fallbacks.' },
            { title: 'Working pilot', body: 'End‑to‑end agent executing a scoped workflow with trustworthy data.' },
            { title: 'Operational telemetry', body: 'Observability, error handling, and performance instrumentation built in.' },
            { title: 'Adoption & scale plan', body: 'Playbook to expand coverage, add actions, and deepen automation with confidence.' },
          ]}
        />

        {/* Why it works */}
        <ValuePillars
          heading="Why this works"
          subhead="Integration‑first architecture + AI‑native delivery + senior leadership = predictable outcomes you can plan around."
          items={[
            { title: 'Deflection that scales', body: 'Agents surface answers and take safe actions to reduce live demand.' },
            { title: 'Speed to value', body: 'AI‑accelerated MuleSoft delivery cuts cycle time in half; your first working agent in ~8 weeks.' },
            { title: 'Capacity unlocked', body: 'Free experts for strategic work while agents handle structured, repeatable demand.' },
          ]}
        />

        {/* Download CTA */}
        <LeadMagnetCTA id="download" className="pt-0" />

        {/* Closing CTA */}
        <PreFooterCTA
          title="Let’s map your first win"
          body="Bring a workflow—We’ll scope the minimal integrations and safe actions to deliver a working agent in ~8 weeks."
          primaryCta={{ label: 'Start the Conversation', href: '/contact' }}
          secondaryCta={{ label: 'See services', href: '/services' }}
        />
      </main>

      <Footer />
    </>
  );
};

export default Page;

export async function getStaticProps(context: any) {
  return getNextStaticProps(context, { Page, revalidate: 60 });
}

(Page as any).queries = [
  { query: SITE_DATA_QUERY },
  { query: HEADER_MENU_QUERY },
] as any;


