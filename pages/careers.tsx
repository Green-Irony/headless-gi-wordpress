import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function CareersPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>{siteTitle ? `${siteTitle} — Careers` : 'Careers'}</title>
        <meta name="description" content="Join an AI‑native team focused on practical outcomes, integration‑first architecture, and launching working agents in ~8 weeks." />
      </Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gi-text">Careers at Green Irony</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gi-gray">We move fast, deliver predictably, and design agents that act safely. If you thrive in senior‑led teams and love turning complexity into practical outcomes, wed love to hear from you.</p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="/contact#contact-form" className="btn-primary">Introduce Yourself</a>
            <a href="/insights" className="btn-secondary">See what were thinking</a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
            <h2 className="text-2xl font-semibold text-gi-text">Open Roles (Placeholder)</h2>
            <p className="mt-2 text-gi-gray">Were always looking for senior MuleSoft architects, Salesforce optimizers, and AI delivery leads. No formal postings yet—reach out with your work.</p>
          </div>
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


