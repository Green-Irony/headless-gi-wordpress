import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import ArticleHeader from "../components/ArticleHeader";
import ArticleBody from "../components/ArticleBody";
import ArticleFooter from "../components/ArticleFooter";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useFaustQuery } from "@faustwp/core";
import Link from "next/link";
import { POST_LIST_FRAGMENT } from "../fragments/PostListFragment";
import PostTile from "../components/PostTile";

const POST_QUERY = gql`
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      databaseId
      title
      content
      date
      featuredImage { node { sourceUrl altText } }
      categories { nodes { name slug databaseId id } }
      tags { nodes { name slug } }
      author {
        node {
          name
        }
      }
    }
  }
`;

const RELATED_POSTS_QUERY = gql`
  ${POST_LIST_FRAGMENT}
  query RelatedPosts($first: Int!, $categoryIn: [ID], $notIn: [ID]) {
    posts(first: $first, where: { categoryIn: $categoryIn, notIn: $notIn, status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes { ...PostListFragment }
    }
  }
`;

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const contentQuery = useFaustQuery(POST_QUERY) || {};
  const siteDataQuery = useFaustQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useFaustQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.primaryMenuItems?.nodes || {
    nodes: [],
  };
  const { title: siteTitle, description: siteDescription } = siteData;
  const { title, content, date, author, featuredImage, categories, tags } = contentQuery?.post || {};

  // Reading time estimation (~200 wpm)
  const plainText = typeof content === 'string' ? content.replace(/<[^>]+>/g, ' ') : '';
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));
  const description = plainText.replace(/\s+/g, ' ').trim().slice(0, 160);

  // Build a simple table of contents: h2/h3 ids and text
  function buildTocAndInjectIds(html) {
    let index = 0;
    const items = [];
    const newHtml = (html || '').replace(/<h([23])(\b[^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs = '', inner) => {
      const text = inner.replace(/<[^>]+>/g, '').trim();
      const idMatch = attrs.match(/id=["']([^"']+)["']/i);
      let id = idMatch ? idMatch[1] : '';
      if (!id) {
        const base = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        id = `${base || 'section'}-${index++}`;
        attrs = `${attrs} id="${id}"`;
      }
      items.push({ id, text });
      return `<h${level}${attrs}>${inner}</h${level}>`;
    });
    return { html: newHtml, toc: items };
  }
  const { html: contentWithIds, toc } = buildTocAndInjectIds(content || '');

  // Related posts fetch (same first category, exclude current)
  const primaryCategoryId = categories?.nodes?.[0]?.databaseId;
  const excludeId = contentQuery?.post?.databaseId;
  const { data: relatedData } = useQuery(RELATED_POSTS_QUERY, {
    skip: !primaryCategoryId,
    variables: { first: 3, categoryIn: primaryCategoryId ? [primaryCategoryId] : [], notIn: excludeId ? [excludeId] : [] },
  });
  const relatedPosts = (relatedData?.posts?.nodes || []).filter(p => p?.databaseId !== excludeId).slice(0,3);

  return (
    <>
      <Head>
        <title>{`${title} - ${siteTitle}`}</title>
        <meta name="description" content={description} />
        {/* JSON-LD Article schema */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: title,
              datePublished: date,
              dateModified: date,
              author: author?.node?.name ? { "@type": "Person", name: author.node.name } : undefined,
              image: featuredImage?.node?.sourceUrl || undefined,
              mainEntityOfPage: { "@type": "WebPage", "@id": typeof window !== 'undefined' ? window.location.href : '' },
            }),
          }}
        />
        {/* Open Graph / Twitter */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        {description ? <meta property="og:description" content={description} /> : null}
        {featuredImage?.node?.sourceUrl ? <meta property="og:image" content={featuredImage.node.sourceUrl} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {description ? <meta name="twitter:description" content={description} /> : null}
        {featuredImage?.node?.sourceUrl ? <meta name="twitter:image" content={featuredImage.node.sourceUrl} /> : null}
      </Head>

      <Header
        siteTitle={siteTitle}
        siteDescription={siteDescription}
        menuItems={menuItems}
      />

      <main>
        <ArticleHeader
          title={title}
          date={date}
          author={author?.node?.name}
          featuredImage={{ src: featuredImage?.node?.sourceUrl, alt: featuredImage?.node?.altText }}
          categories={(categories?.nodes || []).map((c) => ({ name: c.name, slug: c.slug }))}
          readingMinutes={readingMinutes}
        />
        <ArticleBody html={contentWithIds} tableOfContents={toc} />
        {/* Related posts section (same category) */}
        {relatedPosts.length > 0 ? (
          <section className="mx-auto max-w-7xl px-6 py-12">
            <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
            <h3 className="text-2xl font-semibold text-gi-text">Related posts</h3>
            <div className={
              `mt-6 grid gap-6 ` +
              (relatedPosts.length === 1 ? 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-1' :
               relatedPosts.length === 2 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' :
               'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')
            }>
              {relatedPosts.map((p) => (
                <PostTile key={p.id} post={p} />
              ))}
            </div>
            {categories?.nodes?.[0]?.slug ? (
              <div className="mt-6"><Link className="btn-secondary" href={`/category/${categories.nodes[0].slug}/`}>Browse more from {categories.nodes[0].name}</Link></div>
            ) : null}
          </section>
        ) : null}

        <ArticleFooter tags={(tags?.nodes || []).map((t) => ({ name: t.name, slug: t.slug }))} />
      </main>

      <Footer />
    </>
  );
}

Component.queries = [
  {
    query: POST_QUERY,
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
