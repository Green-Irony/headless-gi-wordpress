import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InsightsHeroSearch from '../components/InsightsHeroSearch';
import FeaturedPost from '../components/FeaturedPost';
import { gql, useQuery } from '@apollo/client';
import PostTile from '../components/PostTile';
import { POST_LIST_FRAGMENT } from '../fragments/PostListFragment';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';
import React from 'react';

// Simple latest posts query (9 most recent)
export const LATEST_POSTS_QUERY = gql`
  ${POST_LIST_FRAGMENT}
  query LatestPosts($first: Int!, $categoryIn: [ID], $search: String) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC }, status: PUBLISH, categoryIn: $categoryIn, search: $search }) {
      pageInfo { hasNextPage endCursor }
      nodes { ...PostListFragment databaseId }
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query InsightCategories {
    categories(where: { hideEmpty: true }, first: 100) {
      nodes { id databaseId name slug count }
    }
  }
`;

export const FEATURED_STICKY_POST_QUERY = gql`
  ${POST_LIST_FRAGMENT}
  query FeaturedStickyPost {
    posts(first: 100, where: { orderby: { field: DATE, order: DESC }, status: PUBLISH }) {
      nodes { ...PostListFragment databaseId }
    }
  }
`;

function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

const Page: any = function InsightsPage(props: any) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;

  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<number[]>([]);
  const [q, setQ] = React.useState<string>('');
  const debouncedQ = useDebouncedValue(q, 300);

  const { data: postsData, error: postsError } = useQuery(LATEST_POSTS_QUERY, {
    variables: { first: 9, categoryIn: selectedCategoryIds.length ? selectedCategoryIds : undefined, search: debouncedQ || undefined },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'cache-first',
  });
  const posts = postsData?.posts?.nodes || [];

  const { data: featuredData } = useQuery(FEATURED_STICKY_POST_QUERY, { fetchPolicy: 'no-cache', nextFetchPolicy: 'cache-first' });
  const featuredPost = (featuredData?.posts?.nodes || []).find((p: any) => p?.isSticky);

  const { data: catsData } = useQuery(CATEGORIES_QUERY);
  const categories: Array<{ name: string; databaseId: number; slug: string; count: number }> = catsData?.categories?.nodes || [];

  function toggleCategory(id: number) {
    setSelectedCategoryIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  function clearFilters() {
    setSelectedCategoryIds([]);
  }

  return (
    <>
      <Head><title>{siteTitle ? `${siteTitle} — Clarity in the age of AI` : 'Clarity in the age of AI'}</title></Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>
      {featuredPost ? (
          <section className="mx-auto max-w-7xl px-6 py-6">
            <FeaturedPost post={featuredPost} />
          </section>
        ) : null}
        <InsightsHeroSearch
          value={q}
          onChange={setQ}
          onClear={() => setQ('')}
        />

        <section className="mx-auto max-w-7xl px-6 py-12">
          {categories.length > 0 ? (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gi-gray">Filter by category:</span>
              {categories.map((c) => {
                const active = selectedCategoryIds.includes(c.databaseId);
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => toggleCategory(c.databaseId)}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm ring-1 transition-colors ${active ? 'bg-gi-green/15 text-gi-text ring-gi-fog' : 'bg-white text-gi-text ring-gi-fog hover:bg-gi-fog/60'}`}
                    aria-pressed={active}
                  >
                    {c.name}
                  </button>
                );
              })}
              {selectedCategoryIds.length > 0 ? (
                <button type="button" onClick={clearFilters} className="ml-2 text-sm text-gi-gray underline">
                  Clear
                </button>
              ) : null}
            </div>
          ) : null}
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