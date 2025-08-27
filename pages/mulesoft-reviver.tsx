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
import { toAbsoluteUrl, buildCanonicalUrl } from '../lib/seo';

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
        <title>MuleSoft Reviver — Fix what’s broken fast | 48‑hour diagnostic</title>
        <meta name="description" content="AI‑native recovery for MuleSoft. Get a 48‑hour RCA, a clear recovery plan, and a path to stability in weeks—not months." />
        {/* Open Graph */}
        <meta property="og:title" content="MuleSoft Reviver — Fix what’s broken fast | 48‑hour diagnostic" />
        <meta property="og:description" content="AI‑native recovery for MuleSoft. Get a 48‑hour RCA, a clear recovery plan, and a path to stability in weeks—not months." />
        <meta property="og:url" content={buildCanonicalUrl('/mulesoft-reviver/')} />
        <meta property="og:image" content={toAbsoluteUrl('/images/mulesoft-reviver-hero.svg')} />
        {/* Twitter Card */}
        <meta name="twitter:title" content="MuleSoft Reviver — Fix what’s broken fast | 48‑hour diagnostic" />
        <meta name="twitter:description" content="AI‑native recovery for MuleSoft. Get a 48‑hour RCA, a clear recovery plan, and a path to stability in weeks—not months." />
        <meta name="twitter:image" content={toAbsoluteUrl('/images/mulesoft-reviver-hero.svg')} />
        {/* WebPage JSON-LD */}
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "MuleSoft Reviver — Fix what’s broken fast | 48‑hour diagnostic",
              url: buildCanonicalUrl('/mulesoft-reviver/') || undefined,
              description:
                "AI‑native recovery for MuleSoft. Get a 48‑hour RCA, a clear recovery plan, and a path to stability in weeks—not months.",
              isPartOf: {
                "@type": "WebSite",
                name: "Green Irony",
                url: toAbsoluteUrl('/') || undefined,
              },
            }),
          }}
        />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        <ServiceHero
          title="Reviver for MuleSoft"
          subhead="MuleSoft not performing? Fix what’s broken—fast. Our AI‑native recovery pairs senior US‑based architects with digital labor to deliver a 48‑hour root‑cause readout and a clear plan to restore stability in weeks, not months."
          image={{ src: '/images/mulesoft-reviver-hero.svg', alt: 'MuleSoft Reviver Hero Image' }}
          primaryCta={{ label: 'Book the 48‑hour diagnostic', href: '#reviver-form' }}
        />

        

        {/* Form */}
        <section id="reviver-form" className="mx-auto max-w-5xl px-6 pb-6">
          <h2 className="text-2xl font-semibold text-gi-text">Claim Your Expert Diagnostic</h2>
          <p className="mt-2 max-w-3xl text-gi-gray">Fill out the form and we’ll schedule a short intake. Within 48 hours, you’ll have a concise RCA and a prioritized recovery plan—timeline, budget, and next steps you can act on immediately.</p>
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
            <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Root‑cause analysis of architecture, flows, environments, and policies.</li>
            <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />A clear recovery plan with milestones, owners, and budget.</li>
            <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Performance benchmarks and reliability targets (dashboards/SLAs).</li>
            <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />Senior‑led guidance amplified by AI to accelerate fixes.</li>
          </ul>
        </section>

        {/* Why Reviver */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          <h3 className="text-2xl font-semibold text-gi-text">Why MuleSoft Reviver?</h3>
          <p className="mt-3 max-w-3xl text-gi-text">We go beyond health‑check checklists. Reviver pinpoints the real blockers—design debt, non‑performant flows, brittle error handling, environment drift, and missing observability—and gets you back to reliable delivery fast.</p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gi-fog bg-white p-5 shadow-gi">
              <h4 className="text-lg font-semibold text-gi-text">2× faster delivery</h4>
              <p className="mt-2 text-gi-gray">AI‑accelerated analysis and senior execution cut recovery timelines in half—without sacrificing quality.</p>
            </div>
            <div className="rounded-2xl border border-gi-fog bg-white p-5 shadow-gi">
              <h4 className="text-lg font-semibold text-gi-text">On‑shore expertise at offshore economics</h4>
              <p className="mt-2 text-gi-gray">Seasoned US‑based MuleSoft architects deliver with the efficiency of digital labor, matching offshore price points.</p>
            </div>
            <div className="rounded-2xl border border-gi-fog bg-white p-5 shadow-gi">
              <h4 className="text-lg font-semibold text-gi-text">Predictable outcomes</h4>
              <p className="mt-2 text-gi-gray">Accurate plans, quality gates, and clear SLAs reduce rework and surprises so you can plan with confidence.</p>
            </div>
          </div>
        </section>

        <PreFooterCTA
          title="MuleSoft on Life Support?"
          body="We stabilize quickly and set a future‑proof foundation—composable patterns, CI/CD, and full observability—often in as little as 3 weeks, depending on scope."
          primaryCta={{ label: 'Book the 48‑hour diagnostic', href: '#reviver-form' }}
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


