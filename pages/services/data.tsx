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

const Page: any = function DataMigrationsPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Data &amp; Migrations | Green Irony</title>
        <meta name="description" content="Build the trusted knowledge and real-time context your agents need—migrate, model, and govern for outcomes." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        <HeroCenterPro
          title="Data & Migrations"
          body="Trusted knowledge and real-time context for agents—so decisions and actions are reliable."
          primaryCta={{ label: 'Map My Data for AI', href: '/contact' }}
          secondaryCta={{ label: 'See how it works', href: '#how' }}
        />

        <ValuePillars
          heading="Why data first"
          subhead="Clean, connected data ensures agents can reason and act with confidence."
          items={[
            { title: 'Trusted Knowledge', body: 'Model and govern domains critical to decisions.' },
            { title: 'Real-time Context', body: 'Stream events and updates for situational awareness.' },
            { title: 'Migration Expertise', body: 'Move and modernize safely to accelerate value.' },
          ]}
        />

        <HowItWorksLinear
          id="how"
          heading="Landing data value"
          steps={[
            { k: '01', title: 'Assess', body: 'Inventory systems, data quality, and gaps.' },
            { k: '02', title: 'Model & Migrate', body: 'Create governed models and move what matters.' },
            { k: '03', title: 'Connect', body: 'Stream events; expose real-time context.' },
            { k: '04', title: 'Operationalize', body: 'Feed agents and dashboards with trusted truth.' },
          ]}
          cta={{ label: 'Map My Data for AI', href: '/contact' }}
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