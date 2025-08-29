import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCenterPro from '../components/HeroCenterPro';
import HubSpotForm from '../components/HubSpotForm';
import ChecklistCard from '../components/ChecklistCard';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function ContactPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const pageTitle = 'Contact | Green Irony';
  const metaDescription = 'Book your first AI-native agent win. Scope integration gaps, launch a pilot, and cut delivery time in half with our 8-week plan—talk to an expert today.';

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
          title="Let’s launch your first win—fast"
          body="Our team responds within one business day—often the same day. We’ll triage your goals quickly and loop in a senior architect as soon as it’s useful."
          kpis={[]}
          showMedia={false}
          showPrimaryCta={false}
          showSecondaryCta={false}
        />

        {/* Contact form */}
        <section id="contact-form" className="mx-auto max-w-5xl px-6 pb-36">
          <div className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi gi-hubspot">
            <HubSpotForm portalId="23316092" formId="191027ff-631f-4a20-8e8e-36b5d5c91d74" />
          </div>
        </section>
        {/*
        <section id="calendar" className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="text-2xl font-semibold text-gi-text">30-minute First-Win Strategy Session</h2>
          <p className="mt-2 max-w-3xl text-gi-gray">Skip the form—pick a time that works. We'll come prepared with a mini diagnostic based on the workflow you want to fix.</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-gi-fog bg-white p-2 shadow-gi">
            <div className="aspect-video w-full">
              <iframe title="Booking Calendar" src="about:blank" className="h-full w-full" />
            </div>
          </div>
        </section>*/}

        {null}

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