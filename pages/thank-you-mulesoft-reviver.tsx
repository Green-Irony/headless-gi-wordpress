import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSimple from '../components/HeroSimple';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function ThankYouMuleSoftReviverPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Thank You | MuleSoft Reviver | Green Irony</title>
        <meta name="description" content="Thank you for requesting your MuleSoft Reviver. Our team will reach out shortly to start your 48-hour diagnostic." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main className="flex-1">
        <HeroSimple
          title="Thank You"
          subhead="Thank you for requesting your MuleSoft Reviver. Our team will reach out to you shortly for a quick intake, and then get your 48-hour diagnostic started."
          cta={{ label: 'Explore insights', href: '/insights/' }}
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


