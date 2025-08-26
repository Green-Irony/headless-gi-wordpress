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
import ServiceHero from '../../components/ServiceHero';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../../queries/MenuQueries';
import FeaturedCustomer from '../../components/FeaturedCustomer';

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
        <ServiceHero
          title="MuleSoft integration, delivered faster"
          subhead="AI-accelerated, senior-led MuleSoft delivery cuts integration timelines in half—so you get rock-solid, enterprise-grade integrations in weeks, not months. (And when you’re ready for AI agents, your architecture will already be prepared.)"
          image={{ src: '/images/services-mulesoft-hero.webp', alt: 'Integration pipelines and events' }}
          primaryCta={{ label: 'Review My Integration Gaps', href: '/contact' }}
        />
        <DeliverablesWheel
          heading="What we deliver"
          items={[
            { title: 'Composable architecture & governance', body: 'Event-driven, standards-based patterns and reusable assets so integrations are fast, consistent, and future-proof.' },
            { title: 'AI-accelerated implementation', body: 'Senior MuleSoft architects use AI to build and validate integrations twice as fast—without cutting corners on quality.' },
            { title: 'Observability & reliability', body: 'End-to-end monitoring, tracing, and SLAs so issues are visible, recoverable, and rare—giving you confidence in production.' },
            { title: 'Integration gap assessment', body: 'Quick diagnostic to surface the minimal set of pipelines/events required for your first agentic win.' },
            { title: 'Deployment & validation runbook', body: 'Documented deployment steps, rollback plans, and validation processes ensure your integrations go live smoothly.' },
            { title: 'CI/CD & environment strategy', body: 'Automated pipelines, promotion gates, and secrets management across dev/test/stage/prod so every release is repeatable, auditable, and fast.' },
          ]}
        />
        <ValuePillars
          heading="From integration backlog to business impact — fast"
          subhead="Cut integration cycle time by 50% with composable patterns, observability, and CI/CD — so you go live in as little as 3 weeks with rock-solid reliability you can plan around."
          items={[
            { title: 'Half the cycle time', body: 'Go live in as little as 3 weeks.', iconNode: (
              <img src="/icons/agent_astro.svg" alt="" />
            ) },
            { title: 'Predictable performance', body: 'Clear SLAs, monitoring, and reliability from day one.', iconNode: (
              <img src="/icons/mixed_sources_mapping.svg" alt="" />
            ) },
            { title: 'Scalable foundation', body: 'Composable base ready for new systems, processes, and agents.', iconNode: (
              <img src="/icons/high_velocity_sales.svg" alt="" />
            ) },
          ]}
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
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gi-text">Featured customer story</h2>
            <a href="/customer-stories" className="text-sm font-semibold text-gi-text hover:underline">See all</a>
          </div>
          <FeaturedCustomer
            title="Spirit Airlines: Event-driven operations at scale"
            href="/customer-stories/spirit"
            img={{ src: '/logos/spirit.svg', alt: 'Spirit Airlines' }}
            excerpt="How composable MuleSoft integrations enabled faster time-to-value for IT investments."
            tag="Travel & Transportation"
          />
        </section>
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