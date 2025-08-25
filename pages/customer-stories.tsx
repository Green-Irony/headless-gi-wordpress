import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCenterPro from '../components/HeroCenterPro';
import CustomerStoryCard from '../components/CustomerStoryCard';
import LogoTicker from '../components/LogoTicker';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';
import TrustStrip from '../components/TrustStrip';

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

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>
        <HeroCenterPro
          title="Prove value, then scale"
          body="Case studies built around business outcomes—speed, deflection, and capacity—powered by integrated systems and AI-native agents. See how we turned complex problems into predictable wins."
          primaryCta={{ label: 'Start Your Success Plan', href: '/contact' }}
          secondaryCta={{ label: 'Get the 8-Week Agent Launch Plan', href: '/plan' }}
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

      <TrustStrip />

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {props.stories?.map((s: CustomerStory) => (
              <CustomerStoryCard key={s.slug} story={s} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">Why these stories matter</h2>
          <p className="mt-3 max-w-3xl text-gi-gray">
            We don’t sell concepts—we show what works. Each story follows the same path: identify the business pain, launch an AI-native, integration-powered pilot, measure real outcomes, and then scale. That’s the repeatable playbook we bring to every client.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn-secondary" href="#quiz">Compare your challenge</a>
            <a className="btn-secondary" href="#scorecard">Download the First-Win Scorecard</a>
            <a className="btn-primary" href="/contact">Talk to an Expert</a>
          </div>
        </section>
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