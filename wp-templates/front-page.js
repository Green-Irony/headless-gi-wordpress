import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useQuery } from "@apollo/client";
import { getNextStaticProps } from "@faustwp/core";
import HeroCenterPro from "../components/HeroCenterPro";
import TrustStrip from "../components/TrustStrip";
import ValuePillars from "../components/ValuePillars";
import FeaturedOffers from "../components/FeaturedOffers";
import HowItWorksLinear from "../components/HowItWorksLinear";
import CustomerStoriesProof from "../components/CustomerStoriesProof";
import LeadMagnetCTA from "../components/LeadMagnetCTA";
import PreFooterCTA from "../components/PreFooterCTA";

export default function FrontPage(props) {
  if (props.loading) {
    return <>Loading...</>;
  }

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || {
    nodes: [],
  };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <main>
        <HeroCenterPro />
        <TrustStrip />
        <ValuePillars />
        <FeaturedOffers />
        <HowItWorksLinear />
        <CustomerStoriesProof />
        <LeadMagnetCTA />
        <PreFooterCTA />
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page: FrontPage,
    revalidate: 60,
  });
}

FrontPage.queries = [
  { query: SITE_DATA_QUERY },
  { query: HEADER_MENU_QUERY },
];
