import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HubSpotForm from '../components/HubSpotForm';
import ServiceHero from '../components/ServiceHero';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function MuleSoftWhitepaperPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const pageTitle = 'The Value of MuleSoft Anypoint Platform Whitepaper | Green Irony';
  const metaDescription = 'A perspective from a lifetime of engineering experience in integration & middleware. Learn the total cost of ownership, staffing impacts, and how MuleSoft compares to homegrown approaches.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        <ServiceHero
          title="The Value of MuleSoft Anypoint Platform Whitepaper"
          subhead="A Perspective from a Lifetime of Engineering Experience in Integration & Middleware"
          image={{ src: '/images/value-of-muleSoft-whitepaper.png', alt: 'The Value of MuleSoft Whitepaper' }}
          primaryCta={{ label: 'Download your copy', href: '#download' }}
        />

        {/* Learnings + Form */}
        <section id="download" className="mx-auto max-w-5xl px-6 pb-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-start">
            <div className="md:col-span-7">
              <p className="text-gi-gray">No matter what new digital transformation initiative is on your mind, integration is the key requirement for making it happen. Without sound integrations, transformation initiatives die a slow and costly death, never accomplishing the required business objectives.</p>
              <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gi-text">What you’ll learn by downloading this whitepaper</h2>
              <ul className="mt-4 space-y-3 text-gi-text">
                <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>The technical landscape of integrations</strong></li>
                <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>How MuleSoft compares to alternative approaches</strong></li>
                <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>Reinventing the Mule</strong>: Can an enterprise just build it themselves?</li>
                <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>The staff and expertise required</strong> for MuleSoft vs. building your own integration network</li>
                <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>Total cost of ownership</strong> of the two approaches</li>
                <li className="pl-6 relative"><span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gi-green" /><strong>A comparison case study</strong> — Homegrown vs. MuleSoft</li>
              </ul>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi gi-hubspot">
                <h3 className="text-xl font-semibold text-gi-text">Download Your Copy</h3>
                <p className="mt-1 text-sm text-gi-gray">Fill out the form to get instant access to the whitepaper.</p>
                <div className="mt-6">
                  <HubSpotForm
                    portalId="23316092"
                    formId="f6b4555a-af04-4ac7-ae91-a8bdfc1a33cc"
                    cssClass=""
                  />
                </div>
              </div>
            </div>
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


