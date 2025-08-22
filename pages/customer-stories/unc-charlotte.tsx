import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PreFooterCTA from '../../components/PreFooterCTA';
import ServiceHero from '../../components/ServiceHero';
import WhyUsBanner from '../../components/WhyUsBanner';
import DeliverablesWheel from '../../components/DeliverablesWheel';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../../queries/MenuQueries';

const Page: any = function UncCharlotteCasePage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const pageTitle = 'UNC Charlotte: 24/7 IT Support with AI | Green Irony Case Story';
  const metaDescription = 'How UNC Charlotte transformed IT support with AI-powered knowledge and Agentforce availability to deliver 24/7 excellence.';

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
        <ServiceHero
          title="Transforming Higher Education IT Support"
          subhead="How UNC Charlotte achieved 24/7 excellence through AI implementation—combining Einstein, Data Cloud knowledge, and Agentforce availability for real outcomes."
          image={{ src: '/logos/GI-UNCC.webp', alt: 'UNC Charlotte and Green Irony company logos' }}
          primaryCta={{ label: 'Talk to an Expert', href: '/contact' }}
          secondaryCta={{ label: 'Get the 8-Week Agent Launch Plan', href: '/plan' }}
        />

        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <h2 className="text-2xl font-semibold text-gi-text">The Challenge</h2>
              <p className="mt-3 max-w-2xl text-gi-gray">
                As a leading research institution, UNC Charlotte faced the universal higher education challenge of delivering responsive IT support despite limited resources. With thousands of students, faculty, and staff requiring assistance at all hours, their existing support infrastructure couldn’t scale to meet demand—especially outside regular hours when support staff availability was limited. The university needed to transform their approach to knowledge management and support delivery while demonstrating clear ROI to institutional leadership.
              </p>
            </div>
            <div className="md:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-gi-fog bg-white p-5 shadow-gi">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gi-green/10 via-transparent to-gi-pink/10" />
                <div className="relative">
                  <div className="mb-4 text-sm font-semibold text-gi-text">After‑hours demand vs staffing</div>
                  <svg viewBox="0 0 560 260" className="h-auto w-full" aria-label="After-hours demand versus staffing">
                    <defs>
                      <linearGradient id="demandFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#C40084" stopOpacity="0.22" />
                        <stop offset="1" stopColor="#C40084" stopOpacity="0.04" />
                      </linearGradient>
                      <linearGradient id="capacityFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#5AAD5A" stopOpacity="0.20" />
                        <stop offset="1" stopColor="#5AAD5A" stopOpacity="0.04" />
                      </linearGradient>
                    </defs>
                    <rect x="1" y="1" width="558" height="258" rx="14" fill="#fff" stroke="#E6E6EA" />
                    <g transform="translate(40,24)">
                      <path d="M0 206 H 480" stroke="#E6E6EA" />
                      <path d="M0 154 H 480" stroke="#F0F0F3" />
                      <path d="M0 102 H 480" stroke="#F0F0F3" />
                      <path d="M0 50 H 480" stroke="#F0F0F3" />

                      {/* Capacity line */}
                      <path d="M0 148 C 80 148, 160 148, 240 148 S 400 148, 480 148" stroke="#5AAD5A" strokeWidth="2" fill="none" />
                      <path d="M0 148 L 480 148 L 480 206 L 0 206 Z" fill="url(#capacityFill)" />

                      {/* Demand curve (peaks at night) */}
                      <path d="M0 126 C 60 116, 110 100, 160 126 S 240 206, 300 190 380 100, 440 120 480 150, 480 150" stroke="#C40084" strokeWidth="2" fill="none" />
                      <path d="M0 206 L 0 126 C 60 116, 110 100, 160 126 S 240 206, 300 190 380 100, 440 120 480 150, 480 150 L 480 206 Z" fill="url(#demandFill)" />

                      {/* Moon + clock icon for after-hours */}
                      <g transform="translate(380,16)">
                        <circle cx="22" cy="22" r="14" fill="#C40084" opacity="0.12" />
                        <path d="M22 10 a12 12 0 1 0 12 12 a8 8 0 1 1 -12 -12" fill="#C40084" />
                      </g>

                      {/* People icons representing limited staff */}
                      <g transform="translate(8,8)" fill="#5AAD5A">
                        <circle cx="10" cy="10" r="6" />
                        <rect x="6" y="18" width="8" height="10" rx="2" />
                        <g transform="translate(20,0)" opacity="0.65">
                          <circle cx="10" cy="10" r="6" />
                          <rect x="6" y="18" width="8" height="10" rx="2" />
                        </g>
                        <g transform="translate(40,0)" opacity="0.35">
                          <circle cx="10" cy="10" r="6" />
                          <rect x="6" y="18" width="8" height="10" rx="2" />
                        </g>
                      </g>

                      {/* Labels */}
                      <text x="6" y="-6" fill="#818187" fontSize="10">Staffing</text>
                      <text x="364" y="-6" fill="#818187" fontSize="10">After‑hours demand</text>
                    </g>
                  </svg>

                  <div className="mt-4 grid gap-2 text-xs text-gi-gray md:grid-cols-2">
                    <div className="inline-flex items-center gap-2"><span className="h-2 w-4 rounded-full bg-gi-pink/70" /> High after‑hours demand</div>
                    <div className="inline-flex items-center gap-2"><span className="h-2 w-4 rounded-full bg-gi-green/70" /> Limited staff availability</div>
                    <div className="inline-flex items-center gap-2 md:col-span-2"><span className="h-2 w-4 rounded-full bg-gi-fog" /> 50% of staff time previously spent on password resets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="text-2xl font-semibold text-gi-text">The Solution: AI‑Powered, Data‑Driven Support</h2>
          <div className="mx-auto mt-2 h-[3px] w-16 bg-gradient-to-r from-gi-green to-gi-pink/70" />
          <p className="mt-3 max-w-4xl text-gi-gray">
            Green Irony partnered with UNC Charlotte’s Office of the CIO to bridge the gap between technology promises and practical outcomes. Our implementation approach focused on three strategic pillars:
          </p>
          <div className="mt-6 grid items-stretch gap-6 md:grid-cols-3">
            <div className="group relative h-full rounded-2xl bg-white p-5 shadow-gi ring-1 ring-gi-fog transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-lg">
              <div aria-hidden className="absolute left-0 top-5 h-6 w-[3px] rounded-r-full bg-gradient-to-b from-gi-green to-gi-pink/70" />
              <div aria-hidden className="absolute left-0 top-[36px] h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-gi-pink/80" />
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gi-green/15 ring-1 ring-gi-fog">
                  <img src="/icons/einstein.svg" alt="" className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-gi-text">Foundation Building</div>
                  <p className="mt-2 text-sm leading-relaxed text-gi-gray">We integrated Einstein AI capabilities into Service Cloud, creating an intelligent system that could understand and respond to common support inquiries with human‑like comprehension.</p>
                </div>
              </div>
            </div>
            <div className="group relative h-full rounded-2xl bg-white p-5 shadow-gi ring-1 ring-gi-fog transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-lg">
              <div aria-hidden className="absolute left-0 top-5 h-6 w-[3px] rounded-r-full bg-gradient-to-b from-gi-green to-gi-pink/70" />
              <div aria-hidden className="absolute left-0 top-[36px] h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-gi-pink/80" />
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gi-green/15 ring-1 ring-gi-fog">
                  <img src="/icons/data_cloud.svg" alt="" className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-gi-text">Knowledge Architecture</div>
                  <p className="mt-2 text-sm leading-relaxed text-gi-gray">Rather than simply deploying AI, we developed a Data Cloud‑backed knowledge base that ensures the AI always accesses the most current, accurate information—transforming thousands of FAQs and knowledge articles into actionable intelligence.</p>
                </div>
              </div>
            </div>
            <div className="group relative h-full rounded-2xl bg-white p-5 shadow-gi ring-1 ring-gi-fog transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-lg">
              <div aria-hidden className="absolute left-0 top-5 h-6 w-[3px] rounded-r-full bg-gradient-to-b from-gi-green to-gi-pink/70" />
              <div aria-hidden className="absolute left-0 top-[36px] h-[6px] w-[6px] -translate-x-1/2 rounded-full bg-gi-pink/80" />
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gi-green/15 ring-1 ring-gi-fog">
                  <img src="/icons/robot.svg" alt="" className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-gi-text">Agentforce Availability</div>
                  <p className="mt-2 text-sm leading-relaxed text-gi-gray">We implemented a public‑facing Agentforce chat agent that provides 24/7 support with a conversational interface, designed specifically for the unique needs of students, faculty, and staff.</p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-8 max-w-4xl text-gi-gray">This implementation transformed theoretical AI potential into practical support solutions, aligned with UNC Charlotte’s vision for academic and operational excellence.</p>
        </section>

        <WhyUsBanner
          title="Measurable Transformation"
          bullets={[
            'Improved response time and accuracy',
            'Scalable support without adding headcount',
            'Enhanced user experience for students, faculty, and staff',
            'Foundation laid for future AI integrations and innovations',
          ]}
          className="my-6"
        />

        <DeliverablesWheel
          heading="Implementation Highlights"
          items={[
            { title: 'Strategic AI Integration', body: 'Implemented Einstein capabilities in Service Cloud, creating an intelligent foundation for automated support.' },
            { title: 'Knowledge Transformation', body: 'Developed a Data Cloud‑backed knowledge architecture ensuring AI access to current, accurate information.' },
            { title: 'Experience Design', body: 'Deployed conversational Agentforce chat agents tailored to higher education user needs.' },
            { title: 'Continuous Optimization', body: 'Established metrics and feedback loops for ongoing improvement.' },
          ]}
        />
      </main>
      <PreFooterCTA/>
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


