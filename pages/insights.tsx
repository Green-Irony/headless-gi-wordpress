import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSimple from '../components/HeroSimple';
import { gql, useQuery } from '@apollo/client';
import PostTile from '../components/PostTile';
import { POST_LIST_FRAGMENT } from '../fragments/PostListFragment';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';

// Simple latest posts query (9 most recent)
export const LATEST_POSTS_QUERY = gql`
  ${POST_LIST_FRAGMENT}
  query LatestPosts($first: Int!) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC }, status: PUBLISH }) {
      pageInfo { hasNextPage endCursor }
      nodes { ...PostListFragment databaseId }
    }
  }
`;

const Page: any = function InsightsPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const { data: postsData, error: postsError } = useQuery(LATEST_POSTS_QUERY, {
    variables: { first: 9 },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'cache-first',
  });
  const posts = postsData?.posts?.nodes || [];

  return (
    <>
      <Head><title>{siteTitle ? `${siteTitle} — Insights` : 'Insights'}</title></Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>
        <HeroSimple
          title="Insights"
          subhead="Notes for operators on making AI outcomes predictable."
        />
        <section className="mx-auto max-w-7xl px-6 py-12">
          {postsError ? (
            <p className="max-w-3xl text-gi-gray">Error loading posts: {String(postsError.message)}</p>
          ) : posts.length === 0 ? (
            <p className="max-w-3xl text-gi-gray">No articles published yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any) => (
                <PostTile key={post.id} post={post} />
              ))}
            </div>
          )}
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