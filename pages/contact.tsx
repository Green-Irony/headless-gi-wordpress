import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroCenterPro from '../components/HeroCenterPro';
import ContactForm from '../components/ContactForm';
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
          title="Let’s launch your first win"
          body="Our senior team will respond within one business day—often the same day."
          primaryCta={{ label: 'Start the Conversation', href: '#contact-form' }}
          secondaryCta={{ label: 'Get the 8-Week Agent Launch Plan', href: '/plan' }}
          kpis={[{ label: '⚡ Faster delivery' }, { label: '⬇️ Deflection up' }, { label: '🧠 Capacity unlocked' }]}
          showMedia={false}
        />

        {/* Contact form */}
        <section id="contact-form" className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="text-2xl font-semibold text-gi-text">Start with one measurable outcome</h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </section>

        {/* Alternative booking embed */}
        <section id="calendar" className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="text-2xl font-semibold text-gi-text">30-minute First-Win Strategy Session</h2>
          <p className="mt-2 max-w-3xl text-gi-gray">Skip the form—pick a time that works. We'll come prepared with a mini diagnostic based on the workflow you want to fix.</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-gi-fog bg-white p-2 shadow-gi">
            {/* Replace iframe src with your Calendly/HubSpot URL */}
            <div className="aspect-video w-full">
              <iframe title="Booking Calendar" src="about:blank" className="h-full w-full" />
            </div>
          </div>
        </section>

        {/* Reassurance / Trust strip */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
            <ul className="grid gap-3 md:grid-cols-3 text-sm text-gi-gray">
              <li>“No boilerplate proposals. One focused outcome in eight weeks.”</li>
              <li>“Senior architects + AI-native delivery. Predictable, not experimental.”</li>
              <li>Spirit Airlines heritage · Repeatable first-win playbook · AI-Native badge</li>
            </ul>
          </div>
        </section>

        {/* Secondary paths */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-semibold text-gi-text">Sales inquiries / Partnerships</h3>
              <p className="mt-1 text-sm text-gi-gray">Email <a className="underline" href="mailto:partnerships@greenirony.com">partnerships@greenirony.com</a></p>
            </div>
            <div className="rounded-xl border border-gi-fog bg-white p-5 shadow-gi">
              <h3 className="font-semibold text-gi-text">Careers / Talent</h3>
              <p className="mt-1 text-sm text-gi-gray">Interested in joining? Tell us what you build. <a className="underline" href="/about#careers">Learn more</a></p>
            </div>
          </div>
        </section>

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