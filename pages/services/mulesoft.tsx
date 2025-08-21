import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroCenterPro from '../../components/HeroCenterPro';
import ChecklistCard from '../../components/ChecklistCard';
import ValuePillars from '../../components/ValuePillars';
import PreFooterCTA from '../../components/PreFooterCTA';
import HeroSimple from '../../components/HeroSimple';
import DeliverablesWheel from '../../components/DeliverablesWheel';
import WhyUsBanner from '../../components/WhyUsBanner';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../../queries/MenuQueries';

const Page: any = function MulesoftPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>MuleSoft Integration (AI-led) | Green Irony</title>
        <meta name="description" content="Design pipelines and events so agents can see, decide, and do—ship integration-led agentic outcomes fast." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        <HeroSimple
          title="MuleSoft integration, delivered faster"
          subhead="AI-accelerated, senior-led MuleSoft delivery cuts integration timelines in half—so you get rock-solid, enterprise-grade integrations in weeks, not months. (And when you’re ready for AI agents, your architecture will already be prepared.)"
        />
        <DeliverablesWheel
          heading="What we deliver"
          items={[
            { title: 'Composable architecture & governance', body: 'Event-driven, standards-based patterns and reusable assets so integrations are fast, consistent, and future-proof.' },
            { title: 'AI-accelerated implementation', body: 'Senior MuleSoft architects use AI to build and validate integrations twice as fast—without cutting corners on quality.' },
            { title: 'Observability & reliability', body: 'End-to-end monitoring, tracing, and SLAs so issues are visible, recoverable, and rare—giving you confidence in production.' },
            { title: 'Integration gap assessment', body: 'Quick diagnostic to surface the minimal set of pipelines/events required for your first agentic win.' },
            { title: 'Deployment & validation runbook', body: 'Documented deployment steps, rollback plans, and validation processes ensure your integrations go live smoothly.' },
          ]}
        />
        <ChecklistCard
          heading="From integration backlog to business impact — fast"
          items={[
            'Half the cycle time — Integrations go live in as little as 3 weeks.',
            'Predictable performance — Clear SLAs, monitoring, and reliability from day one.',
            'Scalable foundation — Composable base ready for new systems, processes, and agents.',
          ]}
          columns={3}
        />
        <WhyUsBanner
          body="Our senior MuleSoft architects, augmented by AI, ship faster with higher reliability—so your agents can act with confidence."
          bullets={[
            'Proven expertise: Trusted in high-stakes environments where uptime matters most.',
            'AI-native methods: Every step accelerated with AI for 2× faster delivery.',
            'US-based senior team: Offshore-competitive economics without the tradeoffs.',
            'Predictable outcomes: Governance and reusable patterns that prevent rework and keep costs in check.',
          ]}
        />
        <PreFooterCTA
          title="Review your integration gaps"
          body="We’ll map the minimal event and pipeline set your first agent needs to act."
          primaryCta={{ label: 'Book an assessment', href: '/contact' }}
          secondaryCta={{ label: 'See our accelerators', href: '/plan' }}
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