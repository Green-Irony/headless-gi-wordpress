import { gql } from "@apollo/client";
import Head from "next/head";
import ArticleHeader from "../components/ArticleHeader";
import ArticleBody from "../components/ArticleBody";
import ArticleFooter from "../components/ArticleFooter";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { SITE_DATA_QUERY } from "../queries/SiteSettingsQuery";
import { HEADER_MENU_QUERY } from "../queries/MenuQueries";
import { useFaustQuery } from "@faustwp/core";

const POST_QUERY = gql`
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      featuredImage { node { sourceUrl altText } }
      categories { nodes { name slug } }
      tags { nodes { name slug } }
      author {
        node {
          name
        }
      }
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

  return (
    <>
      <Head>
        <title>{`${title} - ${siteTitle}`}</title>
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
        />
        <ArticleBody html={content || ''} />
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
