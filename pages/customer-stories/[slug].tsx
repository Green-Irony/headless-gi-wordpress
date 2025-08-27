import Head from 'next/head';
import { useRouter } from 'next/router';
import { buildCanonicalUrl, toAbsoluteUrl } from '../../lib/seo';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PreFooterCTA from '../../components/PreFooterCTA';
import { useQuery } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../../queries/MenuQueries';
import CustomerStoryRenderer from '../../components/CustomerStoryRenderer';
import { CustomerStory, loadAllStories, loadStoryBySlug } from '../../lib/customerStories';

export default function CustomerStoryPage(props: any & { story: CustomerStory | null }) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const story: CustomerStory | null = props.story || null;
  const seoTitle = story?.seo?.title || (story?.title ? `${story.title} | Customer Story` : 'Customer Story');
  const seoDesc = story?.seo?.description || story?.excerpt || '';
  const router = useRouter();
  const canonical = story?.seo?.canonical || '';
  const resolvedCanonical = toAbsoluteUrl(canonical) || buildCanonicalUrl(router?.asPath || '/');
  const seoImage = toAbsoluteUrl(story?.seo?.ogImage || story?.image?.src || '');
  const locale = story?.seo?.locale || undefined;
  const faqItems = story?.seo?.faqs || (story?.sections || []).flatMap((s: any) => (s.type === 'faq' ? s.items : []));
  const breadcrumbs = story?.seo?.breadcrumbs || [
    { name: 'Home', href: '/' },
    { name: 'Customer Stories', href: '/customer-stories/' },
    story ? { name: story.title, href: `/customer-stories/${story.slug}` } : undefined,
  ].filter(Boolean) as Array<{ name: string; href: string }>;

  if (!story) {
    return (
      <>
        <Head><title>Customer Story Not Found</title></Head>
        <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
        <main className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-2xl font-semibold text-gi-text">Story not found</h1>
          <p className="mt-2 text-gi-gray">The requested customer story could not be found.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        {seoDesc ? <meta name="description" content={seoDesc} /> : null}
        {resolvedCanonical ? <link rel="canonical" href={resolvedCanonical} /> : null}
        {resolvedCanonical ? <meta property="og:url" content={resolvedCanonical} /> : null}
        {locale ? <meta httpEquiv="content-language" content={locale} /> : null}
        {/* JSON-LD Article-like schema for case study */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: story.title,
              headline: story.title,
              description: seoDesc || undefined,
              image: seoImage || undefined,
              about: story.brand,
              inLanguage: locale || undefined,
              mainEntityOfPage: resolvedCanonical ? { "@type": "WebPage", "@id": resolvedCanonical } : undefined,
            }),
          }}
        />
        {/* FAQPage JSON-LD (AEO) */}
        {faqItems && faqItems.length > 0 ? (
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqItems.map((qa: any) => ({
                  "@type": "Question",
                  name: qa.q,
                  acceptedAnswer: { "@type": "Answer", text: qa.a },
                })),
              }),
            }}
          />
        ) : null}
        {/* BreadcrumbList JSON-LD (GEO/navigation) */}
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((bc, idx) => ({
                  "@type": "ListItem",
                  position: idx + 1,
                  name: bc.name,
                  item: bc.href,
                })),
              }),
            }}
          />
        ) : null}
        {/* Open Graph / Twitter */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        {seoDesc ? <meta property="og:description" content={seoDesc} /> : null}
        {seoImage ? <meta property="og:image" content={seoImage} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        {seoDesc ? <meta name="twitter:description" content={seoDesc} /> : null}
        {seoImage ? <meta name="twitter:image" content={seoImage} /> : null}
      </Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>
        <CustomerStoryRenderer story={story} />
      </main>
      <PreFooterCTA />
      <Footer />
    </>
  );
}

export async function getStaticProps(ctx: any) {
  const slug = ctx?.params?.slug as string;
  const story = slug ? loadStoryBySlug(slug) : null;
  return getNextStaticProps(ctx, { Page: CustomerStoryPage as any, revalidate: 60, props: { story } });
}

export async function getStaticPaths() {
  const stories = loadAllStories();
  const paths = stories.map((s) => ({ params: { slug: s.slug } }));
  return { paths, fallback: 'blocking' };
}

(CustomerStoryPage as any).queries = [
  { query: SITE_DATA_QUERY },
  { query: HEADER_MENU_QUERY },
] as any;


