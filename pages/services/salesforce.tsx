import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroCenterPro from '../../components/HeroCenterPro';
import ChecklistCard from '../../components/ChecklistCard';
import ValuePillars from '../../components/ValuePillars';
import PreFooterCTA from '../../components/PreFooterCTA';
import HeroSimple from '../../components/HeroSimple';
import DeliverablesWheel from '../../components/DeliverablesWheel';
import WhyUsBanner from '../../components/WhyUsBanner';
import ServiceHero from '../../components/ServiceHero';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../../queries/MenuQueries';
import SalesforcePartnerBadge from 'components/SalesforcePartnerBadge';

const Page: any = function SalesforcePage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  return (
    <>
      <Head>
        <title>Salesforce Optimization | Green Irony</title>
        <meta name="description" content="Make Salesforce the control room for both humans and agents to unlock real outcomes." />
      </Head>

      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />

      <main>
        <ServiceHero
          title="Salesforce done right — faster"
          subhead="From Sales Cloud to Experience Cloud and beyond, our senior architects deliver Salesforce builds that scale. With AI‑accelerated methods, you get predictable outcomes in half the time—without the costly rework that comes from shortcuts."
          image={{ src: '/images/8-week-launch-home.webp', alt: 'Salesforce optimization' }}
          primaryCta={{ label: 'Optimize My Org', href: '/contact' }}
        />
        <DeliverablesWheel
          heading="What we deliver"
          items={[
            { title: 'Smart discovery & design', body: 'Translate business requirements into clear, future‑proof Salesforce designs—accelerated by AI without missing critical details.' },
            { title: 'Rapid, reliable implementation', body: 'US‑based senior architects use AI tools to configure and build Salesforce orgs faster, while maintaining enterprise‑grade quality.' },
            { title: 'Trusted data & migrations', body: 'Ensure clean, accurate data migrations that fuel adoption, reporting, and decision‑making from day one.' },
            { title: 'Optimization & automation', body: 'Streamline workflows and eliminate swivel‑chair processes with Salesforce automation that actually sticks.' },
          ]}
        />

        <ValuePillars
          heading="Outcome promise"
          items={[
            { title: 'Faster internal throughput', body: 'Reduce manual handoffs and simplify flows.', iconNode: (
              <img src="/icons/add_source.svg" alt="" />
            ) },
            { title: 'Higher adoption', body: 'Changes are low‑friction and aligned to real work.', iconNode: (
              <img src="/icons/buyer_group_qualifier.svg" alt="" />
            ) },
            { title: 'Agent‑ready Salesforce', body: 'Surfaces the right context and accepts safe actions.', iconNode: (
              <img src="/icons/agent_astro.svg" alt="" />
            ) },
          ]}
        />
        <WhyUsBanner
          body="We redesign Salesforce around outcomes—signal design, safe actions, and enablement—so agents and humans operate as one team."
          bullets={[
            'Enterprise experience: Trusted Salesforce partner since 2016, delivering for SMBs and enterprises alike.',
            'AI‑accelerated delivery: 2× faster without sacrificing quality or predictability.',
            'US‑based senior architects: Offshore economics, without the offshore risks.',
            'Proven track record: Implementations that last and scale—no costly rebuilds later.',
          ]}
        />
        <SalesforcePartnerBadge/>
        <PreFooterCTA
          title="Optimize your org for digital labor"
          body="We’ll remove friction and ready Salesforce for reliable agent action."
          primaryCta={{ label: 'Talk to Salesforce experts', href: '/contact' }}
          secondaryCta={{ label: 'See optimization checklist', href: '/plan' }}
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