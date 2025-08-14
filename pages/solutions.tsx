import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSimple from '../components/HeroSimple';
import ServicesTabbedContent from '../components/ServicesTabbedContent';
import PillarsDynamic from '../components/PillarsDynamic';
import ValuePillars from '../components/ValuePillars';
import HowItWorksLinear from '../components/HowItWorksLinear';
import PreFooterCTA from '../components/PreFooterCTA';
import WhyUsBanner from '../components/WhyUsBanner';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';
import HeroCenterPro from '../components/HeroCenterPro';
import CustomerStoryHighlight from '../components/CustomerStoryHighlight';

const Page: any = function SolutionsPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>{siteTitle ? `${siteTitle} — Solutions` : 'Solutions'}</title>
        <meta name="description" content="Industry solutions that combine event-driven MuleSoft integration and AI agents to cut cycle time, deflect routine demand, and unlock capacity." />
      </Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>
        <HeroSimple
          title="Industry solutions that ship outcomes"
          subhead="Built from real operational wins: event-driven integration + agent execution tailored for your vertical."
        />

        <ServicesTabbedContent
          className="mt-6"
          tabs={[
            { id: 'travel', label: 'Travel & Transportation' },
            { id: 'higher-ed', label: 'Higher Education' },
            { id: 'smb', label: 'Small & Midsized Business' },
          ]}
          panes={{
            travel: (
              <div>
                {/* Hero */}
                <HeroCenterPro
                  title="Real-time operations without the friction"
                  body="Event-driven integration and AI agents that coordinate across ops, customer experience, and fulfillment—so you cut cycle time in half, deflect routine demand, and unlock capacity. What worked at Spirit Airlines is now bottled into an AI-native delivery engine for travel and transportation teams."
                  kpis={[]}
                  showMedia={true}
                  mediaImage={{ src: '/images/hero-sol-travel.svg', alt: 'Travel & transportation hero' }}
                  primaryCta={{ label: 'Explore the Travel Playbook', href: '/solutions/travel' }}
                  secondaryCta={{ label: 'Talk to an Expert', href: '/contact' }}
                />
                <CustomerStoryHighlight
                  customer="Spirit Airlines"
                  logoSrc="/logos/spirit.svg"
                  headline="Proof"
                  body="Real-time disruption workflows and event-driven coordination patterns proven at Spirit Airlines underpin our approach for travel and transportation."
                  cta={{ label: 'Explore the Travel Playbook', href: '/solutions/travel' }}
                />
                <ValuePillars
                  heading="What we do"
                  items={[
                    { title: 'Event-driven MuleSoft backbone', body: 'Real-time data flows that surface state changes across crew, maintenance, customer systems, and logistics.' },
                    { title: 'AI agent orchestration', body: 'Agents consume signals, surface alerts, take safe actions (rebook, notify, escalate), and reduce manual coordination.' },
                    { title: 'Operational playbook reuse', body: 'Codified Spirit Airlines learnings as repeatable patterns—accelerating your first win with less discovery friction.' },
                    { title: 'Outcome-aligned pilots', body: 'Scoped around high-leverage workflows (delays, disruption, crew coordination) with measurable KPIs.' },
                  ]}
                />
                <PreFooterCTA
                  title="Explore the Travel Playbook"
                  body="See how event-driven integration and agent execution come together to land real-time operational wins."
                  primaryCta={{ label: 'Open the Playbook', href: '/solutions/travel' }}
                  secondaryCta={{ label: 'Start my first-win agent', href: '/contact' }}
                />
              </div>
            ),
            'higher-ed': (
              <div>
                <HeroCenterPro
                  title="Scale student support without scaling headcount"
                  body="AI agents that deflect routine questions, coordinate across SIS/LMS/ITSM, and surface insights—so institutions free human experts for strategic advising while improving student experience."
                  kpis={[]}
                  showMedia={true}
                  mediaImage={{ src: '/images/hero-sol-highered.svg', alt: 'Higher education hero' }}
                  primaryCta={{ label: 'See the Higher-Ed Blueprint', href: '/solutions/higher-education' }}
                  secondaryCta={{ label: 'Scope My First Agent', href: '/contact' }}
                />

                <CustomerStoryHighlight
                  customer="UNC Charlotte"
                  logoSrc="/logos/unc-charlotte.svg"
                  headline="Example"
                  body="Knowledge-backed student support patterns demonstrate how integrated data and scoped agents can deliver persistent, always-on assistance while freeing human advisors."
                  cta={{ label: 'See the Higher-Ed Blueprint', href: '/solutions/higher-education' }}
                />
                <ValuePillars
                  heading="What we do"
                  items={[
                    { title: 'Unified knowledge & data layer', body: 'Connect SIS, LMS, CRM, FAQ systems so agents draw from trusted context.' },
                    { title: 'Scoped AI agents', body: 'Tier-1 student workflows handled by agents; escalate complexity appropriately.' },
                    { title: 'Integration-first architecture', body: 'Queries become actions—updates, notifications, handoffs—without manual steps.' },
                    { title: 'Pilot centric to impact', body: 'Launch enrollment deflection or advising triage with clear KPIs.' },
                  ]}
                />
                <PreFooterCTA
                  title="See the Higher-Ed Blueprint"
                  body="Deflect routine questions and scale student experience with integrated, agent-backed support."
                  primaryCta={{ label: 'Open the Blueprint', href: '/solutions/higher-education' }}
                  secondaryCta={{ label: 'Get the 8-Week Plan', href: '/#plan' }}
                />
              </div>
            ),
            smb: (
              <div>
                <HeroCenterPro
                  title="Big outcomes, without enterprise overhead"
                  body="You don’t have unlimited headcount or months to wait. We combine AI-native delivery, MuleSoft-powered integration, and scoped agents to fix disconnected systems, eliminate swivel-chair work, and surface business intelligence—so you move faster with the team you have."
                  kpis={[]}
                  showMedia={true}
                  mediaImage={{ src: '/images/hero-sol-smb.svg', alt: 'SMB hero' }}
                  primaryCta={{ label: 'Start My First-Win', href: '/solutions/smb' }}
                  secondaryCta={{ label: 'Get the 8-Week Agent Launch Plan', href: '/#plan' }}
                />
                <CustomerStoryHighlight
                  customer="Common App"
                  logoSrc="/logos/common-app.svg"
                  headline="Proof"
                  body="AI-native execution and integration-first thinking deliver predictable outcomes with lean teams—exactly what SMBs need to scale intelligently."
                  cta={{ label: 'Start My First-Win', href: '/solutions/smb' }}
                />
                <ValuePillars
                  heading="What we do"
                  items={[
                    { title: 'Partner-first engagement', body: 'Embedded extension of your team; prioritize high-leverage, low-friction wins.' },
                    { title: 'AI-native execution model', body: 'Agents accelerate scoping, integration, and action from day one.' },
                    { title: 'Integration that connects what matters', body: 'Minimal MuleSoft pipelines/events that unlock the most value.' },
                    { title: 'Outcome-backed pilots', body: 'One business-critical workflow tied to metrics you care about.' },
                  ]}
                />
                <PreFooterCTA
                  title="Start your first-win"
                  body="We’ll connect what matters, eliminate swivel-chair work, and launch an agent that proves value in 8 weeks."
                  primaryCta={{ label: 'Start My First-Win', href: '/solutions/smb' }}
                  secondaryCta={{ label: 'Review Integration Gaps', href: '/contact' }}
                />
              </div>
            ),
          }}
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