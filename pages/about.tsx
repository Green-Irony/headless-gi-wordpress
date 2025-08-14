import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCenterPro from '../components/HeroCenterPro';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function AboutPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const pageTitle = 'About Green Irony | AI-Native Consulting & Digital Labor';
  const metaDescription = 'Learn how Green Irony rebuilt consulting around agentic AI to deliver faster, smarter, and more affordable outcomes—combining integration-first foundations with senior expertise.';

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
          title="AI amplifies expertise—yours and ours"
          body="We rebuilt consulting to deliver real business outcomes fast. By embedding agents into delivery and powering them with integrated systems, we give you predictable speed, capacity, and confidence without the usual overhead."
          primaryCta={{ label: 'Meet the Team', href: '#team' }}
          secondaryCta={{ label: 'Start Your First Win', href: '#contact' }}
          kpis={[{ label: '⚡ Faster delivery' }, { label: '⬇️ Deflection up' }, { label: '🧠 Capacity unlocked' }]}
          showMedia={false}
        />

        {/* Origin Story */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">Our Origin Story</h2>
          <p className="mt-3 max-w-4xl text-gi-gray">
            Founded on the lessons of large-scale integration and delivery, Green Irony evolved from traditional consulting into an <strong>AI-native delivery engine</strong>. What used to take months to scope, integrate, and stabilize is now compressed into predictable eight-week first wins—thanks to agentic automation, senior-led architecture, and integration-first execution. The same operational rigor that powered major event-driven initiatives (like at Spirit Airlines) is now available without enterprise bloat.
          </p>

          <ul className="mt-6 grid list-disc gap-2 pl-6 text-gi-gray marker:text-gi-green/80">
            <li>Built in 2016 with deep roots in middleware, MuleSoft, and Salesforce delivery.</li>
            <li>Reimagined in 2025 as an AI-native firm where agents are part of the operating system—not an afterthought.</li>
            <li>Combines “offshore economics with onshore expertise at the speed of AI.”</li>
            <li>Focused on measurable business outcomes: faster delivery, deflection, capacity unlocked.</li>
          </ul>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">Mission</h2>
          <p className="mt-3 max-w-4xl text-gi-gray">
            <strong>To make enterprise-grade AI and integration accessible to organizations of all sizes</strong> by delivering predictable, scalable business outcomes through agent-native digital labor.
          </p>
        </section>

        {/* Differentiators */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">What Makes Us Different</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-semibold text-gi-text">AI-Native from Day One</h3>
              <p className="mt-1 text-gi-gray">Agents aren’t bolt-ons—they’re embedded in scoping, execution, and iteration. That means faster pilots, safer actions, and clearer expansion paths.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-semibold text-gi-text">Integration as the Engine</h3>
              <p className="mt-1 text-gi-gray">We don’t add AI on top of broken systems. We connect the right data and events first so agents can see, decide, and act with real impact.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-semibold text-gi-text">Senior-Led, Amplified by AI</h3>
              <p className="mt-1 text-gi-gray">Experienced architects guide every engagement, using AI to accelerate delivery—delivering the leverage of a larger team without dilution.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-semibold text-gi-text">Outcome Orientation</h3>
              <p className="mt-1 text-gi-gray">Every project starts with the business result (speed, deflection, capacity) and works backward to the technical design.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi md:col-span-2">
              <h3 className="font-semibold text-gi-text">Lean Partner Mentality</h3>
              <p className="mt-1 text-gi-gray">We act as embedded extensions, especially for resource-constrained SMBs and nimble enterprise initiatives—prioritizing high-leverage wins over bloated roadmaps.</p>
            </div>
          </div>
        </section>

        {/* Team snapshot */}
        <section id="team" className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">Team / Credibility Snapshot</h2>
          <p className="mt-3 max-w-4xl text-gi-gray">(Placeholder — replace with real names/photos/bios)</p>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            <li className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi"><strong>Founder / CEO:</strong> [Name] — Engineer turned operator with deep experience in middleware, Salesforce/MuleSoft integration, and architecting AI-native firms.</li>
            <li className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi"><strong>Principal Architect:</strong> [Name] — Builds scalable, event-driven systems that power agentic workflows.</li>
            <li className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi"><strong>AI Delivery Lead:</strong> [Name] — Designs job descriptions for agents and operationalizes safe actions.</li>
            <li className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi"><strong>Customer Success / Ops:</strong> [Name] — Bridges outcomes back into the business to ensure adoption and scale.</li>
          </ul>
          <p className="mt-4 text-sm text-gi-gray">Optional badges/credentials to display: Salesforce partner expertise, MuleSoft delivery track record, case study logos, certifications.</p>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">Values</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <li className="rounded-lg border border-gi-fog bg-white p-4">Outcome over activity</li>
            <li className="rounded-lg border border-gi-fog bg-white p-4">Speed with reliability</li>
            <li className="rounded-lg border border-gi-fog bg-white p-4">Transparency in automation</li>
            <li className="rounded-lg border border-gi-fog bg-white p-4">Integration before intelligence</li>
            <li className="rounded-lg border border-gi-fog bg-white p-4">Human + agent collaboration</li>
            <li className="rounded-lg border border-gi-fog bg-white p-4">Partner, not vendor</li>
          </ul>
        </section>

        {/* How we work */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">How We Work</h2>
          <h3 className="mt-2 text-lg font-semibold text-gi-text">Align → Prove → Scale</h3>
          <p className="mt-2 max-w-4xl text-gi-gray">We begin with a focused first win, build an AI-native system that works, measure real impact, and then expand the agent portfolio—never shipping uncertainty.</p>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">FAQ</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-medium text-gi-text">What does “AI-native” mean?</h3>
              <p className="mt-1 text-sm text-gi-gray">Agents are part of the delivery system, not a feature added later. Their jobs, data access, and actions are designed from the start.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-medium text-gi-text">How quickly can we see results?</h3>
              <p className="mt-1 text-sm text-gi-gray">Most first wins are scoped and delivered in approximately eight weeks.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-medium text-gi-text">Do you work with small teams?</h3>
              <p className="mt-1 text-sm text-gi-gray">Yes. Our model amplifies small teams through digital labor—delivering enterprise-grade outcomes without enterprise overhead.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-medium text-gi-text">What industries do you serve?</h3>
              <p className="mt-1 text-sm text-gi-gray">Travel, higher education, SMBs, and any organization relying on Salesforce/MuleSoft to run critical workflows.</p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi md:col-span-2">
              <h3 className="font-medium text-gi-text">How do you ensure AI actions are safe?</h3>
              <p className="mt-1 text-sm text-gi-gray">Through scoped agent job definitions, guardrails, approval flows, and observability baked into every action path.</p>
            </div>
          </div>
        </section>

        {/* Careers */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <h2 className="text-2xl font-semibold text-gi-text">Careers / Join Us</h2>
          <h3 className="mt-2 text-lg font-semibold text-gi-text">Build the future of consulting</h3>
          <p className="mt-2 max-w-4xl text-gi-gray">Join a flat, AI-native team that values speed, experimentation, and measurable impact. Work on integration-first architectures, agentic delivery, and real customer outcomes.</p>
          <div className="mt-4"><a className="btn-secondary" href="#contact">View Open Roles / Get in Touch</a></div>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-2xl border border-gi-fog bg-white p-8 text-center shadow-gi">
            <h2 className="text-2xl font-semibold text-gi-text">Ready to prove your first win?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-gi-gray">From integration to agent to outcome—we’ll map your eight-week path.</p>
            <div className="mt-6"><a className="btn-primary" href="#contact">Start Your First Win</a></div>
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