import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSimple from '../components/HeroSimple';
import PreFooterCTA from '../components/PreFooterCTA';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function ThanksPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const pageTitle = 'Thanks | Green Irony';
  const metaDescription = "Thanks for reaching out. We’ll respond within one business day. In the meantime, explore Insights, Customer Stories, or grab the 8‑Week Plan.";

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
        <HeroSimple
          title="Thanks — you're in."
          subhead="We received your message. One of our team members will reach out shortly (usually within one business day)."
        />

        <section className="mx-auto max-w-7xl px-6 py-6">
          <div className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
            <h2 className="text-xl font-semibold text-gi-text">While you wait, here are useful next steps</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-gi-fog bg-white p-5">
                <h3 className="font-semibold text-gi-text">Explore Insights</h3>
                <p className="mt-1 text-sm text-gi-gray">Deep dives on AI‑native delivery, integration foundations, and first‑win playbooks.</p>
                <div className="mt-3">
                  <Link href="/insights" className="btn-secondary">Browse Insights</Link>
                </div>
              </div>
              <div className="rounded-xl border border-gi-fog bg-white p-5">
                <h3 className="font-semibold text-gi-text">See Customer Stories</h3>
                <p className="mt-1 text-sm text-gi-gray">Real results from teams moving faster with AI‑native integration and delivery.</p>
                <div className="mt-3">
                  <Link href="/customer-stories/" className="btn-secondary">View Stories</Link>
                </div>
              </div>
              <div className="rounded-xl border border-gi-fog bg-white p-5">
                <h3 className="font-semibold text-gi-text">Get the 8‑Week Plan</h3>
                <p className="mt-1 text-sm text-gi-gray">Our playbook for scoping, piloting, and proving value with your first agent.</p>
                <div className="mt-3">
                  <Link href="/agentforce-job-description/" className="btn-secondary">Get the Plan</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PreFooterCTA
          title="Next: turn your goal into a first win"
          body="Prefer not to wait? Dive into our latest insights, or jump straight to the 8‑Week Agent Launch Plan to see exactly how we execute."
          primaryCta={{ label: 'Explore Insights', href: '/insights' }}
          secondaryCta={{ label: 'Get the 8‑Week Plan', href: '/agentforce-job-description/' }}
        />
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


