import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PreFooterCTA from '../components/PreFooterCTA';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function ThankYouGrantAgentDemoVideoPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Grant Agent – Watch the full demo | Green Irony</title>
        <meta name="description" content="Grant Agent by Green Irony – Watch the full demo below. Ready for a closer look? Book a custom demo tailored to your institution’s needs." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        {/* Heading */}
        <section className="relative isolate">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gi-text text-balance">Grant Agent by Green Irony – Watch the full demo below.</h1>
          </div>
        </section>

        {/* Video block */}
        <section className="mx-auto max-w-5xl px-6 pb-6">
          <div className="relative w-full aspect-video overflow-hidden rounded-2xl border border-gi-fog bg-gi-subtle">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/FDkQRgK-_do"
              title="Grant Agent Demo Video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>

        <PreFooterCTA
          title="Ready for a closer look at Grant Agent?"
          body="Book a custom demo tailored to your institution’s needs. We’ll show you how Grant Agent fits your workflows, accelerates funding, and can generate your first AI‑powered grant at no cost."
          primaryCta={{ label: 'Book a custom demo', href: '/grant-agent#grant-agent-demo' }}
          secondaryCta={{  }}
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


