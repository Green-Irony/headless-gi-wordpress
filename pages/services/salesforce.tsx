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

const Page: any = function SalesforcePage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Salesforce Optimization | Green Irony</title>
        <meta name="description" content="Make Salesforce the control room for both humans and agents to unlock real outcomes." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        <HeroCenterPro
          title="Salesforce Optimization"
          body="Make Salesforce the control room for humans + agents—so outcomes are visible and controllable."
          primaryCta={{ label: 'Optimize My Org', href: '/contact' }}
          secondaryCta={{ label: 'See how it works', href: '#how' }}
        />

        <ValuePillars
          heading="Why optimize Salesforce"
          subhead="Clarify workflows, surface signals, and create safe action paths across teams."
          items={[
            { title: 'Operational Clarity', body: 'The right signals and actions at the right moment.' },
            { title: 'Agent + Human UX', body: 'Design interfaces and automations that work together.' },
            { title: 'Governed Scaling', body: 'Add automation with guardrails for quality and trust.' },
          ]}
        />

        <HowItWorksLinear
          id="how"
          heading="Landing Salesforce value"
          steps={[
            { k: '01', title: 'Assess', body: 'Identify friction points in flows and data.' },
            { k: '02', title: 'Optimize', body: 'Improve pipelines, screens, and safe actions.' },
            { k: '03', title: 'Measure', body: 'Track cycle time, quality, and capacity.' },
            { k: '04', title: 'Expand', body: 'Roll out to new teams and use cases.' },
          ]}
          cta={{ label: 'Optimize My Org', href: '/contact' }}
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