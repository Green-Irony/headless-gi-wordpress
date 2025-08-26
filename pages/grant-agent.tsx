import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceHero from '../components/ServiceHero';
import ValuePillars from '../components/ValuePillars';
import HubSpotForm from '../components/HubSpotForm';
import Solution from '../components/CustomerStories/Solution';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';
import PreFooterCTA from 'components/PreFooterCTA';

const Page: any = function GrantAgentPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Grant Agent | Green Irony</title>
        <meta name="description" content="Placeholder description for Grant Agent service page." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        <ServiceHero
          title="Grant Agent by Green Irony"
          subhead="Apply for 12X more Higher Ed Grants, without adding headcount. Grant Agent by Green Irony helps higher education institutions find, draft, and win more grants—powered by Agentforce and embedded in Salesforce."
          image={{ src: '/images/grant-agent-header.webp', alt: 'Grant Agent Header Image' }}
          primaryCta={{ label: 'Book a Demo', href: '#grant-agent-demo' }}
        />

        <ValuePillars
          heading="Your Always-On Grant Agent, Built for Higher Ed"
          subhead="Grants are a major revenue stream—but most institutions leave funding on the table simply because the process is too complex and time consuming. That’s where Grant Agent by Green Irony steps in. A seamless, AI-powered application that helps your team discover, draft, and submit more competitive proposals—without ever leaving Salesforce."
          items={[
            { title: 'Auto-Find', body: 'Serves up top 10 best-fit grants tailored to your profile preferences.', iconSrc: '/icons/calculated_insights.svg', iconAlt: 'Discovery' },
            { title: 'AI-Drafts', body: 'Generate high-quality first drafts quickly with Agentforce.', iconSrc: '/icons/einstein.svg', iconAlt: 'AI drafting' },
            { title: 'Platform-Native', body: 'Generate high-quality first drafts quickly with Agentforce.', iconSrc: '/icons/salesforce1.svg', iconAlt: 'Salesforce platform' },
          ]}
        />

        <Solution
          className="scroll-mt-24"
          title="A Smarter, Simpler Grant Pipeline"
          subhead="How Grant Agent Works:"
          image={{ src: '/images/AI-Grad.webp', alt: 'Grant Agent solution' }}
          imageSide="left"
          bg="navy"
          textPrimary="white"
          textSecondary="white"
          bullets={[
            { title: 'Daily Crawl', body: 'AI scans and ranks grants.gov and other relevant sources' },
            { title: 'Select & Track', body: 'Add top grants to your pipeline as Salesforce Opportunities' },
            { title: 'Draft with Agentforce', body: 'Quickly answer questions with AI-assisted content' },
            { title: 'Review & Approve', body: 'Route proposals through your Salesforce approval flows' },
            { title: 'Submit & Scale', body: 'Submit more grants—faster and more confidently' },
          ]}
        />

        <section id="grant-agent-demo" className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="text-2xl font-semibold text-gi-text my-12">Book a Demo</h2>
          <div className="mt-4 rounded-2xl border border-gi-fog bg-white p-6 shadow-gi gi-hubspot">
            <HubSpotForm portalId="23316092" formId="44df09b8-1702-464e-bc09-4b05cf70e2cb" />
          </div>
        </section>
        <PreFooterCTA/>
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


