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
        <HeroCenterPro
          title="MuleSoft Integration (AI-led)"
          body="Pipelines & events so agents can see, decide, and do—making AI outcomes predictable."
          primaryCta={{ label: 'Review My Integration Gaps', href: '/contact' }}
          secondaryCta={{ label: 'See how it works', href: '#how' }}
        />

        <ValuePillars
          heading="Why integration-led"
          subhead="Event-driven integration gives agents trusted context and safe action paths."
          items={[
            { title: 'Events & Pipelines', body: 'Surface the right context at the right time for decisions.' },
            { title: 'Safety by Design', body: 'Guardrails for actions and data access.' },
            { title: 'Composable Outcomes', body: 'Reusable integration patterns accelerate each new use case.' },
          ]}
        />

        <HowItWorksLinear
          id="how"
          heading="Landing integration-led value"
          steps={[
            { k: '01', title: 'Discover', body: 'Map systems, events, and candidate actions.' },
            { k: '02', title: 'Build', body: 'Implement pipelines and safe action points.' },
            { k: '03', title: 'Validate', body: 'Run against KPIs and refine.' },
            { k: '04', title: 'Scale', body: 'Expand events/actions for adjacent workflows.' },
          ]}
          cta={{ label: 'Review My Integration Gaps', href: '/contact' }}
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