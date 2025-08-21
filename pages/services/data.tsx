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
        <HeroSimple
          title="Data & Migrations, done right"
          subhead="Seamless platform migrations and trusted data pipelines so your teams (and future agents) make reliable, real-time decisions—without surprises or downtime."
        />
        <DeliverablesWheel
          heading="What we deliver"
          items={[
            { title: 'Migration strategy & cutover plan', body: 'Risk‑based sequencing, dry runs, and rollback plans so go‑live is smooth and predictable.' },
            { title: 'Data quality & reconciliation', body: 'Profiling, cleansing, and deduplication with reconciled counts—so stakeholders trust the numbers on day one.' },
            { title: 'Composable pipelines & events', body: 'Standards‑based, event‑enriched pipelines that keep systems in sync and make downstream automation simpler.' },
            { title: 'Security, governance & lineage', body: 'Access controls, PII handling, and lineage tracking aligned to your compliance requirements.' },
          ]}
        />
        <ChecklistCard
          heading="From messy data to dependable decisions — fast"
          items={[
            'Minimal downtime — Cutovers are planned and tested so teams stay productive.',
            'Trusted from day one — Clean, reconciled datasets with validation checks.',
            'Ready for real time — Event‑driven pipelines that keep data current across systems.',
          ]}
          columns={3}
        />
        <WhyUsBanner
          bullets={[
            'AI‑accelerated delivery: Mapping, transformation, and validation move faster without sacrificing accuracy.',
            'Senior‑led execution: US‑based architects who’ve handled complex, high‑risk migrations.',
            'Composable patterns: Reusable pipelines and standards that reduce rework and cost.',
            'Predictable outcomes: Clear plans, visible checkpoints, and no‑surprise go‑lives.',
          ]}
        />
        <PreFooterCTA
          title="Map your data for AI"
          body="We’ll define trusted sources, freshness guarantees, and event patterns to power safe agent action."
          primaryCta={{ label: 'Start a data blueprint', href: '/contact' }}
          secondaryCta={{ label: 'See migration playbook', href: '/plan' }}
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