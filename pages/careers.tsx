import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';
import JobCard from '../components/JobCard';

const Page: any = function CareersPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;
  const jobs = Array.isArray(props?.jobs) ? props.jobs : [];

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
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gi-gray">We move fast, deliver predictably, and design agents that act safely. If you thrive in senior‑led teams and love turning complexity into practical outcomes, we'd love to hear from you.</p>
          <div className="mt-8 flex justify-center gap-3">
            <a href="/contact/#contact-form" className="btn-primary">Introduce Yourself</a>
            <a href="/insights/" className="btn-secondary">See what we're thinking</a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
            <h2 className="text-2xl font-semibold text-gi-text">Open Roles</h2>
            {jobs.length === 0 ? (
              <div className="mt-2 text-gi-gray">
                <p>No open roles right now. We're always happy to meet great people—feel free to introduce yourself.</p>
                <div className="mt-4">
                  <a href="/contact/#contact-form" className="btn-secondary">Introduce Yourself</a>
                </div>
              </div>
            ) : (
              <ul className="mt-4 grid grid-cols-1 gap-4">
                {jobs.map((job: any) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Page;

export async function getStaticProps(context: any) {
  let jobs: any[] = [];
  try {
    const res = await fetch('https://boards-api.greenhouse.io/v1/boards/greenirony/jobs');
    if (res.ok) {
      const data = await res.json();
      jobs = Array.isArray(data?.jobs) ? data.jobs : [];
    }
  } catch (e) {
    jobs = [];
  }

  return getNextStaticProps(context, {
    Page,
    revalidate: 300,
    props: { jobs },
  });
}

(Page as any).queries = [
  { query: SITE_DATA_QUERY },
  { query: HEADER_MENU_QUERY },
] as any;


