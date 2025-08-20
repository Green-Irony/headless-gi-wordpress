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

const Page: any = function HigherEducationSolutionsPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Higher Education AI Solutions | Green Irony</title>
        <meta name="description" content="24/7 student support and operational scale with AI agents backed by integrated systems—reduce cost-to-serve and improve engagement through predictable, real-time outcomes." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        {/* Hero */}
        <HeroCenterPro
          title="Scale student support without scaling headcount"
          body="AI agents that deflect routine questions, coordinate across SIS/LMS/ITSM, and surface insights—so institutions free human experts for strategic advising while improving student experience."
          primaryCta={{ label: 'See the Higher-Ed Blueprint', href: '#blueprint' }}
          secondaryCta={{ label: 'Scope My First Agent', href: '/contact' }}
          kpis={[]}
          showPrimaryCta={true}
          showSecondaryCta={true}
        />

        {/* Problem */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-xl border border-gi-fog bg-gi-subtle px-6 py-5">
            <h2 className="text-lg font-semibold text-gi-text">The problem</h2>
            <p className="mt-2 max-w-4xl text-gi-gray">Higher ed operations are overwhelmed with repetitive inquiries, fragmented systems, and limited staff capacity. Students wait, staff burn out, and institutions struggle to deliver personalized support at scale.</p>
          </div>
        </section>

        {/* Approach / What we do */}
        <PillarsDynamic
          heading="What we do"
          mode="grid"
          items={[
            { title: 'Unified knowledge & data layer', body: 'Connect SIS, LMS, CRM, and FAQ systems so agents draw from current, trusted context.', accentStrength: 20 },
            { title: 'Scoped AI agents for student workflows', body: 'From enrollment to financial aid status, Tier-1 tasks handled by agents with appropriate escalation.', accentStrength: 15 },
            { title: 'Integration-first architecture', body: 'Ensure queries become actions—updates, notifications, handoffs—without manual intervention.', accentStrength: 20 },
            { title: 'Pilot centric to impact', body: 'Launch a high-value use case (enrollment deflection, advising triage) tied to clear KPIs.', accentStrength: 15 },
          ]}
        />

        {/* What you get */}
        <PillarsDynamic
          heading="What you get"
          mode="grid"
          items={[
            { title: 'Knowledge architecture', body: 'Aggregates student data in real time for confident answers.', accentStrength: 20 },
            { title: 'AI agent job design', body: 'Enrollment assistant or Financial aid triage with safe actions.', accentStrength: 15 },
            { title: 'Integration implementation', body: 'Seamless context and action across systems.', accentStrength: 20 },
            { title: 'Adoption & feedback loop', body: 'Embed the agent, capture feedback, iterate toward outcomes.', accentStrength: 15 },
            { title: 'Scorecard', body: 'Deflection rate, response latency, satisfaction proxy, capacity recovered.', accentStrength: 20 },
          ]}
        />

        {/* Outcomes */}
        <HowItWorksLinear
          id="outcomes"
          heading="Outcome promise"
          steps={[
            { k: '01', title: '24/7 deflection', body: 'Routine student questions handled instantly.' },
            { k: '02', title: 'Reduced staff burden', body: 'Advisors focus on high-value interactions.' },
            { k: '03', title: 'Improved student satisfaction', body: 'Faster, consistent responses with trusted context.' },
            { k: '04', title: 'Scalable agent portfolio', body: 'Proven first win that expands predictably.' },
          ]}
        />

        {/* Proof / Example */}
        <WhyUsBanner body="Public-facing Agentforce implementations (e.g., UNC Charlotte-style knowledge-backed bots) demonstrate how integrated data + scoped agents deliver persistent support while freeing human advisors." />

        

        {/* Pre-footer CTA */}
        <PreFooterCTA
          id="blueprint"
          title="See the Higher-Ed Blueprint"
          body="Deflect routine questions and scale student experience with integrated, agent-backed support."
          primaryCta={{ label: 'Open the Blueprint', href: '#blueprint' }}
          secondaryCta={{ label: 'Scope My First Agent', href: '/contact' }}
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