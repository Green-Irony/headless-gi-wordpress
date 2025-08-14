import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCenterPro from '../components/HeroCenterPro';
import CaseStudyTile from '../components/CaseStudyTile';
import LogoTicker from '../components/LogoTicker';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function CustomerStoriesPage(props: any) {
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
          primaryCta={{ label: 'Start Your Success Plan', href: '#contact' }}
          secondaryCta={{ label: 'Get the 8-Week Agent Launch Plan', href: '#plan' }}
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
              primaryCta={{ label: 'Start your Travel success plan', href: '#contact' }}
              secondaryCta={{ label: 'Review integration gaps', href: '#contact' }}
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
              primaryCta={{ label: 'See the Higher-Ed Blueprint', href: '#plan' }}
              secondaryCta={{ label: 'Scope my first agent', href: '#contact' }}
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
              primaryCta={{ label: 'Start My First-Win', href: '#contact' }}
              secondaryCta={{ label: 'Get the 8-Week Plan', href: '#plan' }}
            />
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
            <a className="btn-primary" href="#contact">Talk to an Expert</a>
          </div>
        </section>
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