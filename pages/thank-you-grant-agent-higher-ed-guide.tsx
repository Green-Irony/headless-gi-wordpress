import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCenterPro from '../components/HeroCenterPro';
import PreFooterCTA from '../components/PreFooterCTA';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

const Page: any = function ThankYouGrantAgentGuidePage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const downloadHref = "https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/click?encryptedPayload=AVxigLLHlTsg2BfsAzs7pw2VAOWtLnbzuv0As4cPi1TZqr1UnQA%2BATl8GiJuooQaWwKaHqbB4BOb%2Fs71rT5eo1Bs2UF%2Bv1M1VrsRFEOicj%2FpFFONDbeZeHYhBDOwuXf9Om4nBrhGM3e6FeYR5yQu%2FVT2r3uiLw6qbCzkdMFPFk1kiv6uBlc1sSPjgU2vauI5fNNYkLccubzuAmnDpzf0PLFzfnmz7HLyXSv8O7rV4F1%2FyzHc9YuI6GWFaWPp3dihM4PDIpzIEJLI6jVUprK1JHZ3lxoYX1I3S1%2BdXSUOnmLwgsseyMte3fZmpkjPcFKedXfxyA%3D%3D&portalId=23316092&webInteractiveId=447234025070&webInteractiveContentId=193446741909&containerType=EMBEDDED&campaignId=359cb1d5-3d8a-4e68-a1e7-951ba7c13ab1&pageUrl=https%3A%2F%2Fgreenirony.com%2Fthank-you-grant-agent-higher-ed-guide%2F&pageTitle=Thank+You+-+Grant+Agent+for+Higher+Ed+Guide+-+Green+Irony&referrer=&userAgent=Mozilla%2F5.0+%28Macintosh%3B+Intel+Mac+OS+X+10_15_7%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F139.0.0.0+Safari%2F537.36&hutk=8617110e8a75d2f7cd829633ce56ea40&hssc=216481097.19.1756151736734&hstc=216481097.8617110e8a75d2f7cd829633ce56ea40.1755801641111.1756137794666.1756151736734.6&hsfp=1286964747&contentType=standard-page";

  return (
    <>
      <Head>
        <title>Thank You — Grant Agent for Higher Ed Guide | Green Irony</title>
        <meta name="description" content="Thank you! Your resource is ready. Download Grant Agent: A Guide for Higher Education and see how AI-powered digital labor streamlines grants in Salesforce." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main className="flex-1">
        <HeroCenterPro
          title="Thank You! Your Resource is Ready"
          body="You can view your copy of Grant Agent: A Guide for Higher Education using the link below."
          kpis={[]}
          primaryCta={{ label: 'Download', href: downloadHref }}
          secondaryCta={undefined}
          showSecondaryCta={false}
          mediaImage={{ src: '/images/grant-agent-a-guide-for-higher-education.jpg', alt: 'Grant Agent: A Guide for Higher Education' }}
        />

        <PreFooterCTA
          title="Ready to see how Grant Agent works in action?"
          body="Grant Agent by Green Irony is transforming how small institutions manage grants with AI-powered digital labor, built on Salesforce. Book a custom demo to see how it can streamline your process—and get your first AI-powered grant generated for free."
          primaryCta={{ label: 'Book a custom demo', href: '/grant-agent#grant-agent-demo' }}
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


