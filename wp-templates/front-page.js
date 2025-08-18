import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import HomepageHero from '../components/HomepageHero';
import LogoTicker from '../components/LogoTicker';
import TrustStrip from "../components/TrustStrip";
import ValuePillars from "../components/ValuePillars";
import OfferTiles from "../components/OfferTiles";
import { AiIcon, MuleIcon, SalesforceIcon, DataIcon } from "../components/Header";
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
            <HomepageHero
              titleLines={[
                '2× Faster Delivery.',
                'Offshore Economics.',
                'Onshore Expertise.',
              ]}
              body="Launch your first AI-powered MuleSoft or Salesforce outcome in 8 weeks. Our AI-accelerated delivery cuts timelines in half—without sacrificing quality or price—so your team achieves more, faster."
              primaryCta={{ label: 'Talk to an Expert', href: '/contact' }}
              secondaryCta={{ label: 'Get the 8-Week Agent Launch Plan', href: '#plan' }}
              showMedia={false}
              mediaImage={{ src: '/logos/green-irony/Green-Irony-Logo.svg', alt: 'Green Irony services overview' }}
            />
            <LogoTicker
              items={[
                { src: '/logos/spirit.svg', alt: 'Spirit Airlines' },
                { src: '/logos/unc-charlotte.svg', alt: 'UNC Charlotte' },
                { src: '/logos/air-culinaire.png', alt: 'Air Culinaire' },
                { src: '/logos/ccu_h.png', alt: 'CCU' },
                { src: '/logos/college-hunks.png', alt: 'College Hunks' },
                { src: '/logos/HIVC.png', alt: 'HIVC' },
                { src: '/logos/Hotwire.svg', alt: 'Hotwire' },
                { src: '/logos/logo-upc-insurance-story-e1729029847866.webp', alt: 'UPC' },
                { src: '/logos/PODS-Logo.png', alt: 'PODS' },
                { src: '/logos/rochelec.png', alt: 'Rochelec' },
              ]}
              speedSeconds={45}
            />
            <OfferTiles
              className="mt-12 md:mt-16"
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
            <ValuePillars
              heading="From investment to impact — fast"
              subhead="Most AI pilots stall because agents can’t see context, act safely, or scale. We combine integration-first architecture, AI-native agent design, and senior delivery to give you outcomes you can plan around."
              items={[
                { title: 'Deflection that scales', body: 'Agents surface answers and take safe actions to reduce live demand.', iconNode: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M8 12h5l3-3" />
                    <path d="M13 9v6" />
                  </svg>
                ) },
                { title: 'Speed to value', body: 'AI‑accelerated MuleSoft delivery cuts cycle time in half; your first working agent in 8 weeks.', iconNode: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    <path d="M12 12l7-7" />
                  </svg>
                ) },
                { title: 'Capacity unlocked', body: 'Free experts for strategic work while agents handle structured, repeatable demand.', iconNode: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <circle cx="8" cy="8" r="3" />
                    <path d="M2 22c1.8-3.6 4.8-6 8-6" />
                    <circle cx="16" cy="12" r="3" />
                    <path d="M10 22c1.8-3.6 4.8-6 8-6" />
                  </svg>
                ) },
              ]}
            />
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
