import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroCenterPro from '../../components/HeroCenterPro';
import PillarsDynamic from '../../components/PillarsDynamic';
import ValuePillars from '../../components/ValuePillars';
import HowItWorksLinear from '../../components/HowItWorksLinear';
import WhyUsBanner from '../../components/WhyUsBanner';
import PreFooterCTA from '../../components/PreFooterCTA';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../../queries/MenuQueries';

const Page: any = function TravelSolutionsPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Travel &amp; Transportation AI &amp; Integration Solutions | Green Irony</title>
        <meta name="description" content="Event-driven MuleSoft and AI agentic workflows that cut delivery time, improve coordination, and unlock capacity—built from Spirit Airlines-scale operational learnings." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        {/* Hero */}
        <HeroCenterPro
          title="Real-time operations without the friction"
          body="Event-driven integration and AI agents that coordinate across ops, customer experience, and fulfillment—so you cut cycle time in half, deflect routine demand, and unlock capacity. What worked at Spirit Airlines is now bottled into an AI-native delivery engine for travel and transportation teams."
          primaryCta={{ label: 'Explore the Travel Playbook', href: '#playbook' }}
          secondaryCta={{ label: 'Talk to an Expert', href: '/contact' }}
          kpis={[]}
          showPrimaryCta={true}
          showSecondaryCta={true}
        />

        {/* Problem statement */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-xl border border-gi-fog bg-gi-subtle px-6 py-5">
            <h2 className="text-lg font-semibold text-gi-text">The problem</h2>
            <p className="mt-2 max-w-4xl text-gi-gray">Travel and transportation operations are complex, reactive, and siloed. Delays ripple, manual handoffs multiply, and critical context is lost between systems—making it nearly impossible to scale real-time coordination without ballooning cost or risk.</p>
          </div>
        </section>

        {/* Approach / What we do */}
        <PillarsDynamic
          heading="What we do"
          mode="grid"
          items={[
            { title: 'Event-driven MuleSoft backbone', body: 'Real-time data flows that surface state changes across crew, maintenance, customer systems, and logistics.', accentStrength: 20 },
            { title: 'AI agent orchestration', body: 'Agents consume those signals, surface alerts, take safe actions (e.g., rebook, notify, escalate), and reduce manual coordination.', accentStrength: 15 },
            { title: 'Operational playbook reuse', body: 'We’ve codified Spirit Airlines lessons into repeatable patterns—accelerating your first-win with less discovery friction.', accentStrength: 20 },
            { title: 'Outcome-aligned pilots', body: 'Scoped around high-leverage workflows (delays, customer disruption, crew coordination) with measurable KPIs.', accentStrength: 15 },
          ]}
        />

        {/* What you get */}
        <PillarsDynamic
          heading="What you get"
          mode="grid"
          items={[
            { title: 'Reference event-driven architecture', body: 'Tailored to your ecosystem.' , accentStrength: 20},
            { title: 'Agent use-case design', body: 'Dispatch, disruption handling, customer updates—clear jobs and safe actions.', accentStrength: 15 },
            { title: 'Integration implementation sprint', body: 'AI-infused to halve cycle time.', accentStrength: 20 },
            { title: 'Real-time alerting + action pipelines', body: 'Signals that drive safe, automated actions.', accentStrength: 15 },
            { title: 'KPI scorecard', body: 'Delay resolution time, manual handoff reduction, CSAT proxy, capacity reclaimed.', accentStrength: 20 },
          ]}
        />

        {/* Outcomes */}
        <HowItWorksLinear
          id="outcomes"
          heading="Outcome promise"
          steps={[
            { k: '01', title: 'Faster decision loops', body: 'Coordination across ops moves in real time.' },
            { k: '02', title: 'Reduced manual coordination', body: 'Capacity freed through safe agent actions.' },
            { k: '03', title: 'Improved customer experience', body: 'Proactive resolution and communication.' },
            { k: '04', title: 'Predictable scaling', body: 'Agentic workflows expand without extra headcount.' },
          ]}
        />

        {/* Proof / Origin */}
        <WhyUsBanner body="Built from the same event-driven delivery discipline and integration patterns that powered Spirit Airlines’ operational scale. That institutional knowledge is now a reusable, AI-native delivery engine—so you get the same reliability and speed with less friction." />

        {/* Why Green Irony */}
        <WhyUsBanner body="We don’t just automate; we operationalize intelligence. MuleSoft + real-time events + agent execution makes coordination proactive instead of reactive—delivering throughput only large-scale travel ops previously had." />

        {/* Pre-footer CTA */}
        <PreFooterCTA
          id="playbook"
          title="Explore the Travel Playbook"
          body="Deep dives, patterns, and accelerators for real-time operational outcomes."
          primaryCta={{ label: 'Explore the Playbook', href: '#playbook' }}
          secondaryCta={{ label: 'Start my first-win agent', href: '/contact' }}
        />
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