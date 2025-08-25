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
        <ServiceHero
          title="Data & Migrations, done right"
          subhead="Seamless platform migrations and trusted data pipelines so your teams (and future agents) make reliable, real-time decisions—without surprises or downtime."
          image={{ src: '/images/data-migration.webp', alt: 'Data migrations' }}
          primaryCta={{ label: 'Map My Data for AI', href: '/contact' }}
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
        <ValuePillars
          heading="From messy data to dependable decisions — fast"
          items={[
            { title: 'Foundation for speed', body: 'Strong data models and governed domains unlock fast, safe change.', iconNode: (
              <img src="/icons/data_model.svg" alt="" />
            ) },
            { title: 'Trust you can build on', body: 'Reconciled, validated data becomes the source of truth for every team.', iconNode: (
              <img src="/icons/check.svg" alt="" />
            ) },
            { title: 'Real‑time ready', body: 'Event‑driven pipelines keep context fresh—powering agents and new experiences.', iconNode: (
              <img src="/icons/data_cloud.svg" alt="" />
            ) },
          ]}
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