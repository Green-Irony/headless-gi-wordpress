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
import HowWeWorkSerpentine from '../components/HowWeWorkSerpentine';
import ChecklistCard from '../components/ChecklistCard';
import PillarsDynamic from '../components/PillarsDynamic';
import ValuePillars from '../components/ValuePillars';
import TitleBullets from '../components/CustomerStories/TitleBullets';

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
        <title>MuleSoft Rescue After 'Free' Builds — 48‑Hour Diagnostic | Reviver by Green Irony</title>
        <meta name="description" content="Offshore or 'free' MuleSoft delivery gone sideways? Get a 48‑hour root‑cause readout and fix‑forward plan with budget and timeline. Stabilize in weeks, not months." />
        {/* Open Graph */}
        <meta property="og:title" content="MuleSoft Rescue After 'Free' Builds — 48‑Hour Diagnostic | Reviver by Green Irony" />
        <meta property="og:description" content="Offshore or 'free' MuleSoft delivery gone sideways? Get a 48‑hour root‑cause readout and fix‑forward plan with budget and timeline. Stabilize in weeks, not months." />
        <meta property="og:url" content={buildCanonicalUrl('/offshore-rescue/')} />
        <meta property="og:image" content={toAbsoluteUrl('/images/mulesoft-reviver-hero.svg')} />
        {/* Twitter Card */}
        <meta name="twitter:title" content="MuleSoft Rescue After 'Free' Builds — 48‑Hour Diagnostic | Reviver by Green Irony" />
        <meta name="twitter:description" content="Offshore or 'free' MuleSoft delivery gone sideways? Get a 48‑hour root‑cause readout and fix‑forward plan with budget and timeline. Stabilize in weeks, not months." />
        <meta name="twitter:image" content={toAbsoluteUrl('/images/mulesoft-reviver-hero.svg')} />
        {/* WebPage JSON-LD */}
        {/* eslint-disable-next-line react/no-danger */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "MuleSoft Rescue After 'Free' Builds — 48‑Hour Diagnostic | Reviver by Green Irony",
              url: buildCanonicalUrl('/offshore-rescue/') || undefined,
              description:
                "Offshore or 'free' MuleSoft delivery gone sideways? Get a 48‑hour root‑cause readout and fix‑forward plan with budget and timeline. Stabilize in weeks, not months.",
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
          title="MuleSoft rescue after 'free' builds — clarity in 48 hours"
          subhead="If an offshore or 'free' delivery left you with failing flows, missed SLAs, or finger‑pointing, Reviver gives you a root‑cause readout in 48 hours and a fix‑forward plan with budget and timeline."
          image={{ src: '/images/mulesoft-reviver-hero.svg', alt: 'MuleSoft Reviver Hero Image' }}
          primaryCta={{ label: 'Start my 48-hour diagnostic', href: '/offshore-rescue/#reviver-form' }}
        />

        {/* Symptoms */}
        <TitleBullets
          title="You might be dealing with:"
          bullets={[
            'Timeouts, retries, or stuck queues',
            'Duplicate or missing data between systems',
            'Little to no observability, or logs you can’t trust',
            "One environment works but production doesn’t",
            'Every change breaks something else',
            'No clear timeline or budget for a fix',
          ]}
          bg="navy"
          text="white"
        />

        

        {/* Form */}
        <section id="reviver-form" className="mx-auto max-w-5xl px-6 py-24">
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
        <ChecklistCard
          heading="What you get in 48 hours"
          columns={2}
          items={[
            'Root‑cause analysis with an architecture snapshot.',
            'Stabilization options with budget & timeline ranges.',
            'Keep vs. refactor recommendations (we keep what works).',
            'Risk register and prioritized backlog.',
            'Readout meeting with stakeholders (recording & deck).',
          ]}
        />

        {/* How Reviver works */}
        <HowWeWorkSerpentine
          title="How Reviver works"
          subhead="From triage to stabilization"
          steps={[
            { k: '01', title: 'Triage & access (same day)', caption: 'Quick intake, read‑only access, non‑prod first.' },
            { k: '02', title: 'Snapshot', caption: 'Flows, error patterns, runtime metrics, and environment diffs.' },
            { k: '03', title: 'Map & measure', caption: 'Event‑driven target patterns, observability gaps, and security checks.' },
            { k: '04', title: 'Readout (48 hours)', caption: 'RCA + plan, budget, and a clear stabilization path.' },
            { k: '05', title: 'Stabilize (as little as 3 weeks*)', caption: 'Fix‑forward execution with quality gates.' },
          ]}
          variant="serpentine"
        />

        {/* Why Reviver */}
        <PillarsDynamic
          heading="Why Green Irony vs. offshore 'free'"
          subhead="We fix forward—not blame. Senior, US‑based architects paired with AI acceleration deliver clarity and stability fast—at offshore‑competitive economics."
          items={[
            { title: 'On‑shore, senior, AI‑accelerated', body: 'US‑based team at offshore‑competitive economics.', iconSrc: '/icons/pro_network.svg', iconAlt: 'Team' },
            { title: 'Composable, event‑driven patterns', body: 'Scale with confidence and operate easily.', iconSrc: '/icons/flow.svg', iconAlt: 'Flow' },
            { title: 'Governance baked in', body: 'Observability, rollbacks, security, and auditability from day one.', iconSrc: '/icons/graph.svg', iconAlt: 'Governance' },
            { title: 'Fix forward culture', body: 'No blame memos—we leave you better than we found you.', iconSrc: '/icons/forward_up.svg', iconAlt: 'Forward' },
            { title: 'Transparent pricing & progress', body: 'You know what’s next and what it costs.', iconSrc: '/icons/line_chart.svg', iconAlt: 'Transparency' },
          ]}
        />

        {/* Timeline & investment */}
        <ValuePillars
          heading="Timeline & investment"
          items={[
            { title: '48‑hour diagnostic', body: 'Flat‑fee; commit to a fix‑forward plan you can run or have us deliver.', iconSrc: '/icons/clock.svg', iconAlt: 'Clock' },
            { title: 'Stabilization (3–6 weeks)', body: 'Common rescues complete in 3–6 weeks; deeper refactors priced transparently.', iconSrc: '/icons/forward_up.svg', iconAlt: 'Upward arrow' },
            { title: 'Operate', body: 'Optional support after go‑live.', iconSrc: '/icons/orchestrator.svg', iconAlt: 'Operations orchestration' },
          ]}
        />

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


