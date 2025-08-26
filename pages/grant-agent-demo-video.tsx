import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HubSpotForm from '../components/HubSpotForm';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function GrantAgentDemoVideoPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>See Grant Agent in Action | Green Irony</title>
        <meta name="description" content="Watch the Grant Agent demo to discover how your team can apply for more grants—all inside Salesforce. Complete the form to watch the full video." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        {/* Hero */}
        <section className="relative isolate bg-white">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gi-text text-balance">See Grant Agent in Action</h1>
            <p className="mt-3 max-w-3xl text-gi-gray text-balance">Watch the Grant Agent demo to discover how your team can apply for more grants—all inside Salesforce.</p>
          </div>
        </section>

        {/* Preview + Form */}
        <section className="mx-auto max-w-5xl px-6 pb-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-start">
            {/* Video preview placeholder */}
            <div className="md:col-span-7">
              <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-gi-fog bg-gi-subtle">
                <Image src="/images/AI-Grad.webp" alt="Grant Agent Demo Video preview" fill className="object-cover" sizes="(min-width: 768px) 60vw, 100vw" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/90 ring-2 ring-gi-green grid place-items-center">
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                      <path d="M8 5v14l11-7z" fill="#5AAD5A" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-gi-gray">Complete form to watch the full video.</p>
            </div>

            {/* Form */}
            <div className="md:col-span-5">
              <div className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
                <h2 className="text-xl font-semibold text-gi-text">Watch the full demo</h2>
                <p className="mt-1 text-sm text-gi-gray">Fill out the form to get instant access.</p>
                <div className="mt-6 gi-hubspot">
                  <HubSpotForm
                    portalId="23316092"
                    formId="e449fd86-a59e-496e-b272-19931f86b6ae"
                    cssClass=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key takeaways */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          <h3 className="text-2xl font-semibold text-gi-text">Watch demo and learn how to:</h3>
          <ul className="mt-4 space-y-3 text-gi-text">
            <li className="pl-6 relative">
              <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />
              <strong>Automate the entire grant process</strong> — from discovery to submission
            </li>
            <li className="pl-6 relative">
              <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />
              <strong>Maximize your Salesforce investment</strong> with AI-powered workflow
            </li>
            <li className="pl-6 relative">
              <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" />
              <strong>Apply for up to 12x more grants</strong> without increasing workload
            </li>
          </ul>
        </section>
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


