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
          subhead="Most AI pilots stall because agents can’t see context, act safely, or scale. Our approach removes those barriers—combining integration‑first architecture, AI‑native delivery methods, and outcome‑driven focus—so you get results you can count on."
          items={[
            { title: 'Integration‑first execution', body: 'Reliable agents require reliable context. We design event‑driven, API‑led integrations that give agents a clear view of state and the ability to trigger safe, consistent actions.' },
            { title: 'AI‑native delivery', body: 'We rebuilt delivery with AI at the core. Discovery, design, and build all move 2× faster—without sacrificing senior‑level quality or predictability.' },
            { title: 'Outcome orientation', body: 'Every project starts with measurable goals—speed, deflection, capacity—and ends with outcomes delivered in weeks, not months.' },
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
                  title="AI agents that work—right from the start"
                  subhead="Whether it’s your first agent or your next ten, we design Salesforce‑native agents with clear jobs, safe actions, and measurable KPIs. Delivered by US‑based experts using AI‑accelerated methods, you’ll see value twice as fast—and scale with confidence."
                />
                <DeliverablesWheel
                  heading="What we deliver"
                  items={[
                    { title: 'Use-case selection & KPI definition', body: 'Identify the highest‑ROI workflow and define success metrics (deflection, cycle time, capacity uplift).' },
                    { title: 'Knowledge & data architecture', body: 'Give agents a reliable source of truth with retrieval layers, freshness guarantees, and actionable context.' },
                    { title: 'Safe action design', body: 'Build guardrails, approvals, and fallback behaviors so agent actions are always trustworthy.' },
                    { title: 'Pilot build & launch', body: 'Deliver an end‑to‑end working agent with only the integrations needed to prove measurable value fast.' },
                    { title: 'Adoption & iteration plan', body: 'Align stakeholders, close the feedback loop, and expand with confidence—each step tied to measurable outcomes.' },
                    { title: 'Scalability roadmap', body: 'Move from a single pilot to enterprise‑wide digital labor with a step‑by‑step plan to scale agents safely and predictably across teams.' },
                  ]}
                />
                <p className="mx-auto mt-4 max-w-3xl px-6 text-gi-gray">
                  In 8 weeks, you’ll have a live Salesforce‑native agent delivering measurable results—deflecting demand, freeing capacity, and proving the ROI of digital labor.
                </p>
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
                <WhyUsBanner
                  //body="We orchestrate agents as real operators—job definitions, safe actions, and KPIs—so the first win lands quickly and scales predictably."
                  bullets={[
                    'Proven expertise: Enterprise‑grade Salesforce and MuleSoft partner since 2016.',
                    'AI‑native methods: Every step accelerated with AI for 2× faster delivery.',
                    'US‑based senior talent: Offshore‑competitive economics without the tradeoffs.',
                    'Predictable outcomes: Scope, build, and go‑live you can plan around.',
                  ]}
                />
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
                  title="MuleSoft integration, delivered faster"
                  subhead="AI-accelerated, senior-led MuleSoft delivery cuts integration timelines in half—so you get rock-solid, enterprise-grade integrations in weeks, not months. (And when you’re ready for AI agents, your architecture will already be prepared.)"
                />
                <DeliverablesWheel
                  heading="What we deliver"
                  items={[
                    { title: 'Composable architecture & governance', body: 'Event-driven, standards-based patterns and reusable assets so integrations are fast, consistent, and future-proof.' },
                    { title: 'AI-accelerated implementation', body: 'Senior MuleSoft architects use AI to build and validate integrations twice as fast—without cutting corners on quality.' },
                    { title: 'Observability & reliability', body: 'End-to-end monitoring, tracing, and SLAs so issues are visible, recoverable, and rare—giving you confidence in production.' },
                    { title: 'Integration gap assessment', body: 'Quick diagnostic to surface the minimal set of pipelines/events required for your first agentic win.' },
                    { title: 'Deployment & validation runbook', body: 'Documented deployment steps, rollback plans, and validation processes ensure your integrations go live smoothly.' },
                  ]}
                />
                <HowItWorksLinear
                  id="how-mulesoft"
                  heading="Outcome promise"
                  subhead="From integration backlog to business impact — fast"
                  steps={[
                    { k: '01', title: 'Half the cycle time', body: 'Integration delivery moves twice as fast compared to traditional approaches—going live in as little as 3 weeks.' },
                    { k: '02', title: 'Predictable performance', body: 'Rock-solid integrations with clear SLAs, monitoring, and reliability you can count on from day one.' },
                    { k: '03', title: 'Scalable foundation', body: 'A composable base that adapts to future needs—ready for new systems, processes, and even AI agents when you are.' },
                  ]}
                  cta={{ label: 'Review My Integration Gaps', href: '/contact' }}
                  leadInBeforeButton="Ready to accelerate MuleSoft without sacrificing confidence? Let’s review your integration gaps and build a plan to go live faster."
                />
                <WhyUsBanner
                  body="Our senior MuleSoft architects, augmented by AI, ship faster with higher reliability—so your agents can act with confidence."
                  bullets={[
                    'Proven expertise: Trusted in high-stakes environments where uptime matters most.',
                    'AI-native methods: Every step accelerated with AI for 2× faster delivery.',
                    'US-based senior team: Offshore-competitive economics without the tradeoffs.',
                    'Predictable outcomes: Governance and reusable patterns that prevent rework and keep costs in check.',
                  ]}
                />
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
                  title="Salesforce done right — faster"
                  subhead="From Sales Cloud to Experience Cloud and beyond, our senior architects deliver Salesforce builds that scale. With AI‑accelerated methods, you get predictable outcomes in half the time—without the costly rework that comes from shortcuts."
                />
                <DeliverablesWheel
                  heading="What we deliver"
                  items={[
                    { title: 'Smart discovery & design', body: 'Translate business requirements into clear, future‑proof Salesforce designs—accelerated by AI without missing critical details.' },
                    { title: 'Rapid, reliable implementation', body: 'US‑based senior architects use AI tools to configure and build Salesforce orgs faster, while maintaining enterprise‑grade quality.' },
                    { title: 'Trusted data & migrations', body: 'Ensure clean, accurate data migrations that fuel adoption, reporting, and decision‑making from day one.' },
                    { title: 'Optimization & automation', body: 'Streamline workflows and eliminate swivel‑chair processes with Salesforce automation that actually sticks.' },
                  ]}
                />
                <WhyUsBanner
                  title="From scope to Salesforce impact — in weeks, not months"
                  bullets={[
                    'Half the delivery time — Projects go live in as little as 4 weeks with AI‑accelerated methods.',
                    'Confidence at launch — Builds are tested, validated, and adoption‑ready on day one.',
                    'Future‑ready foundation — A Salesforce org that scales with your business—and is agent‑ready when you’re ready.',
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
                  leadInBeforeButton="Want Salesforce done right the first time? Let’s design and deliver a build that’s fast, reliable, and built to scale."
                />
                <WhyUsBanner
                  body="We redesign Salesforce around outcomes—signal design, safe actions, and enablement—so agents and humans operate as one team."
                  bullets={[
                    'Enterprise experience: Trusted Salesforce partner since 2016, delivering for SMBs and enterprises alike.',
                    'AI‑accelerated delivery: 2× faster without sacrificing quality or predictability.',
                    'US‑based senior architects: Offshore economics, without the offshore risks.',
                    'Proven track record: Implementations that last and scale—no costly rebuilds later.',
                  ]}
                />
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
                  title="Data & Migrations, done right"
                  subhead="Seamless platform migrations and trusted data pipelines so your teams (and future agents) make reliable, real-time decisions—without surprises or downtime."
                />
                <DeliverablesWheel
                  heading="What we deliver"
                  items={[
                    { title: 'Migration strategy & cutover plan', body: 'Risk‑based sequencing, dry runs, and rollback plans so go‑live is smooth and predictable.' },
                    { title: 'Data quality & reconciliation', body: 'Profiling, cleansing, and deduplication with reconciled counts—so stakeholders trust the numbers on day one.' },
                    { title: 'Composable pipelines & events', body: 'Standards‑based, event‑enriched pipelines that keep systems in sync and make downstream automation simpler.' },
                    { title: 'Security, governance & lineage', body: 'Access controls, PII handling, and lineage tracking aligned to your compliance requirements.' },
                  ]}
                />
                <HowItWorksLinear
                  id="how-data"
                  heading="From messy data to dependable decisions — fast"
                  steps={[
                    { k: '01', title: 'Minimal downtime', body: 'Migration cutovers planned and tested—so teams stay productive while systems switch over.' },
                    { k: '02', title: 'Trusted from day one', body: 'Clean, reconciled datasets with validation checks that give leaders confidence in every report.' },
                    { k: '03', title: 'Ready for real time', body: 'Event‑driven pipelines that keep data current across systems—and set you up for agent‑readiness when you’re ready.' },
                  ]}
                  cta={{ label: 'Map My Data for AI', href: '/contact' }}
                  leadInBeforeButton="Need your data clean, migrated, and trusted—without chaos? Let’s plan the fastest safe path to go‑live."
                />
                <WhyUsBanner
                  bullets={[
                    'AI‑accelerated delivery: Mapping, transformation, and validation move faster without sacrificing accuracy.',
                    'Senior‑led execution: US‑based architects who’ve handled complex, high‑risk migrations.',
                    'Composable patterns: Reusable pipelines and standards that reduce rework and cost.',
                    'Predictable outcomes: Clear plans, visible checkpoints, and no‑surprise go‑lives.',
                  ]}
                />
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