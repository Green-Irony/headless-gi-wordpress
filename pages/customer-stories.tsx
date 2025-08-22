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
import TrustStrip from '../components/TrustStrip';

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
          <div className="flex flex-col gap-8">
            <CaseStudyTile
              brand="Spirit Airlines"
              title="Event-driven operations at scale"
              vertical="Travel & Transportation / Enterprise"
              logoSrc="/logos/spirit.svg"
              mediaSide="left"
              challenge="Legacy systems, siloed data, and manual workflows slowed innovation and strained operations. Spirit’s IT teams were stuck in reactive mode, delivering only one or two major releases a year while guest and crew experiences lagged behind expectations."
              solution="With Green Irony as a partner, Spirit adopted MuleSoft as the central nervous system of the airline. Together we designed a composable API architecture that unlocked 300+ systems, enabled reuse across projects, and accelerated delivery. From loyalty programs and self-service guest tools to crew scheduling and turnaround automation, every initiative was built for scale, speed, and resilience."
              outcomes={[
                '5× developer productivity and cycle times reduced from 12–18 months to 3–4 months',
                'Guest self-service for changes, cancellations, seat upgrades, and WiFi purchases — reducing call center strain and improving NPS',
                'Loyalty program overhaul that drove enrollment and deeper engagement',
                'Real-time crew and turnaround automation that improved on-time performance',
                'Resilient third-party integrations that opened new revenue streams without straining legacy systems',
              ]}
              proofTag="Built from Spirit Airlines-scale delivery discipline."
              quote="Green Irony’s ability to align our API strategy to deliver meaningful business outcomes is what makes them such a valuable partner. Their MuleSoft and enterprise architecture expertise — along with their collaborative and efficient delivery process — has helped us expedite key initiatives. — Sapana Patel, Sr. Director of Solutions Delivery, Spirit Airlines"
              primaryCta={{ label: 'Start your Travel success plan', href: '/contact' }}
              secondaryCta={{ label: 'Review integration gaps', href: '/contact' }}
            />

            <CaseStudyTile
              brand="UNC Charlotte"
              title="24/7 student support without scaling headcount"
              vertical="Higher Education"
              logoSrc="/logos/unc-charlotte.svg"
              mediaSide="right"
              challenge="UNC Charlotte’s IT helpdesk was overwhelmed with routine tickets, with over half of staff time spent on password resets. Since support wasn’t available after hours, students were often locked out until the next business day, creating delays and frustration."
              solution="UNC Charlotte became the first higher-ed institution to implement Salesforce Agentforce. Green Irony delivered a knowledge-backed agent that deflected routine IT tickets (like password resets) and routed complex cases to staff, freeing up advisors to focus on more strategic support."
              outcomes={[
                '50%+ of tickets deflected immediately after launch',
                'Password resets — once consuming half of staff time — automated and available 24/7',
                'Staff capacity reclaimed for higher-value advising and IT innovation',
                'Faster, consistent responses improving student and faculty satisfaction',
              ]}
              proofTag="First higher-ed institution to launch on Salesforce Agentforce."
              quote="The agent feels like a teammate — always on, always informed, and it freed our IT staff to focus on what mattered most."
              primaryCta={{ label: 'Read the full story', href: '/customer-stories/unc-charlotte' }}
              secondaryCta={{ label: 'Scope my first agent', href: '/contact' }}
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
              secondaryCta={{ label: 'Get the 8-Week Plan', href: '/plan' }}
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
  return getNextStaticProps(context, { Page, revalidate: 60 });
}

(Page as any).queries = [
  { query: SITE_DATA_QUERY },
  { query: HEADER_MENU_QUERY },
] as any; 