import Head from "next/head";
import { useRouter } from "next/router";
import { buildCanonicalUrl } from "../lib/seo";
import dynamic from 'next/dynamic';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import HomepageHero from '../components/HomepageHero';
import LogoTicker from '../components/LogoTicker';
import ChecklistCard from "../components/ChecklistCard";
import ValuePillars from "../components/ValuePillars";
import RibbonBanner from "../components/RibbonBanner";
import OfferTiles from "../components/OfferTiles";
import { AiIcon, MuleIcon, SalesforceIcon, DataIcon } from "../components/Header";
import CustomerStoriesProof from "../components/CustomerStoriesProof";
import LeadMagnetCTA from "../components/LeadMagnetCTA";
import PreFooterCTA from "../components/PreFooterCTA";
import { FRONT_PAGE_SECTIONS_QUERY, FRONT_PAGE_MIN_QUERY } from "../queries/SectionsQueries";
import { renderSections } from "../lib/sectionRegistry";
import PlatformExpertise from "components/PlatformExpertise";
const BackgroundStarsCanvas = dynamic(() => import('../components/BackgroundStarsCanvas'), { ssr: false });


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
  const router = useRouter();
  const canonicalUrl = buildCanonicalUrl(router?.asPath || '/');

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
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
        {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
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
              primaryCta={{ label: 'Talk to an Expert', href: '/contact/' }}
              secondaryCta={{ label: 'Start the 8-Week Agent Workshop', href: '/agentforce-job-description/' }}
              kpis={[
                {label: 'First outcome in 8 weeks'},
                {label: 'Delivery cycle time \u2193 50%'},
                {label: 'Capacity freed without new headcount'}
              ]}
              showMedia={false}
              mediaImage={{ src: '/logos/green-irony/Green-Irony-Logo.svg', alt: 'Green Irony services overview' }}
            />
            <LogoTicker
              items={[
                { src: '/logos/air-culinaire.png', alt: 'Air Culinaire' },
                { src: '/logos/ccu_h.png', alt: 'CCU' },
                { src: '/logos/college-hunks.png', alt: 'College Hunks' },
                { src: '/logos/HIVC.png', alt: 'HIVC' },
                { src: '/logos/spirit.svg', alt: 'Spirit Airlines' },
                { src: '/logos/unc-charlotte.svg', alt: 'UNC Charlotte' },
                //{ src: '/logos/virginia-dare-logo.png', alt: 'Virginia Dare Extracts' },
                { src: '/logos/Hotwire.svg', alt: 'Hotwire' },
                { src: '/logos/logo-cae.webp', alt: 'CAE Healthcare' },
                { src: '/logos/logo-upc-insurance-story-e1729029847866.webp', alt: 'UPC Insurance' },
                { src: '/logos/PODS-Logo.png', alt: 'PODS' },
                { src: '/logos/rochelec.png', alt: 'Rochelec' },
              ]}
              speedSeconds={30}
            />
            <OfferTiles
              className="mt-12 md:mt-16"
              title="What we deliver"
              items={[
                {
                  title: 'MuleSoft Integration (AI‑led)',
                  description: 'API‑led, event‑driven integration so agents can see, decide, and do.',
                  href: '/services/mulesoft/',
                  icon: <MuleIcon className="h-24 w-24 text-gi-green" />
                },
                {
                  title: 'AI & Digital Labor (Agentforce)',
                  description: 'Launch agents with clear jobs, safe actions, and measurable KPIs.',
                  href: '/services/agentforce/',
                  icon: <AiIcon className="h-24 w-24 text-gi-green" />
                },
                {
                  title: 'Salesforce Implementation (AI‑led)',
                  description: 'Make Salesforce the control room for humans + agents.',
                  href: '/services/salesforce/',
                  icon: <SalesforceIcon className="h-24 w-24 text-gi-green" />
                },
                {
                  title: 'Data & Migrations',
                  description: 'Seamless platform migrations, trusted data, and real-time context for reliable agent and human decisions.',
                  href: '/services/data/',
                  icon: <DataIcon className="h-24 w-24 text-gi-green" />
                }
              ]}
            />
            <RibbonBanner title="Why partner with Green Irony?" />
            
            <ValuePillars
              heading="From investment to impact — fast"
              subhead="Most AI pilots stall because agents can’t see context, act safely, or scale. We combine integration-first architecture, AI-native agent design, and senior delivery to give you outcomes you can plan around."
              items={[
                { title: '2x Faster Delivery', body: 'AI‑accelerated methods cut cycle time in half—go live in weeks, not months.', iconNode: (
                  <img src="/icons/clock.svg" alt="" className="h-5 w-5" />
                ) },
                { title: 'Offshore Economics, Onshore Expertise', body: 'US‑based senior team with offshore‑competitive economics.', iconNode: (
                  <img src="/icons/skill.svg" alt="" className="h-5 w-5" />
                ) },
                { title: 'Predictable Outcomes', body: 'Outcome‑driven scope, SLAs, and quality you can plan around.', iconNode: (
                  <img src="/icons/line_chart.svg" alt="" className="h-5 w-5" />
                ) },
              ]}
            />
            <ChecklistCard
              heading="From scope to Salesforce impact — in weeks, not months"
              items={[
                'Half the delivery time — Projects go live in as little as 4 weeks with AI‑accelerated methods.',
                'Confidence at launch — Builds are tested, validated, and adoption‑ready on day one.',
                'Future‑ready foundation — A Salesforce org that scales with your business—and is agent‑ready when you’re ready.',
              ]}
              columns={3}
            />
            <PlatformExpertise/>
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
