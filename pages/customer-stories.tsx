import Head from 'next/head';
import { useRouter } from 'next/router';
import { buildCanonicalUrl } from '../lib/seo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCenterPro from '../components/HeroCenterPro';
import CaseStudyTile from '../components/CaseStudyTile';
import LogoTicker from '../components/LogoTicker';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';
import TrustStrip from '../components/TrustStrip';
import React from 'react';
import CustomerStoryCarousel from '../components/CustomerStories/CustomerStoryCarousel';
import PreFooterCTA from '../components/PreFooterCTA';

import { loadAllStories, CustomerStory } from '../lib/customerStories';

const Page: any = function CustomerStoriesPage(props: any & { stories: CustomerStory[] }) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const pageTitle = 'Customer Stories & Case Studies | Green Irony';
  const metaDescription = 'Real-world outcomes from AI-native delivery—see how we cut cycle time, improved deflection, and unlocked capacity for enterprises, higher ed, and SMBs.';

  const router = useRouter();
  const canonicalUrl = buildCanonicalUrl(router?.asPath || '/');

  // Local UI state for "See All Customer Stories"
  const [showAll, setShowAll] = React.useState(false);
  // Expose a tiny helper for our inline IIFE above (avoids lifting too much code)
  ;(Page as any)._useShowAllStories = () => [showAll, setShowAll] as const;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
        {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>
        <HeroCenterPro
          title="Prove value, then scale"
          body="Case studies built around business outcomes—speed, deflection, and capacity—powered by integrated systems and AI-native agents. See how we turned complex problems into predictable wins."
          primaryCta={{ label: 'Start Your Success Plan', href: '/contact' }}
          secondaryCta={{ label: 'Start the 8-Week Outcomes Workshop', href: '/agentforce-job-description' }}
          kpis={[
            { label: '⚡ ½ delivery time' },
            { label: '🛎️ 24/7 support' },
            { label: '🤖 First agent in 8 weeks' },
          ]}
          showMedia={false}
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

      {/*
      <TrustStrip />
      */}
      
      <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-8">
            <CaseStudyTile
              brand="Spirit Airlines"
              title="Event-driven operations at scale"
              vertical="Travel & Transportation / Enterprise"
              logoSrc="/logos/spirit.svg"
              mediaSide="left"
              challenge="Siloed systems and manual workflows made real-time coordination brittle, slowing response to disruptions and creating operational drag."
              solution="Designed and implemented an event-driven MuleSoft backbone that fed AI agents with live context, enabling proactive orchestration across crew, customer, and logistics systems."
              outcomes={[
                'Delivery cycle time cut in half by leveraging AI-assisted integration patterns',
                'Faster decision loops across operations',
                'Manual coordination overhead reduced, freeing capacity for strategic initiatives',
              ]}
              proofTag="Built from Spirit Airlines-scale delivery discipline."
              quote="Green Irony gave us the real-time operational insight and automation we thought only large incumbents could deliver—faster and with less overhead."
              primaryCta={{ label: 'Read the Spirit story', href: '/customer-stories/spirit' }}
              secondaryCta={{ label: 'Explore MuleSoft Services', href: '/services/mulesoft' }}
            />

            <CaseStudyTile
              brand="Higher Education (UNC Charlotte-style)"
              title="24/7 student support without scaling headcount"
              vertical="Higher Education"
              logoSrc="/logos/unc-charlotte.svg"
              mediaSide="right"
              challenge="High volume of routine student inquiries overwhelmed staff; fragmented data sources led to inconsistent responses."
              solution="Built a knowledge-backed Agentforce deployment that unified SIS, FAQ systems, and support workflows—agents handled Tier-1 inquiries while escalating complex cases."
              outcomes={[
                'Persistent deflection of routine questions (student-facing load reduced)',
                'Faster, consistent responses improving student satisfaction',
                'Staff capacity reclaimed for higher-value advising',
              ]}
              proofTag="Public-facing AI agents powered by integrated data."
              quote="The agent feels like a teammate—always on, always informed, and it freed our advisors to focus where humans matter most."
              primaryCta={{ label: 'Read the UNC Charlotte story', href: '/customer-stories/unc-charlotte' }}
              secondaryCta={{ label: 'Agentforce Services', href: '/services/agentforce' }}
            />

            <CaseStudyTile
              brand="SMB Composite"
              title="Big outcomes with constrained teams"
              vertical="SMB / Growth"
              mediaSide="left"
              challenge="Swivel-chair context switching, disconnected tools, and limited bandwidth made scaling automation feel out of reach."
              solution="Scoped a high-impact workflow, built minimal MuleSoft integrations, and launched an AI agent to automate routine qualification/support tasks—paired with a lightweight adoption loop."
              outcomes={[
                'One working agent delivered in eight weeks',
                'Manual handoffs reduced significantly (capacity uplift)',
                'Faster customer response time, improving retention and throughput',
              ]}
              proofTag="Partner-level attention with AI-level leverage."
              quote="We didn’t have the resources for a big program. Green Irony made our first AI win feel immediate and expandable."
              primaryCta={{ label: 'Start My First-Win', href: '/contact' }}
              secondaryCta={{ label: 'Agentforce Services', href: '/services/agentforce' }}
            />
          </div>
        </section>

        {/* See all customer stories (lazy reveal) */}
        <section className="mx-auto max-w-7xl px-6 py-8">
          {props.stories && props.stories.length > 0 ? (
            (() => {
              const [showAll, setShowAll] = (Page as any)._useShowAllStories?.() || [];
              // Fallback if hook isn't set (SSR safety)
              if (!showAll && !(Page as any)._useShowAllStories) {
                return (
                  <div className="text-center">
                    <button type="button" className="btn-primary" onClick={() => {}} disabled>
                      See All Customer Stories
                    </button>
                  </div>
                );
              }
              return !showAll ? (
                <div className="text-center">
                  <button type="button" className="btn-primary" onClick={() => setShowAll(true)}>
                    See All Customer Stories
                  </button>
                </div>
              ) : (
                <CustomerStoryCarousel stories={props.stories} />
              );
            })()
          ) : null}
        </section>

        <PreFooterCTA
          title="Become your own success story"
          body="Now that you've heard about some of our customer successes, become your own success story. Talk to an expert and map your first win."
          primaryCta={{ label: 'Contact Us', href: '/contact' }}
          secondaryCta={{ label: 'Get my integration success plan', href: '/mulesoft-reviver' }}
        />
      </main>
      <Footer />
    </>
  );
}

export default Page;

export async function getStaticProps(context: any) {
  const stories = loadAllStories();
  return getNextStaticProps(context, { Page, revalidate: 60, props: { stories } });
}

(Page as any).queries = [
  { query: SITE_DATA_QUERY },
  { query: HEADER_MENU_QUERY },
] as any; 