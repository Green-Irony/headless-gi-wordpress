import { getWpUrl } from "@faustwp/core";
import { loadAllStories } from "../lib/customerStories";

export default function Sitemap() { return null; }

export async function getServerSideProps(ctx) {
  // Determine base URL
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let base = envUrl;
  if (!base) {
    const proto = (ctx?.req?.headers?.["x-forwarded-proto"]) || "https";
    const host = (ctx?.req?.headers?.["x-forwarded-host"]) || (ctx?.req?.headers?.host);
    if (host) base = `${proto}://${host}`;
  }
  base = (base || '').replace(/\/$/, '');

  // Collect static routes
  const staticPaths = [
    '/',
    '/services/', '/services/agentforce/', '/services/mulesoft/', '/services/salesforce/', '/services/data/',
    '/customer-stories/', '/insights/',
    '/solutions/', '/solutions/higher-education/', '/solutions/smb/', '/solutions/travel/',
    '/about/', '/careers/', '/contact/', '/plan/', '/privacy/', '/terms/',
  ];

  // Collect customer story routes
  let storyPaths = [];
  try {
    const stories = loadAllStories();
    storyPaths = (stories || []).map((s) => `/customer-stories/${s.slug}/`);
  } catch {}

  // Collect WordPress posts/pages via WPGraphQL
  const wpUrl = getWpUrl();
  const graphqlEndpoint = `${wpUrl.replace(/\/$/, '')}/graphql`;
  let wpPaths = [];
  try {
    const query = `query Sitemap {
      posts(first: 500, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes { uri modifiedGmt date }
      }
      pages(first: 500, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes { uri modifiedGmt date }
      }
    }`;
    const resp = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (resp.ok) {
      const data = await resp.json();
      const posts = data?.data?.posts?.nodes || [];
      const pages = data?.data?.pages?.nodes || [];
      wpPaths = [...posts, ...pages].map((n) => ({
        loc: n?.uri?.startsWith('/') ? n.uri : `/${n?.uri || ''}`,
        lastmod: (n?.modifiedGmt || n?.date || '').split('T')[0] || undefined,
      }));
    }
  } catch {}

  // Merge all URLs (ensure uniqueness by loc)
  const urlMap = new Map();
  const addLoc = (loc, lastmod) => {
    if (!loc) return;
    const norm = loc.endsWith('/') ? loc : `${loc}/`;
    if (!urlMap.has(norm)) urlMap.set(norm, lastmod);
  };
  staticPaths.forEach((p) => addLoc(p));
  storyPaths.forEach((p) => addLoc(p));
  wpPaths.forEach((n) => addLoc(n.loc, n.lastmod));

  const urls = Array.from(urlMap.entries()).map(([loc, lastmod]) => ({ loc: `${base}${loc}`, lastmod }));

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => {
      return [
        '  <url>',
        `    <loc>${u.loc}</loc>`,
        u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>` : '',
        '  </url>'
      ].filter(Boolean).join('\n');
    }).join('\n') +
    `\n</urlset>`;

  ctx.res.setHeader('Content-Type', 'application/xml');
  ctx.res.write(xml);
  ctx.res.end();
  return { props: {} };
}
