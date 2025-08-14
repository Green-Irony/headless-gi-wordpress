import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroCenterPro from '../../components/HeroCenterPro';
import HowItWorksLinear from '../../components/HowItWorksLinear';
import ValuePillars from '../../components/ValuePillars';
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
        <HeroCenterPro
          title="AI & Digital Labor (Agentforce)"
          body="Launch agents with jobs, safe actions, and KPIs—designed to deliver measurable outcomes in ~8 weeks."
          primaryCta={{ label: 'Plan my first win', href: '/contact' }}
          secondaryCta={{ label: 'See how it works', href: '#how' }}
        />

        <ValuePillars
          heading="Why Agentforce"
          subhead="Integrate agents with your real workflows to deflect demand, reduce cycle time, and free capacity."
          items={[
            { title: 'Jobs + Safe Actions', body: 'Agents that can take real actions in your systems—safely.' },
            { title: 'Integration-led', body: 'Event-driven pipelines so agents can see, decide, and do.' },
            { title: 'Measured Outcomes', body: 'KPIs baked in: deflection, cycle time, capacity.' },
          ]}
        />

        <HowItWorksLinear
          id="how"
          heading="How Agentforce lands value"
          steps={[
            { k: '01', title: 'Align', body: 'Pick the workflow, define KPIs, map actions.' },
            { k: '02', title: 'Launch', body: 'Integration-first build; working agent in ~8 weeks.' },
            { k: '03', title: 'Measure', body: 'Scorecard for deflection, cycle time, capacity.' },
            { k: '04', title: 'Scale', body: 'Expand to new workflows; add safe actions.' },
          ]}
          cta={{ label: 'Plan my first win', href: '/contact' }}
        />

        <PreFooterCTA />
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