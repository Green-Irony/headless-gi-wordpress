import Head from 'next/head';
import { useRouter } from 'next/router';
import { buildCanonicalUrl } from '../lib/seo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InsightsHeroSearch from '../components/InsightsHeroSearch';
import FeaturedPost from '../components/FeaturedPost';
import CombinedTile, { CombinedItem } from '../components/CombinedTile';
import CustomerStoryCard from '../components/CustomerStoryCard';
import { gql, useQuery } from '@apollo/client';
import PostTile from '../components/PostTile';
import { POST_LIST_FRAGMENT } from '../fragments/PostListFragment';
import { getNextStaticProps } from '@faustwp/core';
import { SITE_DATA_QUERY } from '../queries/SiteSettingsQuery';
import { HEADER_MENU_QUERY } from '../queries/MenuQueries';
import React from 'react';
import { loadAllStories } from '../lib/customerStories';

// Simple latest posts query (9 most recent)
export const LATEST_POSTS_QUERY = gql`
  ${POST_LIST_FRAGMENT}
  query LatestPosts($first: Int!, $after: String, $categoryIn: [ID], $search: String) {
    posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC }, status: PUBLISH, categoryIn: $categoryIn, search: $search }) {
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

const Page: any = function InsightsPage(props: any & { stories: any[] }) {
  if (props.loading) return <>Loading...</>;

  const siteDataQuery = useQuery(SITE_DATA_QUERY) || {};
  const headerMenuDataQuery = useQuery(HEADER_MENU_QUERY) || {};

  const siteData = siteDataQuery?.data?.generalSettings || {};
  const menuItems = headerMenuDataQuery?.data?.primaryMenuItems?.nodes || { nodes: [] };
  const { title: siteTitle, description: siteDescription } = siteData;
  const router = useRouter();
  const canonical = buildCanonicalUrl(router?.asPath || '/insights');

  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState<number[]>([]);
  const [q, setQ] = React.useState<string>('');
  const debouncedQ = useDebouncedValue(q, 300);

  const { data: postsData, error: postsError, fetchMore, refetch } = useQuery(LATEST_POSTS_QUERY, {
    variables: { first: 9, after: null, categoryIn: selectedCategoryIds.length ? selectedCategoryIds : undefined, search: debouncedQ || undefined },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'cache-first',
  });
  const initialPosts = postsData?.posts?.nodes || [];
  const initialPageInfo = postsData?.posts?.pageInfo;

  const [accPosts, setAccPosts] = React.useState<any[]>([]);
  const [pageInfo, setPageInfo] = React.useState<{ hasNextPage: boolean; endCursor: string | null } | undefined>(undefined);
  const loadingMoreRef = React.useRef(false);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Keep current posts visible while refetching to avoid UI flicker to stories-only
    refetch({ first: 9, after: null, categoryIn: selectedCategoryIds.length ? selectedCategoryIds : undefined, search: debouncedQ || undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategoryIds, debouncedQ]);

  React.useEffect(() => {
    if (initialPosts && initialPosts.length > 0) {
      setAccPosts(initialPosts);
      setPageInfo(initialPageInfo);
    } else if (initialPosts && initialPosts.length === 0) {
      setAccPosts([]);
      setPageInfo(initialPageInfo);
    }
  }, [initialPosts, initialPageInfo]);

  async function loadMore() {
    if (loadingMoreRef.current || !pageInfo?.hasNextPage) return;
    loadingMoreRef.current = true;
    try {
      const res = await fetchMore({
        variables: {
          first: 9,
          after: pageInfo?.endCursor,
          categoryIn: selectedCategoryIds.length ? selectedCategoryIds : undefined,
          search: debouncedQ || undefined,
        },
      });
      const newNodes = res?.data?.posts?.nodes || [];
      const nextInfo = res?.data?.posts?.pageInfo;
      if (newNodes.length > 0) {
        setAccPosts((prev) => {
          const existingIds = new Set(prev.map((p: any) => p.databaseId || p.id));
          const deduped = newNodes.filter((p: any) => !existingIds.has(p.databaseId || p.id));
          return [...prev, ...deduped];
        });
      }
      setPageInfo(nextInfo);
    } finally {
      loadingMoreRef.current = false;
    }
  }

  React.useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      const [e] = entries;
      if (e.isIntersecting) loadMore();
    }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, [pageInfo?.endCursor]);

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

  // Modernized Filters UI (modal)
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  function openFilters() { setFiltersOpen(true); }
  function applyFilters() { setFiltersOpen(false); }

  // Build combined list (posts + stories)
  const normalizedPosts: CombinedItem[] = (accPosts || []).map((p: any) => ({
    id: p.id,
    type: 'post',
    title: p.title,
    href: p.uri && !p.uri.startsWith('?p=') ? p.uri : (p.slug ? `/blog/${p.slug}/` : '#'),
    date: p.date,
    image: p.featuredImage?.node?.sourceUrl ? { src: p.featuredImage.node.sourceUrl, alt: p.featuredImage?.node?.altText } : undefined,
    tags: (p.categories?.nodes || []).map((c: any) => c.name),
    searchText: `${p.title || ''} ${(p.excerpt || '').replace(/<[^>]+>/g,' ')} ${((p.categories?.nodes||[]).map((c:any)=>c.name).join(' '))}`.toLowerCase(),
  }));
  const normalizedStories: CombinedItem[] = (props.stories || []).map((s: any) => ({
    id: s.slug,
    type: 'story',
    title: s.title,
    href: `/customer-stories/${s.slug}`,
    date: s.datePublished,
    image: s.image?.src ? { src: s.image.src, alt: s.image?.alt } : undefined,
    tags: s.tags || [],
    searchText: `${s.title || ''} ${s.excerpt || ''} ${(s.tags||[]).join(' ')} ${s.brand || ''} ${(s.products||[]).join(' ')} ${s.vertical || ''}`.toLowerCase(),
  }));

  // Base combined list (full set). Thresholding for jank avoidance is applied later when no search query.
  const combinedAll = React.useMemo(() => {
    const posts = (normalizedPosts || []).filter((p) => !!p.date);
    const stories = (normalizedStories || []).filter((s) => !!s.date);
    const list = [...posts, ...stories];
    return list.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
  }, [normalizedPosts, normalizedStories]);

  // Type + Topics filters
  const [selectedType, setSelectedType] = React.useState<'all' | 'post' | 'story'>('all');
  const allTopics = React.useMemo(() => {
    const set = new Set<string>();
    normalizedPosts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    normalizedStories.forEach((s) => (s.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [normalizedPosts, normalizedStories]);
  const [selectedTopics, setSelectedTopics] = React.useState<string[]>([]);

  const filteredCombined = React.useMemo(() => {
    let items = combinedAll;
    const hasTypeFilter = selectedType !== 'all';
    const hasTopicFilter = selectedTopics.length > 0;
    const q = (debouncedQ || '').toLowerCase();
    const hasSearch = !!q;

    if (hasTypeFilter) items = items.filter((i) => i.type === selectedType);
    if (hasTopicFilter) items = items.filter((i) => (i.tags || []).some((t) => selectedTopics.includes(t)));
    if (hasSearch) items = items.filter((i) => (i.searchText || i.title?.toLowerCase()).includes(q));

    // Apply threshold ONLY in the unfiltered, no-search, browsing state (to prevent lazy-load jank)
    if (!hasTypeFilter && !hasTopicFilter && !hasSearch) {
      const posts = items.filter((i) => i.type === 'post');
      if (posts.length === 0) return items; // nothing to threshold yet
      const oldestPostDate = posts.reduce((min, p) => (new Date(p.date) < new Date(min) ? p.date : min), posts[0].date);
      return items.filter((i) => i.type === 'story' ? (new Date(i.date) >= new Date(oldestPostDate)) : true);
    }

    return items;
  }, [combinedAll, selectedType, selectedTopics, debouncedQ]);

  const isBrowsingNoFilters = selectedType === 'all' && selectedTopics.length === 0 && !debouncedQ;
  const postsLoaded = (accPosts || []).length > 0;

  return (
    <>
      <Head>
        <title>{siteTitle ? `${siteTitle} — Clarity in the age of AI` : 'Clarity in the age of AI'}</title>
        {canonical ? <link rel="canonical" href={canonical} /> : null}
        {canonical ? <meta property="og:url" content={canonical} /> : null}
      </Head>
      <Header siteTitle={siteTitle} siteDescription={siteDescription} menuItems={menuItems} />
      <main>

        <InsightsHeroSearch
          value={q}
          onChange={setQ}
          onClear={() => setQ('')}
        />

{featuredPost ? (
          <section className="mx-auto max-w-7xl px-6 py-6">
            <FeaturedPost post={featuredPost} />
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-6 py-12">
          {/* Filters button (right-aligned) + selected chips */}
          <div className="mb-6">
            <div className="flex items-center justify-end">
              <button type="button" onClick={openFilters} className="btn-secondary">Filters</button>
            </div>
            {selectedCategoryIds.length > 0 ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {selectedCategoryIds.map((id) => {
                  const c = categories.find((x) => x.databaseId === id);
                  if (!c) return null;
                  return (
                    <span key={c.slug} className="inline-flex items-center rounded-full bg-gi-green/15 px-3 py-1 text-sm text-gi-text ring-1 ring-gi-fog">
                      {c.name}
                      <button onClick={() => toggleCategory(c.databaseId)} className="ml-2 text-xs text-gi-gray hover:underline">Remove</button>
                    </span>
                  );
                })}
                <button type="button" onClick={clearFilters} className="text-sm text-gi-gray underline">Clear</button>
              </div>
            ) : null}
          </div>
          {(!postsLoaded && isBrowsingNoFilters) ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl ring-1 ring-gi-fog bg-white">
                  <div className="h-40 w-full animate-pulse bg-gi-fog/60" />
                  <div className="p-4">
                    <div className="h-3 w-24 animate-pulse rounded bg-gi-fog/60" />
                    <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-gi-fog/60" />
                    <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gi-fog/60" />
                  </div>
                </div>
              ))}
            </div>
          ) : postsError ? (
            <p className="max-w-3xl text-gi-gray">Error loading content: {String(postsError.message)}</p>
          ) : filteredCombined.length === 0 ? (
            <p className="max-w-3xl text-gi-gray">No items found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCombined.map((it: CombinedItem) => (
                <CombinedTile key={`${it.type}-${it.id}`} item={it} />
              ))}
            </div>
          )}
          <div ref={sentinelRef} className="h-8" />
        </section>

        {filtersOpen ? (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" onClick={() => setFiltersOpen(false)}>
            <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-gi ring-1 ring-gi-fog" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gi-text">Filter by category</h3>
                <button className="text-sm text-gi-gray underline" onClick={() => setFiltersOpen(false)}>Close</button>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-semibold text-gi-text mb-2">Type</div>
                  {(['all','post','story'] as const).map((t) => (
                    <label key={t} className="mr-3 text-sm">
                      <input type="radio" name="type" className="mr-1" checked={selectedType===t} onChange={() => setSelectedType(t)} />
                      {t === 'all' ? 'All' : t === 'post' ? 'Blog Posts' : 'Customer Stories'}
                    </label>
                  ))}
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-semibold text-gi-text mb-2">Topics</div>
                  {allTopics.length === 0 ? (
                    <p className="text-sm text-gi-gray">No topics available.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {allTopics.map((t) => {
                        const active = selectedTopics.includes(t);
                        return (
                          <button key={t} type="button" onClick={() => setSelectedTopics((prev)=> prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t])} className={`rounded-full px-3 py-1 text-sm ring-1 ${active ? 'bg-gi-green/15 ring-gi-green text-gi-text' : 'bg-white ring-gi-fog text-gi-gray'}`}>{t}</button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <button type="button" className="btn-secondary" onClick={() => { setSelectedType('all'); setSelectedTopics([]); setQ(''); setFiltersOpen(false); }}>Clear</button>
                <button type="button" className="btn-primary" onClick={applyFilters}>Apply</button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
      <Footer />
    </>
  );
}

export default Page;

export async function getStaticProps(context: any) {
  const stories = loadAllStories();
  return getNextStaticProps(context, { Page, revalidate: 60, props: { stories } });
}

(Page as any).queries = [
  { query: SITE_DATA_QUERY },
  { query: HEADER_MENU_QUERY },
] as any; 