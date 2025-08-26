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
        <meta name="description" content="Book a 30‑minute 1:1 session with a Green Irony Agentforce expert and leave with a drafted AI Job Description tailored to your needs." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main className="flex-1">
        <HeroSimple
          title="Write Your Agentforce Job Description"
          subhead="Book a 30‑minute 1:1 session with a Green Irony Agentforce expert. We’ll help you define the ideal AI assistant role for your organization—and you’ll walk away with a fully drafted AI Job Description you can use to get started."
          
        />

        <section className="mx-auto max-w-5xl px-6 -mt-10 pb-2">
          <p className="mx-auto max-w-3xl text-center text-gi-text font-semibold">Zero cost. Immediate clarity on your next AI Assistant.</p>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-start">
            <div className="md:col-span-7">
              <h2 className="text-2xl md:text-3xl font-semibold text-gi-text">Our Approach</h2>

              {/* Step 1 */}
              <div className="mt-6 rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
                <h3 className="text-xl font-semibold text-gi-text">Step 1: Laying the Foundation for Digital Labor Success</h3>
                <p className="mt-1 text-sm text-gi-gray"><span className="inline-flex items-center rounded-full bg-gi-subtle px-2 py-1 text-gi-text">📍 You are here</span></p>
                <ul className="mt-3 space-y-2 text-gi-text">
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Identify critical use cases for Agentforce</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Define Agentforce agent roles</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Set clear, actionable goals</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Tailor agent to pinpoint substantial improvement opportunities</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="mt-6 rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
                <h3 className="text-xl font-semibold text-gi-text">Step 2: Driving Seamless Digital Transformation</h3>
                <ul className="mt-3 space-y-2 text-gi-text">
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Conclude initial assessments</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Launch and activate Agentforce solutions</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Implement a tailored digital workforce system</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Ensure alignment with business needs</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="mt-6 rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
                <h3 className="text-xl font-semibold text-gi-text">Step 3: Adapting and Evolving for Long-Term Growth</h3>
                <ul className="mt-3 space-y-2 text-gi-text">
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Adapt to changing market dynamics</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Update and refine digital labor solutions</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Maintain system effectiveness and competitiveness</li>
                  <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Scale operations to match evolving business environment</li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="p-6 gi-hubspot">
                <h3 className="text-xl font-semibold text-gi-text">Book your Free Agentforce Consultation</h3>
                <p className="mt-1 text-sm text-gi-gray">Let’s map out your first AI role—book a free 30-minute strategy session with an expert.</p>
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

        <PreFooterCTA
          title="Learn more about our Agentforce services"
          body="Explore how we design, build, and scale Salesforce‑native agents—from first win to enterprise rollout."
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


