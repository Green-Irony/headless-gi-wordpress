import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceHero from '../components/ServiceHero';
import HubSpotForm from '../components/HubSpotForm';
import PreFooterCTA from '../components/PreFooterCTA';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function GrantGuideHigherEdPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Grant Agent: A Guide for Higher Education | Green Irony</title>
        <meta name="description" content="A practical guide to using AI digital labor and Salesforce to streamline grants management, save time, and increase funding opportunities for your institution." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main className="flex-1">
        <ServiceHero
          title="Grant Agent: A Guide for Higher Education"
          subhead="A practical guide to using AI digital labor and Salesforce to streamline grants management, save time, and increase funding opportunities for your institution."
          image={{ src: '/images/grant-agent-header.webp', alt: 'Grant Agent Guide' }}
          primaryCta={{ label: 'Download your copy', href: '#download' }}
        />

        {/* Two-column: What you'll learn + Form */}
        <section id="download" className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-start">
            <div className="md:col-span-7">
              <h2 className="text-2xl md:text-3xl font-semibold text-gi-text">What You’ll Learn in this Guide</h2>
              <ul className="mt-4 space-y-3 text-gi-text">
                <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>Why grants are slipping through the cracks</strong> — and what it’s costing smaller colleges and universities</li>
                <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>How AI-powered digital labor works</strong> inside Salesforce to streamline the entire grant lifecycle</li>
                <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>What Grant Agent by Green Irony does</strong> to help lean teams discover, evaluate, and draft proposals—faster and smarter</li>
                <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>Actionable steps</strong> to modernize your grant operations, without new headcount or complex tech overhauls</li>
                <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>How to build a proactive grant strategy</strong> using tools you already trust</li>
              </ul>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi gi-hubspot">
                <h3 className="text-xl font-semibold text-gi-text">Download Your Copy</h3>
                <p className="mt-1 text-sm text-gi-gray">Fill out the form to get instant access to the guide.</p>
                <div className="mt-6">
                  <HubSpotForm
                    portalId="23316092"
                    formId="8573ba2d-42fe-4ff9-be15-e64e6aeb2914"
                    cssClass=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <PreFooterCTA
          title="See how Grant Agent works in Salesforce"
          body="Discover how AI‑powered digital labor helps lean teams discover, draft, and submit more competitive proposals—without leaving Salesforce."
          primaryCta={{ label: 'Explore Grant Agent', href: '/grant-agent' }}
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


