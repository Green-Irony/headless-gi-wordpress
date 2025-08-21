import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroSimple from '../../components/HeroSimple';
import DeliverablesWheel from '../../components/DeliverablesWheel';
import ChecklistCard from '../../components/ChecklistCard';
import WhyUsBanner from '../../components/WhyUsBanner';
import PreFooterCTA from '../../components/PreFooterCTA';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../../queries/MenuQueries';

const Page: any = function AgentforcePage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>AI &amp; Digital Labor (Agentforce) | Green Irony</title>
        <meta name="description" content="Launch agents with jobs, safe actions, and KPIs—unlock measurable impact with integration-led delivery." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        <HeroSimple
          title="AI agents that work—right from the start"
          subhead="Whether it’s your first agent or your next ten, we design Salesforce‑native agents with clear jobs, safe actions, and measurable KPIs. Delivered by US‑based experts using AI‑accelerated methods, you’ll see value twice as fast—and scale with confidence."
        />
        <DeliverablesWheel
          heading="What we deliver"
          items={[
            { title: 'Use-case selection & KPI definition', body: 'Identify the highest‑ROI workflow and define success metrics (deflection, cycle time, capacity uplift).' },
            { title: 'Knowledge & data architecture', body: 'Give agents a reliable source of truth with retrieval layers, freshness guarantees, and actionable context.' },
            { title: 'Safe action design', body: 'Build guardrails, approvals, and fallback behaviors so agent actions are always trustworthy.' },
            { title: 'Pilot build & launch', body: 'Deliver an end‑to‑end working agent with only the integrations needed to prove measurable value fast.' },
            { title: 'Adoption & iteration plan', body: 'Align stakeholders, close the feedback loop, and expand with confidence—each step tied to measurable outcomes.' },
            { title: 'Scalability roadmap', body: 'Move from a single pilot to enterprise‑wide digital labor with a step‑by‑step plan to scale agents safely and predictably across teams.' },
          ]}
        />
        <ChecklistCard
          heading="Outcome promise"
          items={[
            'Working agent in 8 weeks — Delivers a clear, business-valued outcome.',
            'Automation coverage — Focus on repetitive, structured work to maximize impact.',
            'Capacity freed — Shift routine effort to agents while keeping humans in the loop for escalation.',
          ]}
          columns={3}
        />
        <WhyUsBanner
          //body="We orchestrate agents as real operators—job definitions, safe actions, and KPIs—so the first win lands quickly and scales predictably."
          bullets={[
            'Proven expertise: Enterprise‑grade Salesforce and MuleSoft partner since 2016.',
            'AI‑native methods: Every step accelerated with AI for 2× faster delivery.',
            'US‑based senior talent: Offshore‑competitive economics without the tradeoffs.',
            'Predictable outcomes: Scope, build, and go‑live you can plan around.',
          ]}
        />
        <PreFooterCTA
          title="Plan your first agent win"
          body="Bring a workflow, we’ll shape the job, safe actions, and KPIs to launch in ~8 weeks."
          primaryCta={{ label: 'Scope My First Agent', href: '/contact' }}
          secondaryCta={{ label: 'Get the 8-Week Plan', href: '/plan' }}
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