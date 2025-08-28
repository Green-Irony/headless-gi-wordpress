import Head from 'next/head';
import { useRouter } from 'next/router';
import { buildCanonicalUrl, toAbsoluteUrl } from '../lib/seo';
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
  const storiesList = (props.stories || []).slice(0, 10).map((s: CustomerStory, idx: number) => ({
    '@type': 'ListItem',
    position: idx + 1,
    url: `/customer-stories/${s.slug}`,
    name: s.title,
    image: s?.image?.src ? toAbsoluteUrl(s.image.src) : undefined,
  }));

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
        <meta property="og:image" content={toAbsoluteUrl('/logos/green-irony/green-logo-long.png')} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={toAbsoluteUrl('/logos/green-irony/green-logo-long.png')} />
        {/* JSON-LD: Collection of Customer Stories */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: pageTitle,
              url: canonicalUrl || undefined,
              description: metaDescription,
              isPartOf: { '@type': 'WebSite', name: 'Green Irony', url: toAbsoluteUrl('/') || undefined },
              hasPart: [{ '@type': 'ItemList', itemListElement: storiesList }],
            }),
          }}
        />
      </Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>
        <HeroCenterPro
          title="Prove value, then scale"
          body="Case studies built around business outcomes—speed, deflection, and capacity—powered by integrated systems and AI-native agents. See how we turned complex problems into predictable wins."
          primaryCta={{ label: 'Start Your Success Plan', href: '/contact/' }}
          secondaryCta={{ label: 'Start the 8-Week Outcomes Workshop', href: '/agentforce-job-description/' }}
          kpis={[
            { label: '⚡ ½ delivery time' },
            { label: '📉 Persistent deflection' },
            { label: '🤖 First agent in 8 weeks' },
          ]}
          showMedia={false}
        />

        <LogoTicker
          items={[
            { src: '/logos/air-culinaire.png', alt: 'Air Culinaire' },
            { src: '/logos/ccu_h.png', alt: 'CCU' },
            { src: '/logos/college-hunks.png', alt: 'College Hunks' },
            { src: '/logos/HIVC.png', alt: 'HIVC' },
            { src: '/logos/spirit.svg', alt: 'Spirit Airlines' },
            { src: '/logos/unc-charlotte.svg', alt: 'UNC Charlotte' },
            { src: '/logos/virginia-dare-extracts-logo.webp', alt: 'Virginia Dare Extracts' },
            { src: '/logos/Hotwire.svg', alt: 'Hotwire' },
            { src: '/logos/logo-cae.webp', alt: 'CAE Healthcare' },
            { src: '/logos/logo-upc-insurance-story-e1729029847866.webp', alt: 'UPC Insurance' },
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
              solution="Designed and implemented an event-driven MuleSoft backbone that delivered live operational context, enabling proactive orchestration across crew, customer, and logistics systems."
              outcomes={[
                'Delivery cycle time cut in half by leveraging AI-assisted integration patterns',
                'Faster decision loops across operations',
                'Manual coordination overhead reduced, freeing capacity for strategic initiatives',
              ]}
              proofTag="Built from Spirit Airlines-scale delivery discipline."
              quote="Green Irony gave us the real-time operational insight and automation we thought only large incumbents could deliver—faster and with less overhead."
              primaryCta={{ label: 'Read the Spirit story', href: '/customer-stories/spirit' }}
              secondaryCta={{ label: 'Explore MuleSoft Services', href: '/services/mulesoft/' }}
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
              secondaryCta={{ label: 'Agentforce Services', href: '/services/agentforce/' }}
            />

            <CaseStudyTile
              brand="Virginia Dare"
              title="From legacy tickets to role-driven service"
              vertical="CPG / Food & Beverage Manufacturing"
              logoSrc="/logos/virginia-dare-extracts-logo.webp"
              mediaSide="left"
              challenge="An aging ticket system and email-based handoffs led to delays, inconsistent responses, and unclear ownership. Virginia Dare needed to migrate to Salesforce Service Cloud, bring in-flight tickets forward as Cases, and establish secure, efficient processes across multiple case types."
              solution="Implemented a role-driven Service Cloud foundation: imported in-flight tickets; standardized case models and workflows; added granular access by case type (confidential types limited to designated managers); built automation to cut email dependence; and enabled case creation from Outlook. Delivered manager dashboards for trustworthy reporting."
              outcomes={[
                'Unified handling across multiple case types → faster routing & resolution',
                'Email handoffs reduced with Outlook → Case creation and in-platform workflows',
                'Confidential cases protected; managers gain reliable visibility',
              ]}
              quote="We moved off the legacy tool without losing momentum—now there’s clear ownership and faster responses."
              primaryCta={{ label: 'Read the Virginia Dare story', href: '/customer-stories/virginia-dare/' }}
              secondaryCta={{ label: 'Salesforce Services', href: '/services/salesforce/' }}
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
          primaryCta={{ label: 'Contact Us', href: '/contact/' }}
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