import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCenterPro from '../components/HeroCenterPro';
import ValuePillars from '../components/ValuePillars';
import HowItWorksLinear from '../components/HowItWorksLinear';
import PreFooterCTA from '../components/PreFooterCTA';
import ServicesTabbedContent from '../components/ServicesTabbedContent';
import DeliverablesWheel from '../components/DeliverablesWheel';
import HeroSimple from '../components/HeroSimple';
import OfferTiles from '../components/OfferTiles';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';
import WhyUsBanner from '../components/WhyUsBanner';

const Page: any = function ServicesPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Services | AI-Native Integration &amp; Digital Labor</title>
        <meta name="description" content="Combine MuleSoft integration, Agentforce, Salesforce optimization, and trusted data to unlock speed, capacity, and predictable AI outcomes." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        <HeroCenterPro
          title="From investment to impact — fast"
          body="You already own powerful platforms. We combine AI‑accelerated MuleSoft delivery, digital labor (Agentforce), Salesforce optimization, and trusted data to cut delivery timelines in half and deliver measurable outcomes in 8 weeks."
          primaryCta={{ label: 'Plan my first win', href: '/contact' }}
          secondaryCta={{ label: 'Explore services', href: '#agentforce' }}
          kpis={[]}
          mediaImage={{ src: '/images/hero1.svg', alt: 'Green Irony services overview' }}
          showPrimaryCta={false}
          showSecondaryCta={false}
        />

        <ValuePillars
          heading="Our approach"
          items={[
            { title: 'Integration‑first execution', body: 'Agents deliver when they can see accurate state and trigger reliable actions.' },
            { title: 'AI‑native delivery', body: 'AI accelerates discovery, design, and delivery without sacrificing quality.' },
            { title: 'Outcome orientation', body: 'Start with speed, deflection, capacity—and deliver it in weeks, not months.' },
          ]}
        />
        <ServicesTabbedContent
          className="mt-8"
          tabs={[
            { id: 'agentforce', label: 'AI & Digital Labor' },
            { id: 'mulesoft', label: 'MuleSoft Integration' },
            { id: 'salesforce', label: 'Salesforce Optimization' },
            { id: 'data', label: 'Data & Migrations' },
          ]}
          panes={{
            agentforce: (
              <div>
                <HeroSimple
                  title="Launch your first AI agent the right way"
                  subhead="Scope, build, and deploy AI agents with clear jobs, safe actions, and measurable KPIs—delivered by US‑based senior experts using AI‑accelerated methods to move twice as fast as traditional teams."
                />
                <DeliverablesWheel
                  heading="What we deliver"
                  items={[
                    { title: 'Use-case selection & KPI definition', body: 'Choose the workflow with the highest ROI and define metrics (deflection, cycle time reduction, capacity uplift).' },
                    { title: 'Knowledge & data architecture', body: 'Build the retrieval layer, truth sources, and freshness guarantees that agents rely on.' },
                    { title: 'Safe action design', body: 'Guardrails, approvals, fallback behaviors, and auditability so actions are trustworthy.' },
                    { title: 'Pilot build & launch', body: 'An end-to-end working agent with the minimal integrations required to prove value.' },
                    { title: 'Adoption & iteration plan', body: 'Stakeholder alignment, feedback loop, and expansion roadmap tied to measured outcomes.' },
                  ]}
                />
                <HowItWorksLinear
                  id="how-agentforce"
                  heading="Outcome promise"
                  steps={[
                    { k: '01', title: 'Working agent in 8 weeks', body: 'Delivers a clear, business-valued outcome.' },
                    { k: '02', title: 'Automation coverage', body: 'Focus on repetitive, structured work to maximize impact.' },
                    { k: '03', title: 'Capacity freed', body: 'Shift routine effort to agents while keeping humans in the loop for escalation.' },
                  ]}
                  cta={{ label: 'Plan my first win', href: '/contact' }}
                />
                <WhyUsBanner body="We orchestrate agents as real operators—job definitions, safe actions, and KPIs—so the first win lands quickly and scales predictably." />
                <PreFooterCTA
                  title="Plan your first agent win"
                  body="Bring a workflow, we’ll shape the job, safe actions, and KPIs to launch in ~8 weeks."
                  primaryCta={{ label: 'Scope My First Agent', href: '/contact' }}
                  secondaryCta={{ label: 'Get the 8-Week Plan', href: '/plan' }}
                />
              </div>
            ),
            mulesoft: (
              <div>
                <HeroSimple
                  title="Integration that makes AI agents act"
                  subhead="AI‑accelerated, senior‑led MuleSoft delivery cuts integration timelines in half—giving agents the context they need from day one."
                />
                <DeliverablesWheel
                  heading="What we deliver"
                  items={[
                    { title: 'Reference architecture & governance', body: 'API-led, event-driven design patterns with clear ownership, security, and scalability baked in.' },
                    { title: 'AI-assisted accelerated implementation', body: 'Senior architects augmented by AI tooling to cut planning and build time—delivering outcomes in weeks, not months.' },
                    { title: 'Observability & reliability', body: 'Telemetry, error handling, SLAs, and health telemetry so your agents don’t just run—they run with confidence.' },
                    { title: 'Integration gap assessment', body: 'Quick diagnostic to surface the minimal set of pipelines/events required for your first agentic win.' },
                    { title: 'Deployment & validation runbook', body: 'Production-ready support: test harnesses, rollback strategies, and performance tuning.' },
                  ]}
                />
                <HowItWorksLinear
                  id="how-mulesoft"
                  heading="Outcome promise"
                  steps={[
                    { k: '01', title: 'Half the cycle time', body: 'Integration delivery moves twice as fast compared to traditional approaches.' },
                    { k: '02', title: 'Predictable agent readiness', body: 'Agents have the context and triggers they need from day one.' },
                    { k: '03', title: 'Scalable foundation', body: 'A future-proof base that doesn’t need to be rebuilt for new agents.' },
                  ]}
                  cta={{ label: 'Review My Integration Gaps', href: '/contact' }}
                />
                <WhyUsBanner body="Our senior MuleSoft architects, augmented by AI, ship faster with higher reliability—so your agents can act with confidence." />
                <PreFooterCTA
                  title="Review your integration gaps"
                  body="We’ll map the minimal event and pipeline set your first agent needs to act."
                  primaryCta={{ label: 'Book an assessment', href: '/contact' }}
                  secondaryCta={{ label: 'See our accelerators', href: '/plan' }}
                />
              </div>
            ),
            salesforce: (
              <div>
                <HeroSimple
                  title="Make Salesforce the control room for digital labor"
                  subhead="We streamline workflows, remove friction, and prepare your Salesforce org so humans and AI agents operate in flow—doubling throughput without doubling headcount."
                />
                <DeliverablesWheel
                  heading="What we deliver"
                  items={[
                    { title: 'Org assessment & quick wins', body: 'Identify and fix the biggest sources of delay and confusion.' },
                    { title: 'Workflow simplification', body: 'Collapse manual steps, streamline approvals, and remove bottlenecks.' },
                    { title: 'Automation readiness', body: 'Prepare object model, permissions, and telemetry for safe agent interaction.' },
                    { title: 'Adoption design', body: 'Embed agent touchpoints into user workflows so humans and AI complement, not compete.' },
                  ]}
                />
                <HowItWorksLinear
                  id="how-salesforce"
                  heading="Outcome promise"
                  steps={[
                    { k: '01', title: 'Faster internal throughput', body: 'Achieved by reducing manual handoffs and simplifying flows.' },
                    { k: '02', title: 'Higher adoption', body: 'Changes are low-friction and aligned to real work.' },
                    { k: '03', title: 'Agent-ready Salesforce', body: 'Reliably surfaces the right context and accepts safe actions.' },
                  ]}
                  cta={{ label: 'Optimize My Org', href: '/contact' }}
                />
                <WhyUsBanner body="We redesign Salesforce around outcomes—signal design, safe actions, and enablement—so agents and humans operate as one team." />
                <PreFooterCTA
                  title="Optimize your org for digital labor"
                  body="We’ll remove friction and ready Salesforce for reliable agent action."
                  primaryCta={{ label: 'Talk to Salesforce experts', href: '/contact' }}
                  secondaryCta={{ label: 'See optimization checklist', href: '/plan' }}
                />
              </div>
            ),
            data: (
              <div>
                <HeroSimple
                  title="The data your agents can trust"
                  subhead="Reliable pipelines and knowledge architecture give AI agents precise context to act with confidence—so automation scales without guesswork."
                />
                <DeliverablesWheel
                  heading="What we deliver"
                  items={[
                    { title: 'Source-of-truth mapping', body: 'Identify canonical data, ownership, and freshness rules.' },
                    { title: 'Event enrichment & real-time context', body: 'Ensure agents have live situational awareness via eventing patterns.' },
                    { title: 'Migration playbooks', body: 'Safe transitions with automated validation and drift detection.' },
                    { title: 'Governance framework', body: 'Schema, access controls, lineage tracking, and retention policy aligned to trust and auditability.' },
                  ]}
                />
                <HowItWorksLinear
                  id="how-data"
                  heading="Outcome promise"
                  steps={[
                    { k: '01', title: 'Trustworthy context', body: 'Every agent interaction backed by accurate, timely information.' },
                    { k: '02', title: 'Minimal downtime', body: 'Migrations with automated validation and drift controls.' },
                    { k: '03', title: 'Scaled knowledge', body: 'A durable foundation that expands to new use cases.' },
                  ]}
                  cta={{ label: 'Map My Data for AI', href: '/contact' }}
                />
                <WhyUsBanner body="We build data foundations as long-lived assets—predictable, observable, and built to grow with your automation portfolio." />
                <PreFooterCTA
                  title="Map your data for AI"
                  body="We’ll define trusted sources, freshness guarantees, and event patterns to power safe agent action."
                  primaryCta={{ label: 'Start a data blueprint', href: '/contact' }}
                  secondaryCta={{ label: 'See migration playbook', href: '/plan' }}
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