import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroCenterPro from '../../components/HeroCenterPro';
import HowItWorksLinear from '../../components/HowItWorksLinear';
import ValuePillars from '../../components/ValuePillars';
import PreFooterCTA from '../../components/PreFooterCTA';
import HeroSimple from '../../components/HeroSimple';
import DeliverablesWheel from '../../components/DeliverablesWheel';
import WhyUsBanner from '../../components/WhyUsBanner';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../../queries/MenuQueries';

const Page: any = function SalesforcePage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Salesforce Optimization | Green Irony</title>
        <meta name="description" content="Make Salesforce the control room for both humans and agents to unlock real outcomes." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
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
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="relative overflow-hidden rounded-xl border border-gi-fog bg-white shadow-gi">
            <div aria-hidden className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-gi-pink to-gi-green/80" />
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold text-gi-text">From scope to Salesforce impact — in weeks, not months</h3>
              <ul className="mt-4 grid gap-3 md:grid-cols-3">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gi-green/15 text-gi-green ring-1 ring-gi-fog">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  <span className="text-sm text-gi-text/90">Half the delivery time — Projects go live in as little as 4 weeks with AI‑accelerated methods.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gi-green/15 text-gi-green ring-1 ring-gi-fog">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  <span className="text-sm text-gi-text/90">Confidence at launch — Builds are tested, validated, and adoption‑ready on day one.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gi-green/15 text-gi-green ring-1 ring-gi-fog">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  <span className="text-sm text-gi-text/90">Future‑ready foundation — A Salesforce org that scales with your business—and is agent‑ready when you’re ready.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
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