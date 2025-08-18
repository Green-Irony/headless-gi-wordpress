import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import HeroCenterPro from "../components/HeroCenterPro";
import TrustStrip from "../components/TrustStrip";
import ValuePillars from "../components/ValuePillars";
import FeaturedOffers from "../components/FeaturedOffers";
import OfferTiles from "../components/OfferTiles";
import { AiIcon, MuleIcon, SalesforceIcon, DataIcon } from "../components/Header";
import HowItWorksLinear from "../components/HowItWorksLinear";
import CustomerStoriesProof from "../components/CustomerStoriesProof";
import LeadMagnetCTA from "../components/LeadMagnetCTA";
import PreFooterCTA from "../components/PreFooterCTA";
import { FRONT_PAGE_SECTIONS_QUERY, FRONT_PAGE_MIN_QUERY } from "../queries/SectionsQueries";
import { renderSections } from "../lib/sectionRegistry";

const ENABLE_SECTIONS = process.env.NEXT_PUBLIC_ENABLE_WP_SECTIONS === "1";

export default function FrontPage(props) {
  if (props.loading) {
    return <>Loading...</>;
  }

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || {
    nodes: [],
  };
  const { title: siteTitle, description: siteDescription } = siteData;
  const effectiveSiteDescription = siteDescription || 'Turning AI into Actual Intelligence';

  const sectionsQuery = useQuery(ENABLE_SECTIONS ? FRONT_PAGE_SECTIONS_QUERY : FRONT_PAGE_MIN_QUERY, {
    variables: { uri: "/" },
  });
  const sections = sectionsQuery?.data?.page?.sections || [];
  const hasSections = ENABLE_SECTIONS && Array.isArray(sections) && sections.length > 0;

  return (
    <>
      <Head>
        <title>{`${siteTitle} | ${effectiveSiteDescription}`}</title>
        <meta name="description" content={effectiveSiteDescription} />
      </Head>

      <Header
        siteTitle={siteTitle}
        siteDescription={effectiveSiteDescription}
        menuItems={menuItems}
      />

      <main>
        {hasSections ? (
          renderSections(sections)
        ) : (
          <>
            <HeroCenterPro />
            <OfferTiles
              title="What we deliver"
              items={[
                {
                  title: 'MuleSoft Integration (AI‑led)',
                  description: 'Pipelines & events so agents can see, decide, and do.',
                  href: '/services#mulesoft',
                  icon: <MuleIcon className="h-24 w-24 text-gi-green" />
                },
                {
                  title: 'AI & Digital Labor (Agentforce)',
                  description: 'Launch agents with jobs, safe actions, and KPIs.',
                  href: '/services#agentforce',
                  icon: <AiIcon className="h-24 w-24 text-gi-green" />
                },
                {
                  title: 'Salesforce',
                  description: 'Make Salesforce the control room for humans + agents.',
                  href: '/services#salesforce',
                  icon: <SalesforceIcon className="h-24 w-24 text-gi-green" />
                },
                {
                  title: 'Data & Migrations',
                  description: 'Trusted knowledge and real‑time context for agents.',
                  href: '/services#data',
                  icon: <DataIcon className="h-24 w-24 text-gi-green" />
                }
              ]}
            />
            <TrustStrip />
            <ValuePillars />
            {/* <HowItWorksLinear
              heading="A lean path to your first AI outcome"
              steps={[
                { k: '01', title: 'Align', body: 'Pick the high‑impact workflow and define KPIs—deflection, cycle time, capacity.' },
                { k: '02', title: 'Launch', body: 'AI‑accelerated integration + agent build; first working agent in ~8 weeks.' },
                { k: '03', title: 'Measure', body: 'Track deflection lift, cycle‑time reduction, and capacity freed.' },
                { k: '04', title: 'Scale', body: 'Expand to new workflows, add safe actions, and deepen automation.' },
              ]}
            /> */}
            <CustomerStoriesProof />
            <LeadMagnetCTA />
            <PreFooterCTA />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page: FrontPage,
    revalidate: 60,
  });
}

FrontPage.queries = [
  { query: SITE_DATA_QUERY },
  { query: HEADER_MENU_QUERY },
];
