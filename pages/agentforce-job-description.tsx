import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSimple from '../components/HeroSimple';
import PreFooterCTA from '../components/PreFooterCTA';
import HubSpotForm from '../components/HubSpotForm';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function AgentforceJobDescriptionPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Write Your Agentforce Job Description | Green Irony</title>
        <meta name="description" content="Book a 45‑minute working session with a senior architect. We’ll define your Agent’s Job Description and map the fastest safe path to a live Agentforce pilot—in as little as 3 weeks." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main className="flex-1">
        <HeroSimple
          title="Write Your Agentforce Job Description"
          subhead="Book a 45‑minute working session with a senior architect. We’ll define your Agent’s Job Description (responsibilities, guardrails, KPIs) and map the fastest safe path to a live Agentforce pilot—in as little as 3 weeks."
          
        />

        <section className="mx-auto max-w-5xl px-6 -mt-10 pb-2">
          <p className="mx-auto max-w-3xl text-center text-gi-text font-semibold">Zero cost. Immediate clarity on the fastest path to a working agent.</p>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-start">
            <div className="md:col-span-7">
              <h2 className="text-2xl md:text-3xl font-semibold text-gi-text">Our Approach</h2>

              {/* Step 1 */}
              <div className="mt-6 rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
                <h3 className="text-xl font-semibold text-gi-text">Step 1: Define the job (Agent Job Description)</h3>
                <ul className="mt-3 space-y-2 text-gi-text">
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Identify a high-impact outcome (deflection, capacity, speed, predictability)</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Specify responsibilities, inputs/outputs, and human handoffs</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Set guardrails (approvals, limits, auditability)</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Confirm KPIs and success criteria</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="mt-6 rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
                <h3 className="text-xl font-semibold text-gi-text">Step 2: Build the pilot (non-prod)</h3>
                <ul className="mt-3 space-y-2 text-gi-text">
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Connect safe credentials to non‑prod systems (Salesforce, Slack, MuleSoft APIs, knowledge)</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Implement 1–2 priority workflows from the AJD end‑to‑end</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Add approvals, logging, and rollback behaviors</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Stand up dashboards for transparency and learning</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="mt-6 rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
                <h3 className="text-xl font-semibold text-gi-text">Step 3: Prove and plan production</h3>
                <ul className="mt-3 space-y-2 text-gi-text">
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />UAT with real scenarios; tune prompts, guardrails, and throughput</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Finalize cutover approach and production access patterns</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Map the 3–8 week plan to go‑live and scale to the next jobs</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Lock owners, quality gates, and timeline</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="p-6 gi-hubspot">
                <h3 className="text-xl font-semibold text-gi-text">Book your 8‑Week Outcomes Workshop</h3>
                <p className="mt-1 text-sm text-gi-gray">Let’s design the job and show it working. Request a 45‑minute session with an expert—your AJD and week‑by‑week plan arrive in the next few business days.</p>
                <div className="mt-6">
                  <HubSpotForm
                    portalId="23316092"
                    formId="a617f298-afb5-4b32-9bd8-55120e55ea3b"
                    cssClass=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-2xl px-6 py-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gi-text">Timeline</h2>
          <div className="mt-6 rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
            <h3 className="text-xl font-semibold text-gi-text">A fast, safe path to live</h3>
            <ul className="mt-3 space-y-2 text-gi-text">
              <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Weeks 0–1: Align & AJD</li>
              <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Weeks 1–3: Build pilot in non‑prod</li>
              <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Weeks 3–4: UAT & guardrails</li>
              <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Weeks 4–8: Production hardening & scale</li>
            </ul>
          </div>
        </section>

        <PreFooterCTA
          title="Learn more about our Agentforce services"
          body="Explore how we design, pilot, and scale Salesforce‑native agents—built on composable integrations and senior‑led delivery."
          primaryCta={{ label: 'Explore Agentforce services', href: '/services/agentforce' }}
          secondaryCta={{}}
        />
      </main>

      <Footer />
    </>
  );
};

export default Page;

export async function getStaticProps(context: any) {
  return getNextStaticProps(context, { Page, revalidate: 60 });
}

(Page as any).queries = [
  { query: SITE_DATA_QUERY },
  { query: HEADER_MENU_QUERY },
] as any;


