import { gql } from "@apollo/client";
import Head from "next/head";
import PageHero from "../components/PageHero";
import PageBody from "../components/PageBody";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useFaustQuery } from "@faustwp/core";

const PAGE_QUERY = gql`
  query GetPage($databaseId: ID!, $asPreview: Boolean = false) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      databaseId
      title
      content
      date
      featuredImage { node { sourceUrl altText } }
    }
  }
`;

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const contentQuery = useFaustQuery(PAGE_QUERY) || {};
  const siteDataQuery = useFaustQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useFaustQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.primaryMenuItems?.nodes || {
    nodes: [],
  };
  const { title: siteTitle, description: siteDescription } = siteData;
  const { title, content, date, featuredImage } = contentQuery?.page || {};

  // Utility: decode HTML entities (supports named, decimal, and hex)
  function decodeHtmlEntities(str = "") {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;|&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .replace(/&#(\d+);/g, (_, dec) => {
        try { return String.fromCodePoint(parseInt(dec, 10)); } catch { return _; }
      })
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
        try { return String.fromCodePoint(parseInt(hex, 16)); } catch { return _; }
      });
  }

  // Derive a short description/subtitle from content
  const plainText = typeof content === 'string' ? content.replace(/<[^>]+>/g, ' ') : '';
  const description = plainText.replace(/\s+/g, ' ').trim().slice(0, 160);
  const decodedTitle = decodeHtmlEntities(title || '');
  const decodedDescription = decodeHtmlEntities(description);

  if (!title) {
    return <p>No pages have been published</p>;
  }

  return (
    <>
      <Head>
        <title>{`${decodedTitle} - ${siteTitle}`}</title>
        {decodedDescription ? <meta name="description" content={decodedDescription} /> : null}
        {/* JSON-LD WebPage schema */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: title,
              description: description || undefined,
              datePublished: date || undefined,
              dateModified: date || undefined,
              image: featuredImage?.node?.sourceUrl || undefined,
              mainEntityOfPage: { "@type": "WebPage", "@id": typeof window !== 'undefined' ? window.location.href : '' },
            }),
          }}
        />
        {/* Open Graph / Twitter */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={decodedTitle} />
        {decodedDescription ? <meta property="og:description" content={decodedDescription} /> : null}
        {featuredImage?.node?.sourceUrl ? <meta property="og:image" content={featuredImage.node.sourceUrl} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={decodedTitle} />
        {decodedDescription ? <meta name="twitter:description" content={decodedDescription} /> : null}
        {featuredImage?.node?.sourceUrl ? <meta name="twitter:image" content={featuredImage.node.sourceUrl} /> : null}
      </Head>

      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <main>
        <PageHero
          title={decodedTitle}
          //subtitle={decodedDescription}
          featuredImage={{ src: featuredImage?.node?.sourceUrl, alt: featuredImage?.node?.altText }}
        />
        <PageBody html={content || ''} />
      </main>

      <Footer />
    </>
  );
}

Component.queries = [
  {
    query: PAGE_QUERY,
    variables: ({ databaseId }, ctx) => ({
      databaseId,
      asPreview: ctx?.asPreview,
    }),
  },
  {
    query: SITE_DATA_QUERY,
  },
  {
    query: HEADER_MENU_QUERY,
  },
];
