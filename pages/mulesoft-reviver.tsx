import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HubSpotForm from '../components/HubSpotForm';
import PreFooterCTA from '../components/PreFooterCTA';
import ServiceHero from '../components/ServiceHero';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function MuleSoftReviverPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Reviver for MuleSoft | Green Irony</title>
        <meta name="description" content="A rapid, expert-led diagnostic + recovery plan for teams stalled in MuleSoft. What used to take weeks now takes 48 hours—at no cost to you." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        <ServiceHero
          title="Reviver for MuleSoft"
          subhead="A rapid, expert-led diagnostic + recovery plan for teams stalled in MuleSoft. What used to take weeks now takes 48 hours—at no cost to you."
          image={{ src: '/images/mulesoft-reviver-hero.svg', alt: 'MuleSoft Reviver Hero Image' }}
          primaryCta={{ label: 'Get Started', href: '#reviver-form' }}
        />

        

        {/* Form */}
        <section id="reviver-form" className="mx-auto max-w-5xl px-6 pb-6">
          <h2 className="text-2xl font-semibold text-gi-text">Claim Your Expert Diagnostic</h2>
          <p className="mt-2 max-w-3xl text-gi-gray">Fill out the form to get started. We’ll schedule a quick intake and start your MuleSoft Reviver Plan.</p>
          <div className="mt-6 rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
            <HubSpotForm
              portalId="23316092"
              formId="b8f4a613-e3b3-4a33-b0f7-d1a98525dada"
              cssClass="gi-hubspot"
            />
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          <h3 className="text-2xl font-semibold text-gi-text">In just 48 hours, you’ll get:</h3>
          <ul className="mt-4 space-y-3 text-gi-text">
            <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>Deep-Dive Diagnostic</strong> of existing MuleSoft org, powered by our proprietary AI-driven solutions</li>
            <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>Root Cause Clarity</strong> to identify issues blocking progress (not just symptoms)</li>
            <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>Custom Recovery Plan</strong> with timeline, budget, and action plan for success</li>
            <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>Expert-Led Guidance</strong> with our in-house MuleSoft experts, tailored to your goals</li>
            <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>$25K+ Worth of Value,</strong> now delivered at no cost—for a limited time</li>
          </ul>
        </section>

        {/* Why Reviver */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          <h3 className="text-2xl font-semibold text-gi-text">Why MuleSoft Reviver?</h3>
          <p className="mt-3 max-w-3xl text-gi-text">Most technology health checks just scratch the surface. The vendor runs a checklist, hands you a PDF, and moves on. <strong>Green Irony’s MuleSoft Reviver solution is different — because we built it differently.</strong></p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gi-fog bg-white p-5 shadow-gi">
              <h4 className="text-lg font-semibold text-gi-text">AI-Powered Analysis</h4>
              <p className="mt-2 text-gi-gray">What used to take weeks and thousands of consulting project dollars, now takes just 48 hours—thanks to Green Irony’s proprietary AI solution design.</p>
            </div>
            <div className="rounded-2xl border border-gi-fog bg-white p-5 shadow-gi">
              <h4 className="text-lg font-semibold text-gi-text">Accelerated Frameworks</h4>
              <p className="mt-2 text-gi-gray">We’ve fixed broken integrations for Fortune 500 clients—now we’re packaging that expertise at a scale and speed right-sized for SMBs.</p>
            </div>
            <div className="rounded-2xl border border-gi-fog bg-white p-5 shadow-gi">
              <h4 className="text-lg font-semibold text-gi-text">Senior MuleSoft Expertise</h4>
              <p className="mt-2 text-gi-gray">Integration is our core. We’re not a generalist agency—our certified specialists live and breathe MuleSoft every day.</p>
            </div>
          </div>
        </section>

        <PreFooterCTA
          title="MuleSoft on Life Support?"
          body="We'll rescue your project before it flatlines—fast and free."
          primaryCta={{ label: 'Get Started', href: '#reviver-form' }}
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


