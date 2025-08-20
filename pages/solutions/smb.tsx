import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroCenterPro from '../../components/HeroCenterPro';
import PillarsDynamic from '../../components/PillarsDynamic';
import ValuePillars from '../../components/ValuePillars';
import HowItWorksLinear from '../../components/HowItWorksLinear';
import WhyUsBanner from '../../components/WhyUsBanner';
import PreFooterCTA from '../../components/PreFooterCTA';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../../queries/MenuQueries';

const Page: any = function SmbSolutionsPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>SMB AI &amp; Integration Solutions | Green Irony</title>
        <meta name="description" content="For small and midsized businesses without enterprise overhead, Green Irony delivers AI-native, integration-first digital labor that halves delivery time, connects systems, and unlocks capacity—acting as a true partner, not a vendor." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        {/* Hero */}
        <HeroCenterPro
          title="Big outcomes, without enterprise overhead"
          body="You don’t have unlimited headcount or months to wait. We combine AI-native delivery, MuleSoft-powered integration, and scoped agents to fix disconnected systems, eliminate swivel-chair work, and surface business intelligence—so you move faster with the team you have."
          primaryCta={{ label: 'Start My First-Win', href: '#firstwin' }}
          secondaryCta={{ label: 'Get the 8-Week Agent Launch Plan', href: '/plan' }}
          kpis={[]}
          showPrimaryCta={true}
          showSecondaryCta={true}
        />

        {/* Problem */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-xl border border-gi-fog bg-gi-subtle px-6 py-5">
            <h2 className="text-lg font-semibold text-gi-text">The problem</h2>
            <p className="mt-2 max-w-4xl text-gi-gray">SMBs face the same operational complexity as larger firms—fragmented data, manual handoffs, unclear workflows—but with far fewer resources. The result: overworked teams, duplicated effort ("swivel chair"), and stalled automation that never scales.</p>
          </div>
        </section>

        {/* Approach / What we do */}
        <PillarsDynamic
          heading="What we do"
          mode="grid"
          items={[
            { title: 'Partner-first engagement', body: 'Embedded extension of your team—prioritizing high-leverage, low-friction wins that respect your constraints.', accentStrength: 20 },
            { title: 'AI-native execution model', body: 'Agents are part of delivery from day one, accelerating scoping, integration, and action.', accentStrength: 15 },
            { title: 'Integration that connects what matters', body: 'Minimal MuleSoft pipelines and events that unlock the most value for your agent(s).', accentStrength: 20 },
            { title: 'Outcome-backed pilots', body: 'Launch one business-critical workflow (lead qualification, support deflection, onboarding) and tie it to metrics you care about.', accentStrength: 15 },
          ]}
        />

        {/* What you get */}
        <ValuePillars
          heading="What you get"
          subhead="A delivery engine that amplifies your small team."
          items={[
            { title: 'Rapid scoping', body: 'Identify your highest-impact workflow.' },
            { title: 'Minimal integration design', body: 'Eliminate swivel-chair context switching.' },
            { title: 'AI agent build', body: 'Clear job description and safe actions.' },
          ]}
        />

        {/* Outcomes */}
        <HowItWorksLinear
          id="outcomes"
          heading="Outcome promise"
          steps={[
            { k: '01', title: 'Faster execution', body: 'Ship priority workflows with existing staff.' },
            { k: '02', title: 'Less manual juggling', body: 'Connect systems; cut touchpoints without buying new tools.' },
            { k: '03', title: 'Scalable foundation', body: 'Early measurable wins in 8 weeks build trust and momentum without redoing the plumbing.' },
            { k: '04', title: 'Partner alignment', body: 'Expand agent portfolio as you grow, without enterprise overhead.' },
          ]}
        />

        {/* Proof / Narrative */}
        <WhyUsBanner body="Our AI-native model means you get a delivery engine that amplifies your small team—agents automate routine work, integration ties systems, and senior oversight keeps outcomes predictable. This isn’t a pilot that disappears; it’s a first win that expands." />

        

        {/* Pre-footer CTA */}
        <PreFooterCTA
          id="firstwin"
          title="Start your first-win"
          body="We’ll connect what matters, eliminate swivel-chair work, and launch an agent that proves value in 8 weeks."
          primaryCta={{ label: 'Start My First-Win', href: '#firstwin' }}
          secondaryCta={{ label: 'Review Integration Gaps', href: '/contact' }}
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